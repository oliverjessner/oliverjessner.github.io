(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const bootLines = [
        { text: '$ itworksbut scan', type: 'prompt' },
        { text: '[boot] loading scanner modules...', type: 'muted' },
        { text: '[ok] env checks armed', type: 'ok' },
        { text: '[ok] dependency checks armed', type: 'ok' },
        { text: '[ok] desktop permissions checks armed', type: 'ok' },
        { text: '[scan] looking for "it works, but..." risks', type: 'warning' },
        { text: '[critical] .env appears to be tracked', type: 'critical' },
        { text: '[high] Electron permissions look too generous', type: 'warning' },
        { text: '[medium] package lockfile missing', type: 'muted' },
        { text: '[info] copy-ready fix prompt generated', type: 'ok' }
    ];

    const classByType = {
        ok: 'itworksbut-terminal__line--ok',
        warning: 'itworksbut-terminal__line--warning',
        critical: 'itworksbut-terminal__line--critical'
    };

    function createLine(line) {
        const item = document.createElement('div');
        item.className = `itworksbut-terminal__line ${classByType[line.type] || ''}`.trim();

        if (line.type === 'prompt') {
            const prompt = document.createElement('span');
            prompt.className = 'itworksbut-prompt';
            prompt.textContent = '$';
            item.append(prompt, document.createTextNode(' itworksbut scan'));
            return item;
        }

        item.textContent = line.text;
        return item;
    }

    function runBootTerminal() {
        const terminal = document.querySelector('[data-boot-terminal]');

        if (!terminal) {
            return;
        }

        terminal.innerHTML = '';

        if (prefersReducedMotion) {
            const fragment = document.createDocumentFragment();
            bootLines.forEach((line) => fragment.appendChild(createLine(line)));
            terminal.appendChild(fragment);
            return;
        }

        bootLines.forEach((line, index) => {
            window.setTimeout(() => {
                terminal.appendChild(createLine(line));
            }, index * 260);
        });
    }

    function setupCopyButtons() {
        const buttons = document.querySelectorAll('[data-copy-target]');

        buttons.forEach((button) => {
            button.addEventListener('click', async () => {
                const targetId = button.getAttribute('data-copy-target');
                const target = targetId ? document.getElementById(targetId) : null;
                const value = target ? target.textContent.trim() : '';

                if (!value) {
                    return;
                }

                try {
                    await navigator.clipboard.writeText(value);
                    const original = button.textContent;
                    button.textContent = 'Copied';
                    button.classList.add('is-copied');
                    window.setTimeout(() => {
                        button.textContent = original || 'Copy';
                        button.classList.remove('is-copied');
                    }, 1600);
                } catch (error) {
                    button.textContent = 'Select';
                    button.classList.add('is-copied');
                    window.setTimeout(() => {
                        button.textContent = 'Copy';
                        button.classList.remove('is-copied');
                    }, 1600);
                }
            });
        });
    }

    function buildMatrix() {
        const matrix = document.querySelector('[data-itworksbut-matrix]');

        if (!matrix || prefersReducedMotion) {
            return;
        }

        const glyphs = ['env', 'ci', 'jwt', 'rls', 'api', '404', 'fix', 'git', 'sarif', 'json', 'tauri', 'electron'];
        const columns = 18;
        const fragment = document.createDocumentFragment();

        for (let columnIndex = 0; columnIndex < columns; columnIndex += 1) {
            const column = document.createElement('span');
            column.className = 'itworksbut-matrix__column';
            column.style.setProperty('--itworksbut-speed', `${14 + (columnIndex % 7)}s`);
            column.style.setProperty('--itworksbut-delay', `${columnIndex * -0.65}s`);

            const lines = Array.from({ length: 30 }, (_, lineIndex) => glyphs[(lineIndex + columnIndex) % glyphs.length]);
            column.textContent = lines.join('\n');
            fragment.appendChild(column);
        }

        matrix.appendChild(fragment);
    }

    function init() {
        runBootTerminal();
        setupCopyButtons();
        buildMatrix();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
