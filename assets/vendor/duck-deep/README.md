# DuckDeep Vendor Build

Source: https://github.com/oliverjessner/DuckDeep
Commit: `25c04fb40139d242ab89dad688f8b3e13234cc42`

Built on 2026-07-08 with:

```sh
npm ci
npm run build
```

For the vendored browser build, `vite.element.config.ts` was built with `process.env.NODE_ENV` defined as `"production"` before copying `dist/duck-deep.element.js`. Without that define, the generated bundle references `process` and fails in the browser.

The public npm package `duck-deep` was not available from the npm registry when this page was integrated, so the built Web Component bundle is vendored here for Jekyll.
