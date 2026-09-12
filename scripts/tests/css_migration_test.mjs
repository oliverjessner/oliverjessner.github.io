import fs from 'node:fs';
import postcss from 'postcss';

const [beforePath, afterPath] = process.argv.slice(2);
if (!beforePath || !afterPath) {
    throw new Error('Usage: node scripts/tests/css_migration_test.mjs <sass-css> <native-css>');
}

const replacements = new Map([
    ['var(--font-heading)', 'Lato, -apple-system, serif'],
    ['var(--font-base)', 'Comfortaa, -apple-system, "Helvetica Neue", Arial, sans-serif'],
    ['var(--font-monospace)', 'Fira Mono, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace'],
    ['var(--font-logo)', 'Comfortaa, -apple-system, "Helvetica Neue", Arial, sans-serif'],
    ['var(--color-primary)', '#FF4A4A'],
    ['var(--border-radius)', '0.375rem'],
    ['var(--card-border-radius)', '0px'],
    ['var(--card-padding)', '20px'],
    ['var(--font-size-paragraph-large)', '18px'],
]);

function normalizeValue(value) {
    let result = value;
    for (const [token, concrete] of replacements) result = result.replaceAll(token, concrete);
    return result.replaceAll("'Fira Mono'", 'Fira Mono').replaceAll(' 0px', ' 0');
}

function isPaletteRule(node) {
    if (node.type !== 'rule' || ![':root', "html[data-mode='dark']"].includes(node.selector)) return false;
    return node.nodes?.some((child) => child.type === 'decl' && child.prop === '--color-primary');
}

function records(path) {
    const root = postcss.parse(fs.readFileSync(path, 'utf8'), { from: path });
    const result = [];
    function visit(node, context = []) {
        if (node.type === 'comment' || (node.type === 'atrule' && node.name === 'charset') || isPaletteRule(node)) return;
        if (node.type === 'decl') {
            result.push([...context, `${node.prop}:${normalizeValue(node.value)}${node.important ? '!important' : ''}`].join('|'));
            return;
        }
        if (node.type === 'rule') {
            const next = [...context, `rule:${node.selector}`];
            node.nodes?.forEach((child) => visit(child, next));
            return;
        }
        if (node.type === 'atrule') {
            const next = [...context, `@${node.name} ${node.params}`.trim()];
            if (node.nodes) node.nodes.forEach((child) => visit(child, next));
            else result.push(next.join('|'));
            return;
        }
        node.nodes?.forEach((child) => visit(child, context));
    }
    root.nodes.forEach((node) => visit(node));
    return result;
}

const before = records(beforePath);
const after = records(afterPath);
for (let index = 0; index < Math.min(before.length, after.length); index += 1) {
    if (before[index] !== after[index]) {
        throw new Error(`CSS differs at declaration ${index + 1}:\nSass:   ${before[index]}\nNative: ${after[index]}`);
    }
}
if (before.length !== after.length) {
    throw new Error(`Declaration count differs: Sass ${before.length}, native CSS ${after.length}`);
}

console.log(`OK: ${after.length} ordered CSS declarations match the Sass baseline.`);
