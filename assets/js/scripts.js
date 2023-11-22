(function () {
    const animated = document.querySelector('.typewriter');
    const spans = [...document.querySelectorAll('.title-description span')];
    const eventOptions = { once: true };
    let i = 0;

    function animationend() {
        if (i === spans.length - 1) {
            spans[spans.length - 1].style.border = 'none';
            return;
        }

        spans[i].classList.remove('typewriter');
        spans[i].classList.add('hide');

        i++;

        spans[i].classList.remove('hide');
        spans[i].classList.add('typewriter');
        spans[i].addEventListener('animationend', animationend, eventOptions);
    }

    animated.addEventListener('animationend', animationend, eventOptions);
})();
