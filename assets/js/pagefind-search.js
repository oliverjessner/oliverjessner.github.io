const SEARCH_MIN_LENGTH = 2;
const SEARCH_LIMIT = 32;
const TYPE_LABELS = {
    blogpost: 'Blogpost',
    external: 'Externer Artikel',
    category: 'Kategorie',
};
const SEARCH_READY_ATTRIBUTE = 'data-pagefind-search-ready';

document.querySelectorAll('[data-pagefind-search]').forEach(root => {
    if (root.hasAttribute(SEARCH_READY_ATTRIBUTE)) {
        return;
    }

    root.setAttribute(SEARCH_READY_ATTRIBUTE, 'true');

    const input = root.querySelector('[data-pagefind-search-input]');
    const form = root.querySelector('[data-pagefind-search-form]');
    const clearButton = root.querySelector('[data-pagefind-search-clear]');
    const status = root.querySelector('[data-pagefind-search-status]');
    const results = root.querySelector('[data-pagefind-search-results]');
    const bundlePath = root.dataset.pagefindBundle || '/pagefind/pagefind.js';
    const mode = root.dataset.pagefindSearchMode || 'results';
    const redirectPath = root.dataset.pagefindSearchUrl || '/search/';
    const isRedirectMode = mode === 'redirect';
    const isModalMode = mode === 'modal' || Boolean(root.closest('[data-search-modal]'));
    const shouldSyncUrl = mode === 'results' && !isModalMode;

    if (!input || (!isRedirectMode && (!status || !results))) {
        return;
    }

    let pagefindPromise;
    let pagefind;
    let latestQuery = '';
    let firstResultLink = null;
    let redirectTimer;

    const setStatus = message => {
        if (status) {
            status.textContent = message;
        }
    };

    const setLoading = isLoading => {
        root.classList.toggle('is-loading', isLoading);
    };

    const syncClearButton = () => {
        if (clearButton) {
            clearButton.hidden = input.value.trim().length === 0;
        }
    };

    const buildSearchUrl = query => {
        const url = new URL(redirectPath, window.location.origin);

        if (query) {
            url.searchParams.set('q', query);
        }

        return `${url.pathname}${url.search}${url.hash}`;
    };

    const redirectToSearchPage = query => {
        window.location.assign(buildSearchUrl(query));
    };

    const queueRedirect = () => {
        const query = input.value.trim();
        syncClearButton();
        window.clearTimeout(redirectTimer);

        if (query.length < SEARCH_MIN_LENGTH) {
            return;
        }

        redirectTimer = window.setTimeout(() => {
            redirectToSearchPage(query);
        }, 250);
    };

    const ensurePagefind = async () => {
        if (!pagefindPromise) {
            pagefindPromise = import(bundlePath).then(async module => {
                if (typeof module.init === 'function') {
                    await module.init();
                }
                pagefind = module;
                return module;
            });
        }

        return pagefindPromise;
    };

    const updateUrlQuery = query => {
        const url = new URL(window.location.href);

        if (query) {
            url.searchParams.set('q', query);
        } else {
            url.searchParams.delete('q');
        }

        const nextUrl = `${url.pathname}${url.search}${url.hash}`;
        const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

        if (nextUrl !== currentUrl) {
            window.history.replaceState({}, '', nextUrl);
        }
    };

    const resetResults = (message = '') => {
        latestQuery = '';
        firstResultLink = null;
        if (results) {
            results.replaceChildren();
        }
        setStatus(message);
        setLoading(false);
    };

    const runSearch = async () => {
        const query = input.value.trim();
        syncClearButton();
        if (shouldSyncUrl) {
            updateUrlQuery(query);
        }

        if (query.length === 0) {
            resetResults();
            return;
        }

        if (query.length < SEARCH_MIN_LENGTH) {
            resetResults('');
            return;
        }

        latestQuery = query;
        setLoading(true);
        setStatus('Lade Suche...');

        try {
            const search = await (await ensurePagefind()).debouncedSearch(query, {}, 250);

            if (search === null || query !== latestQuery) {
                return;
            }

            const loadedResults = await Promise.all(search.results.slice(0, SEARCH_LIMIT).map(result => result.data()));

            if (query !== latestQuery) {
                return;
            }

            renderResults(loadedResults, search.results.length);
        } catch (error) {
            resetResults('Pagefind konnte nicht geladen werden. Bitte zuerst den Build mit Pagefind ausführen.');
            root.classList.add('has-error');
            console.error(error);
        } finally {
            if (query === latestQuery) {
                setLoading(false);
            }
        }
    };

    const renderResults = (items, totalCount) => {
        results.replaceChildren();
        firstResultLink = null;

        if (!items.length) {
            setStatus('Keine Ergebnisse');
            return;
        }

        const list = document.createElement('div');
        list.className = 'pagefind-search__list';
        let renderedCount = 0;

        items.forEach(item => {
            const result = createResult(item);
            if (result) {
                list.append(result);
                renderedCount += 1;
            }
        });

        if (renderedCount === 0) {
            setStatus('Keine Ergebnisse');
            return;
        }

        results.append(list);
        firstResultLink = results.querySelector('a');
        setStatus(`${renderedCount} von ${totalCount} Ergebnissen`);
    };

    const createResult = item => {
        const meta = item.meta || {};
        const type = meta.type || 'blogpost';
        const typeLabel = meta.typeLabel || TYPE_LABELS[type] || 'Treffer';
        const explicitTargetUrl = meta.target_url || meta.external_url || '';
        const targetUrl = type === 'external' ? explicitTargetUrl : explicitTargetUrl || item.url;
        const isExternal = type === 'external' || /^https?:\/\//.test(targetUrl);

        if (!targetUrl) {
            return null;
        }

        const article = document.createElement('article');
        article.className = `pagefind-search__result pagefind-search__result--${type}`;

        if (meta.image && type !== 'category') {
            article.classList.add('pagefind-search__result--has-image');
            const media = document.createElement('a');
            media.className = 'pagefind-search__media';
            media.href = targetUrl;
            configureLink(media, isExternal);

            const image = document.createElement('img');
            image.src = meta.image;
            image.alt = meta.image_alt || '';
            image.loading = 'lazy';
            media.append(image);
            article.append(media);
        }

        const body = document.createElement('div');
        body.className = 'pagefind-search__result-body';

        const metaLine = document.createElement('div');
        metaLine.className = 'pagefind-search__meta';
        metaLine.append(createTextPill(typeLabel));

        if (meta.source) {
            metaLine.append(createTextPill(meta.source));
        }

        const formattedDate = formatDate(meta.date);
        if (formattedDate) {
            metaLine.append(createTextPill(formattedDate));
        }

        const title = document.createElement('h3');
        title.className = 'pagefind-search__title';
        const titleLink = document.createElement('a');
        titleLink.href = targetUrl;
        titleLink.textContent = meta.title || item.url;
        configureLink(titleLink, isExternal);
        title.append(titleLink);

        const description = document.createElement('p');
        description.className = 'pagefind-search__excerpt';
        if (item.excerpt) {
            description.innerHTML = item.excerpt;
        } else {
            description.textContent = meta.description || '';
        }

        body.append(metaLine, title);

        if (description.textContent.trim()) {
            body.append(description);
        }

        const categories = parseCategories(meta.categories);
        if (categories.length) {
            const badges = document.createElement('div');
            badges.className = 'pagefind-search__badges';
            categories.forEach(category => {
                const badge = document.createElement('span');
                badge.className = 'theme-chip theme-chip--primary';
                badge.textContent = category;
                badges.append(badge);
            });
            body.append(badges);
        }

        article.append(body);
        return article;
    };

    const createTextPill = text => {
        const pill = document.createElement('span');
        pill.className = 'pagefind-search__pill';
        pill.textContent = text;
        return pill;
    };

    const configureLink = (link, isExternal) => {
        if (isExternal) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    };

    const parseCategories = value => {
        if (!value) {
            return [];
        }

        return value
            .split(',')
            .map(category => category.trim())
            .filter(Boolean);
    };

    const formatDate = value => {
        if (!value) {
            return '';
        }

        const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
        const date = new Date(normalizedValue);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };

    input.addEventListener('focus', () => {
        if (isRedirectMode) {
            return;
        }

        ensurePagefind().catch(() => {
            setStatus('Pagefind konnte nicht geladen werden. Bitte zuerst den Build mit Pagefind ausführen.');
        });
    });

    input.addEventListener('input', () => {
        syncClearButton();

        if (isRedirectMode) {
            queueRedirect();
            return;
        }

        if (pagefind && typeof pagefind.preload === 'function') {
            pagefind.preload(input.value.trim());
        }

        runSearch();
    });

    input.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            window.clearTimeout(redirectTimer);

            if (isModalMode && input.value.trim().length === 0) {
                event.preventDefault();
                event.stopPropagation();
                root.dispatchEvent(
                    new CustomEvent('pagefind-search:close-modal', {
                        bubbles: true,
                    }),
                );
                return;
            }

            event.stopPropagation();
            input.value = '';
            if (shouldSyncUrl) {
                updateUrlQuery('');
            }
            syncClearButton();
            resetResults();
            return;
        }

        if (event.key === 'Enter' && firstResultLink) {
            event.preventDefault();
            firstResultLink.click();
        }
    });

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            input.value = '';
            input.focus();
            window.clearTimeout(redirectTimer);
            if (shouldSyncUrl) {
                updateUrlQuery('');
            }
            syncClearButton();
            resetResults();
        });
    }

    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const query = input.value.trim();

            if (isRedirectMode) {
                window.clearTimeout(redirectTimer);
                redirectToSearchPage(query);
                return;
            }

            if (firstResultLink) {
                firstResultLink.click();
            }
        });
    }

    const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
    if (initialQuery && !isModalMode) {
        input.value = initialQuery;
        syncClearButton();
        if (isRedirectMode) {
            redirectToSearchPage(initialQuery);
            return;
        }
        runSearch();
    }
});

const setupSearchModal = () => {
    const modal = document.querySelector('[data-search-modal]');

    if (!modal) {
        return;
    }

    const dialog = modal.querySelector('[data-search-modal-dialog]');
    const input = modal.querySelector('[data-pagefind-search-input]');
    let lastFocusedElement = null;

    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const openModal = () => {
        if (!modal.hidden) {
            if (input) {
                input.focus();
                input.select();
            }
            return;
        }

        lastFocusedElement = document.activeElement;
        modal.hidden = false;
        document.body.classList.add('has-search-modal-open');

        window.requestAnimationFrame(() => {
            if (input) {
                input.focus();
                input.select();
            } else if (dialog) {
                dialog.focus();
            }
        });
    };

    const closeModal = () => {
        if (modal.hidden) {
            return;
        }

        modal.hidden = true;
        document.body.classList.remove('has-search-modal-open');

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    const trapFocus = event => {
        if (modal.hidden || !dialog) {
            return;
        }

        const focusableElements = Array.from(dialog.querySelectorAll(focusableSelector)).filter(
            element => element.offsetParent !== null,
        );

        if (!focusableElements.length) {
            event.preventDefault();
            dialog.focus();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    document.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();

        if ((event.metaKey || event.ctrlKey) && key === 'k') {
            event.preventDefault();
            openModal();
            return;
        }

        if (event.key === 'Escape' && !modal.hidden) {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            trapFocus(event);
        }
    });

    modal.addEventListener('click', event => {
        if (event.target.closest('[data-search-modal-close]')) {
            closeModal();
        }
    });

    modal.addEventListener('pagefind-search:close-modal', () => {
        closeModal();
    });
};

setupSearchModal();
