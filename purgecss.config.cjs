module.exports = {
    content: [
        '_site/**/*.html',
        '_layouts/**/*.html',
        '_includes/**/*.html',
        '_posts/**/*.{md,html}',
        '_pages/**/*.{md,html}',
        '_data/**/*.{yml,yaml,json}',
        'assets/js/**/*.js',
    ],
    css: ['_site/assets/css/main.css'],
    output: '_site/assets/css/',
    safelist: ['active', 'open', 'show', 'hidden', 'is-active', 'is-open'],
};
