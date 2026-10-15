import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, symlinkSync, chmodSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import { projects, updatePage } from '../update_data/side-projects.js';

const root = fileURLToPath(new URL('../../', import.meta.url));
const sourceFor = project => readFileSync(path.join(root, 'pages/side_projects', `${project.slug}.md`), 'utf8');
const dataFor = source => yaml.load(source.match(/^---\n([\s\S]*?)\n---/)[1]);
const pitchary = projects.find(project => project.slug === 'pitchary');
assert.equal(pitchary.id, 19);
assert.equal(pitchary.repo, 'pitchary');
assert.deepEqual(projects.map(project => project.id), [13, 14, 15, 17, 19]);

for (const project of projects) {
    const source = sourceFor(project);
    const original = dataFor(source);
    const updated = updatePage(source, project, '1.2.3');
    const data = dataFor(updated);
    const releaseBase = `https://github.com/oliverjessner/${project.repo}/releases`;
    assert.equal(data.software_application.software_version, '1.2.3');
    assert.equal(data.software_application.release_url, `${releaseBase}/tag/v1.2.3`);
    if (project.slug === 'pitchary') {
        assert.equal(data.software_application.download_url, `${releaseBase}/download/v1.2.3/Pitchary_1.2.3_aarch64.dmg`);
        assert.equal(data.software_application.homebrew_command, original.software_application.homebrew_command);
        assert.equal(data.meta_title, original.meta_title);
    } else if (project.slug === 'pinefetch') {
        assert.equal(data.software_application.download_url, `${releaseBase}/download/v1.2.3/PineFetch_1.2.3_aarch64_adhoc.dmg`);
    } else if (project.slug === 'sqlite_hub') {
        assert.equal(data.software_application.download_url, original.software_application.download_url);
        assert.equal(data.install.release_href, `${releaseBase}/tag/v1.2.3`);
    } else if (original.software_application.download_url?.startsWith(releaseBase)) {
        assert.equal(data.software_application.download_url, `${releaseBase}/tag/v1.2.3`);
    }
    assert.equal(updatePage(updated, project, '1.2.3'), updated, `${project.slug}: idempotent update`);
}
assert.throws(() => updatePage('no frontmatter', pitchary, '1.2.3'), /Frontmatter fehlt/);
assert.throws(() => updatePage('---\ntitle: Missing app\n---\n', pitchary, '1.2.3'), /software_version fehlt/);

// Exercise the real CLI against an isolated checkout and a controlled Fetchary executable.
const fixtureRoot = mkdtempSync(path.join(os.tmpdir(), 'side-projects-test-'));
try {
    mkdirSync(path.join(fixtureRoot, 'scripts/update_data'), { recursive: true });
    mkdirSync(path.join(fixtureRoot, 'pages/side_projects'), { recursive: true });
    mkdirSync(path.join(fixtureRoot, 'bin'));
    writeFileSync(path.join(fixtureRoot, 'package.json'), '{"type":"module"}');
    symlinkSync(path.join(root, 'node_modules'), path.join(fixtureRoot, 'node_modules'), 'dir');
    copyFileSync(path.join(root, 'scripts/update_data/side-projects.js'), path.join(fixtureRoot, 'scripts/update_data/side-projects.js'));
    const cli = path.join(fixtureRoot, 'scripts/update_data/side-projects.js');
    const bin = path.join(fixtureRoot, 'bin/fetchary');
    writeFileSync(bin, `#!${process.execPath}
const args = process.argv.slice(2);
if (args[0] === 'fetch') {
    console.log(JSON.stringify(args.slice(1, -1).map(id => ({sourceId: Number(id), status: 200}))));
    process.exitCode = 10;
} else if (args[0] === 'open') {
    const sourceId = Number(args[1]);
    const invalid = sourceId === 19 && process.env.FETCHARY_TEST_INVALID;
    console.log(JSON.stringify({sourceId, content: invalid ? '' : 'v1.2.3'}));
} else { process.exit(2); }
`);
    chmodSync(bin, 0o755);
    const env = { ...process.env, PATH: `${path.join(fixtureRoot, 'bin')}${path.delimiter}${process.env.PATH}` };
    const reset = () => {
        for (const project of projects) writeFileSync(path.join(fixtureRoot, 'pages/side_projects', `${project.slug}.md`), sourceFor(project));
    };
    const assertUnchanged = () => {
        for (const project of projects) assert.equal(readFileSync(path.join(fixtureRoot, 'pages/side_projects', `${project.slug}.md`), 'utf8'), sourceFor(project));
    };
    reset();
    const dryRun = execFileSync(process.execPath, [cli, '--dry-run', '--skip-fetch'], { env, encoding: 'utf8' });
    assert.match(dryRun, /Dry Run: 5 Seiten/);
    assertUnchanged();
    assert.throws(() => execFileSync(process.execPath, [cli], { env: { ...env, FETCHARY_TEST_INVALID: '1' }, stdio: 'pipe' }), error => {
        assert.match(error.stderr.toString(), /Fetchary-Quelle 19: ungueltige Release-Version/);
        return error.status === 1;
    });
    assertUnchanged();
    assert.throws(() => execFileSync(process.execPath, [cli, '--unknown'], { env, stdio: 'pipe' }), error => error.status === 1);
    assertUnchanged();
    const output = execFileSync(process.execPath, [cli], { env, encoding: 'utf8' });
    assert.match(output, /13, 14, 15, 17, 19/);
    assert.match(output, /5 Seiten aktualisiert/);
    for (const project of projects) assert.equal(dataFor(readFileSync(path.join(fixtureRoot, 'pages/side_projects', `${project.slug}.md`), 'utf8')).software_application.software_version, '1.2.3');
    const repeated = execFileSync(process.execPath, [cli, '--skip-fetch'], { env, encoding: 'utf8' });
    assert.match(repeated, /0 Seiten aktualisiert/);
} finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
}
console.log('Side-project release updates: correct assets, preserved links, dry run, failure before writes and idempotency passed.');
