document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.side-projects-hub');
    if (!page) {
        return;
    }

    const filters = Array.from(page.querySelectorAll('[data-filter]'));
    const cards = Array.from(page.querySelectorAll('[data-project-card]'));
    const resultsLabel = page.querySelector('[data-results-label]');
    const emptyState = page.querySelector('[data-empty-state]');

    if (!filters.length || !cards.length) {
        return;
    }

    const renderFilter = (value) => {
        let visibleCount = 0;

        filters.forEach((filterButton) => {
            const isActive = filterButton.dataset.filter === value;
            filterButton.classList.toggle('is-active', isActive);
            filterButton.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        cards.forEach((card) => {
            const category = card.dataset.category;
            const shouldShow = value === 'all' || category === value;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount += 1;
            }
        });

        if (resultsLabel) {
            resultsLabel.textContent = `${visibleCount} Projekt${visibleCount === 1 ? '' : 'e'}`;
        }

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    };

    filters.forEach((filterButton) => {
        filterButton.addEventListener('click', () => {
            renderFilter(filterButton.dataset.filter || 'all');
        });
    });

    renderFilter('all');
});
