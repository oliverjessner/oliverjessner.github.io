#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DEFAULT_ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const BEGIN_MARKER = '# BEGIN oliverjessner.at blog cron';
export const END_MARKER = '# END oliverjessner.at blog cron';
export const HELP = `Usage:
  npm run blog:cron:install -- --dry-run
  npm run blog:cron:install

Install two jobs in the current user's crontab:
  12:00 daily  npm run blog:feed:random
  17:30 daily  npm run blog:top:random

The system timezone must be Europe/Vienna. Existing unrelated jobs are kept.
Before replacing a crontab, save a private backup in .cache/blog/cron/.

Options:
  --dry-run      Print the planned crontab without changing any files or jobs
  -h, --help     Show this help
`;

export function parseArguments(args) {
    const options = { dryRun: false, help: false };
    for (const argument of args) {
        if (argument === '--dry-run') options.dryRun = true;
        else if (argument === '--help' || argument === '-h') options.help = true;
        else throw new Error(`Unknown argument: ${argument}`);
    }
    return options;
}

export function shellQuote(value) {
    return `'${value.replace(/'/g, "'\\''")}'`;
}

export function managedBlock(root) {
    if (typeof root !== 'string' || !path.isAbsolute(root) || /[\r\n\0%]/.test(root)) {
        throw new Error('The project path must be absolute and cannot contain CR, LF, NUL or %.');
    }
    const wrapper = shellQuote(path.join(root, 'scripts/blogposts/run-blog-cron.sh'));
    return `${BEGIN_MARKER}\n0 12 * * * /bin/sh ${wrapper} feed:random\n30 17 * * * /bin/sh ${wrapper} top:random\n${END_MARKER}\n`;
}

export function plannedCrontab(existing, root) {
    const block = managedBlock(root);
    const lines = existing.split('\n');
    const starts = [];
    const ends = [];
    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        if ((line.includes(BEGIN_MARKER) && line !== BEGIN_MARKER)
            || (line.includes(END_MARKER) && line !== END_MARKER)) {
            throw new Error('The existing crontab has malformed blog cron markers; no changes made.');
        }
        if (line === BEGIN_MARKER) starts.push(index);
        if (line === END_MARKER) ends.push(index);
    }
    if (starts.length === 0 && ends.length === 0) {
        return existing + (existing && !existing.endsWith('\n') ? '\n' : '') + block;
    }
    if (starts.length !== 1 || ends.length !== 1 || starts[0] >= ends[0]) {
        throw new Error('The existing crontab has missing, repeated or reversed blog cron markers; no changes made.');
    }
    const before = lines.slice(0, starts[0]).join('\n');
    const after = lines.slice(ends[0] + 1).join('\n');
    return (starts[0] ? `${before}\n` : '') + block + after;
}

export function readCrontab(run = spawnSync) {
    const result = run('crontab', ['-l'], {
        encoding: 'utf8',
        timeout: 10000,
        env: { ...process.env, LC_ALL: 'C' },
    });
    if (result.error) throw new Error('Could not execute crontab -l; no changes made.');
    if (result.status === 0) return { content: result.stdout ?? '', exists: true };
    if (result.status === 1 && !result.stdout
        && /^(?:crontab:\s*)?no crontab for [^\r\n]+$/i.test((result.stderr ?? '').trim())) {
        return { content: '', exists: false };
    }
    // Crontab may contain credentials in environment assignments: never echo it
    // or arbitrary command output in an error message.
    throw new Error(`Could not read the existing crontab (exit ${result.status ?? 'unknown'}); no changes made.`);
}

export function installBlogCron({
    root = DEFAULT_ROOT,
    dryRun = false,
    run = spawnSync,
    filesystem = fs,
    localtimePath = '/etc/localtime',
} = {}) {
    // Validate the path before checking files or invoking system commands.
    managedBlock(root);
    root = path.resolve(root);
    let timezone;
    try {
        timezone = filesystem.realpathSync(localtimePath);
    } catch {
        throw new Error('Could not verify the system timezone via /etc/localtime; expected Europe/Vienna.');
    }
    if (!timezone.endsWith('/Europe/Vienna')) {
        throw new Error('The system timezone must be Europe/Vienna before installing these cron jobs.');
    }
    const wrapper = path.join(root, 'scripts/blogposts/run-blog-cron.sh');
    if (!filesystem.statSync(wrapper, { throwIfNoEntry: false })?.isFile()) {
        throw new Error('Missing scripts/blogposts/run-blog-cron.sh; no changes made.');
    }
    const previous = readCrontab(run);
    const crontab = plannedCrontab(previous.content, root);
    const changed = crontab !== previous.content;
    if (dryRun || !changed) return { crontab, changed, installed: false, backup: null, dryRun };

    let backup = null;
    if (previous.exists) {
        const directory = path.join(root, '.cache/blog/cron');
        filesystem.mkdirSync(directory, { recursive: true, mode: 0o700 });
        const stamp = new Date().toISOString().replace(/[:.]/g, '-');
        backup = path.join(directory, `crontab-${stamp}-${randomUUID().slice(0, 8)}.txt`);
        filesystem.writeFileSync(backup, previous.content, { flag: 'wx', mode: 0o600 });
    }
    const result = run('crontab', ['-'], { input: crontab, encoding: 'utf8', timeout: 10000 });
    if (result.error || result.status !== 0) {
        throw new Error(`Could not install the blog cron jobs.${backup ? ` Previous crontab saved at ${backup}.` : ''}`);
    }
    return { crontab, changed: true, installed: true, backup, dryRun: false };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const options = parseArguments(process.argv.slice(2));
        if (options.help) process.stdout.write(HELP);
        else {
            const result = installBlogCron(options);
            if (result.dryRun) process.stdout.write(result.crontab);
            else {
                console.log(result.installed
                    ? 'Installed daily blog jobs at 12:00 and 17:30 (Europe/Vienna).'
                    : 'Blog cron jobs are already up to date.');
                if (result.backup) console.log(`Previous crontab backed up at ${result.backup}`);
            }
        }
    } catch (error) {
        console.error(`Could not configure blog cron: ${error.message}`);
        process.exitCode = 1;
    }
}
