import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const projectRoot = process.cwd();
const siteDirectory = path.join(projectRoot, '_site');
const requiredClusterPages = [
    'cluster/terminal/index.html',
    'cluster/javascript/index.html',
    'cluster/git/index.html',
];

const validationErrors = [];

for (const relativePath of requiredClusterPages) {
    const absolutePath = path.join(siteDirectory, relativePath);

    if (!existsSync(absolutePath)) {
        validationErrors.push(`${relativePath}: Datei fehlt`);
        continue;
    }

    const html = readFileSync(absolutePath, 'utf8');

    if (!/<!doctype html>/i.test(html)) validationErrors.push(`${relativePath}: Doctype fehlt`);
    if (!/<html(?:\s|>)/i.test(html)) validationErrors.push(`${relativePath}: <html>-Element fehlt`);
    if (!/data-pagefind-body(?:\s|=|>)/i.test(html)) {
        validationErrors.push(`${relativePath}: data-pagefind-body fehlt`);
    }
}

if (validationErrors.length > 0) {
    console.error('[pagefind-qa] Cluster-Seiten sind nicht indexierbar:');
    for (const error of validationErrors) console.error(`- ${error}`);
    process.exit(1);
}

const pagefindExecutable = path.join(
    projectRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'pagefind.cmd' : 'pagefind',
);
const result = spawnSync(pagefindExecutable, ['--site', siteDirectory], {
    cwd: projectRoot,
    encoding: 'utf8',
});

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);

if (result.error) {
    console.error(`[pagefind-qa] Pagefind konnte nicht gestartet werden: ${result.error.message}`);
    process.exit(1);
}

if (result.status !== 0) process.exit(result.status ?? 1);

const pagefindOutput = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
const pagesWithoutHtml = pagefindOutput.match(/\d+\s+pages?\s+found\s+without\s+an\s+<html>\s+element/i);

if (pagesWithoutHtml) {
    console.error(`[pagefind-qa] Nicht vollständige HTML-Seiten gefunden: ${pagesWithoutHtml[0]}`);
    process.exit(1);
}

console.log('[pagefind-qa] OK: Cluster-Seiten sind vollständige HTML-Dokumente und Pagefind meldet keine fehlenden <html>-Elemente.');
