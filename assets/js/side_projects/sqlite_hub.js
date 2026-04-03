(function () {
    const revealItems = (page) => Array.from(page.querySelectorAll('[data-reveal]'));

    const initReveal = (page) => {
        const items = revealItems(page);

        if (!items.length) {
            return;
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!('IntersectionObserver' in window) || prefersReducedMotion) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add('is-visible');
                    currentObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
                rootMargin: '0px 0px -8% 0px',
            }
        );

        items.forEach((item) => observer.observe(item));
    };

    const initEditPreview = (page) => {
        const root = page.querySelector('[data-sqlite-edit-root]');

        if (!root) {
            return;
        }

        const stage = root.querySelector('.sqlite-hub-edit-stage');
        const buttons = Array.from(root.querySelectorAll('[data-sqlite-edit-button]'));
        const panels = Array.from(root.querySelectorAll('[data-sqlite-edit-panel]'));
        const captions = Array.from(root.querySelectorAll('[data-sqlite-edit-caption]'));
        const toggleButton = root.querySelector('[data-sqlite-edit-toggle]');
        const stateLabel = root.querySelector('[data-sqlite-edit-state-label]');

        if (!stage || !buttons.length || !panels.length || !toggleButton || !stateLabel) {
            return;
        }

        const setMode = (mode) => {
            const isEditMode = mode === 'edit';

            stage.dataset.state = mode;

            buttons.forEach((button) => {
                const isActive = button.dataset.sqliteEditButton === mode;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });

            panels.forEach((panel) => {
                panel.classList.toggle('is-active', panel.dataset.sqliteEditPanel === mode);
            });

            captions.forEach((caption) => {
                caption.classList.toggle('is-active', caption.dataset.sqliteEditCaption === mode);
            });

            stateLabel.textContent = isEditMode ? root.dataset.editState || '' : root.dataset.browseState || '';
            toggleButton.textContent = isEditMode ? root.dataset.returnLabel || 'Back' : root.dataset.editLabel || 'Edit';
        };

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                setMode(button.dataset.sqliteEditButton || 'browse');
            });
        });

        toggleButton.addEventListener('click', () => {
            const nextMode = stage.dataset.state === 'edit' ? 'browse' : 'edit';
            setMode(nextMode);
        });

        setMode('browse');
    };

    const fallbackCopy = (value) => {
        const tempInput = document.createElement('textarea');
        tempInput.value = value;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    };

    const initCopyButtons = (page) => {
        const copyButtons = Array.from(page.querySelectorAll('[data-copy-target]'));

        copyButtons.forEach((button) => {
            button.dataset.defaultLabel = button.textContent.trim();

            button.addEventListener('click', async () => {
                const selector = button.getAttribute('data-copy-target');
                const target = selector ? document.querySelector(selector) : null;

                if (!target) {
                    return;
                }

                const textToCopy = button.dataset.copyText || (target.textContent ? target.textContent.trim() : '');

                if (!textToCopy) {
                    return;
                }

                try {
                    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                        await navigator.clipboard.writeText(textToCopy);
                    } else {
                        fallbackCopy(textToCopy);
                    }

                    button.classList.add('is-copied');
                    button.textContent = 'Copied';

                    window.setTimeout(() => {
                        button.classList.remove('is-copied');
                        button.textContent = button.dataset.defaultLabel || 'Copy';
                    }, 1800);
                } catch (error) {
                    fallbackCopy(textToCopy);
                    button.classList.add('is-copied');
                    button.textContent = 'Copied';

                    window.setTimeout(() => {
                        button.classList.remove('is-copied');
                        button.textContent = button.dataset.defaultLabel || 'Copy';
                    }, 1800);
                }
            });
        });
    };

    const initLightbox = (page) => {
        const lightbox = page.querySelector('[data-sqlite-lightbox]');
        const triggers = Array.from(page.querySelectorAll('[data-sqlite-lightbox-trigger]'));

        if (!lightbox || !triggers.length) {
            return;
        }

        const image = lightbox.querySelector('[data-sqlite-lightbox-image]');
        const title = lightbox.querySelector('[data-sqlite-lightbox-title]');
        const caption = lightbox.querySelector('[data-sqlite-lightbox-caption]');
        const closeButton = lightbox.querySelector('.sqlite-hub-lightbox__close');
        const closeControls = Array.from(lightbox.querySelectorAll('[data-sqlite-lightbox-close]'));
        let lastTrigger = null;
        let closeTimer = null;

        if (!image || !title || !caption || !closeButton) {
            return;
        }

        const closeLightbox = () => {
            if (lightbox.hidden) {
                return;
            }

            lightbox.classList.remove('is-open');
            document.body.classList.remove('sqlite-hub-lightbox-open');

            window.clearTimeout(closeTimer);
            closeTimer = window.setTimeout(() => {
                lightbox.hidden = true;
                image.removeAttribute('src');
                image.alt = '';
                caption.textContent = '';
                title.textContent = 'Screenshot';

                if (lastTrigger) {
                    lastTrigger.focus();
                    lastTrigger = null;
                }
            }, 220);
        };

        const openLightbox = (trigger) => {
            const source = trigger.dataset.lightboxSrc;

            if (!source) {
                return;
            }

            lastTrigger = trigger;
            lightbox.hidden = false;
            image.src = source;
            image.alt = trigger.dataset.lightboxAlt || '';
            title.textContent = trigger.dataset.lightboxTitle || 'Screenshot';
            caption.textContent = trigger.dataset.lightboxCaption || trigger.dataset.lightboxAlt || '';
            document.body.classList.add('sqlite-hub-lightbox-open');

            window.requestAnimationFrame(() => {
                lightbox.classList.add('is-open');
                closeButton.focus();
            });
        };

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', () => {
                openLightbox(trigger);
            });
        });

        closeControls.forEach((control) => {
            control.addEventListener('click', closeLightbox);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeLightbox();
            }
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        const page = document.querySelector('.sqlite-hub-page');

        if (!page) {
            return;
        }

        initReveal(page);
        initEditPreview(page);
        initCopyButtons(page);
        initLightbox(page);
    });
})();
