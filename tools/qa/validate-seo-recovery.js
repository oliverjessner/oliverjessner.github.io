import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import sharp from 'sharp';
import { Parser } from 'htmlparser2';

const root = path.resolve(process.argv[2] || '_site');
const origin = 'https://oliverjessner.at';
const baseline = JSON.parse(fs.readFileSync('scripts/tests/fixtures/seo-recovery-baseline.json', 'utf8'));
// Use an exact inventory: macOS existsSync alone can hide case-sensitive broken links.
const files = new Set();
function walk(directory, prefix = '') {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) walk(path.join(directory, entry.name), `${name}/`);
    else files.add(`/${name}`);
  }
}
walk(root);
const redirects = new Map();
for (const line of fs.readFileSync(path.join(root, '_redirects'), 'utf8').split('\n')) {
  const [from, to] = line.trim().split(/\s+/);
  if (!from || from.startsWith('#') || !to) continue;
  const source = new URL(from, origin), target = new URL(to, origin);
  if (source.origin === origin) redirects.set(decodeURIComponent(source.pathname), target.href);
}
function resolveLocal(url, seen = new Set()) {
  if (url.origin !== origin) return null;
  const pathname = decodeURIComponent(url.pathname);
  if (redirects.has(pathname)) {
    assert.ok(!seen.has(pathname), `Redirect loop: ${pathname}`);
    seen.add(pathname);
    const redirected = new URL(redirects.get(pathname));
    if (!redirected.hash) redirected.hash = url.hash;
    return resolveLocal(redirected, seen);
  }
  const candidate = [pathname, `${pathname}.html`, `${pathname.replace(/\/$/, '')}/index.html`].find(name => files.has(name));
  assert.ok(candidate, `Missing exact local target: ${url.href}`);
  if (candidate.endsWith('.html') && url.hash) {
    assert.ok(document(candidate).ids.includes(decodeURIComponent(url.hash.slice(1))), `Missing anchor: ${url.href}`);
  }
  return candidate;
}
const cache = new Map();
function document(file) {
  if (cache.has(file)) return cache.get(file);
  const doc = { titles: [], meta: {}, canonical: [], ids: [], links: [], schemas: [], images: [], headings: [] };
  let title = false, json = null;
  const parser = new Parser({
    onopentag(name, attrs) {
      if (name === 'title') { title = true; doc.titles.push(''); }
      if (attrs.id) doc.ids.push(attrs.id);
      if (/^h[1-6]$/.test(name) && attrs.id) doc.headings.push(attrs.id);
      if (name === 'a' && attrs.href) doc.links.push(attrs.href);
      if (name === 'img') doc.images.push(attrs);
      if (name === 'meta') (doc.meta[attrs.name || attrs.property] ||= []).push(attrs.content);
      if (name === 'link' && attrs.rel === 'canonical') doc.canonical.push(attrs.href);
      if (name === 'script' && attrs.type === 'application/ld+json') json = '';
    },
    ontext(value) {
      if (title) doc.titles[doc.titles.length - 1] += value;
      if (json !== null) json += value;
    },
    onclosetag(name) {
      if (name === 'title') title = false;
      if (name === 'script' && json !== null) { doc.schemas.push(JSON.parse(json)); json = null; }
    },
  });
  parser.end(fs.readFileSync(path.join(root, file), 'utf8'));
  cache.set(file, doc);
  return doc;
}
function sourceData(file) {
  const match = fs.readFileSync(file, 'utf8').match(/^---\s*\n([\s\S]*?)\n---/);
  return yaml.load(match[1]);
}
function metadata(url, expectedTitle, expectedDescription, canonical = url, noindex = false) {
  const doc = document(resolveLocal(new URL(url, origin)));
  assert.deepEqual(doc.titles, [expectedTitle], `${url}: title`);
  for (const name of ['description', 'og:description', 'twitter:description']) {
    assert.deepEqual(doc.meta[name], [expectedDescription], `${url}: ${name}`);
  }
  for (const name of ['og:title', 'twitter:title']) assert.deepEqual(doc.meta[name], [expectedTitle], `${url}: ${name}`);
  assert.deepEqual(doc.canonical, [new URL(canonical, origin).href], `${url}: canonical`);
  assert.ok(!new URL(doc.canonical[0]).hash, `${url}: fragment canonical`);
  assert.equal(doc.meta.robots.length, 1);
  assert.equal(/\b(?:noindex|none)\b/i.test(doc.meta.robots[0]), noindex, `${url}: robots`);
  return doc;
}

let references = 0;
for (const entry of baseline) {
  const data = sourceData(entry.source);
  const doc = metadata(entry.url, data.meta_title || data.title, data.meta_description || data.description);
  if (entry.protectedTitle) {
    assert.deepEqual(doc.titles, [entry.protectedTitle]);
    assert.deepEqual(doc.meta.description, [entry.protectedDescription]);
  }
  for (const id of entry.anchors) assert.ok(doc.ids.includes(id), `${entry.url}: lost anchor ${id}`);
  for (const id of doc.headings) assert.equal(doc.ids.filter(value => value === id).length, 1, `${entry.url}: ambiguous heading ${id}`);
  const post = doc.schemas.find(schema => schema['@type'] === 'BlogPosting');
  assert.ok(post, `${entry.url}: BlogPosting`);
  assert.equal(post.headline, data.title);
  assert.equal(post.url, doc.canonical[0]);
  assert.equal(post.mainEntityOfPage['@id'], doc.canonical[0]);
  for (const key of ['datePublished', 'dateModified']) {
    assert.ok(Number.isFinite(Date.parse(post[key])), `${entry.url}: valid ${key}`);
    // Netlify may serialize the same instant with a different timezone offset.
    assert.equal(Date.parse(post[key]), Date.parse(entry[key]), `${entry.url}: ${key}`);
  }
  const image = doc.images.find(image => image.src === data.image);
  const actual = await sharp(data.image.replace(/^\//, '')).metadata();
  assert.equal(Number(image?.width), actual.width, `${entry.url}: intrinsic image width`);
  assert.equal(Number(image?.height), actual.height, `${entry.url}: intrinsic image height`);
  assert.equal(post.image.width, actual.width, `${entry.url}: schema image width`);
  assert.equal(post.image.height, actual.height, `${entry.url}: schema image height`);
  for (const href of doc.links) {
    const target = new URL(href, `${origin}${entry.url}`);
    if (target.origin !== origin) continue;
    references++;
    resolveLocal(target);
  }
}

// Different layouts, intentional exclusions/overrides, and real quote regressions.
for (const [url, source, noindex, canonical] of [
  ['/', 'pages/home.md'], ['/blog/', 'blog/index.html'],
  ['/product-lab/', 'pages/product-lab.md'], ['/pinefetch/', 'pages/side_projects/pinefetch.md'],
  ['/impressum/', 'pages/impressum.md', true], ['/search/', 'pages/search.md', true],
  ['/linkhub.html', 'pages/linkhub.md', false, '/linkhub'],
  ['/blog/2026-10-06-elon-musk-doku-musk-was-seine-ex-partnerinnen-ueber-ihn-erzaehlen/', 'collections/_posts/2026-10-06-elon-musk-doku-musk-was-seine-ex-partnerinnen-ueber-ihn-erzaehlen.md'],
  ['/blog/2026-10-11-tesla-fsd-wird-in-europa-zu-tesla-assisted-driving/', 'collections/_posts/2026-10-11-tesla-fsd-wird-in-europa-zu-tesla-assisted-driving.md'],
]) {
  const data = sourceData(source);
  metadata(url, data.meta_title || data.title, data.meta_description || data.description, canonical || url, noindex);
}
const category = JSON.parse(fs.readFileSync('_data/blog/categories.json', 'utf8')).categories.KI;
metadata('/category/ki/', category.meta_title, category.meta_description);
const pagination = document('/blog/page/2/index.html');
assert.match(pagination.meta.robots[0], /\bnoindex\b/i);

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&'));
assert.equal(new Set(locations).size, locations.length);
for (const url of locations) {
  const file = resolveLocal(new URL(url));
  if (file?.endsWith('.html')) assert.ok(!/\b(?:noindex|none)\b/i.test(document(file).meta.robots?.[0] || ''), `Sitemap lists noindex: ${url}`);
}
for (const entry of baseline) assert.ok(locations.includes(`${origin}${entry.url}`));
for (const file of files) {
  assert.ok(!/\/(?:Diagramm|Seiten|Suchanfragen|Länder|Geräte|Filter|Darstellung in der Suche)\.csv$/i.test(file), `Private export: ${file}`);
  assert.ok(!/SEO_Rettungsplan.*\.xlsx$/i.test(file), `Private workbook: ${file}`);
  assert.ok(!file.startsWith('/docs/'), `Internal documentation published: ${file}`);
}
console.log(`[seo-recovery-qa] PASS: 7 original article routes/anchors/dates/images/schema, ${references} exact internal links, 10 layout/metadata controls, ${locations.length} sitemap routes; private exports/docs excluded.`);
