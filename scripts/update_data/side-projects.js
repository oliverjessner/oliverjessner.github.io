import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractSelector } from 'fetchary';
import yaml from 'js-yaml';

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
export const projects = [
    { slug: 'bulkpixel', repo: 'BulkPixel' },
    { slug: 'pinefetch', repo: 'PineFetch', asset: 'PineFetch_{version}_aarch64_adhoc.dmg' },
    { slug: 'nobullshitrss', repo: 'NO-BULLSHIT-RSS' },
    { slug: 'sqlite_hub', repo: 'sqlite-hub' },
    { slug: 'pitchary', repo: 'pitchary', asset: 'Pitchary_{version}_aarch64.dmg' },
];

async function releaseVersion(project, extract) {
    const url = `https://github.com/oliverjessner/${project.repo}/releases/latest`;
    let selection;
    try {
        selection = await extract(url, {
            selector: '.breadcrumb-item-selected a',
            all: true,
            format: 'text',
            mode: 'http',
            cacheTtlMs: 0,
            timeout: 180_000,
            maxResponseBytes: 4 * 1024 * 1024,
        });
    } catch (error) {
        throw new Error(`${project.repo}: Release-Abruf mit Fetchary fehlgeschlagen: ${error.message}`, { cause: error });
    }

    const values = selection?.data?.values;
    const version = typeof values?.[0] === 'string' ? values[0].trim().replace(/^v/, '') : '';
    if (
        !Number.isInteger(selection?.status) || selection.status < 200 || selection.status >= 300 ||
        selection.data?.matched !== true || !Array.isArray(values) || values.length !== 1 ||
        !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?(?:\+[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(version)
    ) {
        throw new Error(`${project.repo}: ungueltige oder nicht eindeutige Release-Version ${JSON.stringify(values)}.`);
    }
    return version;
}

function setField(block, key, value) {
    const line = new RegExp(`^    ${key}:[^\\r\\n]*`, 'm');
    const replacement = `    ${key}: '${value}'`;
    return line.test(block)
        ? block.replace(line, replacement)
        : `${block}${block.endsWith('\n') ? '' : '\n'}${replacement}\n`;
}

export function updatePage(source, project, version) {
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
                const downloadUrl = `${releaseBase}/download/v${version}/${project.asset.replace('{version}', version)}`;
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
    // Validate before writing, while preserving the existing YAML formatting.
    const updatedData = yaml.load(updated);
    if (
        updatedData.software_application.software_version !== version ||
        updatedData.software_application.release_url !== releaseUrl
    ) {
        throw new Error(`${project.slug}: Release-Daten konnten nicht aktualisiert werden.`);
    }
    return source.replace(frontmatter[1], () => updated);
}

export async function updateProjects({ args = [], root = repoRoot, extract = extractSelector, log = console.log } = {}) {
    const options = new Set(args);
    for (const option of options) {
        if (option === '--skip-fetch') {
            throw new Error('--skip-fetch entfaellt: Die Fetchary-Library liest Releases direkt von GitHub. Zum Pruefen ohne Seitenaenderungen --dry-run verwenden.');
        }
        if (option !== '--dry-run') throw new Error(`Unbekannte Option: ${option}`);
    }

    log('Lese aktuelle GitHub-Releases mit Fetchary …');
    const updates = [];
    for (const project of projects) {
        const version = await releaseVersion(project, extract);

        const file = path.join(root, 'pages', 'side_projects', `${project.slug}.md`);
        const source = await fs.readFile(file, 'utf8');
        const content = updatePage(source, project, version);
        updates.push({ file, content, changed: content !== source });
        log(`${project.repo}: v${version}${content === source ? ' (unveraendert)' : ''}`);
    }

    // Fetch and validate every project before changing any page.
    const changed = updates.filter(update => update.changed);
    if (options.has('--dry-run')) {
        log(`Dry Run: ${changed.length} Seiten wuerden aktualisiert. Keine Dateien geaendert.`);
        return;
    }
    for (const update of changed) await fs.writeFile(update.file, update.content, 'utf8');
    log(`${changed.length} Seiten aktualisiert.`);
}

if (process.argv[1] && await fs.realpath(process.argv[1]).catch(() => null) === fileURLToPath(import.meta.url)) {
    updateProjects({ args: process.argv.slice(2) }).catch(error => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
