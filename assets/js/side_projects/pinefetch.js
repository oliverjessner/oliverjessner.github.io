document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.querySelector('[data-pinefetch-lightbox]');
    const triggers = document.querySelectorAll('[data-pinefetch-lightbox-trigger]');

    if (!lightbox || triggers.length === 0) {
        return;
    }

    const image = lightbox.querySelector('[data-pinefetch-lightbox-image]');
    const caption = lightbox.querySelector('[data-pinefetch-lightbox-caption]');
    const closeButton = lightbox.querySelector('.pinefetch-lightbox__close');
    const closeTriggers = lightbox.querySelectorAll('[data-pinefetch-lightbox-close]');
    let activeTrigger = null;

    const closeLightbox = () => {
        if (lightbox.hidden) {
            return;
        }

        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('pinefetch-lightbox-open');

        if (activeTrigger) {
            activeTrigger.setAttribute('aria-expanded', 'false');
        }

        window.setTimeout(() => {
            lightbox.hidden = true;
            image.removeAttribute('src');
            activeTrigger?.focus();
            activeTrigger = null;
        }, 180);
    };

    const openLightbox = trigger => {
        const source = trigger.dataset.lightboxSrc;
        if (!source || !image || !caption) {
            return;
        }

        activeTrigger = trigger;
        image.src = source;
        image.alt = trigger.dataset.lightboxAlt || '';
        caption.textContent = trigger.dataset.lightboxCaption || '';
        trigger.setAttribute('aria-expanded', 'true');
        lightbox.hidden = false;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('pinefetch-lightbox-open');

        window.requestAnimationFrame(() => {
            lightbox.classList.add('is-open');
            closeButton?.focus();
        });
    };

    triggers.forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.addEventListener('click', () => openLightbox(trigger));
    });

    closeTriggers.forEach(trigger => trigger.addEventListener('click', closeLightbox));

    document.addEventListener('keydown', event => {
        if (lightbox.hidden) {
            return;
        }

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'Tab') {
            event.preventDefault();
            closeButton?.focus();
        }
    });
});
