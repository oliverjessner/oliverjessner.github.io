import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import { canonicalUrl, origin, readGuides, readSource } from '../helpers/gift-guide-fixtures.mjs';

const guides = readGuides();
const hub = readSource('pages/geschenke.md');
const hubUrl = hub.data.permalink;
const pageErrors = new WeakMap();
const availableImage = image => typeof image === 'string'
  && image.startsWith('/')
  && fs.existsSync(path.resolve(image.replace(/^\/+/, '')));

async function blockThirdParties(page, baseURL) {
  const localOrigin = new URL(baseURL || 'http://127.0.0.1:4192').origin;
  await page.route('**/*', route => new URL(route.request().url()).origin === localOrigin
    ? route.continue() : route.fulfill({ status: 204, body: '' }));
}

async function visit(page, url, title) {
  const response = await page.goto(url);
  expect(response?.status(), `${url} must be generated directly, without relying on production redirects`).toBe(200);
  expect(new URL(page.url()).pathname).toBe(url);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText(title);
  await expect(page.locator('main h1')).toBeVisible();
  const canonical = new URL(url, origin).href;
  await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', canonical);
  await expect(page.locator('head meta[property="og:url"]')).toHaveCount(1);
  await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content', canonical);
  await expect(page.locator('main .post-toc, main nav[aria-label="Inhaltsverzeichnis"]')).toHaveCount(0);
  await expect(page.locator('main table')).toHaveCount(0);
  await page.evaluate(async () => { await document.fonts.ready; });
}

async function checkBreadcrumb(page, title) {
  const breadcrumb = page.locator('main').getByRole('navigation', { name: 'Brotkrümelnavigation', exact: true });
  await expect(breadcrumb).toHaveCount(1);
  await expect(breadcrumb.getByRole('link', { name: 'Startseite', exact: true })).toHaveAttribute('href', '/');
  const current = breadcrumb.locator('[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveText(title || 'Geschenke');
  if (title) {
    await expect(breadcrumb.getByRole('link', { name: 'Geschenke', exact: true })).toHaveAttribute('href', hubUrl);
    await expect(breadcrumb.locator('li')).toHaveCount(3);
  } else {
    await expect(breadcrumb.locator('li')).toHaveCount(2);
  }
}

async function checkImage(image, decorative = false) {
  await image.scrollIntoViewIfNeeded();
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
  expect(Number(await image.getAttribute('width'))).toBeGreaterThan(0);
  expect(Number(await image.getAttribute('height'))).toBeGreaterThan(0);
  if (decorative) await expect(image).toHaveAttribute('alt', '');
  else expect((await image.getAttribute('alt'))?.trim()).toBeTruthy();
}

async function checkProducts(page, data) {
  const products = data.products || [];
  const sections = page.locator('main .gift-product');
  await expect(sections).toHaveCount(products.length);
  for (const [index, product] of products.entries()) {
    const section = sections.nth(index);
    const heading = section.locator('h2');
    await expect(heading).toHaveText(product.title || product.name);
    const id = await heading.getAttribute('id');
    expect(id).toBeTruthy();
    await expect(section).toHaveAttribute('aria-labelledby', id);
    const image = section.locator('.gift-product__media img');
    if (availableImage(product.image)) {
      await expect(image).toHaveCount(1);
      await expect(image).toHaveAttribute('src', product.image);
      await expect(image).toHaveAttribute('alt', product.image_alt || product.name);
      await expect(image).toHaveAttribute('loading', 'lazy');
      await expect(image).toHaveCSS('object-fit', 'contain');
      await checkImage(image);
    } else {
      await expect(image).toHaveCount(0);
      await expect(section).toHaveClass(/\bgift-product--text-only\b/);
    }
    const buy = section.locator('.gift-product__buy');
    if (product.url) {
      const ctaLabel = product.cta_label || data.buying_guide?.cta_label || 'Produkt ansehen';
      await expect(buy).toHaveCount(1);
      await expect(buy).toHaveJSProperty('tagName', 'A');
      await expect(buy).toHaveAttribute('href', product.url);
      await expect(buy).toHaveAttribute('aria-label', `${product.name}: ${ctaLabel}`);
      expect(await buy.evaluate(node => node.hasAttribute('onclick'))).toBe(false);
      const affiliate = typeof product.affiliate === 'boolean' ? product.affiliate : data.buying_guide?.affiliate_links === true;
      if (affiliate) await expect(buy).toHaveAttribute('rel', /\bsponsored\b/);
      else await expect(buy).not.toHaveAttribute('rel', /\bsponsored\b/);
      // Inspect the authored affiliate destination; never follow it during QA.
      await buy.focus();
      await expect(buy).toBeFocused();
      expect((await buy.boundingBox()).height).toBeGreaterThanOrEqual(44);
    } else {
      await expect(buy).toHaveCount(0);
    }
  }
  await expect(page.locator('main .gift-guide [role="button"]:not(button)')).toHaveCount(0);
}

async function toggleNativeFaq(page) {
  const details = page.locator('main details.post-faq-item').first();
  if (!await details.count()) return;
  const summary = details.locator(':scope > summary');
  await expect(summary).toHaveCount(1);
  const initiallyOpen = await details.getAttribute('open') !== null;
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press('Enter');
  await expect.poll(() => details.evaluate(node => node.open)).toBe(!initiallyOpen);
  await page.keyboard.press('Space');
  await expect.poll(() => details.evaluate(node => node.open)).toBe(initiallyOpen);
}

async function noOverflow(page) {
  const size = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));
  expect(size.scroll).toBeLessThanOrEqual(size.client + 1);
}

async function checkAccessibility(page, scope) {
  const result = await new AxeBuilder({ page }).include(scope)
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
  const important = result.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(important.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) }))).toEqual([]);
}

test.beforeEach(async ({ page, baseURL }) => {
  pageErrors.set(page, []);
  page.on('pageerror', error => pageErrors.get(page).push(error.message));
  await blockThirdParties(page, baseURL);
});
test.afterEach(async ({ page }) => expect(pageErrors.get(page)).toEqual([]));

for (const width of [375, 1440]) {
  test(`gift-guide hub lists the current guides at ${width}px`, async ({ page }, testInfo) => {
    expect(guides.length).toBeGreaterThan(0);
    await page.setViewportSize({ width, height: 1000 });
    await visit(page, hubUrl, hub.data.title);
    await checkBreadcrumb(page);
    const links = page.locator('main .news-feed .news-row__link');
    await expect(links).toHaveCount(guides.length);
    const destinations = await links.evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
    expect(destinations.sort()).toEqual(guides.map(({ data }) => canonicalUrl(data)).sort());
    for (const image of await page.locator('main .news-row__image').all()) await checkImage(image, true);
    await noOverflow(page);
    await checkAccessibility(page, 'main .newsroom');
    await page.screenshot({ path: testInfo.outputPath(`gift-guide-hub-${width}.png`), fullPage: true });
  });

  for (const { data } of guides) {
    const url = canonicalUrl(data);
    test(`${width}px: ${url}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      await visit(page, url, data.title);
      await checkBreadcrumb(page, data.title);
      if (availableImage(data.image)) await checkImage(page.locator('main .post-header .post-image img'));
      await checkProducts(page, data);
      await toggleNativeFaq(page);
      await noOverflow(page);
      await checkAccessibility(page, 'main .post-pagefind');
      await page.screenshot({ path: testInfo.outputPath(`gift-guide-${data.slug}-${width}.png`), fullPage: true });
    });
  }
}

test('hub navigation and guide FAQ remain native without JavaScript', async ({ browser, baseURL }) => {
  expect(guides.length).toBeGreaterThan(0);
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 1000 } });
  const page = await context.newPage();
  try {
    await blockThirdParties(page, baseURL);
    const localOrigin = new URL(baseURL || 'http://127.0.0.1:4192').origin;
    await page.goto(new URL(hubUrl, localOrigin).href);
    const link = page.locator('main .news-row__link').first();
    const destination = await link.getAttribute('href');
    expect(guides.map(({ data }) => canonicalUrl(data))).toContain(destination);
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new URL(destination, localOrigin).href);
    await expect(page.locator('main .gift-guide')).toBeVisible();
    await toggleNativeFaq(page);
    await noOverflow(page);
  } finally {
    await context.close();
  }
});
