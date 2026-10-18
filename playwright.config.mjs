import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './scripts/tests/browser',
  outputDir: './test-results/blog-newsroom',
  fullyParallel: true,
  workers: 2,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  timeout: 45_000,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4192',
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'light',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node tools/qa/serve-built-site.js',
    url: 'http://127.0.0.1:4192/blog/',
    reuseExistingServer: false,
    timeout: 15_000,
  },
});
