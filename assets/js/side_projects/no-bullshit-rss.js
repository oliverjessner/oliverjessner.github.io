(function () {
    const pageRoot = document.querySelector('.nobullshitrss');

    if (!pageRoot) {
        return;
    }

    const initReveal = () => {
        const revealItems = pageRoot.querySelectorAll('[data-reveal]');

        if (!revealItems.length) {
            return;
        }

        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            revealItems.forEach((item) => item.classList.add('is-visible'));
            return;
        }

        pageRoot.classList.add('nbs-reveal-ready');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
        );

        revealItems.forEach((item) => observer.observe(item));
    };

    const initFeedToggle = () => {
        const screenshot = pageRoot.querySelector('[data-feed-screenshot]');
        const toggleButtons = pageRoot.querySelectorAll('[data-feed-view]');

        if (!screenshot || !toggleButtons.length) {
            return;
        }

        toggleButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const isCompact = button.dataset.feedView === 'compact';

                toggleButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
                screenshot.src = isCompact ? screenshot.dataset.compactSrc : screenshot.dataset.cardsSrc;
                screenshot.srcset = isCompact ? screenshot.dataset.compactSrcset : screenshot.dataset.cardsSrcset;
                screenshot.alt = `NO-BULLSHIT-RSS chronological feed in ${isCompact ? 'compact' : 'card'} view`;
            });
        });
    };

    initReveal();
    initFeedToggle();
})();
