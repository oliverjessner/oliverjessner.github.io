import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parseDocument, DomUtils } from 'htmlparser2';

const file = '_site/journalismus/publications/index.html';
const document = parseDocument(fs.readFileSync(file, 'utf8'));
const nodes = (predicate, root = document) => DomUtils.findAll(predicate, root.children || []);
const hasClass = (node, name) => node.attribs?.class?.split(/\s+/).includes(name);
const has = attribute => node => Object.hasOwn(node.attribs || {}, attribute);
const text = node => DomUtils.getText(node).trim();
const sourceDirectory = '_data/publications';
const source = fs.readdirSync(sourceDirectory).filter(name => name.endsWith('.json') && name !== 'publications.json').flatMap(name => {
  const publisher = name.slice(0, -5);
  return JSON.parse(fs.readFileSync(path.join(sourceDirectory, name), 'utf8')).map(article => ({ ...article, publisher }));
});
const expected = new Map(source.map(article => [article.link || article.url, article]));
const main = nodes(node => node.name === 'main');
assert.equal(main.length, 1, 'One main landmark');
assert.equal(nodes(node => node.name === 'h1').length, 1, 'One H1');
assert.equal(text(nodes(node => node.name === 'h1')[0]), 'Veröffentlichungen');
let previousHeading = 0;
for (const heading of nodes(node => /^h[1-6]$/.test(node.name || ''), main[0])) {
  const level = Number(heading.name[1]);
  assert.ok(level <= previousHeading + 1, 'Logical heading hierarchy');
  previousHeading = level;
}
for (const control of nodes(node => node.name === 'a' || node.name === 'button', main[0])) {
  assert.equal(nodes(node => node.name === 'a' || node.name === 'button', control).length, 0, 'No nested interactive controls');
}
const archive = nodes(has('data-publication-archive'))[0];
assert.ok(archive, 'Chronological archive exists');
assert.equal(archive.name, 'ol', 'Archive is a native ordered list');
const rows = nodes(has('data-publication-item'), archive);
assert.equal(rows.length, expected.size, 'Every existing online record is static HTML');
const urls = [];
const dates = [];
for (const row of rows) {
  assert.equal(row.name, 'li');
  assert.equal(Object.hasOwn(row.attribs, 'hidden'), false, 'No-JS archive rows stay visible');
  const article = nodes(node => node.name === 'article', row);
  assert.equal(article.length, 1, 'One semantic article per archive row');
  const headline = nodes(node => node.name === 'h3', row)[0];
  const link = nodes(node => node.name === 'a', headline)[0];
  const href = link?.attribs.href;
  const original = expected.get(href);
  assert.ok(original, `Real source article: ${href}`);
  assert.equal(text(link).replace(/\s*↗\s*$/, ''), original.title, 'Exact article headline');
  assert.equal(row.attribs['data-publication-publisher'], original.publisher);
  const thumbnail = nodes(node => node.name === 'img', row)[0];
  assert.equal(thumbnail?.attribs.src, original.thumbnail || original.image, 'Actual source thumbnail');
  assert.equal(link.attribs.target, '_blank');
  assert.match(link.attribs.rel, /noopener/);
  assert.match(link.attribs['aria-label'] || text(link), /öffnet in neuem Tab/, 'External destination announced');
  const time = nodes(node => node.name === 'time', row)[0];
  assert.equal(time?.attribs.datetime?.slice(0, 10), original.date.slice(0, 10), 'Original publication date');
  urls.push(href);
  dates.push(time.attribs.datetime);
  const categories = nodes(node => hasClass(node, 'oj-tag'), row).map(text);
  assert.ok(categories.length <= 2, 'At most two archive topics');
  assert.equal(new Set(categories.map(category => category.toLocaleLowerCase('de'))).size, categories.length, 'Unique topic labels');
}
assert.deepEqual(new Set(urls), new Set(expected.keys()), 'All records from every existing dataset, including unregistered outlets');
assert.equal(new Set(urls).size, urls.length, 'No duplicate archive URLs');
assert.ok(dates.every((date, index) => Number.isFinite(Date.parse(date)) && (index === 0 || date <= dates[index - 1])), 'Global chronological order');
assert.equal(nodes(node => hasClass(node, 'news-feature') || hasClass(node, 'publication-features') || hasClass(node, 'publication-investigations'), main[0]).length, 0, 'No featured investigations section');
assert.equal(nodes(node => /^h[1-6]$/.test(node.name || '') && text(node) === 'Ausgewählte Recherchen', main[0]).length, 0, 'No featured investigations heading');
for (const image of nodes(node => node.name === 'img', main[0])) {
  assert.ok(Object.hasOwn(image.attribs, 'alt'), 'Images have an alt decision');
  assert.ok(Number(image.attribs.width) > 0 && Number(image.attribs.height) > 0, 'Image dimensions prevent layout shift');
  assert.ok(image.attribs.src.startsWith('/'), 'Local publication images');
  assert.ok(fs.existsSync(path.join('_site', decodeURIComponent(image.attribs.src))), `Built local image: ${image.attribs.src}`);
  for (const candidate of (image.attribs.srcset || '').split(',').filter(Boolean)) {
    const src = candidate.trim().split(/\s+/)[0];
    assert.ok(fs.existsSync(path.join('_site', decodeURIComponent(src))), `Responsive image candidate: ${src}`);
  }
}
const filterRegion = nodes(has('data-publication-filters'))[0];
assert.ok(filterRegion && Object.hasOwn(filterRegion.attribs, 'hidden'), 'Publisher filters are a progressive enhancement');
for (const attribute of ['data-publication-more', 'data-publication-year-filter']) assert.equal(nodes(has(attribute)).length, 0, `${attribute} removed; archive remains complete`);
const schema = nodes(node => node.name === 'script' && node.attribs.type === 'application/ld+json').flatMap(node => {
  const data = JSON.parse(DomUtils.getText(node));
  return data['@graph'] || [data];
});
const list = schema.find(item => item['@type'] === 'ItemList');
assert.equal(list.numberOfItems, expected.size, 'Online ItemList excludes unstructured print count');
assert.deepEqual(list.itemListElement.map(entry => entry.item.url), urls, 'Schema archive matches rendered chronology');
const person = schema.find(item => item['@type'] === 'Person');
assert.equal(person.name, 'Oliver Jessner');
for (const [index, entry] of list.itemListElement.entries()) {
  const original = expected.get(entry.item.url);
  assert.equal(entry.position, index + 1);
  assert.equal(entry.item.headline, original.title);
  assert.equal(entry.item.datePublished.slice(0, 10), original.date.slice(0, 10));
  assert.equal(entry.item.author['@id'], person['@id']);
  assert.ok(entry.item.publisher.name);
}
assert.ok(schema.some(item => item['@type'] === 'CollectionPage'));
assert.ok(schema.some(item => item['@type'] === 'BreadcrumbList'));
console.log(`[publications-qa] PASS: ${rows.length} complete chronological records, ${new Set(source.map(article => article.publisher)).size} outlets, no featured section, real local responsive thumbnails, native semantics and matching online schema.`);
