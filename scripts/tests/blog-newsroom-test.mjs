import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { Liquid } from 'liquidjs';
import { parseDocument, DomUtils } from 'htmlparser2';
import { archivePosts, buildNewsroom, chronologicalPosts, postUrl, presentPost } from '../../plugins/blog-newsroom.js';
import { configureCompatibility } from '../../plugins/eleventy-compat.js';

const settings = JSON.parse(fs.readFileSync('_data/blog/newsroom.json', 'utf8'));
const posts = Array.from({ length: 57 }, (_, index) => ({
  inputPath: `./collections/_posts/story-${index}.md`,
  date: new Date(Date.UTC(2026, 9, 18) - index * 86_400_000),
  data: { title: `Story ${index}`, categories: index > 39 && index < 45 ? ['recherche'] : ['KI'], pinned: index === 50 },
}));
const draft = { ...posts[0], inputPath: './collections/_posts/draft.md', data: { ...posts[0].data, published: false, featured: true } };
const original = structuredClone(posts);
assert.deepEqual(archivePosts([...posts].reverse().concat(draft)), posts, 'Without explicit features, the archive is newest first and ignores pinned priority');
assert.deepEqual(posts, original, 'Ordering does not mutate collection records');
const featured = posts.map((item, index) => ({ ...item, data: { ...item.data, featured: index === 35 || index === 47 } }));
const ordered = archivePosts([...featured].reverse().concat(draft));
assert.equal(postUrl(ordered[0]), '/blog/story-35/', 'Newest explicit feature wins, including one originally on a later page');
assert.deepEqual(ordered.slice(1).map(postUrl), posts.filter((_, index) => index !== 35).map(postUrl));
assert.equal(new Set(ordered.map(postUrl)).size, posts.length);
assert.deepEqual(archivePosts([]), []);
assert.equal(postUrl({ data: { permalink: '/custom/index.html' } }), '/custom/');
assert.equal(presentPost({ title: 'No metadata', url: '/no-metadata/' }).thumbnail, '');
assert.equal(presentPost({ date: 'invalid', url: '/bad-date/' }).date, null);
assert.equal(presentPost({ ...posts[0], data: { editorial_type: 'investigation' } }, settings.sections).section_label, 'Recherche');
assert.equal(presentPost({ ...posts[0], data: { editorial_type: 'analysis' } }, settings.sections).type_label, 'Analyse');

const publicationData = {
  publications: [{ key: 'one', title: 'Actual Publisher' }, { key: 'two', title: 'Other Publisher' }],
  one: [{ link: 'https://example.com/article', title: 'New external', date: '2026-10-18', categories: ['KI'] }],
  two: [{ link: 'https://example.com/other', title: 'Other external', date: '2026-10-17', categories: ['Privacy'] },
    { link: 'https://example.com/article', title: 'Old duplicate', date: '2025-01-01' }],
};
const context = (pageNumber, pagePosts) => ({
  collections: { posts: [...featured, draft] }, eleventyPagePosts: pagePosts, pagination: { pageNumber },
  blog: { newsroom: settings, categories: { categories: { KI: {}, recherche: {}, Privacy: {} } } }, publications: publicationData,
});
const rendered = [];
for (let start = 0; start < ordered.length; start += 24) {
  const pageNumber = start / 24;
  const current = ordered.slice(start, start + 24);
  const model = buildNewsroom(context(pageNumber, current));
  assert.equal(model.featured.length, pageNumber === 0 ? 4 : 0);
  assert.deepEqual(model.feed, chronologicalPosts(model.feed));
  const visible = [...model.featured, ...model.feed];
  assert.equal(visible.length, current.length);
  assert.ok(model.investigations.every(item => !visible.some(other => other.url === item.url)));
  assert.equal(model.external[0].publisher, 'Actual Publisher');
  assert.equal(model.external[0].title, 'New external');
  assert.equal(model.external.length, 2);
  assert.ok(model.topics.some(topic => topic.name === 'KI' && topic.url === '/category/ki/'));
  rendered.push(...visible.map(item => item.url));
}
assert.equal(rendered.length, posts.length);
assert.equal(new Set(rendered).size, posts.length, 'Every archive article is rendered exactly once across pages');
assert.deepEqual(new Set(rendered), new Set(posts.map(postUrl)));
assert.equal(buildNewsroom({}).feed.length, 0);

const liquid = new Liquid({ root: path.resolve('_includes'), jekyllInclude: true, dynamicPartials: false, jsTruthy: true });
configureCompatibility({ amendLibrary() {}, addFilter: (name, filter) => liquid.registerFilter(name, filter) });
const rowTemplate = fs.readFileSync('_includes/blog/story-row.html', 'utf8');
const longTitle = 'A complete, very long headline with <markup> & quotes "kept" '.repeat(4);
const html = liquid.parseAndRenderSync(rowTemplate, { include: { post: { title: longTitle, url: '/long-title/', description: '' }, heading_id: 'long-title' } });
const doc = parseDocument(html);
const headings = DomUtils.findAll(node => node.name === 'h3', doc.children);
assert.equal(DomUtils.getText(headings[0]), longTitle);
assert.equal(DomUtils.findAll(node => node.name === 'a', doc.children).length, 1, 'One accessible destination per story');
assert.equal(DomUtils.findAll(node => node.name === 'img' || node.name === 'time', doc.children).length, 0, 'Missing image/date does not invent metadata');
assert.ok(html.includes('news-row--text'));
console.log('[blog-newsroom-test] PASS: feature selection, chronological archive, complete pagination, no duplicates, publisher metadata, optional fields and real story markup.');
