(function () {
    'use strict';

    var archive = document.querySelector('[data-publication-archive]');
    var filterRegion = document.querySelector('[data-publication-filters]');

    if (!archive || !filterRegion) {
        return;
    }

    var rows = Array.prototype.slice.call(archive.querySelectorAll('[data-publication-item]'));
    var buttons = Array.prototype.slice.call(filterRegion.querySelectorAll('[data-publication-filter]'));
    var status = document.querySelector('[data-publication-status]');
    var emptyMessage = document.querySelector('[data-publication-empty]');

    if (buttons.length === 0) {
        return;
    }

    var publishers = buttons.map(function (button) {
        return button.getAttribute('data-publication-filter');
    });
    var selectedPublisher;

    function readUrl() {
        var params = new URL(window.location.href).searchParams;
        var publisher = params.get('publisher') || 'all';
        selectedPublisher = publishers.indexOf(publisher) !== -1 ? publisher : 'all';
    }

    function writeUrl(method) {
        var url = new URL(window.location.href);

        url.searchParams.delete('year');
        url.searchParams.delete('limit');

        if (selectedPublisher === 'all') {
            url.searchParams.delete('publisher');
        } else {
            url.searchParams.set('publisher', selectedPublisher);
        }

        if (url.href !== window.location.href) {
            window.history[method + 'State'](window.history.state, '', url.href);
        }
    }

    function render() {
        var visibleCount = 0;

        rows.forEach(function (row) {
            var isVisible = selectedPublisher === 'all' || row.getAttribute('data-publication-publisher') === selectedPublisher;
            row.hidden = !isVisible;

            if (isVisible) {
                visibleCount += 1;
            }
        });

        buttons.forEach(function (button) {
            var isActive = button.getAttribute('data-publication-filter') === selectedPublisher;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        if (status) {
            status.textContent = visibleCount +
                (visibleCount === 1 ? ' Veröffentlichung angezeigt.' : ' Veröffentlichungen angezeigt.');
        }

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    }

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var publisher = button.getAttribute('data-publication-filter');

            if (publisher === selectedPublisher) {
                return;
            }

            selectedPublisher = publisher;
            render();
            writeUrl('push');
        });
    });

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
