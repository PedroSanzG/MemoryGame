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

function showStarAnimation(className) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');
    
    const bigStar = document.createElement('div');
    bigStar.classList.add('big-star', className);
    bigStar.innerText = '★';
    bigStar.style.left = `${Math.random() * 100}vw`;  // Random position across the viewport width
    bigStar.style.top = `${Math.random() * 100}vh`;   // Random position across the viewport height
    starContainer.appendChild(bigStar);

    // Add 5 tiny stars
    for (let i = 0; i < 10; i++) {
        const tinyStar = document.createElement('div');
        tinyStar.classList.add('tiny-star', className);
        tinyStar.innerText = '★';
        tinyStar.style.left = `${Math.random() * 100}vw`;  // Random position across the viewport width
        tinyStar.style.top = `${Math.random() * 100}vh`;   // Random position across the viewport height
        starContainer.appendChild(tinyStar);
    }

    document.body.appendChild(starContainer);

    setTimeout(() => {
        document.body.removeChild(starContainer);
    }, 1000);
}


