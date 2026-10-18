(function () {
    'use strict';

    var archive = document.querySelector('[data-publication-archive]');
    var filterRegion = document.querySelector('[data-publication-filters]');

    if (!archive || !filterRegion) {
        return;
    }

    var rows = Array.prototype.slice.call(archive.querySelectorAll('[data-publication-item]'));
    var buttons = Array.prototype.slice.call(filterRegion.querySelectorAll('[data-publication-filter]'));
    var yearFilter = filterRegion.querySelector('[data-publication-year-filter]');
    var status = document.querySelector('[data-publication-status]');
    var emptyMessage = document.querySelector('[data-publication-empty]');
    var moreButton = document.querySelector('[data-publication-more]');
    var batchSize = 20;
    var moreLabel = moreButton ? moreButton.textContent.trim() : '';
    var moreWasUsed = false;

    if (buttons.length === 0) {
        return;
    }

    var publishers = buttons.map(function (button) {
        return button.getAttribute('data-publication-filter');
    });
    var years = yearFilter ? Array.prototype.map.call(yearFilter.options, function (option) {
        return option.value;
    }) : ['all'];
    var state;

    function matchingRows() {
        return rows.filter(function (row) {
            return (state.publisher === 'all' || row.getAttribute('data-publication-publisher') === state.publisher) &&
                (state.year === 'all' || row.getAttribute('data-publication-year') === state.year);
        });
    }

    function readUrl() {
        var params = new URL(window.location.href).searchParams;
        var publisher = params.get('publisher') || 'all';
        var year = params.get('year') || 'all';
        var requestedLimit = params.get('limit') || '';

        state = {
            publisher: publishers.indexOf(publisher) !== -1 ? publisher : 'all',
            year: years.indexOf(year) !== -1 ? year : 'all',
            limit: /^[1-9]\d{0,6}$/.test(requestedLimit) ? Math.max(batchSize, Number(requestedLimit)) : batchSize,
        };
        state.limit = Math.min(state.limit, Math.max(batchSize, matchingRows().length));
        moreWasUsed = state.limit > batchSize;
    }

    function writeUrl(method) {
        var url = new URL(window.location.href);

        ['publisher', 'year', 'limit'].forEach(function (key) {
            var value = state[key];
            var isDefault = key === 'limit' ? value === batchSize : value === 'all';

            if (isDefault) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, String(value));
            }
        });

        if (url.href !== window.location.href) {
            window.history[method + 'State'](window.history.state, '', url.href);
        }
    }

    function render() {
        var matches = matchingRows();
        var visibleCount = Math.min(state.limit, matches.length);
        var visibleRows = new Set(matches.slice(0, visibleCount));
        var hasMore = visibleCount < matches.length;

        rows.forEach(function (row) {
            row.hidden = !visibleRows.has(row);
        });

        buttons.forEach(function (button) {
            var publisher = button.getAttribute('data-publication-filter');
            var isActive = publisher === state.publisher;
            var count = button.querySelector('[data-publication-filter-count]');
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));

            if (count) {
                count.textContent = '(' + rows.filter(function (row) {
                    return (publisher === 'all' || row.getAttribute('data-publication-publisher') === publisher) &&
                        (state.year === 'all' || row.getAttribute('data-publication-year') === state.year);
                }).length + ')';
            }
        });

        if (yearFilter) {
            yearFilter.value = state.year;
        }

        if (status) {
            status.textContent = visibleCount + ' von ' + matches.length +
                (matches.length === 1 ? ' Veröffentlichung angezeigt.' : ' Veröffentlichungen angezeigt.');
        }

        if (emptyMessage) {
            emptyMessage.hidden = matches.length !== 0;
        }

        if (moreButton) {
            // Keep a completed button in place after expansion so its focus never disappears.
            moreButton.hidden = !hasMore && !moreWasUsed && document.activeElement !== moreButton;
            moreButton.setAttribute('aria-disabled', String(!hasMore));
            moreButton.textContent = hasMore ? moreLabel : 'Alle Veröffentlichungen angezeigt';
        }
    }

    function changeFilters(publisher, year) {
        if (state.publisher === publisher && state.year === year) {
            return;
        }

        state = { publisher: publisher, year: year, limit: batchSize };
        moreWasUsed = false;
        render();
        writeUrl('push');
    }

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            changeFilters(button.getAttribute('data-publication-filter'), state.year);
        });
    });

    if (yearFilter) {
        yearFilter.addEventListener('change', function () {
            changeFilters(state.publisher, yearFilter.value);
        });
    }

    if (moreButton) {
        moreButton.addEventListener('click', function () {
            var total = matchingRows().length;

            if (state.limit >= total) {
                return;
            }

            state.limit = Math.min(state.limit + batchSize, total);
            moreWasUsed = true;
            render();
            writeUrl('push');
        });
    }

    window.addEventListener('popstate', function () {
        readUrl();
        render();
        writeUrl('replace');
    });

    readUrl();
    render();
    writeUrl('replace');
    filterRegion.hidden = false;
}());
