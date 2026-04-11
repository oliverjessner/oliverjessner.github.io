(() => {
    'use strict';

    const CONFIG = {
        pageSelector: '.sqlite-hub-page',

        reveal: {
            itemSelector: '[data-reveal]',
            visibleClass: 'is-visible',
            threshold: 0.16,
            rootMargin: '0px 0px -8% 0px',
            reducedMotionQuery: '(prefers-reduced-motion: reduce)',
        },

        editPreview: {
            rootSelector: '[data-sqlite-edit-root]',
            stageSelector: '.sqlite-hub-edit-stage',
            buttonSelector: '[data-sqlite-edit-button]',
            panelSelector: '[data-sqlite-edit-panel]',
            captionSelector: '[data-sqlite-edit-caption]',
            toggleSelector: '[data-sqlite-edit-toggle]',
            stateLabelSelector: '[data-sqlite-edit-state-label]',
            activeClass: 'is-active',
            defaultMode: 'browse',
            modes: {
                primary: 'browse',
                secondary: 'edit',
            },
            defaults: {
                primaryState: '',
                secondaryState: '',
                secondaryButtonLabel: 'Edit',
                backButtonLabel: 'Back',
            },
            datasetKeys: {
                button: 'sqliteEditButton',
                panel: 'sqliteEditPanel',
                caption: 'sqliteEditCaption',
            },
        },

        showcasePreview: {
            rootSelector: '[data-sqlite-showcase-root]',
            stageSelector: '.sqlite-hub-edit-stage',
            buttonSelector: '[data-sqlite-showcase-button]',
            panelSelector: '[data-sqlite-showcase-panel]',
            captionSelector: '[data-sqlite-showcase-caption]',
            toggleSelector: '[data-sqlite-showcase-toggle]',
            stateLabelSelector: '[data-sqlite-showcase-state-label]',
            activeClass: 'is-active',
            defaultMode: 'primary',
            modes: {
                primary: 'primary',
                secondary: 'secondary',
            },
            defaults: {
                primaryState: '',
                secondaryState: '',
                secondaryButtonLabel: 'Details',
                backButtonLabel: 'Back',
            },
            datasetKeys: {
                button: 'sqliteShowcaseButton',
                panel: 'sqliteShowcasePanel',
                caption: 'sqliteShowcaseCaption',
            },
        },

        copy: {
            triggerSelector: '[data-copy-target]',
            copiedClass: 'is-copied',
            idleLabel: 'Copy',
            successLabel: 'Copied',
            errorLabel: 'Copy failed',
            feedbackDurationMs: 1800,
            fallbackStyles: {
                position: 'fixed',
                top: '0',
                left: '-9999px',
                opacity: '0',
                pointerEvents: 'none',
            },
        },

        lightbox: {
            rootSelector: '[data-sqlite-lightbox]',
            triggerSelector: '[data-sqlite-lightbox-trigger]',
            imageSelector: '[data-sqlite-lightbox-image]',
            titleSelector: '[data-sqlite-lightbox-title]',
            captionSelector: '[data-sqlite-lightbox-caption]',
            closeButtonSelector: '.sqlite-hub-lightbox__close',
            closeTriggerSelector: '[data-sqlite-lightbox-close]',
            openClass: 'is-open',
            bodyOpenClass: 'sqlite-hub-lightbox-open',
            closeDelayMs: 220,
            closeKey: 'Escape',
            defaultTitle: 'Screenshot',
            defaultCaption: '',
        },
    };

    const qs = (root, selector) => root.querySelector(selector);
    const qsa = (root, selector) => Array.from(root.querySelectorAll(selector));

    const onReady = callback => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback, { once: true });
            return;
        }

        callback();
    };

    const initReveal = page => {
        const items = qsa(page, CONFIG.reveal.itemSelector);

        if (items.length === 0) {
            return;
        }

        const prefersReducedMotion = window.matchMedia(CONFIG.reveal.reducedMotionQuery).matches;
        const supportsIntersectionObserver = 'IntersectionObserver' in window;

        if (!supportsIntersectionObserver || prefersReducedMotion) {
            items.forEach(item => item.classList.add(CONFIG.reveal.visibleClass));
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(CONFIG.reveal.visibleClass);
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: CONFIG.reveal.threshold,
                rootMargin: CONFIG.reveal.rootMargin,
            },
        );

        items.forEach(item => observer.observe(item));
    };

    const bindTwoStatePreview = (root, cfg, rootDatasetKeys) => {
        const stage = qs(root, cfg.stageSelector);
        const buttons = qsa(root, cfg.buttonSelector);
        const panels = qsa(root, cfg.panelSelector);
        const captions = qsa(root, cfg.captionSelector);
        const toggleButton = qs(root, cfg.toggleSelector);
        const stateLabel = qs(root, cfg.stateLabelSelector);

        if (!stage || buttons.length === 0 || panels.length === 0 || !toggleButton || !stateLabel) {
            return false;
        }

        const setMode = mode => {
            const nextMode = mode === cfg.modes.secondary ? cfg.modes.secondary : cfg.modes.primary;
            const isSecondaryMode = nextMode === cfg.modes.secondary;

            stage.dataset.state = nextMode;

            buttons.forEach(button => {
                const isActive = button.dataset[cfg.datasetKeys.button] === nextMode;
                button.classList.toggle(cfg.activeClass, isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });

            panels.forEach(panel => {
                const isActive = panel.dataset[cfg.datasetKeys.panel] === nextMode;
                panel.classList.toggle(cfg.activeClass, isActive);
                panel.setAttribute('aria-hidden', String(!isActive));
            });

            captions.forEach(caption => {
                const isActive = caption.dataset[cfg.datasetKeys.caption] === nextMode;
                caption.classList.toggle(cfg.activeClass, isActive);
                caption.setAttribute('aria-hidden', String(!isActive));
            });

            stateLabel.textContent = isSecondaryMode
                ? root.dataset[rootDatasetKeys.secondaryState] || cfg.defaults.secondaryState
                : root.dataset[rootDatasetKeys.primaryState] || cfg.defaults.primaryState;

            toggleButton.textContent = isSecondaryMode
                ? root.dataset[rootDatasetKeys.backButtonLabel] || cfg.defaults.backButtonLabel
                : root.dataset[rootDatasetKeys.secondaryButtonLabel] || cfg.defaults.secondaryButtonLabel;
        };

        root.addEventListener('click', event => {
            const modeButton = event.target.closest(cfg.buttonSelector);
            if (modeButton && root.contains(modeButton)) {
                setMode(modeButton.dataset[cfg.datasetKeys.button]);
                return;
            }

            const toggle = event.target.closest(cfg.toggleSelector);
            if (toggle && root.contains(toggle)) {
                const currentMode = stage.dataset.state || cfg.defaultMode;
                const nextMode = currentMode === cfg.modes.secondary ? cfg.modes.primary : cfg.modes.secondary;
                setMode(nextMode);
            }
        });

        setMode(cfg.defaultMode);

        return true;
    };

    const initEditPreview = page => {
        const cfg = CONFIG.editPreview;
        const root = qs(page, cfg.rootSelector);

        if (!root) {
            return;
        }

        bindTwoStatePreview(root, cfg, {
            primaryState: 'browseState',
            secondaryState: 'editState',
            secondaryButtonLabel: 'editLabel',
            backButtonLabel: 'returnLabel',
        });
    };

    const initShowcasePreview = page => {
        const cfg = CONFIG.showcasePreview;
        const roots = qsa(page, cfg.rootSelector);

        if (roots.length === 0) {
            return;
        }

        roots.forEach(root => {
            bindTwoStatePreview(root, cfg, {
                primaryState: 'primaryState',
                secondaryState: 'secondaryState',
                secondaryButtonLabel: 'secondaryLabel',
                backButtonLabel: 'returnLabel',
            });
        });
    };

    const fallbackCopyText = text => {
        const textarea = document.createElement('textarea');

        textarea.value = text;
        textarea.setAttribute('readonly', '');

        Object.assign(textarea.style, CONFIG.copy.fallbackStyles);

        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        let didCopy = false;

        try {
            didCopy = document.execCommand('copy');
        } catch {
            didCopy = false;
        } finally {
            textarea.remove();
        }

        return didCopy;
    };

    const copyText = async text => {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                return fallbackCopyText(text);
            }
        }

        return fallbackCopyText(text);
    };

    const initCopyButtons = page => {
        const cfg = CONFIG.copy;
        const resetTimers = new WeakMap();
        const defaultLabels = new WeakMap();

        const setFeedback = (button, label, className) => {
            const existingTimer = resetTimers.get(button);
            if (existingTimer) {
                window.clearTimeout(existingTimer);
            }

            if (!defaultLabels.has(button)) {
                defaultLabels.set(button, button.textContent.trim() || cfg.idleLabel);
            }

            if (className) {
                button.classList.add(className);
            }

            button.textContent = label;

            const timerId = window.setTimeout(() => {
                button.classList.remove(cfg.copiedClass);
                button.textContent = defaultLabels.get(button) || cfg.idleLabel;
                resetTimers.delete(button);
            }, cfg.feedbackDurationMs);

            resetTimers.set(button, timerId);
        };

        page.addEventListener('click', async event => {
            const button = event.target.closest(cfg.triggerSelector);

            if (!button || !page.contains(button)) {
                return;
            }

            const selector = button.getAttribute('data-copy-target');
            const target = selector ? qs(page, selector) || qs(document, selector) : null;

            if (!target) {
                return;
            }

            const textToCopy = button.dataset.copyText || target.textContent?.trim() || '';

            if (!textToCopy) {
                return;
            }

            const success = await copyText(textToCopy);

            if (success) {
                button.classList.add(cfg.copiedClass);
                setFeedback(button, cfg.successLabel, cfg.copiedClass);
                return;
            }

            setFeedback(button, cfg.errorLabel);
        });
    };

    const initLightbox = page => {
        const cfg = CONFIG.lightbox;
        const lightbox = qs(page, cfg.rootSelector);

        if (!lightbox || qsa(page, cfg.triggerSelector).length === 0) {
            return;
        }

        const image = qs(lightbox, cfg.imageSelector);
        const title = qs(lightbox, cfg.titleSelector);
        const caption = qs(lightbox, cfg.captionSelector);
        const closeButton = qs(lightbox, cfg.closeButtonSelector);

        if (!image || !title || !caption || !closeButton) {
            return;
        }

        let lastTrigger = null;
        let closeTimerId = 0;

        const clearCloseTimer = () => {
            if (closeTimerId) {
                window.clearTimeout(closeTimerId);
                closeTimerId = 0;
            }
        };

        const resetContent = () => {
            image.removeAttribute('src');
            image.alt = '';
            title.textContent = cfg.defaultTitle;
            caption.textContent = cfg.defaultCaption;
        };

        const closeLightbox = () => {
            if (lightbox.hidden) {
                return;
            }

            clearCloseTimer();

            lightbox.classList.remove(cfg.openClass);
            document.body.classList.remove(cfg.bodyOpenClass);

            closeTimerId = window.setTimeout(() => {
                lightbox.hidden = true;
                resetContent();

                if (lastTrigger) {
                    lastTrigger.focus();
                    lastTrigger = null;
                }

                closeTimerId = 0;
            }, cfg.closeDelayMs);
        };

        const openLightbox = trigger => {
            const source = trigger.dataset.lightboxSrc;

            if (!source) {
                return;
            }

            clearCloseTimer();

            lastTrigger = trigger;
            lightbox.hidden = false;

            image.src = source;
            image.alt = trigger.dataset.lightboxAlt || '';
            title.textContent = trigger.dataset.lightboxTitle || cfg.defaultTitle;
            caption.textContent = trigger.dataset.lightboxCaption || trigger.dataset.lightboxAlt || cfg.defaultCaption;

            document.body.classList.add(cfg.bodyOpenClass);

            window.requestAnimationFrame(() => {
                lightbox.classList.add(cfg.openClass);
                closeButton.focus();
            });
        };

        page.addEventListener('click', event => {
            const trigger = event.target.closest(cfg.triggerSelector);

            if (!trigger || !page.contains(trigger)) {
                return;
            }

            openLightbox(trigger);
        });

        lightbox.addEventListener('click', event => {
            const closeTrigger = event.target.closest(cfg.closeTriggerSelector);

            if (!closeTrigger || !lightbox.contains(closeTrigger)) {
                return;
            }

            closeLightbox();
        });

        document.addEventListener('keydown', event => {
            if (event.key === cfg.closeKey) {
                closeLightbox();
            }
        });
    };

    const initPage = () => {
        const page = qs(document, CONFIG.pageSelector);

        if (!page) {
            return;
        }

        initReveal(page);
        initEditPreview(page);
        initShowcasePreview(page);
        initCopyButtons(page);
        initLightbox(page);
    };

    onReady(initPage);
})();
