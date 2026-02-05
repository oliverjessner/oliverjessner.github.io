(function () {
    const imagePathPattern = /^(?:https?:\/\/|\/)[^\s]+\.(?:avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i;
    const swipeThreshold = 40;

    function parsePathParagraph(paragraph) {
        const lines = paragraph.textContent
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);

        if (lines.length < 1) {
            return null;
        }

        if (!lines.every((line) => imagePathPattern.test(line))) {
            return null;
        }

        return {
            kind: 'paths',
            slides: lines.map((line) => ({ src: line, alt: '' })),
        };
    }

    function parseImageParagraph(paragraph) {
        const images = Array.from(paragraph.querySelectorAll('img')).filter((image) => Boolean(image.getAttribute('src')));
        if (images.length === 0) {
            return null;
        }

        // Ignore mixed content paragraphs like "text + image".
        if (paragraph.textContent.trim() !== '') {
            return null;
        }

        return {
            kind: 'images',
            slides: images.map((image) => ({
                src: image.getAttribute('src'),
                alt: image.getAttribute('alt') || '',
            })),
        };
    }

    function parseParagraphBlock(paragraph) {
        return parsePathParagraph(paragraph) || parseImageParagraph(paragraph);
    }

    function buildSlider(slides) {
        const slider = document.createElement('div');
        slider.className = 'post-image-slider';
        slider.setAttribute('aria-label', 'Bild-Slider');
        slider.setAttribute('aria-roledescription', 'carousel');

        const viewport = document.createElement('div');
        viewport.className = 'post-image-slider__viewport';

        const track = document.createElement('div');
        track.className = 'post-image-slider__track';
        viewport.appendChild(track);
        slider.appendChild(viewport);

        slides.forEach((slideData, index) => {
            const slide = document.createElement('figure');
            slide.className = 'post-image-slider__slide';

            const image = document.createElement('img');
            image.src = slideData.src;
            image.alt = slideData.alt || 'Bild ' + String(index + 1);
            image.decoding = 'async';
            image.loading = index === 0 ? 'eager' : 'lazy';

            slide.appendChild(image);
            track.appendChild(slide);
        });

        const isCarousel = slides.length > 1;
        const dotButtons = [];
        let prevButton;
        let nextButton;
        let counter;

        if (isCarousel) {
            slider.tabIndex = 0;
            prevButton = document.createElement('button');
            prevButton.className = 'post-image-slider__nav post-image-slider__nav--prev';
            prevButton.type = 'button';
            prevButton.setAttribute('aria-label', 'Vorheriges Bild');
            prevButton.innerHTML = '&#10094;';

            nextButton = document.createElement('button');
            nextButton.className = 'post-image-slider__nav post-image-slider__nav--next';
            nextButton.type = 'button';
            nextButton.setAttribute('aria-label', 'Naechstes Bild');
            nextButton.innerHTML = '&#10095;';

            slider.appendChild(prevButton);
            slider.appendChild(nextButton);

            const dots = document.createElement('div');
            dots.className = 'post-image-slider__dots';
            slider.appendChild(dots);

            counter = document.createElement('div');
            counter.className = 'post-image-slider__counter';
            slider.appendChild(counter);

            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'post-image-slider__dot';
                dot.type = 'button';
                dot.setAttribute('aria-label', 'Gehe zu Bild ' + String(index + 1));
                dots.appendChild(dot);
                dotButtons.push(dot);
            });
        }

        let currentIndex = 0;
        let touchStartX = 0;

        function render() {
            track.style.transform = 'translateX(-' + String(currentIndex * 100) + '%)';
            if (counter) {
                counter.textContent = String(currentIndex + 1) + ' / ' + String(slides.length);
            }
            dotButtons.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === currentIndex);
            });
        }

        function goTo(index) {
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            render();
        }

        if (isCarousel) {
            prevButton.addEventListener('click', function () {
                goTo(currentIndex - 1);
            });

            nextButton.addEventListener('click', function () {
                goTo(currentIndex + 1);
            });

            dotButtons.forEach((dot, index) => {
                dot.addEventListener('click', function () {
                    goTo(index);
                });
            });

            slider.addEventListener('keydown', function (event) {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    goTo(currentIndex - 1);
                }

                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    goTo(currentIndex + 1);
                }
            });

            viewport.addEventListener(
                'touchstart',
                function (event) {
                    touchStartX = event.changedTouches[0].clientX;
                },
                { passive: true }
            );

            viewport.addEventListener(
                'touchend',
                function (event) {
                    const touchEndX = event.changedTouches[0].clientX;
                    const diff = touchEndX - touchStartX;

                    if (Math.abs(diff) < swipeThreshold) {
                        return;
                    }

                    if (diff > 0) {
                        goTo(currentIndex - 1);
                        return;
                    }

                    goTo(currentIndex + 1);
                },
                { passive: true }
            );
        }

        render();
        return slider;
    }

    function initImageSliders() {
        const content = document.querySelector('.content');
        if (!content) {
            return;
        }

        const paragraphs = Array.from(content.querySelectorAll(':scope > p'));
        paragraphs.forEach((paragraph) => {
            if (!paragraph.isConnected) {
                return;
            }

            const initialBlock = parseParagraphBlock(paragraph);
            if (!initialBlock) {
                return;
            }

            const runNodes = [paragraph];
            const runSlides = initialBlock.slides.slice();
            let hasPathBlock = initialBlock.kind === 'paths';
            let cursor = paragraph.nextElementSibling;

            while (cursor && cursor.tagName === 'P') {
                const nextBlock = parseParagraphBlock(cursor);
                if (!nextBlock) {
                    break;
                }

                runNodes.push(cursor);
                runSlides.push(...nextBlock.slides);
                hasPathBlock = hasPathBlock || nextBlock.kind === 'paths';
                cursor = cursor.nextElementSibling;
            }

            // Keep single markdown images untouched, but always convert raw path blocks.
            if (runSlides.length < 2 && !hasPathBlock) {
                return;
            }

            runNodes[0].replaceWith(buildSlider(runSlides));
            runNodes.slice(1).forEach((node) => node.remove());
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageSliders);
    } else {
        initImageSliders();
    }
})();
