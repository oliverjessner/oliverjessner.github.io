import assert from 'node:assert/strict';
import fs from 'node:fs';
import { isGiftGuide, giftGuideUrl, giftGuideRedirects, buildGiftGuideRedirects } from '../../plugins/gift-guides.js';
import postDirectory from '../../collections/_posts/_posts.11tydata.js';
import computed from '../../_data/eleventyComputed.js';
import { postUrl, chronologicalPosts } from '../../plugins/blog-newsroom.js';
import { bodyFingerprint, fingerprint, protectedMetadata, readBaseline, readGuides } from './helpers/gift-guide-fixtures.mjs';

const item = (slug = 'fuer-menschen-mit-vielen-ideen', extra = {}) => ({
  inputPath: './collections/_posts/2026-11-25-ein-beliebiger-dateiname.md',
  url: '/blog/2026-11-25-ein-beliebiger-dateiname/',
  date: new Date('2026-11-25T09:30:00Z'),
  data: { contentType: 'gift-guide', slug, ...extra },
});
const guide = item();
const target = '/geschenke/fuer-menschen-mit-vielen-ideen/';
assert.equal(isGiftGuide(guide.data), true);
assert.equal(isGiftGuide({ layout: 'buying-guide', categories: ['buying-guide'] }), false, 'Layout and taxonomy do not silently migrate a normal buying guide');
assert.equal(giftGuideUrl({ title: 'Gift guide', slug: 'ordinary-post' }), null);
assert.equal(giftGuideUrl(guide.data), target);
assert.equal(giftGuideUrl({ ...guide.data, title: 'Updated in 2040', date: '2040-12-24' }), target, 'Editorial dates and titles do not change evergreen URLs');
assert.equal(giftGuideUrl({ contentType: 'gift-guide', slug: 'haushalt-unter-17-euro' }), '/geschenke/haushalt-unter-17-euro/', 'New guide types and budgets require no hardcoded route list');
for (const slug of [undefined, '', 'Uppercase', 'two words', 'a--b', '-a', 'a-', '../escape', 'a/b', 'a?x=1', 'a#id', 'für-dich', '2026', 'ideen-2026', '1999-ideen', 'ideen-2000-budget']) {
  assert.throws(() => giftGuideUrl({ contentType: 'gift-guide', slug }), /slug/i, `Invalid or year-bearing slug: ${slug}`);
}

const rules = giftGuideRedirects([item(undefined, { slug: guide.data.slug, redirectFrom: ['/blog/another-date/', '/blog/another-date/index.html'] })]);
assert.equal(rules.length, 4, 'Duplicate aliases and index variants collapse');
assert.ok(rules.every(rule => rule.to === target && rule.status === 301 && rule.force === true));
assert.equal(new Set(rules.map(rule => rule.from)).size, rules.length);
assert.deepEqual(giftGuideRedirects([item('future-guide', { published: false }), { ...guide, data: { ...guide.data, published: false, slug: 'BAD' } }]), [], 'Drafts have no published route or redirect, even before editorial data is ready');
assert.throws(() => giftGuideRedirects([guide, item()]), /duplicate/i);
assert.throws(() => giftGuideRedirects([guide, item('different', { redirectFrom: ['/blog/2026-11-25-ein-beliebiger-dateiname/'] })]), /conflict/i);
for (const alias of [target, '/geschenke/', '/blog/', '//elsewhere.test/path', 'https://elsewhere.test/path', '/path?x=1', '/path#id', '/a/../b/', '/%2e%2e/b/', '/broken%xx', '/wild/*', '/has space/']) {
  assert.throws(() => giftGuideRedirects([item(guide.data.slug, { redirectFrom: [alias] })]), /redirect|path|encoding|shadow|loop/i, alias);
}
assert.throws(() => giftGuideRedirects([item(guide.data.slug, { redirectFrom: '/blog/single/' })]), /array/i);
const normal = { inputPath: './collections/_posts/2026-11-25-normal.md', url: '/blog/2026-11-25-normal/', data: { layout: 'post' } };
assert.throws(() => giftGuideRedirects([normal, item(guide.data.slug, { redirectFrom: [normal.url] })]), /shadow/i, 'Aliases cannot steal an existing normal article');
assert.throws(() => giftGuideRedirects([{ ...normal, url: target }, guide]), /duplicate/i, 'Canonical destinations cannot shadow ordinary content');
for (const extra of [{ sitemap: false }, { meta_robots: 'NoIndex, Follow' }, { meta_robots: 'none' }, { permalink: '/wrong/' }, { canonical_url: '/wrong/' }, { canonical_url: 'https://elsewhere.test/' }]) {
  assert.throws(() => giftGuideRedirects([item(guide.data.slug, extra)]), /indexable|sitemap|permalink|canonical/i);
}
for (const extra of [{ canonical_url: target }, { canonical_url: `https://oliverjessner.at${target}` }, { permalink: `${target}index.html` }]) {
  assert.doesNotThrow(() => giftGuideRedirects([item(guide.data.slug, extra)]));
}

const baselineRules = '# Keep this rule\n/other/ /unchanged/ 302\n/older/ /blog/another-date/ 301!\nhttps://oliverjessner.at/oldest/ https://oliverjessner.at/blog/another-date/ 301!\n/blog/another-date/ /obsolete/ 302\n';
const flattened = buildGiftGuideRedirects([item(guide.data.slug, { redirectFrom: ['/blog/another-date/'] })], baselineRules);
assert.ok(flattened.includes('/older/ ' + target + ' 301!'));
assert.ok(flattened.includes('https://oliverjessner.at/oldest/ ' + target + ' 301!'));
assert.ok(flattened.includes('/other/ /unchanged/ 302'));
assert.ok(flattened.includes('# Keep this rule'));
assert.ok(!flattened.includes('/obsolete/'), 'Superseded legacy rules cannot create a redirect chain');
assert.throws(() => buildGiftGuideRedirects([guide], `${target} /wrong/ 301!`), /shadow/i);
assert.equal(buildGiftGuideRedirects([guide], ''), buildGiftGuideRedirects([guide], ''), 'Generation is deterministic');

const directoryData = { ...guide.data, page: { inputPath: guide.inputPath } };
assert.equal(postDirectory.permalink(directoryData), `${target}index.html`);
assert.equal(postDirectory.permalink({ ...directoryData, published: false }), false);
assert.equal(postDirectory.permalink({ page: { inputPath: normal.inputPath } }), '/blog/2026-11-25-normal/index.html');
assert.equal(postUrl(guide), target, 'Collection presentation must not prefer a stale dated item.url');
assert.equal(postUrl(normal), normal.url);
const site = computed.site({ site: {}, collections: { posts: [guide, normal], all: [guide, normal] }, blog: {} });
assert.equal(site.posts.find(post => post.contentType === 'gift-guide').url, target);
assert.equal(site.posts.find(post => post.inputPath === normal.inputPath).url, normal.url);
assert.equal(site.posts.length, 2);
assert.equal(site.pages.length, 0, 'The migrated article does not become a second independent page');
assert.equal(chronologicalPosts([guide, normal]).length, 2);

const current = readGuides();
const before = readBaseline();
for (const baseline of before.guides) {
  const actual = current.find(entry => entry.source === baseline.source);
  assert.ok(actual, `Migrated source retained: ${baseline.source}`);
  assert.deepEqual(protectedMetadata(actual.data), baseline.metadata, `${baseline.source}: publication date, title, description and Hero are unchanged`);
  assert.equal(fingerprint(actual.data.products), baseline.productsHash, `${baseline.source}: every product field, affiliate URL and asset reference is unchanged`);
  assert.equal(bodyFingerprint(actual.body), baseline.bodyHash, `${baseline.source}: only internal guide URLs may change in the article body`);
}
giftGuideRedirects(current.map(entry => ({ ...entry, inputPath: entry.source })));
assert.ok(fs.readFileSync('_layouts/post.html', 'utf8').includes("page.layout != 'buying-guide'"), 'Gift-guide migration retains buying-guide TOC behavior');
console.log(`[gift-guides-test] PASS: dynamic routing, invalid/year slugs, draft exclusion, collision/SEO guards, direct redirects, normal-blog regression and ${before.guides.length} HEAD-derived content baselines.`);
