import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
    BEGIN_MARKER,
    END_MARKER,
    installBlogCron,
    managedBlock,
    parseArguments,
    plannedCrontab,
    readCrontab,
} from '../blogposts/install-blog-cron.mjs';

function workspace(t) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-cron-test-'));
    t.after(() => fs.rmSync(root, { recursive: true, force: true }));
    fs.mkdirSync(path.join(root, 'scripts/blogposts'), { recursive: true });
    fs.writeFileSync(path.join(root, 'scripts/blogposts/run-blog-cron.sh'), '#!/bin/sh\n');
    return root;
}

function viennaFilesystem() {
    return { ...fs, realpathSync: () => '/usr/share/zoneinfo/Europe/Vienna' };
}

function crontabRunner(content = '', { missing = false, installStatus = 0 } = {}) {
    const calls = [];
    const run = (command, args, options) => {
        calls.push({ command, args, options });
        if (args[0] === '-l') {
            return missing
                ? { status: 1, stdout: '', stderr: 'crontab: no crontab for test-user\n' }
                : { status: 0, stdout: content, stderr: '' };
        }
        assert.deepEqual(args, ['-']);
        return { status: installStatus, stdout: '', stderr: '' };
    };
    return { run, calls };
}

test('defines both daily schedules and quotes a project path containing spaces and apostrophes', () => {
    const result = managedBlock("/Users/example/oli's project");
    assert.equal(result, `${BEGIN_MARKER}\n0 12 * * * /bin/sh '/Users/example/oli'\\''s project/scripts/blogposts/run-blog-cron.sh' feed:random\n30 17 * * * /bin/sh '/Users/example/oli'\\''s project/scripts/blogposts/run-blog-cron.sh' top:random\n${END_MARKER}\n`);
});

test('rejects cron control characters in the project path', () => {
    for (const root of ['/repo\njob', '/repo\rjob', '/repo%job', '/repo\0job', 'relative/repo']) {
        assert.throws(() => managedBlock(root), /project path/);
    }
});

test('keeps unrelated jobs and environment assignments and is idempotent', () => {
    const previous = 'MAILTO=person@example.invalid\n# Existing maintenance job\n15 2 * * * /usr/local/bin/backup\n';
    const planned = plannedCrontab(previous, '/repo');
    assert.equal(planned, previous + managedBlock('/repo'));
    assert.equal(plannedCrontab(planned, '/repo'), planned);
    assert.equal(plannedCrontab(previous.trimEnd(), '/repo'), planned);
});

test('replaces only the managed block, including when it is between unrelated jobs', () => {
    const before = 'MAILTO=person@example.invalid\n15 2 * * * /backup\n';
    const after = '\n30 3 * * * /cleanup\n';
    const previous = `${before}${BEGIN_MARKER}\nold jobs\n${END_MARKER}\n${after}`;
    assert.equal(plannedCrontab(previous, '/repo'), before + managedBlock('/repo') + after);
    assert.equal(plannedCrontab(`${BEGIN_MARKER}\nold jobs\n${END_MARKER}`, '/repo'), managedBlock('/repo'));
});

test('rejects incomplete, reversed, repeated and malformed managed markers', () => {
    for (const previous of [
        BEGIN_MARKER,
        END_MARKER,
        `${END_MARKER}\n${BEGIN_MARKER}\n`,
        managedBlock('/repo') + managedBlock('/repo'),
        `${BEGIN_MARKER}\n${BEGIN_MARKER}\n${END_MARKER}\n`,
        ` ${BEGIN_MARKER}\n${END_MARKER}\n`,
        `${BEGIN_MARKER}\n${END_MARKER} trailing text\n`,
    ]) {
        assert.throws(() => plannedCrontab(previous, '/repo'), /markers/);
    }
});

test('treats only an explicit no-crontab result as an empty crontab', () => {
    assert.deepEqual(readCrontab(crontabRunner('', { missing: true }).run), { content: '', exists: false });
    assert.deepEqual(readCrontab(crontabRunner('').run), { content: '', exists: true });
    for (const result of [
        { status: 1, stdout: '', stderr: 'crontab: permission denied' },
        { status: 1, stdout: '', stderr: '' },
        { status: 1, stdout: 'SECRET=value', stderr: 'no crontab for test-user' },
        { status: 1, stdout: '', stderr: 'no crontab for test-user\npermission denied' },
        { status: 2, stdout: '', stderr: 'no crontab for test-user' },
        { error: new Error('SECRET=value'), status: null },
    ]) {
        assert.throws(() => readCrontab(() => result), error => {
            assert.doesNotMatch(error.message, /SECRET|value|permission denied/);
            return /no changes made/.test(error.message);
        });
    }
});

test('dry-run reads existing jobs but writes no files and installs nothing', t => {
    const root = workspace(t);
    const { run, calls } = crontabRunner('0 1 * * * /existing\n');
    const result = installBlogCron({ root, dryRun: true, run, filesystem: viennaFilesystem() });
    assert.equal(result.crontab, '0 1 * * * /existing\n' + managedBlock(root));
    assert.equal(result.installed, false);
    assert.equal(result.backup, null);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].options.env.LC_ALL, 'C');
    assert.equal(fs.existsSync(path.join(root, '.cache')), false);
});

test('installation backs up the original crontab privately before replacing it', t => {
    const root = workspace(t);
    const previous = 'SECRET=private-value\n0 1 * * * /existing\n';
    const runner = crontabRunner(previous);
    const run = (command, args, options) => {
        if (args[0] === '-') {
            const backups = fs.readdirSync(path.join(root, '.cache/blog/cron'));
            assert.equal(backups.length, 1);
            assert.equal(fs.readFileSync(path.join(root, '.cache/blog/cron', backups[0]), 'utf8'), previous);
        }
        return runner.run(command, args, options);
    };
    const result = installBlogCron({ root, run, filesystem: viennaFilesystem() });
    assert.equal(result.installed, true);
    assert.equal(fs.readFileSync(result.backup, 'utf8'), previous);
    if (process.platform !== 'win32') assert.equal(fs.statSync(result.backup).mode & 0o777, 0o600);
    assert.equal(runner.calls.length, 2);
    assert.equal(runner.calls[1].options.input, previous + managedBlock(root));
});

test('installation starts from an explicitly absent crontab without creating a backup', t => {
    const root = workspace(t);
    const { run, calls } = crontabRunner('', { missing: true });
    const result = installBlogCron({ root, run, filesystem: viennaFilesystem() });
    assert.equal(result.installed, true);
    assert.equal(result.backup, null);
    assert.equal(calls[1].options.input, managedBlock(root));
    assert.equal(fs.existsSync(path.join(root, '.cache')), false);
});

test('an unchanged managed block triggers neither a backup nor a replacement', t => {
    const root = workspace(t);
    const { run, calls } = crontabRunner(managedBlock(root));
    const result = installBlogCron({ root, run, filesystem: viennaFilesystem() });
    assert.equal(result.changed, false);
    assert.equal(result.installed, false);
    assert.equal(calls.length, 1);
    assert.equal(fs.existsSync(path.join(root, '.cache')), false);
});

test('read errors and invalid markers cannot replace the crontab', t => {
    const root = workspace(t);
    for (const response of [
        { status: 1, stdout: '', stderr: 'crontab: operation not permitted' },
        { status: 0, stdout: BEGIN_MARKER, stderr: '' },
    ]) {
        const calls = [];
        assert.throws(() => installBlogCron({
            root,
            filesystem: viennaFilesystem(),
            run: (...args) => { calls.push(args); return response; },
        }));
        assert.equal(calls.length, 1);
        assert.equal(fs.existsSync(path.join(root, '.cache')), false);
    }
});

test('a failed crontab replacement leaves the original backup available', t => {
    const root = workspace(t);
    const previous = '0 1 * * * /existing\n';
    const { run } = crontabRunner(previous, { installStatus: 1 });
    assert.throws(() => installBlogCron({ root, run, filesystem: viennaFilesystem() }), /Previous crontab saved at/);
    const directory = path.join(root, '.cache/blog/cron');
    const backups = fs.readdirSync(directory);
    assert.equal(backups.length, 1);
    assert.equal(fs.readFileSync(path.join(directory, backups[0]), 'utf8'), previous);
});

test('requires the actual system timezone and wrapper before reading or changing jobs', t => {
    const root = workspace(t);
    let calls = 0;
    const run = () => { calls++; throw new Error('Must not execute'); };
    for (const realpathSync of [
        () => '/usr/share/zoneinfo/UTC',
        () => { throw new Error('unreadable'); },
    ]) {
        assert.throws(() => installBlogCron({ root, run, filesystem: { ...fs, realpathSync } }), /timezone/);
    }
    fs.unlinkSync(path.join(root, 'scripts/blogposts/run-blog-cron.sh'));
    assert.throws(() => installBlogCron({ root, run, filesystem: viennaFilesystem() }), /Missing/);
    assert.equal(calls, 0);
});

test('accepts dry-run and help arguments and rejects unknown options', () => {
    assert.deepEqual(parseArguments([]), { dryRun: false, help: false });
    assert.deepEqual(parseArguments(['--dry-run']), { dryRun: true, help: false });
    assert.equal(parseArguments(['--help']).help, true);
    assert.equal(parseArguments(['-h']).help, true);
    assert.throws(() => parseArguments(['--remove']), /Unknown argument/);
});
