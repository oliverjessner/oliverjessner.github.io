Original prompt: in haben wir pages/games/duckdeep.md

das müssen wir installieren lies dazu die readme von 
[README.md](https://github.com/oliverjessner/DuckDeep/blob/main/README.md)

Notes:
- DuckDeep README says to install `duck-deep` and use `<duck-deep-game></duck-deep-game>` via `import "duck-deep/element";`.
- `npm view duck-deep` returned 404 on 2026-07-08, so the package is not currently available from the public npm registry.
- GitHub repository `oliverjessner/DuckDeep` is reachable at HEAD `25c04fb40139d242ab89dad688f8b3e13234cc42`.
- Built DuckDeep from the GitHub source in `/tmp/duckdeep-build` with `npm ci && npm run build`.
- Added `pages/games/duckdeep.md`, a `games/duckdeep` layout, page SCSS, a loader script, and the vendored `duck-deep.element.js` bundle.
- `bundle exec jekyll build` and `npm run build` both pass; only existing Sass deprecation warnings were printed.
- Installed `playwright` under the local Codex web-game skill scripts so the required Playwright client can run without changing this repo's npm dependencies.
- First Playwright client run exposed `ReferenceError: process is not defined` from the DuckDeep element bundle.
- Rebuilt the vendored element bundle with `process.env.NODE_ENV` defined as `"production"` in the temporary Vite element config, then recopied `dist/duck-deep.element.js`.
- Playwright web-game client render test passes with screenshot and `window.render_game_to_text` state under `/tmp/duckdeep-test`; no console/page errors.
- Playwright web-game client coin-click test passes under `/tmp/duckdeep-click-test`; state moves from `choose-coin` to `choose-duck`, with one revealed coin and no errors.
- Additional Playwright mini-flow passes: coin click, human duck selection, move-highlight click, final message `Move complete.`, no errors. Screenshot: `/tmp/duckdeep-flow.png`.
- Added `progress.md` to Jekyll excludes so this local workflow log is not published as a static site file.
- Removed the DuckDeep-only topline (`Product Lab`, centered title, `GitHub`) from `_layouts/games/duckdeep.html`.
- Added the global footer include to the DuckDeep layout; the global header still comes from `layout: default`.
- Browser DOM check against `http://127.0.0.1:4000/games/duckdeep/` passes: global header present, custom DuckDeep topline absent, global footer present, game present, no errors.

TODO:
- If `duck-deep` is later published to npm with a browser-safe package bundle, consider replacing the vendored asset with a normal package-based update workflow.
