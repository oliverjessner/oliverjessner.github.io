import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const errors = new WeakMap();
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const blockThirdParties = page => page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
  ? route.continue() : route.fulfill({ status: 204, body: '' }));
const noOverflow = async page => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
const scan = async page => {
  const results = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(results.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) }))).toEqual([]);
};
test.beforeEach(async ({ page }) => {
  await blockThirdParties(page);
  errors.set(page, []);
  page.on('pageerror', error => errors.get(page).push(error.message));
});
test.afterEach(async ({ page }) => expect(errors.get(page)).toEqual([]));

for (const colorScheme of ['light', 'dark']) {
  for (const width of [1440, 768, 390, 320]) {
    test(`${colorScheme}: editorial layout and axe at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme });
      await page.goto('/blog/');
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('.news-feature')).toHaveCount(4);
      await expect(page.locator('.news-row')).toHaveCount(20);
      await expect(page.locator('.news-contact, #kategorien details, #kategorien summary')).toHaveCount(0);
      await expect(page.locator('#kategorien li a').first()).toBeVisible();
      await expect(page.locator('.news-feature').first().locator('.news-story-topics a.oj-tag')).toHaveCount(3);
      expect(await page.locator('.news-main article').evaluateAll(nodes => nodes.every(node => node.querySelectorAll('.news-story-topics a').length <= 3))).toBe(true);
      await expect(page.locator('.news-search')).toHaveClass(/oj-button-secondary/);
      expect(await page.locator('.newsroom').evaluate(node => getComputedStyle(node).getPropertyValue('--news-bg').trim())).toBe('');
      const urls = await page.locator('.news-main article h3 a').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')));
      expect(new Set(urls).size).toBe(24);
      const dates = await page.locator('.news-feed time').evaluateAll(nodes => nodes.map(node => Date.parse(node.dateTime)));
      expect(dates.every((date, index) => Number.isFinite(date) && (index === 0 || date <= dates[index - 1]))).toBe(true);
      await expect(page.locator('.news-features__lead img')).toHaveAttribute('loading', 'eager');
      await expect(page.locator('.news-features__lead img')).toHaveAttribute('fetchpriority', 'high');
      await expect(page.locator('.news-row img').first()).toHaveAttribute('srcset', /responsive-156w/);
      await expect(page.locator('.news-row img').first()).toHaveAttribute('sizes', /156px/);
      await expect(page.locator('[data-responsive-image]')).toHaveCount(0);
      expect(await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => /fa-(solid|brands).*\.(woff2?|ttf)/.test(entry.name)).length)).toBe(0);
      expect(await page.locator('.news-main img:not([alt=""])').count()).toBe(0);
      expect(await page.locator('.news-main img:not([width]), .news-main img:not([height])').count()).toBe(0);
      if (width >= 1152) {
        expect((await page.locator('.news-sidebar').boundingBox()).x).toBeGreaterThan((await page.locator('.news-main').boundingBox()).x);
        expect((await page.locator('.news-sidebar').boundingBox()).width).toBeCloseTo(300, 0);
      } else {
        const main = await page.locator('.news-main').boundingBox();
        expect((await page.locator('.news-sidebar').boundingBox()).y).toBeGreaterThanOrEqual(main.y + main.height);
      }
      for (const target of await page.locator('.news-sections a, .news-search, .news-pagination a, .site-search-trigger').all()) {
        const box = await target.boundingBox();
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
      await noOverflow(page);
      await scan(page);
      await page.screenshot({ path: testInfo.outputPath(`${colorScheme}-${width}.png`), fullPage: width === 1440 });
    });
  }
}

test('skip link, desktop disclosure, headline and pagination keyboard navigation', async ({ page }) => {
  await page.goto('/blog/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Zum Inhalt springen', exact: true });
  await expect(skip).toBeFocused();
  expect((await skip.boundingBox()).y).toBeGreaterThanOrEqual(0);
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const disclosure = page.locator('[data-site-nav-disclosure]').first();
  await disclosure.focus();
  await page.keyboard.press('ArrowDown');
  await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.dropdown-menu:not([hidden]) a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(disclosure).toBeFocused();
  await expect(disclosure).toHaveAttribute('aria-expanded', 'false');
  const lead = page.locator('.news-feature__link').first();
  await lead.focus();
  expect(await lead.evaluate(node => getComputedStyle(node).outlineWidth)).toBe('3px');
  await expect(lead).toHaveAccessibleName(await lead.textContent());
  const next = page.getByRole('link', { name: 'Weiter zur nächsten Archivseite' });
  await next.focus();
  await page.keyboard.press('Enter');
  await page.waitForURL('**/blog/page/2/');
  await expect(page.locator('.news-feature')).toHaveCount(0);
  await expect(page.locator('.news-row')).toHaveCount(24);
  await expect(page.locator('.news-pagination [aria-current="page"]')).toContainText('2');
  await scan(page);
});

test('real Pagefind search, Ctrl/Cmd+K, Escape and focus restoration', async ({ page }) => {
  await page.goto('/blog/');
  const trigger = page.getByRole('link', { name: /Artikel suchen/ });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/blog\/$/);
  const modal = page.getByRole('dialog', { name: 'Suche', exact: true });
  const input = modal.getByRole('searchbox', { name: 'Suche', exact: true });
  await expect(input).toBeFocused();
  await input.fill('GTA');
  await expect(modal.locator('[data-pagefind-search-results] a').first()).toBeVisible({ timeout: 15_000 });
  await expect(modal.getByRole('status')).toContainText(/Treffer|Ergebnis/);
  await scan(page);
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  for (const shortcut of ['Control+k', 'Meta+k']) {
    await page.keyboard.press(shortcut);
    await expect(input).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
  }
});

test('mobile menu keeps focus, supports nested search and restores focus on close', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/blog/');
  const trigger = page.getByRole('button', { name: 'Menü öffnen', exact: true });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const menu = page.getByRole('dialog', { name: 'Hauptnavigation', exact: true });
  const close = menu.getByRole('button', { name: 'Menü schließen' });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  expect(await menu.evaluate(node => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await scan(page);
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog', { name: 'Suche', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeVisible();
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(menu).toBeHidden();
  expect(await page.locator('main').evaluate(node => node.inert)).toBe(false);
  await trigger.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(menu).toBeHidden();
  await expect(page.getByRole('button', { name: 'Suche öffnen' })).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await trigger.click();
  await expect(close).toBeFocused();
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog', { name: 'Suche', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(menu).toBeHidden();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Suche öffnen' })).toBeFocused();
});

test('200% text resize, 400% equivalent reflow, long headlines and missing metadata', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.goto('/blog/');
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
    const row = document.querySelector('.news-row');
    row.classList.add('news-row--text');
    row.querySelector('img')?.remove();
    row.querySelector('.news-meta')?.remove();
    row.querySelector('h3 a').textContent = 'Ein sehr langer vollständiger Artikeltitel über Datenrecherchen, KI-Systeme und ihre Auswirkungen auf eine zugängliche digitale Gesellschaft';
  });
  await noOverflow(page);
  const headline = page.locator('.news-row h3').first();
  expect(await headline.evaluate(node => node.scrollHeight <= node.clientHeight + 1)).toBe(true);
  await expect(page.locator('.news-row__link').first()).toHaveAccessibleName(await headline.textContent());
  await scan(page);
  await page.screenshot({ path: testInfo.outputPath('reflow-200-percent-text.png') });
  await page.getByRole('link', { name: /Artikel suchen/ }).focus();
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Suche', exact: true });
  const input = dialog.getByRole('searchbox', { name: 'Suche', exact: true });
  await input.fill('GTA');
  await expect(dialog.locator('[data-pagefind-search-results] a').first()).toBeVisible();
  expect((await input.boundingBox()).width).toBeGreaterThanOrEqual(150);
  expect(await dialog.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
  await noOverflow(page);
  await scan(page);
  await page.screenshot({ path: testInfo.outputPath('search-200-percent-text.png') });
  await page.keyboard.press('Escape');
  await expect(page.getByRole('link', { name: /Artikel suchen/ })).toBeFocused();
});

test('reduced motion and complete taxonomy work without horizontal scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/blog/');
  await expect(page.locator('#kategorien details')).toHaveCount(0);
  expect(await page.locator('#kategorien li a').count()).toBeGreaterThan(50);
  for (const [name, href] of [['YouTube Videos', '/category/youtube-videos/'], ['YouTube Shorts', '/category/youtube-shorts/'], ['31 Tage Ticker', '/ticker/']]) {
    const link = page.locator('#kategorien').getByRole('link', { name: new RegExp(name) });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveClass('oj-tag');
  }
  await noOverflow(page);
  expect(await page.locator('.news-search').evaluate(node => getComputedStyle(node).transitionDuration)).toBe('0s');
  await scan(page);
});

test('archive uses available width up to 1600px and topic links open existing destinations', async ({ page }) => {
  for (const [width, expected] of [[1440, 1440], [1920, 1600]]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/blog/');
    expect((await page.locator('.newsroom').boundingBox()).width).toBeCloseTo(expected, 0);
    expect((await page.locator('.header .oj-container').boundingBox()).width).toBeCloseTo(expected, 0);
    await noOverflow(page);
  }
  const category = page.locator('.news-feature').first().locator('.news-story-topics a').first();
  const categoryUrl = await category.getAttribute('href');
  await category.click();
  await expect(page).toHaveURL(new RegExp(`${categoryUrl}$`));
  for (const name of ['YouTube Videos', 'YouTube Shorts', '31 Tage Ticker']) {
    await page.goto('/blog/');
    const link = page.locator('#kategorien').getByRole('link', { name: new RegExp(name) });
    const href = await link.getAttribute('href');
    const [response] = await Promise.all([
      page.waitForResponse(response => response.request().isNavigationRequest()),
      link.click(),
    ]);
    expect(response.ok()).toBe(true);
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator('main h1')).toHaveCount(1);
  }
});

test('natural Tab order reaches stories, sidebar, taxonomy and pagination', async ({ page }) => {
  await page.goto('/blog/');
  const count = await page.locator('main a[href], main button').evaluateAll(nodes => {
    const visible = nodes.filter(node => node.getClientRects().length > 0);
    visible.forEach((node, index) => { node.dataset.keyboardIndex = index; });
    return visible.length;
  });
  await page.locator('[data-keyboard-index="0"]').focus();
  for (let index = 0; index < count; index++) {
    const target = page.locator(`[data-keyboard-index="${index}"]`);
    await expect(target).toBeFocused();
    const box = await target.boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(-1);
    expect(box.y).toBeLessThan(1000);
    await page.keyboard.press('Tab');
  }
});

test('search failures are announced through the existing live status', async ({ page }) => {
  await page.route('**/pagefind/pagefind.js', route => route.fulfill({ status: 404, body: 'missing' }));
  await page.goto('/blog/');
  await page.getByRole('link', { name: /Artikel suchen/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Suche', exact: true });
  await dialog.getByRole('searchbox', { name: 'Suche', exact: true }).fill('Test');
  await expect(dialog.locator('.pagefind-search')).toHaveClass(/has-error/);
  await expect(dialog.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  await expect(dialog.getByRole('status')).not.toBeEmpty();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('link', { name: /Artikel suchen/ })).toBeFocused();
});

test('navigation, search fallback and pagination work with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
  const page = await context.newPage();
  try {
    await blockThirdParties(page);
    await page.goto('http://127.0.0.1:4192/blog/');
    await expect(page.getByRole('navigation', { name: 'Hauptnavigation ohne JavaScript' })).toBeVisible();
    await expect(page.locator('.news-feature')).toHaveCount(4);
    await expect(page.locator('#kategorien details')).toHaveCount(0);
    await expect(page.locator('#kategorien li a').first()).toBeVisible();
    await page.getByRole('link', { name: 'Weiter zur nächsten Archivseite' }).click();
    await expect(page).toHaveURL(/\/blog\/page\/2\/$/);
    await expect(page.locator('.news-row')).toHaveCount(24);
    await page.getByRole('link', { name: /Artikel suchen/ }).click();
    await expect(page).toHaveURL(/\/search\/$/);
    await expect(page.getByRole('searchbox', { name: 'Suche', exact: true })).toBeVisible();
  } finally { await context.close(); }
});

test('non-blog pages retain their original layout and search', async ({ page }) => {
  for (const url of ['/', '/product-lab/', '/category/ki/']) {
    await page.goto(url);
    await expect(page.locator('.newsroom')).toHaveCount(0);
    await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1);
    await page.keyboard.press('Control+k');
    await expect(page.getByRole('dialog', { name: 'Suche', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
  }
});
