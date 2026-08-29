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

    const detectPlatform = () => {
        const primaryDownload = pageRoot.querySelector('.nbs-primary-download');

        if (!primaryDownload) {
            return;
        }

        const platformValue = `${navigator.userAgentData?.platform || ''} ${navigator.platform || ''} ${navigator.userAgent || ''}`.toLowerCase();
        let platform = 'macos';
        let label = 'Download for macOS';

        if (platformValue.includes('win')) {
            platform = 'windows';
            label = 'Download for Windows';
        } else if (platformValue.includes('linux') && !platformValue.includes('android')) {
            platform = 'linux';
            label = 'Download for Linux';
        }

        const hrefKey = `platformHref${platform.charAt(0).toUpperCase()}${platform.slice(1)}`;
        const detectedHref = primaryDownload.dataset[hrefKey];
        const labelNode = primaryDownload.querySelector('[data-download-label]');

        if (detectedHref) {
            primaryDownload.href = detectedHref;
        }

        if (labelNode) {
            labelNode.textContent = label;
        }

        pageRoot.querySelector(`[data-platform-card="${platform}"]`)?.classList.add('is-detected');
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
    detectPlatform();
    initFeedToggle();
})();
