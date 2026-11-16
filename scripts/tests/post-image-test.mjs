import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Liquid } from 'liquidjs';
import { parseDocument, DomUtils } from 'htmlparser2';
import sharp from 'sharp';
import { configureCompatibility, minifyHtml } from '../../plugins/eleventy-compat.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const liquid = new Liquid({ jsTruthy: true });
configureCompatibility({ amendLibrary() {}, addFilter: (name, filter) => liquid.registerFilter(name, filter) });
const layout = fs.readFileSync(path.join(root, '_layouts/post.html'), 'utf8').replace(/^---[\s\S]*?\n---\s*\n/, '');
const setup = layout.slice(0, layout.indexOf('<script type="application/ld+json">'));
const section = layout.match(/{% if page.image %}\s*<div class="post-image">[\s\S]*?<\/div>\s*{% endif %}/)?.[0];
assert.ok(setup && section, 'Exercise the actual post image setup and Hero section');

function renderHero(image, extra = {}) {
    const html = liquid.parseAndRenderSync(setup + section, {
        site: { url: 'https://oliverjessner.at', data: { blog: { authors: {} } } },
        page: { title: 'Image test', url: '/blog/image-test/', date: new Date('2026-01-01T00:00:00Z'), image, ...extra },
        content: '<p>Image test article</p>',
    });
    const document = parseDocument(minifyHtml(html));
    return DomUtils.findAll(node => node.type === 'tag' && node.name === 'img', document.children);
}

const articles = [
    '2025-12-31-git-letzten-commit-rueckgaengig-machen.md',
    '2026-05-17-wie-funktioniert-gitignore.md.md',
    '2026-01-23-browser-aus-europa-alternativen-zwischen-privacy-nachhaltigkeit-und-power-user-features.md',
    '2026-07-09-gpt-56-sol-terra-und-luna-was-ist-der-unterschied.md',
    '2026-08-03-gen1recomp-auf-deutsch-spielen-so-funktioniert-die-mod.md',
    '2025-12-28-caffeine-mac-deutsch-tutorial.md',
    '2026-07-13-gpt-5-6-sol-vs-sol-pro-medium-high-extra-high-und-pro-erklaert.md',
];
for (const article of articles) {
    const source = fs.readFileSync(path.join(root, 'collections/_posts', article), 'utf8');
    const image = source.match(/^image:\s*['"]([^'"]+)['"]/m)?.[1];
    assert.ok(image, `${article} must retain its Hero image`);
    const metadata = await sharp(path.join(root, image.replace(/^\/+/, ''))).metadata();
    // Deliberately wrong declarations must never distort the reserved aspect ratio.
    const [hero] = renderHero(image, { image_width: 1, image_height: 1 });
    assert.equal(hero.attribs.src, image);
    assert.equal(Number(hero.attribs.width), metadata.width, `${article}: reserve the real file width`);
    assert.equal(Number(hero.attribs.height), metadata.height, `${article}: reserve the real file height`);
    assert.equal(hero.attribs.loading, 'eager');
    assert.equal(hero.attribs.fetchpriority, 'high');
    assert.equal(hero.attribs['data-responsive-image'], 'article');
}

for (const image of ['https://example.invalid/unknown.webp', '/assets/images/missing-image.webp']) {
    const [hero] = renderHero(image, { image_width: 1, image_height: 1 });
    assert.equal(hero.attribs.src, image);
    assert.equal(hero.attribs.width, undefined, 'Unknown dimensions must not be invented from declarations');
    assert.equal(hero.attribs.height, undefined);
}
assert.equal(renderHero(undefined).length, 0, 'Posts without a Hero must not gain a fallback image');

console.log(`[post-image-test] PASS: ${articles.length} actual Hero files match sharp dimensions through the real Liquid layout; wrong declarations, unknown/external images, no-image posts and loading priorities covered.`);
