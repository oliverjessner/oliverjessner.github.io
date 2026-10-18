import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const url = '/journalismus/publications/';
const canonical = `https://oliverjessner.at${url}`;
const pageSource = fs.readFileSync('pages/publications.md', 'utf8');
const pageData = yaml.load(pageSource.match(/^---\s*\n([\s\S]*?)\n---/)[1]);
const excludedPublishers = new Set(pageData.publications_page?.excluded_publishers || []);
const sourceDirectory = '_data/publications';
const registry = JSON.parse(fs.readFileSync(path.join(sourceDirectory, 'publications.json'), 'utf8'));
const source = fs.readdirSync(sourceDirectory).filter(file => file.endsWith('.json') && file !== 'publications.json').flatMap(file => {
  const publisher = file.slice(0, -5);
  return JSON.parse(fs.readFileSync(path.join(sourceDirectory, file), 'utf8')).map(article => ({ ...article, publisher }));
});
const expected = [...new Map(source.filter(article => !excludedPublishers.has(article.publisher)).map(article => [article.link || article.url, article])).values()];
const publishers = [...new Set(expected.map(article => article.publisher))];
const articleUrls = expected.map(article => article.link || article.url);
const profileSource = fs.readFileSync('pages/authors/oliver-jessner.md', 'utf8');
const profiles = yaml.load(profileSource.match(/^---\s*\n([\s\S]*?)\n---/)[1]).publication_evidence;
const printCount = pageData.print_publication_count;
const archive = page => page.locator('[data-publication-archive]');
const rows = page => archive(page).locator('[data-publication-item]');
const visibleRows = page => archive(page).locator('[data-publication-item]:visible');
const filter = (page, publisher) => page.locator(`[data-publication-filter="${publisher}"]`);
const status = page => page.locator('[data-publication-status]');
const blockThirdParties = page => page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
  ? route.continue() : route.fulfill({ status: 204, body: '' }));
const noOverflow = async page => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
const scan = async page => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  expect(results.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) }))).toEqual([]);
};
const errors = new WeakMap();
test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  errors.set(page, []);
  page.on('pageerror', error => errors.get(page).push(error.message));
});
test.afterEach(async ({ page }) => expect(errors.get(page)).toEqual([]));

test('complete static archive preserves source articles, chronology, categories, dates and external links', async ({ page }) => {
  await page.goto(url);
  await expect(rows(page)).toHaveCount(expected.length);
  await expect(visibleRows(page)).toHaveCount(expected.length);
  await expect(filter(page, 'meinbezirk')).toHaveCount(0);
  await expect(archive(page).locator('a[href*="meinbezirk.at"]')).toHaveCount(0);
  await expect(page.locator('[data-publication-more], [data-publication-year-filter]')).toHaveCount(0);
  expect(await page.locator('.publications-metrics > div').evaluateAll(nodes => nodes.map(node => ({
    label: node.querySelector('dt').textContent.trim(), count: Number(node.querySelector('dd').textContent),
  })))).toEqual([
    { label: 'Online-Artikel', count: expected.length },
    { label: 'Online-Medien', count: publishers.length },
    { label: 'Print-Publikationen', count: printCount },
  ]);
  const records = await rows(page).evaluateAll(nodes => nodes.map(node => ({
    publisher: node.dataset.publicationPublisher,
    date: node.querySelector('time')?.dateTime,
    href: node.querySelector('h3 a')?.getAttribute('href'),
    title: node.querySelector('h3 a')?.textContent.trim().replace(/\s*↗\s*$/, ''),
    categories: [...node.querySelectorAll('.oj-tag')].map(tag => tag.textContent.trim()),
  })));
  expect(new Set(records.map(record => record.href))).toEqual(new Set(articleUrls));
  expect(new Set(records.map(record => record.href)).size).toBe(expected.length);
  expect(records.every((record, index) => Number.isFinite(Date.parse(record.date)) && (index === 0 || record.date <= records[index - 1].date))).toBe(true);
  for (const record of records) {
    const original = expected.find(article => (article.link || article.url) === record.href);
    expect(record.title).toBe(original.title);
    expect(record.date.slice(0, 10)).toBe(original.date.slice(0, 10));
    expect(record.publisher).toBe(original.publisher);
    expect(record.categories.length).toBeLessThanOrEqual(2);
    expect(new Set(record.categories.map(category => category.toLocaleLowerCase('de'))).size).toBe(record.categories.length);
  }
  for (const link of await archive(page).locator('h3 a').all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAttribute('aria-label', /öffnet in neuem Tab/);
  }
  for (const link of await visibleRows(page).locator('h3 a').all()) await expect(link).toHaveAccessibleName(/öffnet in neuem Tab/);
  await expect(archive(page).locator('a a, a button, button a, button button')).toHaveCount(0);
  await expect(page.locator('[data-pagefind-body]')).toHaveCount(1);
});

test('chronological archive replaces featured investigations and outlet strip while retaining real assets and profiles', async ({ page, request }) => {
  await page.goto(url);
  await expect(page.locator('main .news-feature, .publication-features, .publication-investigations')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Ausgewählte Recherchen', exact: true })).toHaveCount(0);
  await expect(page.locator('.publication-outlets')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Veröffentlicht bei', exact: true })).toHaveCount(0);
  await expect(archive(page).locator('img:not([width]), img:not([height])')).toHaveCount(0);
  await expect(archive(page).locator('img').first()).toHaveAttribute('loading', 'lazy');
  await expect(archive(page).locator('img').first()).toHaveAttribute('srcset', /responsive-156w/);
  const images = await rows(page).evaluateAll(nodes => nodes.map(node => ({
    href: node.querySelector('h3 a').getAttribute('href'),
    image: node.querySelector('img')?.getAttribute('src'),
  })));
  for (const { href, image } of images) {
    const original = expected.find(article => (article.link || article.url) === href);
    expect(image).toBe(original.thumbnail || original.image);
    if (image) expect((await request.get(image)).ok()).toBe(true);
  }
  for (const profile of profiles) {
    const link = page.locator(`#autorenprofile a[href=${JSON.stringify(profile.url)}]`);
    await expect(link).toHaveAttribute('href', profile.url);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAccessibleName(/\S/);
    if (profile.logo) {
      await expect(link.locator('img')).toHaveAttribute('src', profile.logo);
      await expect(link.locator('img')).toHaveAttribute('alt', '');
      expect((await request.get(profile.logo)).ok()).toBe(true);
    }
  }
  for (const [name, href] of [['Journalistische Arbeit', '/journalismus/uebersicht/'], ['Interviews & Stimmen', '/journalismus/interviews-stimmen/'], ['Blog', '/blog/']]) {
    await expect(page.locator('main').getByRole('link', { name: new RegExp(name) })).toHaveAttribute('href', href);
  }
});

test('publisher filters immediately display every matching publication', async ({ page }) => {
  await page.goto(url);
  await expect(status(page)).toHaveAttribute('aria-live', 'polite');
  await expect(filter(page, 'all')).toHaveAttribute('aria-pressed', 'true');
  for (const publisher of publishers) {
    const total = expected.filter(article => article.publisher === publisher).length;
    await expect(filter(page, publisher)).toContainText(`(${total})`);
    await filter(page, publisher).click();
    await expect(filter(page, publisher)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-publication-filter][aria-pressed="true"]')).toHaveCount(1);
    await expect(visibleRows(page)).toHaveCount(total);
    expect(await visibleRows(page).evaluateAll(nodes => nodes.every(node => node.dataset.publicationPublisher === nodes[0].dataset.publicationPublisher))).toBe(true);
    await expect(status(page)).toContainText(String(total));
    expect(new URL(page.url()).searchParams.get('publisher')).toBe(publisher);
    expect(new Set(await visibleRows(page).locator('h3 a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))))
      .toEqual(new Set(expected.filter(article => article.publisher === publisher).map(article => article.link || article.url)));
  }
  await filter(page, 'all').click();
  await expect(visibleRows(page)).toHaveCount(expected.length);
  await expect(status(page)).toContainText(String(expected.length));
  await scan(page);
});

test('publisher history, keyboard focus and legacy deep links preserve the complete archive', async ({ page }) => {
  await page.goto(url);
  await filter(page, 'gamestar').focus();
  expect(await filter(page, 'gamestar').evaluate(node => parseFloat(getComputedStyle(node).outlineWidth))).toBeGreaterThanOrEqual(2);
  await page.keyboard.press('Enter');
  await expect(filter(page, 'gamestar')).toHaveAttribute('aria-pressed', 'true');
  await filter(page, 'ign').click();
  await page.goBack();
  await expect(filter(page, 'gamestar')).toHaveAttribute('aria-pressed', 'true');
  await expect(visibleRows(page)).toHaveCount(expected.filter(article => article.publisher === 'gamestar').length);
  await page.goForward();
  await expect(filter(page, 'ign')).toHaveAttribute('aria-pressed', 'true');
  await page.goto(`${url}?publisher=golem&year=2024&limit=20&ref=portfolio#veroeffentlichungen`);
  const golemCount = expected.filter(article => article.publisher === 'golem').length;
  await expect(visibleRows(page)).toHaveCount(golemCount);
  const normalized = new URL(page.url());
  expect(normalized.searchParams.get('publisher')).toBe('golem');
  expect(normalized.searchParams.get('year')).toBeNull();
  expect(normalized.searchParams.get('limit')).toBeNull();
  expect(normalized.searchParams.get('ref')).toBe('portfolio');
  expect(normalized.hash).toBe('#veroeffentlichungen');
  await page.reload();
  await expect(filter(page, 'golem')).toHaveAttribute('aria-pressed', 'true');
  await expect(visibleRows(page)).toHaveCount(golemCount);
  await page.goto(`${url}?publisher=unknown&year=2024&limit=20&ref=portfolio#veroeffentlichungen`);
  await expect(filter(page, 'all')).toHaveAttribute('aria-pressed', 'true');
  await expect(visibleRows(page)).toHaveCount(expected.length);
  expect(new URL(page.url()).searchParams.get('publisher')).toBeNull();
  expect(new URL(page.url()).searchParams.get('ref')).toBe('portfolio');
  expect(new URL(page.url()).hash).toBe('#veroeffentlichungen');
  await page.goto(`${url}?publisher=meinbezirk`);
  await expect(filter(page, 'all')).toHaveAttribute('aria-pressed', 'true');
  await expect(visibleRows(page)).toHaveCount(expected.length);
  expect(new URL(page.url()).searchParams.get('publisher')).toBeNull();
  await scan(page);
});

test('schema describes every online article with exact dates, publishers and author attribution', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle('Veröffentlichungen & Recherchen | Oliver Jessner');
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', canonical);
  const graph = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => {
    const schema = JSON.parse(node.textContent);
    return schema['@graph'] || [schema];
  }));
  const collection = graph.find(item => item['@type'] === 'CollectionPage');
  const list = graph.find(item => item['@type'] === 'ItemList');
  const person = graph.find(item => item['@type'] === 'Person');
  const breadcrumb = graph.find(item => item['@type'] === 'BreadcrumbList');
  expect(collection.url).toBe(canonical);
  expect(person.name).toBe('Oliver Jessner');
  expect(list.numberOfItems).toBe(expected.length);
  expect(list.itemListElement).toHaveLength(expected.length);
  expect(new Set(list.itemListElement.map(entry => entry.item.url))).toEqual(new Set(articleUrls));
  for (const [index, entry] of list.itemListElement.entries()) {
    const original = expected.find(article => (article.link || article.url) === entry.item.url);
    expect(entry.position).toBe(index + 1);
    expect(entry.item.headline).toBe(original.title);
    expect(entry.item.datePublished.slice(0, 10)).toBe(original.date.slice(0, 10));
    expect(entry.item.author['@id']).toBe(person['@id']);
    expect(entry.item.publisher.name).toBe(registry.find(publisher => publisher.key === original.publisher)?.title || original.publisher);
  }
  expect(breadcrumb.itemListElement.map(entry => new URL(entry.item).pathname)).toEqual(['/', '/journalismus/uebersicht/', url]);
});

for (const width of [1920, 1440, 768, 390, 320]) {
  test(`editorial publications layout and axe at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(url);
    await expect(page.locator('main h1')).toHaveText('Veröffentlichungen');
    await expect(page.locator('main .news-feature, .publication-features, .publication-investigations')).toHaveCount(0);
    await expect(page.locator('[data-publication-more], [data-publication-year-filter]')).toHaveCount(0);
    expect(await page.locator('#veroeffentlichungen').evaluate(node => getComputedStyle(node).borderTopWidth)).toBe('0px');
    expect((await page.locator('.newsroom').boundingBox()).width).toBeCloseTo(Math.min(width, 1600), 0);
    expect(await page.locator('main h1').evaluate(node => getComputedStyle(node).fontFamily)).toContain('Comfortaa');
    await noOverflow(page);
    await scan(page);
    await page.screenshot({ path: testInfo.outputPath(`publications-${width}.png`), fullPage: width >= 1440 });
  });
}

test('200% text and 400% equivalent zoom reflow preserve complete headlines and filters', async ({ page }, testInfo) => {
  // 320 CSS pixels equals the available layout width at 400% zoom from 1280px.
  // Native browser zoom UI is not simulated by changing deviceScaleFactor.
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.goto(url);
  await noOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('publications-400-percent-reflow.png') });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await noOverflow(page);
  for (const headline of await page.locator('[data-publication-item]:visible h3').all()) {
    expect(await headline.evaluate(node => node.scrollHeight <= node.clientHeight + 1)).toBe(true);
  }
  await filter(page, 'ign').focus();
  await page.keyboard.press('Enter');
  await expect(filter(page, 'ign')).toHaveAttribute('aria-pressed', 'true');
  await expect(visibleRows(page)).toHaveCount(expected.filter(article => article.publisher === 'ign').length);
  await noOverflow(page);
  await scan(page);
  await page.screenshot({ path: testInfo.outputPath('publications-200-percent-text.png') });
});

test('complete archive, real author profiles and print summary remain accessible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 1000 } });
  const page = await context.newPage();
  try {
    await blockThirdParties(page);
    await page.goto(`http://127.0.0.1:4192${url}?publisher=golem&limit=20`);
    await expect(visibleRows(page)).toHaveCount(expected.length);
    await expect(page.locator('[data-publication-filters]')).toBeHidden();
    await expect(page.locator('[data-publication-more], [data-publication-year-filter]')).toHaveCount(0);
    expect(new Set(await rows(page).locator('h3 a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))))).toEqual(new Set(articleUrls));
    await expect(page.locator('#autorenprofile a')).toHaveCount(profiles.length);
    const printSection = page.getByRole('heading', { name: 'Print-Veröffentlichungen', exact: true }).locator('xpath=ancestor::section[1]');
    await expect(printSection).toContainText(String(printCount));
    // There are no evidenced structured print records in the repository.
    await expect(printSection.locator('article, img')).toHaveCount(0);
    await noOverflow(page);
  } finally { await context.close(); }
});
