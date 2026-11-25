import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import yaml from 'js-yaml';
import { parseDocument, DomUtils } from 'htmlparser2';

export const origin = 'https://oliverjessner.at';
export const baselineFile = 'scripts/tests/fixtures/gift-guides-baseline.json';
export const normalizeSpace = value => String(value ?? '').replace(/\s+/g, ' ').trim();
export const legacyUrl = source => `/blog/${path.basename(source, '.md')}/`;
export const canonicalUrl = data => `/geschenke/${data.slug}/`;

export function readSource(source) {
  const text = fs.readFileSync(source, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)/);
  if (!match) throw new Error(`Missing front matter: ${source}`);
  return { source, data: yaml.load(match[1]), body: match[2] };
}

export function readPosts() {
  return fs.readdirSync('collections/_posts').filter(name => name.endsWith('.md'))
    .map(name => readSource(`collections/_posts/${name}`));
}

export const readGuides = () => readPosts().filter(item => item.data.contentType === 'gift-guide' && item.data.published !== false);
export const readBaseline = () => JSON.parse(fs.readFileSync(baselineFile, 'utf8'));

function stableValue(value) {
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  }
  return value;
}

export const fingerprint = value => createHash('sha256').update(JSON.stringify(stableValue(value))).digest('hex');

// Link labels and all editorial words are protected; only guide destinations
// may move from dated blog URLs to the new evergreen namespace.
export const bodyFingerprint = body => fingerprint(normalizeSpace(String(body).replace(
  /\]\(\/(?:blog\/\d{4}-\d{2}-\d{2}-weihnachtsgeschenke[^\s)]*|geschenke\/[^\s)]*)\)/g,
  '](GIFT-GUIDE-DESTINATION)',
)));

export function protectedMetadata(data) {
  return stableValue({
    title: data.title,
    description: data.description,
    date: new Date(data.date).toISOString(),
    authors: data.authors,
    image: data.image,
    thumbnail: data.thumbnail,
    image_alt: data.image_alt,
    image_width: data.image_width,
    image_height: data.image_height,
    ...Object.fromEntries([
      'meta_title', 'meta_description', 'meta_og_type', 'last_modified_at', 'faq',
      'socialmedia', 'buying_guide', 'categories', 'news', 'pinned', 'ads',
      'published', 'sitemap', 'meta_robots',
    ].filter(key => Object.hasOwn(data, key)).map(key => [key, data[key]])),
  });
}

export function allNodes(document, predicate) {
  return DomUtils.findAll(predicate, document.children || []);
}
export const hasClass = (node, name) => node.attribs?.class?.split(/\s+/).includes(name);
export const textOf = node => normalizeSpace(DomUtils.textContent(node));

export function parseHtml(html) {
  const document = parseDocument(html);
  const nodes = predicate => allNodes(document, predicate);
  const schemas = nodes(node => node.name === 'script' && node.attribs?.type === 'application/ld+json')
    .map(node => JSON.parse(DomUtils.textContent(node)));
  const flattened = [];
  function visit(value) {
    if (Array.isArray(value)) { value.forEach(visit); return; }
    if (!value || typeof value !== 'object') return;
    if (value['@type']) flattened.push(value);
    Object.values(value).forEach(visit);
  }
  schemas.forEach(visit);
  return { document, nodes, schemas: flattened, html };
}

export function readHtml(siteRoot, url) {
  return parseHtml(fs.readFileSync(path.join(siteRoot, url.replace(/^\//, ''), 'index.html'), 'utf8'));
}

export function htmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const name = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(name) : entry.name.endsWith('.html') ? [name] : [];
  });
}

export function redirectAliases(guide) {
  return [...new Set([legacyUrl(guide.source), ...(guide.data.redirectFrom || [])])].flatMap(alias => {
    const base = alias.replace(/\/index\.html$/, '/').replace(/\/$/, '');
    return [base, `${base}/`, `${base}/index.html`];
  });
}
