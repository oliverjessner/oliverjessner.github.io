module.exports = {
    content: [
        '_site/**/*.html',
        '_layouts/**/*.html',
        '_includes/**/*.html',
        'collections/_posts/**/*.{md,html}',
        'pages/**/*.{md,html}',
        'blog/**/*.{md,html}',
        'generated/**/*.11ty.js',
        '_data/**/*.{yml,yaml,json}',
        'assets/js/**/*.js',
    ],
    css: ['_site/assets/css/main.css'],
    output: '_site/assets/css/',
    // The unchanged OJ distribution is copied separately and is never purged.
    // These local nodes/states are created by site controllers after rendering.
    safelist: {
        standard: ['active', 'open', 'show', 'hidden', 'is-active', 'is-open', 'is-visible', 'is-complete', 'is-copied', 'is-filtered-out', 'has-error', 'is-loading', 'lock-scroll', 'has-search-modal-open'],
        greedy: [/^pagefind-search/, /^post-image-slider/, /^blog-todo/, /^search-modal/, /^menu-main/, /data-copy-state/],
    },
};
