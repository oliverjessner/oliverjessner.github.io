import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { Liquid } from 'liquidjs';
import { parseDocument, DomUtils } from 'htmlparser2';
import { configureCompatibility } from '../../plugins/eleventy-compat.js';
import { postUrl } from '../../plugins/blog-newsroom.js';
import { buildCategoryArchives, buildCategoryNewsroom, categoryContent, categoryNames, categoryPath, categoryStructuredData } from '../../plugins/category-newsroom.js';
import CategoryPages from '../../generated/categories.11ty.js';

const posts = Array.from({ length: 57 }, (_, index) => ({
  inputPath: `./collections/_posts/story-${index}.md`, date: new Date(Date.UTC(2026, 9, 18) - index * 86400000),
  data: { title: `Story ${index}`, description: 'Description', categories: index === 56 ? ['Gaming'] : ['KI', ...(index > 40 && index < 46 ? ['recherche'] : [])], featured: index === 50 },
}));
const draft = { ...posts[0], inputPath: './collections/_posts/draft.md', data: { ...posts[0].data, published: false } };
const data = {
  collections: { posts: [...posts, draft] },
  blog: { newsroom: JSON.parse(fs.readFileSync('_data/blog/newsroom.json', 'utf8')), categories: { categories: {
    KI: { stylised_name: 'Künstliche Intelligenz', meta_title: 'KI-News | Oliver Jessner', description: 'Actual description', related_categories: ['gaming', 'missing', 'KI'], newsroom: { featured_urls: ['/blog/story-35/', '/blog/story-35/', '/blog/draft/', '/blog/story-56/'], navigation: [{ category: 'missing' }, { category: 'gaming', label: 'Gaming' }] } },
    Gaming: {}, Empty: {}, 'youtube-videos': { video_collection: 'youtube_longform', stylised_name: 'YouTube Videos' },
  } } },
  publications: { publications: [{ key: 'one', title: 'Publisher One' }, { key: 'ign', title: 'IGN' }], one: [
    { title: 'New external', link: 'https://example.com/new', date: '2026-10-18', categories: ['ki'] },
    { title: 'Old external duplicate', link: 'https://example.com/new', date: '2025-01-01', categories: ['KI'] },
    { title: 'Unrelated', link: 'https://example.com/unrelated', categories: ['other'] },
    { title: 'Invalid URL', link: 'javascript:alert(1)', categories: ['KI'] },
    { title: 'Draft', link: 'https://example.com/draft', published: false, categories: ['KI'] },
  ], ign: [{ title: 'IGN game', link: 'https://example.com/game', date: '2026-10-17', categories: ['gaming'] }] },
  videos: { youtube_longform: Array.from({ length: 50 }, (_, index) => ({ title: `Video ${index}`, link: `https://youtube.com/watch?v=${index}`, date: new Date(Date.UTC(2026, 9, 18) - index * 86400000).toISOString(), categories: ['gaming'] })) },
};
const initial = structuredClone(data);
const pages = buildCategoryArchives([...posts, draft].reverse(), data);
assert.deepEqual(data, initial, 'Building category archives never mutates source records');
assert.ok(categoryNames(posts, data).includes('recherche'), 'Unconfigured taxonomy used by published posts is retained');
const ki = pages.filter(page => page.category === 'KI');
assert.equal(ki.length, 3);
assert.equal(ki[0].urls[0], '/blog/story-35/');
assert.notEqual(ki[0].urls[0], '/blog/story-50/', 'Global featured flags do not curate category pages');
const urls = ki.flatMap(page => page.urls);
assert.equal(urls.length, 56);
assert.equal(new Set(urls).size, 56);
assert.deepEqual(new Set(urls), new Set(posts.slice(0, 56).map(postUrl)));
const feedDates = [];
for (const page of ki) {
  const model = buildCategoryNewsroom({ ...data, categoryArchive: page });
  assert.equal(model.featured.length, page.page === 1 ? 4 : 0);
  assert.equal(model.current.length, page.urls.length);
  assert.ok(model.investigations.every(post => post.categories.includes('KI') && !page.urls.includes(post.url)));
  assert.equal(model.external.length, 1);
  assert.equal(model.external[0].title, 'New external');
  assert.equal(model.external[0].publisher, 'Publisher One');
  assert.deepEqual(model.related, [{ name: 'Gaming', url: '/category/gaming/' }]);
  assert.ok(!model.navigation.some(link => link.href.includes('missing')));
  assert.ok(model.title.includes(page.page > 1 ? `Seite ${page.page}` : 'KI-News'));
  assert.equal(model.paginator.previous_page_path, page.page > 1 ? categoryPath('KI', page.page - 1) : null);
  assert.equal(model.paginator.next_page_path, page.page < 3 ? categoryPath('KI', page.page + 1) : null);
  if (page.page > 1) assert.ok(model.navigation.some(link => link.href === '/category/ki/#external-articles'));
  feedDates.push(...model.feed.map(post => +new Date(post.date)));
  const schema = categoryStructuredData(model, categoryPath('KI', page.page), { url: 'https://example.com', lang: 'de' });
  assert.equal(schema[0].mainEntity.numberOfItems, page.urls.length);
  assert.deepEqual(schema[0].mainEntity.itemListElement.map(item => item.url), page.urls.map(url => `https://example.com${url}`));
  assert.equal(schema[0].url, `https://example.com${categoryPath('KI', page.page)}`);
  assert.ok(schema[0].mainEntity.itemListElement.every(item => Number.isFinite(Date.parse(item.item.datePublished))));
  assert.equal(schema[1].itemListElement.at(-1).item, schema[0].url);
}
assert.ok(feedDates.every((date, index) => !index || date <= feedDates[index - 1]), 'Non-featured feed stays chronological across pages');
const game = buildCategoryNewsroom({ ...data, categoryArchive: pages.find(page => page.category === 'Gaming') });
assert.equal(game.featured.length, 1);
assert.equal(game.feed.length, 0);
assert.equal(game.investigations.length, 0);
// Actual production metadata uses lowercase gaming, including the dedicated IGN section.
const gamingData = structuredClone(data);
gamingData.blog.categories.categories.gaming = {};
delete gamingData.blog.categories.categories.Gaming;
const gaming = buildCategoryNewsroom({ ...gamingData, categoryArchive: buildCategoryArchives(posts, gamingData).find(page => page.category === 'gaming') });
assert.equal(gaming.ign.length, 1);
assert.ok(gaming.navigation.some(link => link.href === '#ign-articles'));
const empty = buildCategoryNewsroom({ ...data, categoryArchive: pages.find(page => page.category === 'Empty') });
assert.ok(empty.empty);
assert.equal(empty.featured.length, 0);
assert.equal(empty.hasSidebar, false);
const computed = new CategoryPages().data().eleventyComputed;
assert.equal(computed.meta_robots({ newsroom: empty }), 'noindex, follow');
assert.equal(computed.page.pagefind_exclude({ newsroom: empty, categoryArchive: { page: 1 } }), true);
const videos = pages.filter(page => page.category === 'youtube-videos');
assert.equal(videos.length, 3);
assert.equal(new Set(videos.flatMap(page => page.urls)).size, 50);
for (const page of videos) {
  const model = buildCategoryNewsroom({ ...data, categoryArchive: page });
  assert.equal(model.kind, 'videos');
  assert.equal(model.featured.length, 0);
  assert.equal(model.videos.length, page.urls.length);
}
const externalOnly = categoryContent('KI', [], data);
assert.equal(externalOnly.external.length, 1);
const externalPage = buildCategoryArchives([], data).find(page => page.category === 'KI');
assert.equal(externalPage.kind, 'external');
assert.equal(buildCategoryNewsroom({ ...data, collections: { posts: [] }, categoryArchive: externalPage }).primaryExternal.length, 1);
const uncuratedData = structuredClone(data);
delete uncuratedData.blog.categories.categories.KI.newsroom;
assert.equal(buildCategoryArchives(posts, uncuratedData).find(page => page.category === 'KI').urls[0], '/blog/story-0/');

const liquid = new Liquid({ root: path.resolve('_includes'), jekyllInclude: true, dynamicPartials: false, jsTruthy: true });
configureCompatibility({ amendLibrary() {}, addFilter: (name, filter) => liquid.registerFilter(name, filter) });
const pagination = fs.readFileSync('_includes/blog/pagination.html', 'utf8');
const rendered = liquid.parseAndRenderSync(pagination, { paginator: buildCategoryNewsroom({ ...data, categoryArchive: ki[1] }).paginator, include: { base_path: '/category/ki/', label: 'Seiten in diesem Ressort' } });
const document = parseDocument(rendered);
const links = DomUtils.findAll(node => node.name === 'a', document.children);
assert.ok(links.every(link => link.attribs.href.startsWith('/category/ki/')));
assert.ok(links.some(link => link.attribs.href === '/category/ki/'));
assert.ok(links.some(link => link.attribs.href === '/category/ki/page/3/'));
assert.ok(!rendered.includes('/blog/'));
const smallModel = buildCategoryNewsroom({ ...data, publications: {}, videos: {}, categoryArchive: pages.find(page => page.category === 'Gaming') });
const smallHtml = liquid.parseAndRenderSync(fs.readFileSync('_includes/category/newsroom.html', 'utf8'), {
  newsroom: smallModel, paginator: smallModel.paginator, page: { category: 'Gaming' }, site: { data: { blog: data.blog, menu: { main: [] } } },
});
const smallDocument = parseDocument(smallHtml);
const hasClass = (node, name) => node.attribs?.class?.split(/\s+/).includes(name);
assert.equal(DomUtils.findAll(node => hasClass(node, 'news-feature'), smallDocument.children).length, 1);
assert.equal(DomUtils.findAll(node => hasClass(node, 'news-row') || hasClass(node, 'news-secondary') || node.name === 'aside', smallDocument.children).length, 0);
assert.equal(DomUtils.findAll(node => hasClass(node, 'news-features--single'), smallDocument.children).length, 1, 'One article renders a single lead without empty secondary/sidebar columns');
console.log('[category-newsroom-test] PASS: taxonomy, scoped curation, complete 24-slot pagination, no duplicates, relevant research/publications, videos, sparse/empty categories, metadata, schema and category pagination markup.');
