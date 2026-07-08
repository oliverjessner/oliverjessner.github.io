import '../../vendor/duck-deep/duck-deep.element.js';

function readDuckDeepState() {
    const game = document.querySelector('duck-deep-game');
    const root = game?.shadowRoot;

    if (!root) {
        return {
            ready: false,
            reason: 'duck-deep-game shadow root is not available yet',
        };
    }

    const status = Array.from(root.querySelectorAll('.status-strip > div')).map((item) => {
        const label = item.querySelector('.status-label')?.textContent?.trim() ?? '';
        const value = item.querySelector('strong')?.textContent?.trim() ?? '';
        return { label, value };
    });

    const ducks = Array.from(root.querySelectorAll('.duck-piece')).map((duck) => ({
        label: duck.querySelector('.duck-label')?.textContent?.trim() ?? '',
        side: duck.classList.contains('side-human') ? 'human' : 'ai',
        selected: duck.classList.contains('is-selected'),
        eligible: duck.classList.contains('is-eligible'),
        left: duck.style.left,
        top: duck.style.top,
    }));

    return {
        ready: true,
        title: root.querySelector('h1')?.textContent?.trim() ?? 'Duck Deep',
        message: root.querySelector('.message-line')?.textContent?.trim() ?? '',
        status,
        coins: root.querySelectorAll('.coin-button').length,
        ducks,
    };
}

window.render_game_to_text = () => JSON.stringify(readDuckDeepState(), null, 2);
