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

    const carousels = document.querySelectorAll('[data-billly-carousel]');
    carousels.forEach((carousel) => {
        const track = carousel.querySelector('[data-carousel-track]');
        const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
        const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');

        if (!track || slides.length === 0) {
            return;
        }

        let activeIndex = 0;

        const renderCarousel = () => {
            track.style.transform = `translateX(-${activeIndex * 100}%)`;

            slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === activeIndex);
                dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
            });

            if (prevButton) {
                prevButton.disabled = activeIndex === 0;
            }
            if (nextButton) {
                nextButton.disabled = activeIndex === slides.length - 1;
            }
        };

        prevButton?.addEventListener('click', () => {
            if (activeIndex === 0) {
                return;
            }
            activeIndex -= 1;
            renderCarousel();
        });

        nextButton?.addEventListener('click', () => {
            if (activeIndex === slides.length - 1) {
                return;
            }
            activeIndex += 1;
            renderCarousel();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                activeIndex = index;
                renderCarousel();
            });
        });

        renderCarousel();
    });
});
