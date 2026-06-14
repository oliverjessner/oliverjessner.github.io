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
        carousel: {
            rootSelector: '[data-sqlite-carousel]',
            slideSelector: '[data-carousel-slide]',
            previousSelector: '[data-carousel-previous]',
            nextSelector: '[data-carousel-next]',
            dotSelector: '[data-carousel-dot]',
            statusSelector: '[data-carousel-status]',
            activeClass: 'is-active',
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
            focusableSelector: 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
            openClass: 'is-open',
            bodyOpenClass: 'sqlite-hub-lightbox-open',
            closeDelayMs: 220,
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

    const initCarousels = page => {
        const cfg = CONFIG.carousel;

        qsa(page, cfg.rootSelector).forEach(root => {
            const slides = qsa(root, cfg.slideSelector);
            const dots = qsa(root, cfg.dotSelector);
            const previousButton = qs(root, cfg.previousSelector);
            const nextButton = qs(root, cfg.nextSelector);
            const status = qs(root, cfg.statusSelector);

            if (slides.length === 0) {
                return;
            }

            let currentIndex = 0;

            const showSlide = requestedIndex => {
                currentIndex = (requestedIndex + slides.length) % slides.length;

                slides.forEach((slide, index) => {
                    const isActive = index === currentIndex;
                    slide.hidden = !isActive;
                    slide.classList.toggle(cfg.activeClass, isActive);
                    slide.setAttribute('aria-hidden', String(!isActive));
                });

                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.setAttribute('aria-current', 'true');
                    } else {
                        dot.removeAttribute('aria-current');
                    }
                });

                if (status) {
                    status.textContent = `${currentIndex + 1} / ${slides.length}`;
                }
            };

            if (slides.length > 1) {
                root.tabIndex = 0;
                root.addEventListener('click', event => {
                    if (event.target.closest(cfg.previousSelector)) {
                        showSlide(currentIndex - 1);
                        return;
                    }

                    if (event.target.closest(cfg.nextSelector)) {
                        showSlide(currentIndex + 1);
                        return;
                    }

                    const dot = event.target.closest(cfg.dotSelector);
                    if (dot) {
                        showSlide(Number(dot.dataset.carouselDot));
                    }
                });

                root.addEventListener('keydown', event => {
                    const actions = {
                        ArrowLeft: () => showSlide(currentIndex - 1),
                        ArrowRight: () => showSlide(currentIndex + 1),
                        Home: () => showSlide(0),
                        End: () => showSlide(slides.length - 1),
                    };
                    const action = actions[event.key];

                    if (!action) {
                        return;
                    }

                    event.preventDefault();
                    action();
                });
            } else {
                previousButton?.setAttribute('hidden', '');
                nextButton?.setAttribute('hidden', '');
            }

            showSlide(0);
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

        page.addEventListener('click', async event => {
            const button = event.target.closest(cfg.triggerSelector);

            if (!button || !page.contains(button)) {
                return;
            }

            const selector = button.getAttribute('data-copy-target');
            const target = selector ? qs(page, selector) || qs(document, selector) : null;
            const textToCopy = button.dataset.copyText || target?.textContent?.trim() || '';

            if (!textToCopy) {
                return;
            }

            if (!defaultLabels.has(button)) {
                defaultLabels.set(button, button.textContent.trim() || cfg.idleLabel);
            }

            const existingTimer = resetTimers.get(button);
            if (existingTimer) {
                window.clearTimeout(existingTimer);
            }

            const success = await copyText(textToCopy);
            button.classList.toggle(cfg.copiedClass, success);
            button.textContent = success ? cfg.successLabel : cfg.errorLabel;

            const timerId = window.setTimeout(() => {
                button.classList.remove(cfg.copiedClass);
                button.textContent = defaultLabels.get(button) || cfg.idleLabel;
                resetTimers.delete(button);
            }, cfg.feedbackDurationMs);

            resetTimers.set(button, timerId);
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

        const closeLightbox = () => {
            if (lightbox.hidden) {
                return;
            }

            clearCloseTimer();
            lightbox.classList.remove(cfg.openClass);
            document.body.classList.remove(cfg.bodyOpenClass);

            closeTimerId = window.setTimeout(() => {
                lightbox.hidden = true;
                image.removeAttribute('src');
                image.alt = '';
                title.textContent = cfg.defaultTitle;
                caption.textContent = cfg.defaultCaption;
                lastTrigger?.focus();
                lastTrigger = null;
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
            if (trigger && page.contains(trigger)) {
                openLightbox(trigger);
            }
        });

        lightbox.addEventListener('click', event => {
            const closeTrigger = event.target.closest(cfg.closeTriggerSelector);
            if (closeTrigger && lightbox.contains(closeTrigger)) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', event => {
            if (lightbox.hidden) {
                return;
            }

            if (event.key === 'Escape') {
                closeLightbox();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusable = qsa(lightbox, cfg.focusableSelector).filter(element => !element.hidden);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        });
    };

    const initPage = () => {
        const page = qs(document, CONFIG.pageSelector);

        if (!page) {
            return;
        }

        initReveal(page);
        initCarousels(page);
        initCopyButtons(page);
        initLightbox(page);
    };

    onReady(initPage);
})();
