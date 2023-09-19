const gameBoard = document.querySelector('.game-board');
const images = [
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'
];

// Shuffle the images
images.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let canFlip = true;

images.forEach((image, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = index;

    const img = document.createElement('img');
    img.src = image;
    card.appendChild(img);

    card.addEventListener('click', () => {
        if (!canFlip) return;

        if (!firstCard) {
            firstCard = card;
            card.querySelector('img').style.display = 'block';
        } else if (!secondCard) {
            secondCard = card;
            card.querySelector('img').style.display = 'block';

            if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
                // Matched
                showStarAnimation(firstCard, 'red-star');
                showStarAnimation(secondCard, 'golden-star');
                firstCard = null;
                secondCard = null;
            } else {
                // Not matched
                canFlip = false;
                setTimeout(() => {
                    firstCard.querySelector('img').style.display = 'none';
                    secondCard.querySelector('img').style.display = 'none';
                    firstCard = null;
                    secondCard = null;
                    canFlip = true;
                }, 1000);
            }
        }
    });

    gameBoard.appendChild(card);
});

// ... existing code ...

// ... existing code ...

function showStarAnimation(card, className) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');
    
    const bigStar = document.createElement('div');
    bigStar.classList.add('big-star', className);
    bigStar.innerText = '★';
    starContainer.appendChild(bigStar);

    // Add 5 tiny stars
    for (let i = 0; i < 5; i++) {
        const tinyStar = document.createElement('div');
        tinyStar.classList.add('tiny-star', className);
        tinyStar.innerText = '★';
        tinyStar.style.left = `calc(50% + ${Math.random() * 50 - 25}px)`;  // Random position around the center
        tinyStar.style.top = `calc(50% + ${Math.random() * 50 - 25}px)`;
        starContainer.appendChild(tinyStar);
    }

    const rect = card.getBoundingClientRect();
    starContainer.style.left = rect.left + window.pageXOffset + 'px';
    starContainer.style.top = rect.top + window.pageYOffset + 'px';
    starContainer.style.width = rect.width + 'px'; // Set the width and height of the star container
    starContainer.style.height = rect.height + 'px';
    document.body.appendChild(starContainer);

    setTimeout(() => {
        document.body.removeChild(starContainer);
    }, 1000);
}
document.getElementById('refreshButton').addEventListener('click', () => {
    window.location.href = window.location.href;
});

