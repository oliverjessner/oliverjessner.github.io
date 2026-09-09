const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const running = new Map();
const formatter = new Intl.NumberFormat('de-DE');

function finish(number) {
    cancelAnimationFrame(running.get(number));
    running.delete(number);
    number.textContent = number.dataset.countTarget;
}

function countUp(number, delay) {
    const match = number.dataset.countTarget.match(/^([\d.]+)(.*)$/);
    if (!match) return;
    const target = Number(match[1].replaceAll('.', ''));
    if (!Number.isSafeInteger(target) || target <= 0) return;

    const start = performance.now() + delay;
    number.textContent = `0${match[2]}`;
    function frame(now) {
        if (motionPreference.matches) return finish(number);
        const progress = Math.min(1, Math.max(0, (now - start) / 1800));
        if (progress === 1) return finish(number);
        const eased = 1 - Math.pow(1 - progress, 3);
        number.textContent = `${formatter.format(Math.floor(target * eased))}${match[2]}`;
        running.set(number, requestAnimationFrame(frame));
    }
    running.set(number, requestAnimationFrame(frame));
}

// Final values remain readable without JavaScript, without observer support,
// and when reduced motion is requested. Each number animates only once.
if ('IntersectionObserver' in window && !motionPreference.matches) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            if (motionPreference.matches) return;
            const number = entry.target.querySelector('[data-count-target]');
            const index = [...entry.target.parentElement.children].indexOf(entry.target);
            countUp(number, index * 90);
        });
    }, { threshold: 0.65 });

    document.querySelectorAll('.research-metrics__item').forEach((item) => observer.observe(item));
    motionPreference.addEventListener('change', () => {
        if (!motionPreference.matches) return;
        observer.disconnect();
        [...running.keys()].forEach(finish);
    });
}
