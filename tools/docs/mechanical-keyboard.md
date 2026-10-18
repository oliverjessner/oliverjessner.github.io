# Mechanical keyboard hero

The homepage source is `pages/home.md`; its public URL is `/`. `_layouts/home.html` replaces the previous portrait and typewriter with a locally rendered, interactive keyboard, retaining the introduction, social links, navigation and subsequent sections.

The home hero content is centered at 70% of the available page width, retaining the standard outer gutters. On small screens it uses 100% width to keep the words readable. The keyboard fills its container and scales proportionally. Introductory text stays within the existing content-width token. Other uses of the keyboard retain its nominal maximum width.

## Configuration and reuse

Edit `assets/js/mechanicalKeyboard.js` to change the row text, per-key colors, palette, key dimensions, gaps, depth, camera angles, spacebar width/offset and animation timings. Eleventy registers this build module explicitly; it is not copied to the public assets. Row offsets and spacebar spans are measured in key pitches (key width plus gap). Derived wall geometry and accessible labels are generated from the same settings. Keep one palette entry per character, including blank keys.

Include `framework/blocks/components/mechanical-keyboard.html` in another template. Its optional `config` parameter accepts the same derived data shape. The shared CSS is assembled through `assets/css/main.css`. Load `/assets/js/mechanical-keyboard.js` as a module on documents containing the component. The exported `initMechanicalKeyboard(root)` returns a cleanup function for dynamic mounts and avoids duplicate initialization.

`physicalLetters` configures page-level letter input. The homepage enables A, D, T, E, N, L, Y, S, J, O, I, U and M. Holding a letter presses every matching cap; releasing it lets the caps rebound. Uppercase input is supported. Space is excluded from page-level input so normal scrolling remains available. Typing in editable fields, composition input and Ctrl/Command/Alt shortcuts do not press caps. Page-level input is active only while the keyboard is visible, and blur, visibility changes and cleanup release all held letters.

## Geometry and interaction

The graphic uses an inset top, four angled wall planes and a closed rounded body built from closely spaced CSS 3D cross-sections. `plugins/keyboard-geometry.js` derives the tapered body profiles. This gives the rounded corners continuous coverage without intersecting corner facets or dark rendering seams. The dark plum stage and saturated violet/raspberry palette use soft highlights and matte surfaces.

The camera is tilted by 40 degrees and the caps are 34 units deep. A parent `scale3d()` lowers their Z height to 22% and gently widens their footprint by 7.5% during a press. The release curve adds a small spring overshoot. Idle presses use a gentler compression. Both transforms and timing remain centrally configurable; input feedback lasts 160–180 milliseconds. The contact shadow contracts separately. The board is an invisible positioning plane, with no housing or enclosing frame. CSS container units proportionally scale geometry, font sizes, gaps and perspective at narrow widths.

Each cap is a native button with an accessible label. Pointer capture supports pressing, dragging out and releasing; cancellation, lost capture, focus loss and page visibility changes clear held states. Enter and Space operate a focused key, with a visible focus ring. Assistive-technology activation also produces a short press. No sound or navigation is attached to the keys. With JavaScript disabled, native `:active` still presses a cap.

Once on initial display, after fonts are ready, the controller presses D, lets it rebound, waits 700 milliseconds and presses the wide spacebar. The initial delay is 600 milliseconds. These timings are configured through `motion.introDelay`, `introGap` and `introHold`. Progress is preserved across interruptions and reinitialization of the same element, so completed intro presses do not replay. Automatic intro state is separate from held manual input.

After the intro, the idle controller presses one letter at a time with a 3.2–5.6 second interval. Both sequences pause offscreen, when the document is hidden, during pointer/focus interaction and under `prefers-reduced-motion`. Reduced motion also removes press/release transitions while retaining direct input feedback. All listeners, observers and timers are removed by cleanup.

Visual inspiration: [Yoav Kadosh's CSS Mechanical Keyboard](https://codepen.io/ykadosh/pen/bGKgxbe). This implementation uses its own geometry and vanilla JavaScript, with no React, external runtime, audio or copied keyboard housing.
