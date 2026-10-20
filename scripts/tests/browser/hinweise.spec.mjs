import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const url = '/journalismus/hinweise/';
const mailto = 'mailto:team@oliverjessner.at?subject=Kontaktanfrage';
const title = 'Hinweise aus Tech und Wirtschaft';
const sections = [
  'Welche Hinweise interessieren mich?',
  'So geht es weiter',
  'Vertraulichkeit und Quellenschutz',
];
const warnings = [
  'Normale E-Mails sind nicht Ende-zu-Ende verschlüsselt. Bitte sende zunächst keine sensiblen Details oder Dokumente.',
  'Nur für einen allgemeinen Erstkontakt. Bitte keine vertraulichen Dateien per E-Mail senden.',
];
const errors = new WeakMap();
const externalRequests = new WeakMap();
const texts = async locator => (await locator.allTextContents()).map(value => value.replace(/\s+/g, ' ').trim());
const blockThirdParties = page => page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
  ? route.continue() : route.fulfill({ status: 204, body: '' }));
const noOverflow = async page => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
const scan = async page => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
  expect(results.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map(node => node.target) }))).toEqual([]);
};
test.beforeEach(async ({ page }) => {
  errors.set(page, []);
  externalRequests.set(page, []);
  page.on('pageerror', error => errors.get(page).push(error.message));
  page.on('request', request => {
    if (/^https?:/.test(request.url()) && new URL(request.url()).hostname !== '127.0.0.1') externalRequests.get(page).push(request.url());
  });
  await blockThirdParties(page);
});
test.afterEach(async ({ page }) => expect(errors.get(page)).toEqual([]));

test('compact content keeps email safety notes, publication navigation and native protection anchor', async ({ page }) => {
  await page.goto(url);
  await expect(page.locator('main h1')).toHaveText(title);
  expect(await texts(page.locator('main h2'))).toEqual(sections);
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', `https://oliverjessner.at${url}`);
  await expect(page).toHaveTitle(/Hinweise|Leaks/);
  expect((await page.locator('main').innerText()).trim().split(/\s+/).length).toBeLessThanOrEqual(300);
  await expect(page.locator('main')).toContainText('Eine Veröffentlichung ist nicht garantiert.');
  await expect(page.locator('main')).toContainText('Vertraulichkeit ist keine technische Anonymität.');
  await expect(page.locator('main')).toContainText('Absolute Anonymität kann ich nicht garantieren.');
  expect(await texts(page.locator('.hinweise-topics > li'))).toEqual([
    'Missstände bei Tech-Unternehmen, Plattformen, Startups und Investoren.',
    'Irreführende KI-Versprechen, Datenschutzverstöße und vertuschte Sicherheitsvorfälle.',
    'Interne Dokumente, Datensätze oder konkrete Beobachtungen mit öffentlichem Interesse.',
  ]);
  await expect(page.locator('.hinweise-process > li')).toHaveCount(3);
  await expect(page.locator('main details, main .hinweise-faq, main .hinweise-final')).toHaveCount(0);
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => {
    const data = JSON.parse(node.textContent);
    return data['@graph'] || [data];
  }));
  expect(schemas.some(schema => schema['@type'] === 'FAQPage')).toBe(false);
  const links = page.locator('main a[href^="mailto:"]');
  await expect(links).toHaveCount(2);
  for (const [index, name] of ['Kontakt aufnehmen', 'Erstkontakt per E-Mail'].entries()) {
    const link = page.locator('main').getByRole('link', { name, exact: true });
    await expect(link).toHaveAttribute('href', mailto);
    await expect(link).toHaveAttribute('aria-describedby', index === 0 ? 'hinweise-email-note' : 'hinweise-final-note');
    await expect(link).toHaveAccessibleDescription(warnings[index]);
    const warning = page.locator('main').getByText(warnings[index], { exact: true });
    await expect(warning).toBeVisible();
    // Each warning belongs to its own contact area, rather than a distant footer.
    expect(await link.evaluate((node, message) => {
      for (let area = node.parentElement; area && area.tagName !== 'MAIN'; area = area.parentElement) {
        if (['SECTION', 'HEADER'].includes(area.tagName) && area.textContent.replace(/\s+/g, ' ').includes(message)) return true;
      }
      return false;
    }, warnings[index])).toBe(true);
  }
  const breadcrumb = page.getByRole('navigation', { name: 'Brotkrümelnavigation' });
  await expect(breadcrumb.getByRole('link', { name: 'Startseite', exact: true })).toHaveAttribute('href', '/');
  await expect(breadcrumb.getByRole('link', { name: 'Journalismus', exact: true })).toHaveAttribute('href', '/journalismus/uebersicht/');
  const protection = page.locator('main').getByRole('link', { name: /Über Vertraulichkeit und Quellenschutz/ });
  await expect(protection).toHaveAttribute('href', '#quellenschutz');
  await expect(page.locator('main').getByRole('link', { name: 'Meine Veröffentlichungen', exact: true })).toHaveAttribute('href', '/journalismus/publications/');
  await expect(page.locator('main form, main input[type="file"], main textarea')).toHaveCount(0);
  await expect(page.locator('script[src*="googletagmanager"], script[src*="google-analytics"], script[src*="googlesyndication"], ins.adsbygoogle, meta[name="google-adsense-account"]')).toHaveCount(0);
  expect(externalRequests.get(page)).toEqual([]);
  await protection.focus();
  await expect(protection).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#quellenschutz$/);
});

for (const width of [1440, 768, 390, 320]) {
  test(`editorial tip page reflows and passes axe at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(url);
    await expect(page.locator('main h1')).toHaveText(title);
    await expect(page.locator('main details, main .hinweise-faq')).toHaveCount(0);
    await expect(page.locator('main').getByRole('link', { name: 'Kontakt aufnehmen', exact: true })).toBeVisible();
    await expect(page.locator('main').getByRole('link', { name: 'Erstkontakt per E-Mail', exact: true })).toBeVisible();
    await noOverflow(page);
    await scan(page);
    await page.screenshot({ path: testInfo.outputPath(`hinweise-${width}.png`), fullPage: width >= 768 });
  });
}

test('200% text preserves the security notes, complete headlines and protection section at narrow reflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.goto(url);
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await noOverflow(page);
  expect(await page.locator('main h1').evaluate(node => node.scrollHeight <= node.clientHeight + 1)).toBe(true);
  for (const warning of warnings) await expect(page.locator('main').getByText(warning, { exact: true })).toBeVisible();
  await page.locator('main').getByRole('link', { name: /Über Vertraulichkeit und Quellenschutz/ }).click();
  await expect(page).toHaveURL(/#quellenschutz$/);
  await noOverflow(page);
  await scan(page);
  await page.screenshot({ path: testInfo.outputPath('hinweise-text-200.png') });
});

test('compact content, native protection anchor and email links work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 1000 } });
  const page = await context.newPage();
  try {
    await blockThirdParties(page);
    await page.goto(`http://127.0.0.1:4192${url}`);
    await expect(page.locator('main h1')).toHaveText(title);
    expect(await texts(page.locator('main h2'))).toEqual(sections);
    await expect(page.locator(`main a[href="${mailto}"]`)).toHaveCount(2);
    await expect(page.locator('main details, main .hinweise-faq')).toHaveCount(0);
    await expect(page.locator('main').getByRole('link', { name: 'Meine Veröffentlichungen', exact: true })).toHaveAttribute('href', '/journalismus/publications/');
    await page.locator('main').getByRole('link', { name: /Über Vertraulichkeit und Quellenschutz/ }).click();
    await expect(page).toHaveURL(/#quellenschutz$/);
    await noOverflow(page);
  } finally { await context.close(); }
});
