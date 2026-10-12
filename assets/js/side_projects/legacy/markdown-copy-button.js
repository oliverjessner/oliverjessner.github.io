document.addEventListener('DOMContentLoaded', () => {
    const snippets = Array.from(document.querySelectorAll('[data-copy-snippet]'));

    if (snippets.length === 0) {
        return;
    }

    const resetDelayMs = 2200;

    const legacyCopyText = (text) =>
        new Promise((resolve, reject) => {
            const helper = document.createElement('textarea');
            helper.value = text;
            helper.setAttribute('readonly', '');
            helper.style.position = 'fixed';
            helper.style.top = '0';
            helper.style.left = '0';
            helper.style.opacity = '0';
            helper.style.pointerEvents = 'none';

            document.body.appendChild(helper);
            helper.focus();
            helper.select();
            helper.setSelectionRange(0, helper.value.length);

            try {
                const copied = document.execCommand('copy');
                document.body.removeChild(helper);

                if (!copied) {
                    reject(new Error('Copy command was rejected.'));
                    return;
                }

                resolve();
            } catch (error) {
                document.body.removeChild(helper);
                reject(error);
            }
        });

    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        await legacyCopyText(text);
    };

    snippets.forEach((snippet) => {
        const button = snippet.querySelector('[data-copy-button]');
        const buttonLabel = snippet.querySelector('[data-copy-button-label]');
        const status = snippet.querySelector('[data-copy-status]');
        const source = snippet.querySelector('[data-copy-source]');

        if (!button || !buttonLabel || !status || !source) {
            return;
        }

        const defaultLabel = button.dataset.labelDefault || 'Kopieren';
        const successLabel = button.dataset.labelSuccess || 'Kopiert';
        const errorLabel = button.dataset.labelError || 'Fehler';
        const successMessage = button.dataset.messageSuccess || 'In die Zwischenablage kopiert.';
        const errorMessage = button.dataset.messageError || 'Kopieren fehlgeschlagen.';

        let resetTimerId = null;

        const resetState = () => {
            snippet.dataset.copyState = 'idle';
            buttonLabel.textContent = defaultLabel;
            status.textContent = '';
            resetTimerId = null;
        };

        const setState = (state, label, message) => {
            snippet.dataset.copyState = state;
            buttonLabel.textContent = label;
            status.textContent = message;

            if (resetTimerId) {
                window.clearTimeout(resetTimerId);
            }

            resetTimerId = window.setTimeout(resetState, resetDelayMs);
        };

        button.addEventListener('click', async () => {
            try {
                await copyText(source.textContent || '');
                setState('success', successLabel, successMessage);
            } catch (error) {
                setState('error', errorLabel, errorMessage);
            }
        });
    });
});
