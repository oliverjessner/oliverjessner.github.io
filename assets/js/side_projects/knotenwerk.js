document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.knotenwerk-page');
    if (!page) {
        return;
    }

    const setPressedState = (element, isPressed) => {
        if (!element) {
            return;
        }
        element.classList.toggle('is-pressed', isPressed);
    };

    const pressables = page.querySelectorAll('.kw-btn, .kw-gallery__item, .kw-window-control');
    pressables.forEach((element) => {
        element.addEventListener('pointerdown', () => {
            setPressedState(element, true);
        });

        ['pointerup', 'pointerleave', 'pointercancel', 'blur'].forEach((eventName) => {
            element.addEventListener(eventName, () => {
                setPressedState(element, false);
            });
        });

        element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                setPressedState(element, true);
            }
        });

        element.addEventListener('keyup', () => {
            setPressedState(element, false);
        });
    });

    page.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, '', targetId);
            }
        });
    });

    const statusLabel = page.querySelector('[data-status-label]');
    if (statusLabel) {
        const baseText = statusLabel.textContent.trim();
        const messages = [baseText, 'Modes: Edit • View/Demo', 'Local-first files: JSON saved on your machine'];
        let currentIndex = 0;

        window.setInterval(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            statusLabel.classList.add('is-updating');

            window.setTimeout(() => {
                statusLabel.textContent = messages[currentIndex];
                statusLabel.classList.remove('is-updating');
            }, 120);
        }, 3200);
    }

    const lightbox = document.getElementById('kw-lightbox');
    const lightboxImage = lightbox?.querySelector('[data-lightbox-image]');
    const lightboxCaption = lightbox?.querySelector('[data-lightbox-caption]');
    const lightboxClose = lightbox?.querySelector('[data-lightbox-close]');
    let lastTrigger = null;

    const closeLightbox = () => {
        if (!lightbox || lightbox.hidden) {
            return;
        }

        lightbox.hidden = true;
        lightbox.setAttribute('aria-hidden', 'true');
        page.classList.remove('kw-lightbox-open');

        if (lastTrigger) {
            lastTrigger.focus();
        }
    };

    const openLightbox = (trigger) => {
        if (!lightbox || !lightboxImage || !lightboxCaption) {
            return;
        }

        const source = trigger.getAttribute('data-lightbox-src');
        if (!source) {
            return;
        }

        lastTrigger = trigger;
        lightboxImage.src = source;
        lightboxImage.alt = trigger.getAttribute('data-lightbox-alt') || 'KnotenWerk preview image';
        lightboxCaption.textContent = trigger.getAttribute('data-lightbox-caption') || '';

        lightbox.hidden = false;
        lightbox.setAttribute('aria-hidden', 'false');
        page.classList.add('kw-lightbox-open');
        lightboxClose?.focus();
    };

    page.querySelectorAll('.kw-gallery__item').forEach((item) => {
        item.addEventListener('click', () => {
            openLightbox(item);
        });
    });

    lightboxClose?.addEventListener('click', closeLightbox);

    lightbox?.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });

    const heroWindow = page.querySelector('[data-draggable-window]');
    const dragHandle = heroWindow?.querySelector('[data-drag-handle]');

    if (!heroWindow || !dragHandle) {
        return;
    }

    const desktopMediaQuery = window.matchMedia('(min-width: 1024px)');
    let dragEnabled = false;
    let pointerId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let originX = 0;
    let originY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const applyTransform = () => {
        heroWindow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const syncDragMode = () => {
        dragEnabled = desktopMediaQuery.matches;
        heroWindow.classList.toggle('is-draggable', dragEnabled);

        if (!dragEnabled) {
            pointerId = null;
            offsetX = 0;
            offsetY = 0;
            heroWindow.classList.remove('is-dragging');
            heroWindow.style.transform = '';
            dragHandle.style.cursor = '';
            dragHandle.style.touchAction = '';
            return;
        }

        dragHandle.style.cursor = 'move';
        dragHandle.style.touchAction = 'none';
    };

    syncDragMode();

    if (typeof desktopMediaQuery.addEventListener === 'function') {
        desktopMediaQuery.addEventListener('change', syncDragMode);
    } else if (typeof desktopMediaQuery.addListener === 'function') {
        desktopMediaQuery.addListener(syncDragMode);
    }

    dragHandle.addEventListener('pointerdown', (event) => {
        if (!dragEnabled || event.button !== 0 || event.target.closest('.kw-window-control')) {
            return;
        }

        pointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        originX = offsetX;
        originY = offsetY;

        heroWindow.classList.add('is-dragging');
        dragHandle.setPointerCapture(pointerId);
        event.preventDefault();
    });

    dragHandle.addEventListener('pointermove', (event) => {
        if (!dragEnabled || pointerId !== event.pointerId) {
            return;
        }

        const dragX = event.clientX - dragStartX;
        const dragY = event.clientY - dragStartY;
        offsetX = Math.max(-110, Math.min(110, originX + dragX));
        offsetY = Math.max(-45, Math.min(95, originY + dragY));
        applyTransform();
    });

    const stopDragging = (event) => {
        if (pointerId !== event.pointerId) {
            return;
        }

        pointerId = null;
        heroWindow.classList.remove('is-dragging');

        if (dragHandle.hasPointerCapture(event.pointerId)) {
            dragHandle.releasePointerCapture(event.pointerId);
        }
    };

    dragHandle.addEventListener('pointerup', stopDragging);
    dragHandle.addEventListener('pointercancel', stopDragging);
});
