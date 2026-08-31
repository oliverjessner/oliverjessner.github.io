document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.side-projects-hub');
    if (!page) {
        return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    page.querySelectorAll('[data-smooth-scroll]').forEach((link) => {
        link.addEventListener('click', (event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            const targetSelector = link.getAttribute('href');
            if (!targetSelector || !targetSelector.startsWith('#')) {
                return;
            }

            const target = document.querySelector(targetSelector);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });

            const url = new URL(window.location.href);
            url.hash = targetSelector;
            window.history.pushState({}, '', url);
        });
    });

    const filters = Array.from(page.querySelectorAll('[data-filter]'));
    const cards = Array.from(page.querySelectorAll('[data-project-card]'));
    const resultsLabel = page.querySelector('[data-results-label]');
    const emptyState = page.querySelector('[data-empty-state]');

    if (!filters.length || !cards.length) {
        return;
    }

    const validFilters = new Set(filters.map((filter) => filter.dataset.filter));

    const filterFromUrl = () => {
        const value = new URL(window.location.href).searchParams.get('category') || 'all';
        return validFilters.has(value) ? value : 'all';
    };

    const syncUrl = (value) => {
        const url = new URL(window.location.href);
        if (value === 'all') {
            url.searchParams.delete('category');
        } else {
            url.searchParams.set('category', value);
        }
        window.history.pushState({}, '', url);
    };

    const renderFilter = (value, updateUrl = false) => {
        const activeValue = validFilters.has(value) ? value : 'all';
        let visibleCount = 0;

        filters.forEach((filterButton) => {
            const isActive = filterButton.dataset.filter === activeValue;
            filterButton.classList.toggle('is-active', isActive);
            filterButton.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        cards.forEach((card) => {
            const categories = (card.dataset.categories || '').split(/\s+/).filter(Boolean);
            const shouldShow = activeValue === 'all' || categories.includes(activeValue);
            card.hidden = !shouldShow;
            card.classList.toggle('is-filtered-out', !shouldShow);
            card.classList.remove('is-reversed');

            if (shouldShow) {
                card.classList.toggle('is-reversed', visibleCount % 2 === 1);
                visibleCount += 1;
            }
        });

        if (resultsLabel) {
            resultsLabel.textContent = `${visibleCount} Produkt${visibleCount === 1 ? '' : 'e'}`;
        }

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }

        if (updateUrl && filterFromUrl() !== activeValue) {
            syncUrl(activeValue);
        }
    };

    filters.forEach((filterButton) => {
        filterButton.addEventListener('click', () => {
            renderFilter(filterButton.dataset.filter || 'all', true);
        });
    });

    window.addEventListener('popstate', () => {
        renderFilter(filterFromUrl());
    });

    renderFilter(filterFromUrl());
});
