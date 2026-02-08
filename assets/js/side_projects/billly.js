document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.billly-nav');
    if (nav) {
        const handleScroll = () => {
            nav.classList.toggle('is-sticky', window.scrollY > 8);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    const anchorLinks = document.querySelectorAll('.billly a[href^="#"]');
    anchorLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }
            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (history.replaceState) {
                history.replaceState(null, '', targetId);
            }
        });
    });

    const faqItems = document.querySelectorAll('.billly-faq__item');
    faqItems.forEach((item) => {
        const button = item.querySelector('.billly-faq__question');
        const answer = item.querySelector('.billly-faq__answer');
        if (!button || !answer) {
            return;
        }

        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            faqItems.forEach((otherItem) => {
                const otherButton = otherItem.querySelector('.billly-faq__question');
                const otherAnswer = otherItem.querySelector('.billly-faq__answer');
                if (!otherButton || !otherAnswer) {
                    return;
                }
                otherButton.setAttribute('aria-expanded', 'false');
                otherAnswer.hidden = true;
                const icon = otherButton.querySelector('span');
                if (icon) {
                    icon.textContent = '+';
                }
            });

            if (!isOpen) {
                button.setAttribute('aria-expanded', 'true');
                answer.hidden = false;
                const icon = button.querySelector('span');
                if (icon) {
                    icon.textContent = '-';
                }
            }
        });
    });
});
