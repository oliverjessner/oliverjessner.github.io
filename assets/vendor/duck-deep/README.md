# DuckDeep Vendor Build

Source: https://github.com/oliverjessner/DuckDeep
Commit: `3487bf37e4d3e62e881515cfd16aec2d5bb133c0`

Built on 2026-09-03 with:

```sh
npm ci
npm run build
```

For the vendored browser build, `vite.element.config.ts` was built with the following production define before copying `dist/duck-deep.element.js`:

```ts
define: {
  "process.env.NODE_ENV": JSON.stringify("production"),
},
```

Without that define, the generated bundle references `process` and fails in the browser with `ReferenceError: process is not defined`.

The public npm package `duck-deep` was not available from the npm registry when this page was integrated, so the built Web Component bundle is vendored here for Jekyll.
