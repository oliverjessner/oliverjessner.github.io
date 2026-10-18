import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, statSync, utimesSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractSelector } from 'fetchary';
import yaml from 'js-yaml';
import { projects, updatePage, updateProjects } from '../update_data/side-projects.js';

const root = fileURLToPath(new URL('../../', import.meta.url));
const sourceFor = project => readFileSync(path.join(root, 'pages/side_projects', `${project.slug}.md`), 'utf8');
const dataFor = source => yaml.load(source.match(/^---\n([\s\S]*?)\n---/)[1]);
const pitchary = projects.find(project => project.slug === 'pitchary');
assert.equal(pitchary.repo, 'pitchary');
assert.deepEqual(projects.map(project => project.repo), ['BulkPixel', 'PineFetch', 'NO-BULLSHIT-RSS', 'sqlite-hub', 'pitchary']);

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

// Exercise the updater with the real Fetchary selector API and fixture HTTP responses.
const fixtureRoot = mkdtempSync(path.join(os.tmpdir(), 'side-projects-test-'));
try {
    mkdirSync(path.join(fixtureRoot, 'pages/side_projects'), { recursive: true });
    const cli = path.join(root, 'scripts/update_data/side-projects.js');
    const fileFor = project => path.join(fixtureRoot, 'pages/side_projects', `${project.slug}.md`);
    const htmlFor = version => `<html><body><span class="breadcrumb-item-selected"><a>${version}</a></span></body></html>`;
    const calls = [];
    const fixtureExtractor = ({ lastHtml = htmlFor('v1.2.3'), lastStatus = 200 } = {}) => async (url, options) => {
        calls.push({ url, options });
        return extractSelector(url, {
            ...options,
            lookup: async () => [{ address: '93.184.216.34', family: 4 }],
            fetch: async () => new Response(url.includes('/pitchary/') ? lastHtml : htmlFor('v1.2.3'), {
                status: url.includes('/pitchary/') ? lastStatus : 200,
                headers: { 'content-type': 'text/html' },
            }),
        });
    };
    const logs = [];
    const run = (args = [], extract = fixtureExtractor()) => updateProjects({ args, root: fixtureRoot, extract, log: line => logs.push(line) });
    const reset = () => {
        for (const project of projects) writeFileSync(fileFor(project), sourceFor(project));
        calls.length = 0;
        logs.length = 0;
    };
    const assertUnchanged = () => {
        for (const project of projects) assert.equal(readFileSync(fileFor(project), 'utf8'), sourceFor(project));
    };
    reset();
    await run(['--dry-run']);
    assert.match(logs.join('\n'), /Dry Run: 5 Seiten/);
    assert.deepEqual(calls.map(call => call.url), projects.map(project => `https://github.com/oliverjessner/${project.repo}/releases/latest`));
    for (const { options } of calls) {
        assert.equal(options.mode, 'http');
        assert.equal(options.all, true);
        assert.equal(options.cacheTtlMs, 0);
    }
    assertUnchanged();

    for (const lastHtml of [htmlFor(''), htmlFor('vnot-a-version'), '<html><body>No release tag</body></html>', htmlFor('v1.2.3') + htmlFor('v1.2.4')]) {
        reset();
        await assert.rejects(run([], fixtureExtractor({ lastHtml })), /pitchary: ungueltige oder nicht eindeutige Release-Version/);
        assertUnchanged();
    }
    reset();
    await assert.rejects(run([], fixtureExtractor({ lastStatus: 503 })), /pitchary: Release-Abruf mit Fetchary fehlgeschlagen/);
    assertUnchanged();

    reset();
    for (const option of ['--unknown', '--skip-fetch']) {
        await assert.rejects(run([option]), option === '--skip-fetch' ? /--skip-fetch entfaellt/ : /Unbekannte Option/);
        assert.equal(calls.length, 0, 'Invalid options must fail before network requests');
    }
    assertUnchanged();
    assert.throws(() => execFileSync(process.execPath, [cli, '--unknown'], { env: { ...process.env, PATH: '' }, stdio: 'pipe' }), error => {
        assert.match(error.stderr.toString(), /Unbekannte Option/);
        return error.status === 1;
    });

    await run();
    assert.match(logs.join('\n'), /5 Seiten aktualisiert/);
    for (const project of projects) {
        const updated = readFileSync(fileFor(project), 'utf8');
        assert.equal(updated, updatePage(sourceFor(project), project, '1.2.3'));
        utimesSync(fileFor(project), new Date(0), new Date(0));
    }
    logs.length = 0;
    await run();
    assert.match(logs.join('\n'), /0 Seiten aktualisiert/);
    for (const project of projects) assert.equal(statSync(fileFor(project)).mtimeMs, 0, 'Unchanged pages must not be rewritten');

    reset();
    await run([], fixtureExtractor({ lastHtml: htmlFor(' v2.0.0-rc.1+build.5 ') }));
    assert.equal(dataFor(readFileSync(fileFor(pitchary), 'utf8')).software_application.software_version, '2.0.0-rc.1+build.5');
} finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
}
console.log('Side-project release updates: real Fetchary library extraction, correct assets, dry run, rejected empty/ambiguous tags and HTTP failures before writes, options and idempotency passed.');
