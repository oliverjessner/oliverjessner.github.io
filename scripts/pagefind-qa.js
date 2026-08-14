import { spawnSync } from 'node:child_process';
import path from 'node:path';

const projectRoot = process.cwd();
const siteDirectory = path.join(projectRoot, '_site');

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

console.log('[pagefind-qa] OK: Pagefind meldet keine fehlenden <html>-Elemente.');
