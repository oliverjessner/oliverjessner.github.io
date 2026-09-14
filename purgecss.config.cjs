module.exports = {
    content: [
        '_site/**/*.html',
        '_layouts/**/*.html',
        '_includes/**/*.html',
        'collections/_posts/**/*.{md,html}',
        'pages/**/*.{md,html}',
        'generated/**/*.11ty.js',
        '_data/**/*.{yml,yaml,json}',
        'assets/js/**/*.js',
    ],
    css: ['_site/assets/css/main.css'],
    output: '_site/assets/css/',
    safelist: ['active', 'open', 'show', 'hidden', 'is-active', 'is-open'],
};
