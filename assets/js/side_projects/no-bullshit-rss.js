(function () {
    const initReveal = () => {
        const revealItems = document.querySelectorAll('.nobullshitrss [data-reveal]');
        if (!revealItems.length) {
            return;
        }

        const onReveal = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(onReveal, {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px',
        });

        revealItems.forEach((item) => observer.observe(item));
    };

    const initMockupSlider = () => {
        const slider = document.querySelector('.nobullshitrss [data-nbs-slider]');
        if (!slider) {
            return;
        }

        const slides = Array.from(slider.querySelectorAll('[data-nbs-slide]'));
        const prevButton = slider.querySelector('[data-nbs-prev]');
        const nextButton = slider.querySelector('[data-nbs-next]');
        const dots = Array.from(slider.querySelectorAll('[data-nbs-dot]'));
        const counter = slider.querySelector('[data-nbs-counter]');
        const title = slider.querySelector('[data-nbs-title]');

        if (!slides.length) {
            return;
        }

        let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
        if (activeIndex < 0) {
            activeIndex = 0;
        }

        const render = (index) => {
            const normalizedIndex = ((index % slides.length) + slides.length) % slides.length;
            activeIndex = normalizedIndex;

            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === activeIndex;
                slide.hidden = !isActive;
                slide.classList.toggle('is-active', isActive);
            });

            dots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === activeIndex;
                dot.classList.toggle('is-active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });

            if (counter) {
                counter.textContent = `${activeIndex + 1}/${slides.length}`;
            }

            if (title) {
                title.textContent = slides[activeIndex].dataset.slideTitle || 'Mockup';
            }
        };

        prevButton?.addEventListener('click', () => render(activeIndex - 1));
        nextButton?.addEventListener('click', () => render(activeIndex + 1));

        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const dotIndex = Number(dot.dataset.nbsDot);
                if (!Number.isNaN(dotIndex)) {
                    render(dotIndex);
                }
            });
        });

        slider.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                render(activeIndex - 1);
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                render(activeIndex + 1);
            }
        });

        render(activeIndex);
    };

    initReveal();
    initMockupSlider();
})();
