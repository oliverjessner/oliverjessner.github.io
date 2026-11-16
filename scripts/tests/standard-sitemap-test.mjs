import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Liquid } from 'liquidjs';
import { parseDocument, DomUtils } from 'htmlparser2';
import { configureCompatibility } from '../../plugins/eleventy-compat.js';
import { buildCategoryArchives, buildCategoryNewsroom, categoryPath } from '../../plugins/category-newsroom.js';
import CategoryPages from '../../generated/categories.11ty.js';
import siteComputed from '../../_data/eleventyComputed.js';

const article = {
  inputPath: './collections/_posts/indexable.md',
  date: new Date('2026-11-01T10:00:00Z'),
  data: { title: 'Indexable article', categories: ['articles'] },
};
const categoryData = {
  collections: { posts: [article] },
  blog: { categories: { categories: {
    articles: {}, empty: {}, videos: {}, external: {},
  } } },
  videos: { youtube_longform: [{ title: 'Video', link: 'https://youtube.com/watch?v=example', categories: ['videos'] }] },
  publications: {
    publications: [{ key: 'publisher', title: 'Publisher' }],
    publisher: [{ title: 'External article', link: 'https://example.com/article', categories: ['external'] }],
  },
};
const generatedCategoryData = new CategoryPages().data();
const computed = generatedCategoryData.eleventyComputed;
const archives = buildCategoryArchives(categoryData.collections.posts, categoryData);
for (const [category, expectedRobots] of [['empty', 'noindex, follow'], ['videos', 'max-image-preview:large'], ['external', 'max-image-preview:large']]) {
  const categoryArchive = archives.find(archive => archive.category === category);
  const newsroom = buildCategoryNewsroom({ ...categoryData, categoryArchive });
  assert.equal(computed.meta_robots({ newsroom }), expectedRobots);
}

const posts = [
  article,
  { ...article, inputPath: './collections/_posts/noindex.md', data: { ...article.data, meta_robots: 'NoIndex, Follow' } },
  { ...article, inputPath: './collections/_posts/none.md', data: { ...article.data, meta_robots: 'none' } },
  { ...article, inputPath: './collections/_posts/excluded.md', data: { ...article.data, sitemap: false } },
];
const pages = [
    { url: '/overview/' },
    { url: '/linkhub.html', canonical_url: '/linkhub' },
    { url: '/search/', meta_robots: 'noindex, follow, max-image-preview:large' },
    { url: '/privacy-policy/', meta_robots: ' NOINDEX , max-image-preview:large' },
    { url: '/none/', meta_robots: 'none' },
    { url: '/excluded/', sitemap: false },
    { url: '/404.html' },
    { url: '/blog/page/2/' },
];
const firstArchive = archives[0];
const firstNewsroom = buildCategoryNewsroom({ ...categoryData, categoryArchive: firstArchive });
// generated/categories.11ty.js does not enable addAllPagesToCollections.
// Eleventy therefore exposes only the first category through collections.all,
// with all archives retained on that record's pagination.pages (size: 1).
assert.notEqual(generatedCategoryData.pagination.addAllPagesToCollections, true);
const categoryCollectionEntry = {
  inputPath: './generated/categories.11ty.js',
  data: {
    ...generatedCategoryData,
    categoryArchive: firstArchive,
    meta_robots: computed.meta_robots({ newsroom: firstNewsroom }),
    permalink: computed.permalink({ categoryArchive: firstArchive }),
    pagination: { ...generatedCategoryData.pagination, items: [firstArchive], pages: archives },
  },
};
const site = siteComputed.site({
  ...categoryData,
  site: { url: 'https://oliverjessner.at' },
  collections: {
    posts,
    all: [
      ...posts,
      ...pages.map((page, index) => ({ inputPath: `./pages/fixture-${index}.md`, data: { ...page, permalink: page.url } })),
      categoryCollectionEntry,
    ],
  },
});
assert.equal(site.html_pages.filter(page => page.inputPath === './generated/categories.11ty.js').length, 1);
assert.ok(!site.html_pages.some(page => page.url === '/category/empty/index.html'), 'Empty category has no individual public collection record');
assert.deepEqual(site.html_pages.find(page => page.inputPath === './generated/categories.11ty.js').pagination.pages, archives);
const liquid = new Liquid({ jsTruthy: true });
configureCompatibility({ amendLibrary() {}, addFilter: (name, filter) => liquid.registerFilter(name, filter) });
const template = fs.readFileSync('sitemap.xml', 'utf8').replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
function sitemapUrls(input) {
  const xml = liquid.parseAndRenderSync(template, { site: input, page: {} });
  const document = parseDocument(xml, { xmlMode: true });
  return DomUtils.findAll(node => node.name === 'loc', document.children).map(node => DomUtils.textContent(node));
}
const expected = [
  'https://oliverjessner.at/blog/indexable/',
  'https://oliverjessner.at/overview/',
  'https://oliverjessner.at/linkhub',
  'https://oliverjessner.at/category/articles/',
  'https://oliverjessner.at/category/external/',
  'https://oliverjessner.at/category/videos/',
];
assert.deepEqual(sitemapUrls(site).sort(), expected.sort(), 'Sitemap respects robots and sitemap:false while retaining indexable articles, video/external categories and canonical overrides');

console.log('[standard-sitemap-test] PASS: actual publicItem/first-pagination-record contract, noindex/none exclusion, sitemap:false, canonical overrides, empty/video/external categories and pagination exclusions.');
