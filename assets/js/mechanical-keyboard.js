const controllers = new WeakMap();
const introductions = new WeakMap();

/** Initialize one server-rendered keyboard. Returns cleanup for dynamic mounts. */
export function initMechanicalKeyboard(root) {
  if (controllers.has(root)) return controllers.get(root);
  const buttons = [...root.querySelectorAll(".mk-key")];
  const letters = buttons.filter(button => button.dataset.mkLetter);
  const physicalLetters = new Set((root.dataset.mkPhysicalLetters || '').split(','));
  const physicalHeld = new Map();
  const settings = Object.fromEntries(["press", "release", "idleMin", "idleMax", "idleHold", "resumeDelay", "introDelay", "introGap", "introHold"].map(name => [name, Number(root.dataset[`mk${name[0].toUpperCase()}${name.slice(1)}`])]));
  const introKeys = [buttons.find(button => button.dataset.mkLetter === "D"), root.querySelector(".mk-key--space")].filter(Boolean);
  let introIndex = introductions.get(root) ?? 0;
  const abort = new AbortController();
  const options = { signal: abort.signal };
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const held = new Map(buttons.map(button => [button, { pointers: new Set(), keys: new Set(), lastInput: -Infinity }]));
  const pulses = new Map();
  let visible = false;
  let autoTimer;
  let autoRelease;
  let autoKey;
  let introKey;
  let previousKey;
  let destroyed = false;
  let fontReady = false;
  let windowFocused = document.hasFocus();

  function update(button) {
    const state = held.get(button);
    button.classList.toggle("mk-key--pressed", state.pointers.size > 0 || state.keys.size > 0 || pulses.has(button));
  }

  function stopAuto() {
    clearTimeout(autoTimer);
    clearTimeout(autoRelease);
    autoKey?.classList.remove("mk-key--auto");
    autoKey = null;
    introKey?.classList.remove("mk-key--intro");
    introKey = null;
    root.dataset.mkAutoplay = "paused";
  }

  function canAnimate() {
    return !destroyed && fontReady && windowFocused && visible && !document.hidden && !motion.matches
      && !root.matches(":hover, :focus-within")
      && !buttons.some(button => button.classList.contains("mk-key--pressed"));
  }

  function schedule(resuming = false) {
    if (destroyed) return;
    stopAuto();
    const introPending = introIndex < introKeys.length;
    if (!fontReady || !canAnimate() || (!introPending && letters.length === 0)) return;
    root.dataset.mkAutoplay = "running";
    const delay = introPending
      ? (introIndex === 0 ? settings.introDelay : settings.release + settings.introGap)
      : (resuming ? settings.resumeDelay : settings.idleMin + Math.random() * (settings.idleMax - settings.idleMin));
    autoTimer = setTimeout(() => {
      if (!canAnimate()) return stopAuto();
      if (introPending) {
        introKey = introKeys[introIndex++];
        introductions.set(root, introIndex);
        introKey.classList.add("mk-key--intro");
        autoRelease = setTimeout(() => schedule(), settings.press + settings.introHold);
        return;
      }
      const candidates = letters.filter(button => button !== previousKey);
      autoKey = candidates[Math.floor(Math.random() * candidates.length)] || letters[0];
      previousKey = autoKey;
      autoKey.classList.add("mk-key--auto");
      autoRelease = setTimeout(() => schedule(), settings.press + settings.idleHold);
    }, delay);
  }

  function releaseAll() {
    physicalHeld.clear();
    for (const [button, state] of held) {
      state.pointers.clear();
      state.keys.clear();
      clearTimeout(pulses.get(button));
      pulses.delete(button);
      update(button);
    }
    stopAuto();
  }

  for (const button of buttons) {
    const state = held.get(button);
    button.addEventListener("pointerdown", event => {
      if (event.button !== 0) return;
      state.lastInput = performance.now();
      stopAuto();
      state.pointers.add(event.pointerId);
      button.setPointerCapture(event.pointerId);
      update(button);
    }, options);
    const releasePointer = event => {
      state.pointers.delete(event.pointerId);
      update(button);
      schedule(true);
    };
    for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) button.addEventListener(type, releasePointer, options);
    button.addEventListener("keydown", event => {
      if (event.key !== " " && event.key !== "Enter") return;
      state.lastInput = performance.now();
      stopAuto();
      state.keys.add(event.key);
      update(button);
    }, options);
    button.addEventListener("keyup", event => {
      state.lastInput = performance.now();
      state.keys.delete(event.key);
      update(button);
    }, options);
    button.addEventListener("blur", () => {
      state.keys.clear();
      update(button);
    }, options);
    // Assistive technology can invoke a native button without pointer/key events.
    button.addEventListener("click", event => {
      if (event.detail !== 0 || performance.now() - state.lastInput < settings.press + settings.release) return;
      stopAuto();
      clearTimeout(pulses.get(button));
      pulses.set(button, setTimeout(() => {
        pulses.delete(button);
        update(button);
        schedule(true);
      }, settings.press + settings.idleHold));
      update(button);
    }, options);
  }

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.isComposing || event.ctrlKey || event.metaKey || event.altKey
      || !visible || !windowFocused || document.hidden) return;
    const letter = event.key.toUpperCase();
    if (!physicalLetters.has(letter)) return;
    const target = event.target;
    if (target instanceof Element && (target.isContentEditable
      || target.closest('input, textarea, select, [role="textbox"], [role="combobox"]'))) return;
    const key = `physical:${event.code || letter}`;
    if (physicalHeld.has(key)) return;
    const matching = letters.filter(button => button.dataset.mkLetter === letter);
    if (!matching.length) return;
    stopAuto();
    physicalHeld.set(key, matching);
    for (const button of matching) {
      const state = held.get(button);
      state.lastInput = performance.now();
      state.keys.add(key);
      update(button);
    }
  }, options);
  document.addEventListener('keyup', event => {
    const key = `physical:${event.code || event.key.toUpperCase()}`;
    const matching = physicalHeld.get(key);
    if (!matching) return;
    physicalHeld.delete(key);
    for (const button of matching) {
      held.get(button).keys.delete(key);
      update(button);
    }
    schedule(true);
  }, options);

  root.addEventListener("pointerenter", stopAuto, options);
  root.addEventListener("pointerleave", () => schedule(true), options);
  root.addEventListener("focusin", stopAuto, options);
  root.addEventListener("focusout", () => queueMicrotask(() => schedule(true)), options);
  document.addEventListener("visibilitychange", () => { releaseAll(); schedule(true); }, options);
  window.addEventListener("blur", () => { windowFocused = false; releaseAll(); }, options);
  window.addEventListener("focus", () => { windowFocused = true; schedule(true); }, options);
  window.addEventListener("pagehide", releaseAll, options);
  window.addEventListener("pageshow", () => schedule(true), options);
  motion.addEventListener("change", () => schedule(true), options);
  const observer = new IntersectionObserver(entries => {
    if (destroyed) return;
    visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.2;
    if (!visible) releaseAll();
    schedule(true);
  }, { threshold: [0, 0.2] });
  observer.observe(root);
  Promise.resolve(document.fonts?.ready).then(() => {
    if (destroyed) return;
    fontReady = true;
    schedule();
  });

  const cleanup = () => {
    destroyed = true;
    abort.abort();
    observer.disconnect();
    releaseAll();
    delete root.dataset.mkAutoplay;
    controllers.delete(root);
  };
  controllers.set(root, cleanup);
  return cleanup;
}

document.querySelectorAll("[data-mechanical-keyboard]").forEach(initMechanicalKeyboard);
