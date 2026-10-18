import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const blockThirdParties = page => page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.fulfill({ status: 204, body: '' }));
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

for (const width of [1920, 1440, 768, 390, 320]) {
  test(`KI newsroom, metadata, reflow and axe at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/category/ki/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Künstliche Intelligenz');
    await expect(page).toHaveTitle('KI-News, Analysen & Recherchen | Oliver Jessner');
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://oliverjessner.at/category/ki/');
    await expect(page.locator('.news-feature')).toHaveCount(4);
    await expect(page.locator('.news-row')).toHaveCount(20);
    const urls = await page.locator('.news-main article h3 > a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
    expect(new Set(urls).size).toBe(24);
    await expect(page.locator('.news-features__lead img')).toHaveAttribute('loading', 'eager');
    await expect(page.locator('.news-features__lead img')).toHaveAttribute('fetchpriority', 'high');
    await expect(page.locator('.news-row img').first()).toHaveAttribute('srcset', /responsive-156w/);
    await expect(page.locator('.news-main img:not([alt=""]), .news-main img:not([width]), .news-main img:not([height])')).toHaveCount(0);
    for (const control of await page.locator('.news-sections a, .news-search, .news-pagination a, .category-breadcrumb a').all()) expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
    expect((await page.locator('.newsroom').boundingBox()).width).toBeCloseTo(Math.min(width, 1600), 0);
    const main = await page.locator('.news-main').boundingBox();
    const sidebar = await page.locator('.news-sidebar').boundingBox();
    if (width >= 1152) {
      expect(sidebar.width).toBeCloseTo(300, 0);
      expect(sidebar.x).toBeGreaterThan(main.x + main.width);
    } else expect(sidebar.y).toBeGreaterThanOrEqual(main.y + main.height);
    await noOverflow(page);
    await scan(page);
    await page.screenshot({ path: testInfo.outputPath(`ki-${width}.png`) });
  });
}

test('category pagination is static, scoped, indexable and has truthful visible ItemLists', async ({ page }, testInfo) => {
  await page.goto('/category/ki/');
  const firstUrls = new Set(await page.locator('.news-main h3 > a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href'))));
  const next = page.getByRole('link', { name: 'Weiter zur nächsten Archivseite' });
  await expect(next).toHaveAttribute('href', '/category/ki/page/2/');
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/category\/ki\/page\/2\/$/);
  await expect(page.locator('.news-feature')).toHaveCount(0);
  await expect(page.locator('.news-row')).toHaveCount(24);
  await expect(page).toHaveTitle(/Seite 2/);
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://oliverjessner.at/category/ki/page/2/');
  await expect(page.locator('head meta[name="robots"]')).not.toHaveAttribute('content', /noindex/);
  await expect(page.locator('html')).toHaveAttribute('data-pagefind-ignore', 'all');
  const urls = await page.locator('.news-main h3 > a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
  expect(urls.every(url => !firstUrls.has(url))).toBe(true);
  const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(node => JSON.parse(node.textContent)).find(item => item['@type'] === 'CollectionPage'));
  expect(schema.mainEntity.numberOfItems).toBe(24);
  expect(schema.mainEntity.itemListElement.map(item => decodeURI(new URL(item.url).pathname))).toEqual(urls);
  await expect(page.locator('.news-pagination [aria-current="page"]')).toContainText('2');
  await expect(page.locator('.news-pagination a[rel="prev"]')).toHaveAttribute('href', '/category/ki/');
  await scan(page);
  await page.screenshot({ path: testInfo.outputPath('ki-page-2.png') });
});

test('category search, skip link and menu retain keyboard and focus behavior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto('/category/ki/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Zum Inhalt springen' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const trigger = page.getByRole('link', { name: /Artikel suchen/ });
  await trigger.focus();
  expect(await trigger.evaluate(node => getComputedStyle(node).outlineWidth)).toBe('3px');
  await page.keyboard.press('Control+k');
  const modal = page.getByRole('dialog', { name: 'Suche', exact: true });
  const input = modal.getByRole('searchbox', { name: 'Suche', exact: true });
  await expect(input).toBeFocused();
  await input.fill('GTA');
  await expect(modal.locator('[data-pagefind-search-results] a').first()).toBeVisible();
  await scan(page);
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  const menuTrigger = page.getByRole('button', { name: 'Menü öffnen', exact: true });
  await menuTrigger.focus();
  await page.keyboard.press('Enter');
  const menu = page.getByRole('dialog', { name: 'Hauptnavigation', exact: true });
  await expect(menu.getByRole('button', { name: 'Menü schließen' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menuTrigger).toBeFocused();
});

test('200% text, 400% equivalent reflow and reduced motion preserve category content', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/category/ki/');
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await noOverflow(page);
  const title = page.locator('.news-feature--lead h3');
  expect(await title.evaluate(node => node.scrollHeight <= node.clientHeight + 1)).toBe(true);
  await expect(title.locator('a')).toHaveAccessibleName(await title.textContent());
  await scan(page);
  await page.screenshot({ path: testInfo.outputPath('ki-text-200.png') });
});

for (const [name, url] of [['gaming', '/category/gaming/'], ['git', '/category/git/'], ['research', '/category/recherche/'], ['shorts', '/category/youtube-shorts/'], ['videos', '/category/youtube-videos/'], ['small', '/category/ps2/']]) {
  test(`${name} retains specialized content and passes axe`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 1000 });
    await page.goto(url);
    await expect(page.locator('main h1')).toHaveCount(1);
    if (name === 'gaming') {
      await expect(page.locator('#ign-articles')).toBeAttached();
      await expect(page.locator('#ign-articles .news-publication').first()).toContainText('IGN');
      await expect(page.getByRole('link', { name: 'Artikel auf IGN', exact: true })).toHaveAttribute('href', '/category/gaming/#ign-articles');
    }
    if (name === 'git') {
      for (const id of ['category-cluster', 'commits', 'branches', 'working-tree', 'remotes']) await expect(page.locator(`#${id}`)).toBeAttached();
      await expect(page.locator('.news-sections a[href="#commits"]')).toBeVisible();
    }
    if (name === 'research') {
      await expect(page.locator('#research-metrics')).toBeVisible();
      await expect(page.locator('script[src*="adsbygoogle"]')).toHaveCount(0);
    }
    if (name === 'shorts' || name === 'videos') {
      await expect(page.locator('.news-feature')).toHaveCount(0);
      await expect(page.locator('.oj-video-card')).toHaveCount(name === 'shorts' ? 17 : 13);
      expect(await page.locator('.category-video-grid img:not([width]), .category-video-grid img:not([height])').count()).toBe(0);
      await expect(page.locator('.video-card__poster').first()).toHaveAttribute('href', /^https:\/\/www.youtube.com\/watch\?v=/);
    }
    if (name === 'small') {
      expect(await page.locator('.news-feature').count()).toBeLessThanOrEqual(4);
      await expect(page.locator('.news-publication')).toHaveCount(0);
    }
    await noOverflow(page);
    await scan(page);
    await page.screenshot({ path: testInfo.outputPath(`${name}-mobile.png`) });
  });
}

test('empty categories retain their URL with noindex and no empty archive pages', async ({ page }) => {
  await page.goto('/category/year-in-review/');
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('.news-feature, .news-row, .news-sidebar, .news-pagination')).toHaveCount(0);
  await expect(page.locator('.news-empty a')).toHaveAttribute('href', '/blog/#kategorien');
  await scan(page);
});

test('category archive and pagination remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 1000 } });
  const page = await context.newPage();
  try {
    await blockThirdParties(page);
    await page.goto('http://127.0.0.1:4192/category/ki/');
    await expect(page.getByRole('navigation', { name: 'Hauptnavigation ohne JavaScript' })).toBeVisible();
    await page.getByRole('link', { name: 'Weiter zur nächsten Archivseite' }).click();
    await expect(page).toHaveURL(/\/category\/ki\/page\/2\/$/);
    await expect(page.locator('.news-row')).toHaveCount(24);
    await page.getByRole('link', { name: /Artikel suchen/ }).click();
    await expect(page).toHaveURL(/\/search\/$/);
  } finally { await context.close(); }
});

test('category and blog reuse identical row typography and native design tokens', async ({ page }) => {
  const style = async url => {
    await page.goto(url);
    return page.locator('.news-row h3').first().evaluate(node => {
      const css = getComputedStyle(node);
      const root = getComputedStyle(document.body);
      return [css.fontFamily, css.fontSize, css.fontWeight, css.color, css.lineHeight, root.getPropertyValue('--oj-content-width'), root.getPropertyValue('--oj-bg')];
    });
  };
  expect(await style('/category/ki/')).toEqual(await style('/blog/'));
});
