document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('[data-pinefetch-lightbox]');
    const links = document.querySelectorAll('.pinefetch-screenshots a[href]');
    if (!dialog || typeof dialog.showModal !== 'function' || links.length === 0) return;

    const image = dialog.querySelector('[data-pinefetch-lightbox-image]');
    const caption = dialog.querySelector('[data-pinefetch-lightbox-caption]');
    const closeButton = dialog.querySelector('[data-pinefetch-lightbox-close]');
    if (!image || !caption || !closeButton) return;

    let opener = null;

    links.forEach(link => {
        link.addEventListener('click', event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            event.preventDefault();
            opener = link;
            image.src = link.href;
            image.alt = link.querySelector('img')?.alt || '';
            caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent.trim() || '';
            dialog.showModal();
            closeButton.focus();
        });
    });

    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            closeButton.focus();
        }
    });
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
        image.removeAttribute('src');
        opener?.focus();
        opener = null;
    });
});
