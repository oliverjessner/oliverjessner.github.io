import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
    test(`SQLite Hub lightbox closes completely and restores keyboard focus at ${width}px`, async ({ page }, testInfo) => {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.setViewportSize({ width, height: 1000 });
        await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
            ? route.continue() : route.fulfill({ status: 204, body: '' }));
        await page.goto('/sqlite-hub/');

        const lightbox = page.locator('[data-sqlite-lightbox]');
        const trigger = page.locator('[data-sqlite-lightbox-trigger]').first();
        const close = lightbox.locator('.sqlite-hub-lightbox__close');
        await expect(lightbox).toBeHidden();
        await trigger.click();
        await expect(lightbox).toBeVisible();
        await expect(lightbox).toHaveClass(/is-open/);
        await expect(close).toBeFocused();
        await page.screenshot({ path: testInfo.outputPath(`sqlite-lightbox-open-${width}.png`) });

        await page.keyboard.press('Escape');
        await expect(lightbox).toBeHidden();
        await expect(trigger).toBeFocused();
        await expect(page.locator('body')).not.toHaveClass(/sqlite-hub-lightbox-open/);

        await trigger.click();
        await expect(close).toBeFocused();
        await close.click();
        await expect(lightbox).toBeHidden();
        await expect(trigger).toBeFocused();
        expect(errors).toEqual([]);
    });
}
