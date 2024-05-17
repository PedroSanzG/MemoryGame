document.addEventListener('DOMContentLoaded', function () {
    const cardGrid = document.querySelector('.card-grid');
    const levelSelect = document.getElementById('level-select');
    let attempts = 0;
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function initializeGame(level) {
        const cards = [];
        let pairs; // Number of pairs based on difficulty
        switch (level) {
            case 'easy':
                pairs = 3; // 6 images, 3 pairs
                break;
            case 'intermediate':
                pairs = 6; // 12 images, 6 pairs
                break;
            case 'hard':
                pairs = 12; // 24 images, 15 pairs (ensure you have enough images or adjust)
                break;
        }

        for (let i = 0; i < pairs; i++) {
            const card1 = createCard(2 * i);
            const card2 = createCard(2 * i + 1);
            cards.push(card1, card2);
        }

        // Shuffle the cards
        cards.sort(() => 0.5 - Math.random());

        // Add cards to the grid
        cardGrid.innerHTML = '';
        cards.forEach(card => cardGrid.appendChild(card));

        updateAttempts(0); // Reset attempts counter
    }

    function createCard(index) {
    const card = document.createElement('div');
    card.classList.add('card');
    // Assigning a unique ID to each pair
    // If index is even, it gets the same pair id as the next card (e.g., index 0 and 1 get pair id 0)
    // If index is odd, it uses the same pair id as the previous card (e.g., index 3 and 4 get pair id 2)
    card.dataset.id = Math.floor(index / 2); // This groups two cards into a pair

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.style.backgroundImage = `url('Front_image/Front.jpg')`;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    // Assigns consecutive images to pairs
    // index + 1 ensures that card indices 0 and 1 use images 1 and 2, indices 2 and 3 use images 3 and 4, etc.
    cardBack.style.backgroundImage = `url('images/image${index + 1}.png')`;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', flipCard);
    return card;
}

    
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.id === secondCard.dataset.id;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function updateAttempts(val) {
        attempts = val;
        document.getElementById('attempts').innerText = 'Attempts: ' + attempts;
    }

    levelSelect.addEventListener('change', function() {
        initializeGame(this.value);
    });

    document.getElementById('restart-button').addEventListener('click', function() {
        cardGrid.innerHTML = '';
        attempts = 0;
        initializeGame(levelSelect.value);
    });

    initializeGame(levelSelect.value);
});
