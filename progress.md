Original prompt: Fix the DuckDeep browser error "Uncaught ReferenceError: process is not defined" in duck-deep.element.js.

## Progress

- Confirmed the vendored Web Component bundle contains ten unresolved `process.env.NODE_ENV` references.
- Reproduced the current DuckDeep `main` build at commit `3487bf37e4d3e62e881515cfd16aec2d5bb133c0`.
- Confirmed all 12 upstream Vitest tests pass.
- Added the production `define` setting to the temporary upstream build configuration and verified the rebuilt bundle contains no `process.env` references.

- Replaced the broken vendored bundle with the verified production bundle (7,126,072 bytes; SHA-256 `78fb95bff5fdec6a85c1bd3a670a8bd59354dddf565b2b48d946d25acb571fcb`).
- Jekyll production generation completed successfully (existing Sass deprecation warnings only).
- Ran the required Web Game Playwright client against `/games/duckdeep/`; initial board rendered correctly and `render_game_to_text` returned the full playable state.
- Ran a second interaction scenario: a hidden coin was revealed as value 1, phase advanced from `choose-coin` to `choose-duck`, and the status message updated to `Move exactly 1 spaces`.
- Visually inspected both generated screenshots; the board, ducks, holes, paths, coin tray, and status UI render correctly.
- Both browser scenarios completed without console errors or page errors.

## TODO

- No known blockers for this integration fix.
