import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import yaml from 'js-yaml';

const execFileAsync = promisify(execFile);
const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const options = new Set(process.argv.slice(2));
export const projects = [
    { id: 13, slug: 'bulkpixel', repo: 'BulkPixel' },
    { id: 14, slug: 'pinefetch', repo: 'PineFetch', asset: 'PineFetch_{version}_aarch64_adhoc.dmg' },
    { id: 15, slug: 'nobullshitrss', repo: 'NO-BULLSHIT-RSS' },
    { id: 17, slug: 'sqlite_hub', repo: 'sqlite-hub' },
    { id: 19, slug: 'pitchary', repo: 'pitchary', asset: 'Pitchary_{version}_aarch64.dmg' },
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
        // Fetchary reports a successful capture with content changes as exit 10.
        if (args[0] === 'fetch' && error.code === 10 && error.stdout) {
            return JSON.parse(error.stdout);
        }
        if (error.code === 'ENOENT') {
            throw new Error('Fetchary fehlt im PATH. Bitte zuerst die Fetchary CLI installieren.');
        }
        throw new Error(`fetchary ${args.join(' ')} fehlgeschlagen: ${error.stderr?.trim() || error.message}`);
    }
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

async function main() {
    for (const option of options) {
        if (!['--dry-run', '--skip-fetch'].includes(option)) throw new Error(`Unbekannte Option: ${option}`);
    }

    if (!options.has('--skip-fetch')) {
        console.log(`Aktualisiere Fetchary-Quellen ${projects.map(project => project.id).join(', ')} …`);
        const results = await runFetchary(['fetch', ...projects.map(project => String(project.id))]);
        for (const project of projects) {
            const result = Array.isArray(results) && results.find(item => item.sourceId === project.id);
            if (
                !result ||
                result.error ||
                !Number.isInteger(result.status) ||
                result.status < 200 ||
                result.status >= 300
            ) {
                throw new Error(`Fetchary-Quelle ${project.id} (${project.repo}) konnte nicht aktualisiert werden.`);
            }
        }
    }

    const updates = [];
    for (const project of projects) {
        const selection = await runFetchary(['open', String(project.id), '--show-include-selector']);
        const version = selection.content?.trim().replace(/^v/, '');
        if (
            selection.sourceId !== project.id ||
            !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?(?:\+[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(
                version || '',
            )
        ) {
            throw new Error(
                `Fetchary-Quelle ${project.id}: ungueltige Release-Version ${JSON.stringify(selection.content)}.`,
            );
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

if (process.argv[1] && await fs.realpath(process.argv[1]).catch(() => null) === fileURLToPath(import.meta.url)) {
    main().catch(error => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
