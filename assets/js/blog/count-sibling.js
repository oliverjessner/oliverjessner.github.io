const cards = document.querySelector('.cards');
const addBttn = document.querySelector('.add-bttn');
const removeBttn = document.querySelector('.remove-bttn');

function updateHeights() {
    const allCards = document.querySelectorAll('.inner-card');

    allCards.forEach(card => {
        const height = card.offsetHeight;
        const span = card.querySelector('span');

        span.textContent = ` ${height}px`;
    });
}

addBttn.addEventListener('click', () => {
    const html = `<div class="inner-card">Card Height:<span></span></div>`;
    cards.insertAdjacentHTML('beforeend', html);

    return updateHeights();
});
removeBttn.addEventListener('click', () => {
    const allCards = document.querySelectorAll('.inner-card');

    if (allCards.length > 0) {
        allCards[allCards.length - 1].remove();
    }

    return updateHeights();
});
updateHeights();
