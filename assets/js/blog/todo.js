(() => {
    const content = document.querySelector('.content');

    if (!content) {
        return;
    }

    const checkboxes = Array.from(
        content.querySelectorAll('ul.task-list > li.task-list-item > input.task-list-item-checkbox[type="checkbox"]')
    );

    if (checkboxes.length === 0) {
        return;
    }

    const storageKey = `blogTodoState:v1:${window.location.pathname}`;
    const savedState = readState(storageKey);
    const currentKeys = new Set();
    const seenKeys = new Map();

    checkboxes.forEach(checkbox => {
        const item = checkbox.closest('li');
        const list = checkbox.closest('ul');

        if (!item || !list) {
            return;
        }

        const text = normalizeText(item.textContent);

        if (!text) {
            return;
        }

        const sectionId = findPreviousHeadingId(list) || 'checklist';
        const baseItemKey = `${sectionId}:${hashText(text)}`;
        const seenCount = (seenKeys.get(baseItemKey) || 0) + 1;
        const itemKey = seenCount > 1 ? `${baseItemKey}:${seenCount}` : baseItemKey;

        seenKeys.set(baseItemKey, seenCount);
        currentKeys.add(itemKey);

        list.classList.add('blog-todo-list');
        item.classList.add('blog-todo-item');
        checkbox.classList.add('blog-todo-checkbox');
        checkbox.disabled = false;
        checkbox.removeAttribute('disabled');

        const checked = Object.prototype.hasOwnProperty.call(savedState, itemKey)
            ? savedState[itemKey]
            : checkbox.checked;

        setCheckedState(item, checkbox, checked);

        checkbox.addEventListener('change', () => {
            savedState[itemKey] = checkbox.checked;
            setCheckedState(item, checkbox, checkbox.checked);
            writeState(storageKey, savedState);
        });

        item.addEventListener('click', event => {
            if (
                event.target instanceof Element &&
                event.target.closest('a, button, input, label, select, textarea')
            ) {
                return;
            }

            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    pruneState(storageKey, savedState, currentKeys);

    function findPreviousHeadingId(element) {
        let current = element.previousElementSibling;

        while (current) {
            if (/^H[2-6]$/.test(current.tagName)) {
                return current.id || normalizeText(current.textContent);
            }

            current = current.previousElementSibling;
        }

        return '';
    }

    function normalizeText(value) {
        return value.replace(/\s+/g, ' ').trim();
    }

    function setCheckedState(item, checkbox, checked) {
        checkbox.checked = Boolean(checked);
        item.classList.toggle('is-complete', checkbox.checked);
    }

    function readState(storageKey) {
        try {
            const value = window.localStorage.getItem(storageKey);
            return value ? JSON.parse(value) : {};
        } catch (_error) {
            return {};
        }
    }

    function writeState(storageKey, state) {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(state));
        } catch (_error) {
            // Browsers can block localStorage. The checklist still works for the current page view.
        }
    }

    function pruneState(storageKey, state, currentKeys) {
        let changed = false;

        Object.keys(state).forEach(itemKey => {
            if (!currentKeys.has(itemKey)) {
                delete state[itemKey];
                changed = true;
            }
        });

        if (changed) {
            writeState(storageKey, state);
        }
    }

    function hashText(value) {
        let hash = 0;

        for (let index = 0; index < value.length; index += 1) {
            hash = (hash << 5) - hash + value.charCodeAt(index);
            hash |= 0;
        }

        return Math.abs(hash).toString(36);
    }
})();
