import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { parseDocument, DomUtils } from 'htmlparser2';
import { postUrl } from '../../plugins/blog-newsroom.js';

const settings = JSON.parse(fs.readFileSync('_data/blog/categories.json', 'utf8')).categories;
const slug = value => String(value).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
const posts = fs.readdirSync('collections/_posts').filter(file => file.endsWith('.md')).map(file => ({ inputPath: `./collections/_posts/${file}`, data: yaml.load(fs.readFileSync(`collections/_posts/${file}`, 'utf8').match(/^---\s*\n([\s\S]*?)\n---/)[1], { json: true }) })).filter(post => post.data.published !== false);
const categories = new Map(Object.keys(settings).map(name => [slug(name), name]));
for (const post of posts) for (const name of post.data.categories || []) if (!categories.has(slug(name))) categories.set(slug(name), name);
const find = (doc, predicate) => DomUtils.findAll(predicate, doc.children || []);
const cls = (node, name) => node.attribs?.class?.split(/\s+/).includes(name);
const read = file => parseDocument(fs.readFileSync(file, 'utf8'));
const registry = JSON.parse(fs.readFileSync('_data/publications/publications.json', 'utf8'));
const publications = registry.flatMap(publisher => JSON.parse(fs.readFileSync(`_data/publications/${publisher.key}.json`, 'utf8')).map(post => ({ ...post, publisher: publisher.title })));
let archivePages = 0;
let articleSlots = 0;
for (const [categorySlug, category] of categories) {
  const directory = `_site/category/${categorySlug}`;
  const root = `${directory}/index.html`;
  assert.ok(fs.existsSync(root), `Existing category remains available: ${category}`);
  const pageDirs = fs.existsSync(`${directory}/page`) ? fs.readdirSync(`${directory}/page`).sort((left, right) => Number(left) - Number(right)) : [];
  const files = [root, ...pageDirs.map(number => `${directory}/page/${number}/index.html`)];
  const expected = posts.filter(post => (post.data.categories || []).some(name => slug(name) === categorySlug));
  if (expected.length) assert.equal(files.length, Math.ceil(expected.length / 24), `${category}: static page count`);
  const relevantExternal = publications.filter(post => post.published !== false && /^https?:\/\//.test(post.link || '') && (post.categories || []).some(name => slug(name) === categorySlug));
  const externalUrls = new Set(relevantExternal.map(post => post.link));
  const seenArticles = [];
  const feedDates = [];
  const titles = new Set();
  for (const [index, file] of files.entries()) {
    const doc = read(file);
    const main = find(doc, node => node.name === 'main')[0];
    assert.ok(main);
    assert.equal(find(doc, node => node.name === 'h1').length, 1, `${file}: one H1`);
    const newsroom = find(doc, node => cls(node, 'category-newsroom'))[0];
    assert.equal(newsroom.attribs['data-archive-page'], String(index + 1));
    const kind = newsroom.attribs['data-archive-kind'];
    const primary = find(doc, node => cls(node, 'news-main'))[0];
    const links = find(primary, node => node.name === 'a' && (cls(node, 'news-feature__link') || cls(node, 'news-row__link')));
    const urls = links.map(node => node.attribs.href);
    assert.equal(new Set(urls).size, urls.length);
    assert.ok(urls.length <= 24);
    assert.ok(urls.every(url => expected.some(post => postUrl(post) === url)), `${file}: only relevant published articles`);
    assert.equal(find(primary, node => cls(node, 'news-feature')).length, index === 0 ? Math.min(4, expected.length) : 0);
    const feed = find(primary, node => cls(node, 'news-feed'))[0];
    if (feed) feedDates.push(...find(feed, node => node.name === 'time').map(node => Date.parse(node.attribs.datetime)));
    let heading = 0;
    for (const node of find(main, node => /^h[1-6]$/.test(node.name || ''))) {
      const level = Number(node.name[1]);
      assert.ok(level <= heading + 1, `${file}: heading hierarchy ${heading} -> ${level}`);
      heading = level;
    }
    for (const node of find(main, node => ['a', 'button'].includes(node.name))) assert.equal(find(node, child => ['a', 'button'].includes(child.name)).length, 0, `${file}: no nested controls`);
    for (const node of find(main, node => node.name === 'time')) assert.ok(Number.isFinite(Date.parse(node.attribs.datetime)), `${file}: valid time`);
    const url = `/category/${categorySlug}/${index ? `page/${index + 1}/` : ''}`;
    const canonical = find(doc, node => node.name === 'link' && node.attribs.rel === 'canonical');
    assert.equal(canonical.length, 1);
    assert.equal(canonical[0].attribs.href, `https://oliverjessner.at${url}`);
    const title = DomUtils.getText(find(doc, node => node.name === 'title')[0]);
    assert.ok(!titles.has(title), `${category}: unique archive titles`);
    titles.add(title);
    if (index) assert.ok(title.includes(`Seite ${index + 1}`));
    const robots = find(doc, node => node.name === 'meta' && node.attribs.name === 'robots')[0].attribs.content;
    assert.equal(robots.includes('noindex'), kind === 'empty');
    const html = find(doc, node => node.name === 'html')[0];
    assert.equal(html.attribs['data-pagefind-ignore'] === 'all', index > 0 || kind === 'empty');
    assert.equal(DomUtils.getText(find(doc, node => node.attribs?.['data-pagefind-meta'] === 'category_slug')[0]), categorySlug);
    const schemas = find(doc, node => node.name === 'script' && node.attribs.type === 'application/ld+json').map(node => JSON.parse(DomUtils.getText(node)));
    const collections = schemas.filter(schema => schema['@type'] === 'CollectionPage');
    assert.equal(collections.length, 1);
    assert.equal(schemas.filter(schema => schema['@type'] === 'BreadcrumbList').length, 1);
    assert.equal(collections[0].url, canonical[0].attribs.href);
    const items = collections[0].mainEntity.itemListElement;
    assert.equal(collections[0].mainEntity.numberOfItems, items.length);
    if (kind === 'articles') {
      assert.deepEqual(items.map(item => decodeURI(new URL(item.url).pathname)), urls);
      for (const item of items) {
        const source = expected.find(post => postUrl(post) === decodeURI(new URL(item.url).pathname));
        const authoredDate = source.data.date ?? path.basename(source.inputPath).slice(0, 10);
        const normalizedDate = typeof authoredDate === 'string' ? authoredDate.replace(/([+-]\d{4})\d$/, '$1') : authoredDate;
        assert.equal(Date.parse(item.item.datePublished), Date.parse(normalizedDate));
      }
    }
    const pagination = find(doc, node => node.name === 'nav' && node.attribs['aria-label'] === 'Seiten in diesem Ressort')[0];
    if (files.length > 1) {
      assert.ok(pagination);
      assert.equal(find(pagination, node => node.attribs?.['aria-current'] === 'page').length, 1);
      const pageLinks = find(pagination, node => node.name === 'a');
      assert.ok(pageLinks.every(link => link.attribs.href.startsWith(`/category/${categorySlug}/`)));
      assert.equal(pageLinks.filter(link => link.attribs.rel === 'prev').length, index > 0 ? 1 : 0);
      assert.equal(pageLinks.filter(link => link.attribs.rel === 'next').length, index < files.length - 1 ? 1 : 0);
    }
    for (const link of find(main, node => node.name === 'a' && node.attribs.href?.includes('#'))) {
      const destination = new URL(link.attribs.href, `https://oliverjessner.at${url}`);
      if (destination.hostname !== 'oliverjessner.at') continue;
      const target = `${path.join('_site', decodeURI(destination.pathname))}${destination.pathname.endsWith('/') ? 'index.html' : ''}`;
      const targetDoc = destination.pathname === url ? doc : read(target);
      assert.ok(find(targetDoc, node => node.attribs?.id === decodeURIComponent(destination.hash.slice(1))).length, `${file}: anchor ${link.attribs.href}`);
    }
    for (const publication of find(main, node => cls(node, 'news-publication'))) {
      const link = find(publication, node => node.name === 'a')[0];
      assert.ok(externalUrls.has(link.attribs.href), `${file}: publication is category relevant`);
      const publisher = DomUtils.getText(find(publication, node => cls(node, 'news-meta__section'))[0]);
      assert.ok(relevantExternal.some(post => post.link === link.attribs.href && post.publisher === publisher));
    }
    if (!index && kind !== 'external') {
      const allExternal = find(doc, node => node.attribs?.id === 'external-articles')[0];
      if (externalUrls.size) {
        const rendered = find(allExternal, node => cls(node, 'news-publication')).map(node => find(node, child => child.name === 'a')[0].attribs.href);
        assert.equal(rendered.length, externalUrls.size, `${category}: external records remain available without duplicates`);
        assert.deepEqual(new Set(rendered), externalUrls);
      } else assert.ok(!allExternal, `${category}: no empty external box`);
    }
    seenArticles.push(...urls);
    archivePages++;
  }
  assert.deepEqual(new Set(seenArticles), new Set(expected.map(postUrl)), `${category}: complete archive`);
  assert.equal(seenArticles.length, expected.length, `${category}: every post exactly once`);
  assert.ok(feedDates.every((date, index) => !index || date <= feedDates[index - 1]), `${category}: chronological feed across pages`);
  articleSlots += seenArticles.length;
}
for (const [name, source] of [['youtube-videos', 'youtube_longform'], ['youtube-shorts', 'youtube_shortform']]) {
  const doc = read(`_site/category/${name}/index.html`);
  const videos = JSON.parse(fs.readFileSync(`_data/videos/${source}.json`, 'utf8')).filter(video => video.published !== false);
  const posters = find(doc, node => cls(node, 'video-card__poster'));
  assert.equal(posters.length, videos.length);
  assert.deepEqual(new Set(posters.map(node => node.attribs.href)), new Set(videos.map(video => video.link)));
}
const git = read('_site/category/git/index.html');
for (const id of ['category-cluster', 'commits', 'branches', 'working-tree', 'remotes']) assert.ok(find(git, node => node.attribs?.id === id).length, `Git cluster ${id}`);
assert.ok(find(read('_site/category/recherche/index.html'), node => node.attribs?.id === 'research-metrics').length);
console.log(`[category-newsroom-qa] PASS: ${categories.size} categories, ${archivePages} static pages, ${articleSlots} article slots; complete scoped archives, schema, SEO, pagination, publications, videos, clusters and research metrics.`);
