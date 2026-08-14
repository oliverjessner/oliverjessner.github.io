(function () {
    'use strict';

    var filterRegion = document.querySelector('[data-publication-filters]');
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-publication-group]'));

    if (!filterRegion || groups.length === 0) {
        return;
    }

    var buttons = Array.prototype.slice.call(filterRegion.querySelectorAll('[data-publication-filter]'));
    var status = filterRegion.querySelector('[data-publication-status]');

    function updateFilter(activeButton) {
        var selectedMedium = activeButton.getAttribute('data-publication-filter');
        var visibleGroups = 0;
        var visibleArticles = 0;

        buttons.forEach(function (button) {
            var isActive = button === activeButton;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        groups.forEach(function (group) {
            var isVisible = selectedMedium === 'all' || group.getAttribute('data-publication-group') === selectedMedium;
            group.hidden = !isVisible;

            if (isVisible) {
                visibleGroups += 1;
                visibleArticles += group.querySelectorAll('.publication-list__item').length;
            }
        });

        if (status) {
            status.textContent = visibleArticles + (visibleArticles === 1 ? ' Beitrag' : ' Beiträge') +
                ' in ' + visibleGroups + (visibleGroups === 1 ? ' Medium' : ' Medien') + ' sichtbar.';
        }
    }

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            updateFilter(button);
        });
    });

    filterRegion.hidden = false;
    updateFilter(buttons[0]);
}());
