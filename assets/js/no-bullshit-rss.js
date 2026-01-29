(function () {
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
})();
