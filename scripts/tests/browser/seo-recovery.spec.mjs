import { test, expect } from '@playwright/test';

const articles = [
  '/blog/2025-12-31-git-letzten-commit-rueckgaengig-machen/',
  '/blog/2026-05-17-wie-funktioniert-gitignore/',
  '/blog/2026-01-23-browser-aus-europa-alternativen-zwischen-privacy-nachhaltigkeit-und-power-user-features/',
];

for (const width of [390, 1440]) {
  for (const url of articles) {
    test(`${width}px: ${url}`, async ({ page }, testInfo) => {
      // Keep responsive/layout checks reproducible; this does not test live ads or consent.
      await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
        ? route.continue() : route.fulfill({ status: 204, body: '' }));
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(url);
      await expect(page.locator('.post-title h1')).toBeVisible();
      await expect(page.locator('.post-description')).toBeVisible();
      const hero = page.locator('.post-image img');
      await expect(hero).toBeVisible();
      await expect.poll(() => hero.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      const ratios = await hero.evaluate(image => ({
        declared: Number(image.getAttribute('width')) / Number(image.getAttribute('height')),
        loaded: image.naturalWidth / image.naturalHeight,
      }));
      // Responsive candidates and density-adjusted natural sizes round to whole pixels.
      expect(ratios.declared).toBeCloseTo(ratios.loaded, 2);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const anchors = await page.locator('.post-toc a').evaluateAll(links => links.map(link => link.hash.slice(1)));
      expect(anchors.length).toBeGreaterThan(0);
      for (const id of anchors) {
        expect(await page.evaluate(id => document.querySelectorAll(`[id="${CSS.escape(decodeURIComponent(id))}"]`).length, id)).toBe(1);
      }
      await page.screenshot({ path: testInfo.outputPath(`article-top-${width}.png`) });
      await page.screenshot({ path: testInfo.outputPath(`article-${width}.png`), fullPage: true });
      await page.locator('.post-toc a').first().click();
      expect(new URL(page.url()).hash).not.toBe('');
      expect(errors).toEqual([]);
    });
  }
}
