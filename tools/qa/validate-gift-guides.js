import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parseDocument, DomUtils } from 'htmlparser2';
import {
  origin, readGuides, readBaseline, canonicalUrl, redirectAliases, legacyUrl,
  readHtml, parseHtml, htmlFiles, hasClass, textOf, normalizeSpace, allNodes,
  fingerprint, protectedMetadata, bodyFingerprint,
} from '../../scripts/tests/helpers/gift-guide-fixtures.mjs';

const root = path.resolve(process.argv[2] || '_site');
const guides = readGuides();
const baseline = readBaseline();
assert.ok(guides.length >= baseline.guides.length, 'Every migrated guide remains published');
const routeSet = new Set(guides.map(guide => canonicalUrl(guide.data)));
assert.equal(routeSet.size, guides.length, 'One canonical route per guide');
const aliases = new Set(guides.flatMap(redirectAliases));
const absolute = url => new URL(url, origin).href;
const schema = (doc, type) => doc.schemas.filter(value => [value['@type']].flat().includes(type));
const meta = (doc, key) => doc.nodes(node => node.name === 'meta' && (node.attribs.name === key || node.attribs.property === key)).map(node => node.attribs.content);

function indexable(doc, url) {
  assert.deepEqual(doc.nodes(node => node.name === 'link' && node.attribs.rel === 'canonical').map(node => node.attribs.href), [absolute(url)], `${url}: one self canonical`);
  assert.deepEqual(meta(doc, 'og:url'), [absolute(url)], `${url}: Open Graph URL`);
  assert.equal(meta(doc, 'robots').length, 1);
  assert.ok(!/\b(?:noindex|none)\b/i.test(meta(doc, 'robots')[0]), `${url}: indexable`);
  assert.equal(doc.nodes(node => node.name === 'h1').length, 1, `${url}: one H1`);
  assert.ok(doc.nodes(node => Object.hasOwn(node.attribs || {}, 'data-pagefind-body')).length, `${url}: searchable article body`);
  assert.equal(doc.nodes(node => node.name === 'html' && node.attribs['data-pagefind-ignore'] === 'all').length, 0);
  assert.equal(doc.nodes(node => node.name === 'meta' && /^refresh$/i.test(node.attribs['http-equiv'] || '')).length, 0, `${url}: no meta-refresh substitute`);
  for (const script of doc.nodes(node => node.name === 'script' && !node.attribs.src && node.attribs.type !== 'application/ld+json')) {
    assert.ok(!/(?:window\.)?location\s*(?:\.(?:href|pathname)\s*=|\.(?:replace|assign)\s*\(|=)/.test(DomUtils.textContent(script)), `${url}: no JavaScript redirect substitute`);
  }
}

const hub = readHtml(root, '/geschenke/');
indexable(hub, '/geschenke/');
const hubList = schema(hub, 'ItemList').find(value => value['@id'] === `${origin}/geschenke/#guides`);
assert.ok(hubList, 'Hub has a source-backed ItemList');
assert.equal(hubList.numberOfItems, guides.length);
const hubItems = hubList.itemListElement.map(entry => entry.url || entry.item?.url);
assert.equal(new Set(hubItems).size, guides.length, 'No duplicate schema entries on the hub');
assert.deepEqual(new Set(hubItems), new Set([...routeSet].map(absolute)));
for (const guide of guides) {
  const url = canonicalUrl(guide.data);
  const links = hub.nodes(node => node.name === 'a' && node.attribs.href === url && hasClass(node, 'news-row__link'));
  assert.equal(links.length, 1, `${url}: exactly one guide entry on the hub`);
}

const redirectsText = fs.readFileSync(path.join(root, '_redirects'), 'utf8');
const redirectRules = redirectsText.split('\n').map(line => line.trim().split(/\s+/)).filter(parts => parts[0] && !parts[0].startsWith('#'));
const ruleMap = new Map();
for (const parts of redirectRules) {
  if (!aliases.has(parts[0])) continue;
  assert.ok(!ruleMap.has(parts[0]), `No duplicated legacy redirect: ${parts[0]}`);
  ruleMap.set(parts[0], parts);
}
const archiveLinks = htmlFiles(path.join(root, 'blog')).flatMap(file => {
  const relative = path.relative(path.join(root, 'blog'), file).replaceAll(path.sep, '/');
  if (relative !== 'index.html' && !/^page\/\d+\/index\.html$/.test(relative)) return [];
  return parseHtml(fs.readFileSync(file, 'utf8')).nodes(node => node.name === 'a' && (hasClass(node, 'news-row__link') || hasClass(node, 'news-feature__link'))).map(node => node.attribs.href);
});

const sitemapDoc = parseDocument(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8'), { xmlMode: true });
const sitemapUrls = allNodes(sitemapDoc, node => node.name === 'loc').map(node => DomUtils.textContent(node));
assert.equal(sitemapUrls.filter(url => url === `${origin}/geschenke/`).length, 1, 'Hub appears once in the sitemap');
const feedDoc = parseDocument(fs.readFileSync(path.join(root, 'feed.xml'), 'utf8'), { xmlMode: true });
const feedItems = allNodes(feedDoc, node => node.name === 'item');
const feedValues = (item, name) => allNodes(item, node => node.name === name).map(node => DomUtils.textContent(node));
const feedLinks = feedItems.flatMap(item => feedValues(item, 'link'));
assert.equal(new Set(feedLinks).size, feedLinks.length, 'RSS does not duplicate migrated articles');

for (const guide of guides) {
  const url = canonicalUrl(guide.data);
  const label = `${guide.source}: ${url}`;
  const doc = readHtml(root, url);
  indexable(doc, url);
  assert.equal(sitemapUrls.filter(value => value === absolute(url)).length, 1, `${label}: sitemap entry`);
  assert.equal(archiveLinks.filter(value => value === url).length, 1, `${label}: exactly one article across all blog pages`);
  assert.equal(doc.nodes(node => hasClass(node, 'gift-guide')).length, 1);
  assert.equal(doc.nodes(node => hasClass(node, 'post-toc')).length, 0, 'Buying guides retain the deliberate TOC exclusion');
  const guideBody = doc.nodes(node => hasClass(node, 'gift-guide'))[0];
  const idList = allNodes(guideBody, node => node.attribs?.id).map(node => node.attribs.id);
  assert.equal(new Set(idList).size, idList.length, `${label}: unambiguous anchors`);
  const blogPost = schema(doc, 'BlogPosting').find(value => value['@id'] === `${absolute(url)}#blogposting`);
  assert.ok(blogPost, `${label}: BlogPosting preserved`);
  assert.equal(blogPost.url, absolute(url));
  assert.equal(blogPost.mainEntityOfPage['@id'], absolute(url));
  assert.equal(new Date(blogPost.datePublished).valueOf(), new Date(guide.data.date).valueOf(), `${label}: original publication instant`);
  assert.equal(new Date(blogPost.dateModified).valueOf(), new Date(guide.data.last_modified_at || guide.data.date).valueOf(), `${label}: truthful modification date`);
  assert.equal(blogPost.headline, guide.data.title);
  const breadcrumb = schema(doc, 'BreadcrumbList').find(value => value.itemListElement?.some(entry => entry.item === `${origin}/geschenke/`));
  assert.ok(breadcrumb, `${label}: hub breadcrumb in schema`);
  assert.equal(breadcrumb.itemListElement.at(-1).item, absolute(url));
  assert.ok(doc.nodes(node => node.name === 'nav' && /Brotkrümel/.test(node.attribs['aria-label'] || '')).some(node => allNodes(node, child => child.name === 'a' && child.attribs.href === '/geschenke/').length), `${label}: native hub breadcrumb`);
  const sections = doc.nodes(node => node.name === 'section' && hasClass(node, 'gift-product'));
  assert.equal(sections.length, guide.data.products.length);
  for (const [index, product] of guide.data.products.entries()) {
    const section = sections[index];
    const children = predicate => allNodes(section, predicate);
    assert.equal(section.attribs['aria-labelledby'], product.id);
    assert.equal(textOf(children(node => node.name === 'h2')[0]), product.title || product.name);
    const buyingLinks = children(node => node.name === 'a' && hasClass(node, 'gift-product__buy'));
    assert.deepEqual(buyingLinks.map(node => node.attribs.href), product.url ? [product.url] : [], `${label}: exact affiliate destination for ${product.id}`);
    if (product.url && guide.data.buying_guide?.affiliate_links && product.affiliate !== false) {
      assert.ok(buyingLinks[0].attribs.rel.split(/\s+/).includes('sponsored'));
    }
    const images = children(node => node.name === 'img');
    if (product.image && fs.existsSync(path.resolve(product.image.replace(/^\//, '')))) {
      assert.equal(images.length, 1, `${product.id}: existing product image rendered`);
      assert.equal(images[0].attribs.src, product.image);
      assert.equal(images[0].attribs.alt, product.image_alt || product.name);
      assert.ok(Number(images[0].attribs.width) > 0 && Number(images[0].attribs.height) > 0);
      assert.ok(images[0].attribs.srcset, `${product.id}: production responsive variants`);
    } else assert.equal(images.length, 0, `${product.id}: missing optional images produce no broken media`);
  }
  for (const alias of redirectAliases(guide)) {
    assert.ok(!fs.existsSync(path.join(root, alias.replace(/^\//, ''), 'index.html')), `${alias}: no duplicate dated article output`);
    if (alias.endsWith('/index.html')) assert.ok(!fs.existsSync(path.join(root, alias.replace(/^\//, ''))));
    assert.ok(!sitemapUrls.includes(absolute(alias)), `${alias}: absent from sitemap`);
    assert.ok(!feedLinks.includes(absolute(alias)), `${alias}: absent from feed`);
    if (!alias.endsWith('/') && !alias.endsWith('/index.html')) continue; // Netlify normalizes trailing slashes.
    const rule = ruleMap.get(alias);
    assert.ok(rule, `${alias}: deployed redirect rule`);
    assert.deepEqual(rule.slice(1, 3), [url, '301!'], `${alias}: forced permanent redirect directly to canonical`);
  }
  for (const item of feedItems.filter(item => feedValues(item, 'link').includes(absolute(url)))) {
    assert.deepEqual(feedValues(item, 'guid'), [absolute(url)]);
    assert.equal(new Date(feedValues(item, 'pubDate')[0]).valueOf(), new Date(guide.data.date).valueOf());
  }
}

for (const entry of baseline.guides) {
  const current = guides.find(guide => guide.source === entry.source);
  assert.ok(current, entry.source);
  assert.deepEqual(protectedMetadata(current.data), entry.metadata);
  assert.equal(fingerprint(current.data.products), entry.productsHash);
  assert.equal(bodyFingerprint(current.body), entry.bodyHash);
}

let checkedLinks = 0;
for (const file of htmlFiles(root)) {
  const doc = parseHtml(fs.readFileSync(file, 'utf8'));
  for (const node of doc.nodes(node => (node.name === 'a' || node.name === 'link') && node.attribs.href)) {
    let url;
    try { url = new URL(node.attribs.href, origin); } catch { continue; }
    if (url.origin !== origin) continue;
    checkedLinks++;
    assert.ok(!aliases.has(url.pathname), `${path.relative(root, file)}: internal link still targets dated guide ${url.pathname}`);
  }
}
const ordinary = JSON.parse(fs.readFileSync('scripts/tests/fixtures/seo-recovery-baseline.json', 'utf8'))[0];
const ordinaryDoc = readHtml(root, ordinary.url);
assert.deepEqual(ordinaryDoc.nodes(node => node.name === 'link' && node.attribs.rel === 'canonical').map(node => node.attribs.href), [absolute(ordinary.url)], 'Normal blog article retains its dated canonical');
assert.ok(!redirectRules.some(parts => parts[0] === ordinary.url), 'Normal article receives no migration redirect');
console.log(`[gift-guides-qa] PASS: hub, ${guides.length} unique guides, canonical/OG/schema/dates, direct legacy rules, sitemap/feed/archive and ${checkedLinks} internal links; product/editorial baselines unchanged.`);
