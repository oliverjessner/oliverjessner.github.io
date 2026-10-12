# Original product fonts

These checked-in WOFF2 files restore the original product typography without runtime Google Fonts requests. The migrated editorial website continues to use its own OJ typography; this font stylesheet is linked only by the original product pages.

- Lato: normal 300, 400, 700 and 900; Latin and Latin Extended.
- Fira Mono: normal 400, 500 and 700; Latin and Latin Extended.
- Inter: normal variable 400–900; Latin and Latin Extended.
- Cormorant Garamond: normal variable 400–700; Latin and Latin Extended. The original OpenEmperor stylesheet requested normal 500/600/700 and did not request an italic face.
- Comfortaa: existing unchanged OJ WOFF2 files are referenced directly, including all six available subsets. The binary's weight axis was checked: 300–700, covering the original website request. No copies are added here.

`assets/css/legacy-product-fonts.css` contains the local `@font-face` definitions, original Google unicode ranges and `font-display: swap`. All 18 downloaded WOFF2 files were decoded and their font tables verified; Inter has a 100–900 weight axis and Cormorant Garamond a 300–700 axis, with the CSS declarations limited to the requested ranges. Downloads total 327,252 bytes. Latin/Latin Extended are localized; other scripts use normal font fallbacks, except Comfortaa's already supplied extra subsets.

Each downloaded family retains its original, unmodified **SIL Open Font License** in its family directory. License copies come from the official Google Fonts repository at commit `bd8f81ddb5c74d5c8897b36ad88b440266245103`. Comfortaa's existing license/notices remain alongside the original OJ distribution.

`provenance.json` records the Google Fonts API query, browser User-Agent, response SHA-256, exact versioned CDN URLs, each downloaded file's SHA-256/size and the pinned original license URLs/hashes. Acquisition date: 12 October 2026. The original HEAD product layouts/styles were checked for family, weight and style requirements.

For an intentional font update, retrieve the recorded Google Fonts queries with the documented User-Agent, select the Latin/Latin Extended WOFF2 faces, preserve the exact family names and required weights/styles, and update the local CSS and provenance hashes together. Verify the accompanying authentic licenses and WOFF2 font tables. Builds and deployments consume only the checked-in files and need no font-download command or parser dependency.
