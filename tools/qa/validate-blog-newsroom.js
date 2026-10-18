import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parseDocument, DomUtils } from 'htmlparser2';
import yaml from 'js-yaml';
import { postUrl } from '../../plugins/blog-newsroom.js';

const root = '_site/blog';
const pages = [path.join(root, 'index.html'), ...fs.readdirSync(path.join(root, 'page'), { withFileTypes: true })
  .filter(entry => entry.isDirectory()).sort((left, right) => Number(left.name) - Number(right.name))
  .map(entry => path.join(root, 'page', entry.name, 'index.html'))];
const expected = fs.readdirSync('collections/_posts').filter(file => file.endsWith('.md')).map(file => {
  const source = fs.readFileSync(path.join('collections/_posts', file), 'utf8');
  const data = yaml.load(source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || '', { json: true }) || {};
  return { data, inputPath: `./collections/_posts/${file}` };
}).filter(item => item.data.published !== false).map(postUrl);
const allStories = [];
const dates = [];
for (const [index, file] of pages.entries()) {
  const document = parseDocument(fs.readFileSync(file, 'utf8'));
  const nodes = (predicate, node = document) => DomUtils.findAll(predicate, node.children || []);
  const hasClass = (node, name) => node.attribs?.class?.split(' ').includes(name);
  const main = nodes(node => node.name === 'main');
  assert.equal(main.length, 1, `${file}: one main`);
  assert.equal(nodes(node => node.name === 'h1').length, 1, `${file}: one H1`);
  const primary = nodes(node => hasClass(node, 'news-main'))[0];
  assert.ok(primary, `${file}: primary archive`);
  const stories = nodes(node => node.name === 'a' && (hasClass(node, 'news-row__link') || hasClass(node, 'news-feature__link')), primary);
  const urls = stories.map(node => node.attribs.href);
  assert.equal(new Set(urls).size, urls.length, `${file}: no repeated primary stories`);
  assert.ok(urls.length > 0 && urls.length <= 24, `${file}: page size`);
  assert.equal(nodes(node => hasClass(node, 'news-feature'), primary).length, index === 0 ? Math.min(4, urls.length) : 0);
  const pagination = nodes(node => node.name === 'nav' && node.attribs['aria-label'] === 'Seiten im Artikelarchiv')[0];
  assert.ok(pagination, `${file}: archive navigation`);
  const indicator = nodes(node => node.attribs?.['aria-current'] === 'page', pagination);
  assert.equal(indicator.length, 1);
  assert.equal(DomUtils.getText(indicator[0]).trim(), `Seite ${index + 1}`);
  assert.equal(nodes(node => node.name === 'a' && node.attribs.rel === 'prev', pagination).length, index > 0 ? 1 : 0);
  assert.equal(nodes(node => node.name === 'a' && node.attribs.rel === 'next', pagination).length, index < pages.length - 1 ? 1 : 0);
  for (const time of nodes(node => node.name === 'time')) assert.ok(Number.isFinite(Date.parse(time.attribs.datetime)), `${file}: valid timestamp`);
  let previousHeading = 0;
  for (const heading of nodes(node => /^h[1-6]$/.test(node.name || ''), main[0])) {
    const level = Number(heading.name[1]);
    assert.ok(level <= previousHeading + 1, `${file}: logical heading hierarchy`);
    previousHeading = level;
  }
  for (const link of nodes(node => node.name === 'a' || node.name === 'button', main[0])) {
    assert.equal(nodes(node => node.name === 'a' || node.name === 'button', link).length, 0, `${file}: no nested controls`);
  }
  const feed = nodes(node => hasClass(node, 'news-feed'))[0];
  dates.push(...nodes(node => node.name === 'time', feed).map(node => Date.parse(node.attribs.datetime)));
  allStories.push(...urls);
}
assert.equal(allStories.length, expected.length, 'All published articles remain in the archive');
assert.equal(new Set(allStories).size, expected.length, 'No archive duplicates across page boundaries');
assert.deepEqual(new Set(allStories), new Set(expected));
assert.ok(dates.every((date, index) => index === 0 || date <= dates[index - 1]), 'Feed remains chronological across archive pages');
console.log(`[blog-newsroom-qa] PASS: ${pages.length} archive pages, ${allStories.length} unique articles, chronological feed, complete pagination, headings, timestamps and native controls.`);
