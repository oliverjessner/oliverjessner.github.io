import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import yaml from 'js-yaml';

const execFileAsync = promisify(execFile);
const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const options = new Set(process.argv.slice(2));
const projects = [
    { id: 13, slug: 'bulkpixel', repo: 'BulkPixel' },
    { id: 14, slug: 'pinefetch', repo: 'PineFetch', asset: 'PineFetch' },
    { id: 15, slug: 'nobullshitrss', repo: 'NO-BULLSHIT-RSS' },
    { id: 16, slug: 'billly', repo: 'Billly-Release', asset: 'Billly' },
    { id: 17, slug: 'sqlite_hub', repo: 'sqlite-hub' },
];

async function runFetchary(args) {
    try {
        const { stdout } = await execFileAsync('fetchary', [...args, '--json'], {
            cwd: repoRoot,
            timeout: 180_000,
            maxBuffer: 4 * 1024 * 1024,
        });
        return JSON.parse(stdout);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('Fetchary fehlt im PATH. Bitte zuerst die Fetchary CLI installieren.');
        }
        throw new Error(`fetchary ${args.join(' ')} fehlgeschlagen: ${error.stderr?.trim() || error.message}`);
    }
}

function setField(block, key, value) {
    const line = new RegExp(`^    ${key}:[^\\r\\n]*`, 'm');
    const replacement = `    ${key}: '${value}'`;
    return line.test(block) ? block.replace(line, replacement) : `${block}${block.endsWith('\n') ? '' : '\n'}${replacement}\n`;
}

function updatePage(source, project, version) {
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
    if (!frontmatter) throw new Error(`${project.slug}: YAML-Frontmatter fehlt.`);

    const data = yaml.load(frontmatter[1]);
    const app = data.software_application;
    if (!app?.software_version) throw new Error(`${project.slug}: software_application.software_version fehlt.`);

    const releaseBase = `https://github.com/oliverjessner/${project.repo}/releases`;
    const releaseUrl = `${releaseBase}/tag/v${version}`;
    let updated = frontmatter[1].replace(
        /(^software_application:\n)((?:[ \t].*(?:\n|$)|\n)*)/m,
        (_, heading, block) => {
            block = setField(block, 'software_version', version);
            block = setField(block, 'release_url', releaseUrl);
            if (project.asset) {
                const downloadUrl = `${releaseBase}/download/v${version}/${project.asset}_${version}_aarch64_adhoc.dmg`;
                block = setField(block, 'download_url', downloadUrl);
            } else if (app.download_url?.startsWith(releaseBase)) {
                block = setField(block, 'download_url', releaseUrl);
            }
            return `${heading}${block}`;
        },
    );

    if (project.slug === 'sqlite_hub') {
        updated = updated.replace(/^    release_href:[^\n]*/m, `    release_href: '${releaseUrl}'`);
    }
    if (project.slug === 'billly') {
        updated = updated.replace(/^meta_(?:title|description):[^\n]*/gm, line =>
            line.replaceAll(`v${app.software_version}`, `v${version}`),
        );
    }
    if (project.slug === 'nobullshitrss') {
        updated = updated.replace(`Version ${app.software_version} provides downloads`, `Version ${version} provides downloads`);
    }

    // Validate before writing, while preserving the existing YAML formatting.
    const updatedData = yaml.load(updated);
    if (updatedData.software_application.software_version !== version || updatedData.software_application.release_url !== releaseUrl) {
        throw new Error(`${project.slug}: Release-Daten konnten nicht aktualisiert werden.`);
    }
    return source.replace(frontmatter[1], () => updated);
}

async function main() {
    for (const option of options) {
        if (!['--dry-run', '--skip-fetch'].includes(option)) throw new Error(`Unbekannte Option: ${option}`);
    }

    if (!options.has('--skip-fetch')) {
        console.log('Aktualisiere Fetchary-Quellen 13–17 …');
        const results = await runFetchary(['fetch', ...projects.map(project => String(project.id))]);
        for (const project of projects) {
            const result = Array.isArray(results) && results.find(item => item.sourceId === project.id);
            if (!result || result.error || !Number.isInteger(result.status) || result.status < 200 || result.status >= 300) {
                throw new Error(`Fetchary-Quelle ${project.id} (${project.repo}) konnte nicht aktualisiert werden.`);
            }
        }
    }

    const updates = [];
    for (const project of projects) {
        const selection = await runFetchary(['open', String(project.id), '--show-include-selector']);
        const version = selection.content?.trim().replace(/^v/, '');
        if (selection.sourceId !== project.id || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?(?:\+[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(version || '')) {
            throw new Error(`Fetchary-Quelle ${project.id}: ungueltige Release-Version ${JSON.stringify(selection.content)}.`);
        }

        const file = path.join(repoRoot, 'pages', 'side_projects', `${project.slug}.md`);
        const source = await fs.readFile(file, 'utf8');
        const content = updatePage(source, project, version);
        updates.push({ file, content, changed: content !== source });
        console.log(`${project.repo}: v${version}${content === source ? ' (unveraendert)' : ''}`);
    }

    // Fetch and validate every project before changing any page.
    const changed = updates.filter(update => update.changed);
    if (options.has('--dry-run')) {
        console.log(`Dry Run: ${changed.length} Seiten wuerden aktualisiert. Keine Dateien geaendert.`);
        return;
    }
    for (const update of changed) await fs.writeFile(update.file, update.content, 'utf8');
    console.log(`${changed.length} Seiten aktualisiert.`);
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
