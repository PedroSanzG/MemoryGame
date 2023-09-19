document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const images = [
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg'
    ];

    shuffleArray(images);

    images.forEach(imgSrc => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img = document.createElement('img');
        img.src = imgSrc;
        card.appendChild(img);
        gameBoard.appendChild(card);

        card.addEventListener('click', () => {
            if (!startTime) {
                startTimer();
            }
            if (firstCard && secondCard) return;
            if (card === firstCard) return; // Prevent the same card from being clicked twice
            if (card.classList.contains('matched')) return; // Prevent clicking on already matched cards
        
            img.style.display = 'block';
        
            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
        
                if (firstCard.querySelector('img').src === secondCard.querySelector('img').src) {
                    // Mark cards as matched
                    firstCard.classList.add('matched');
                    secondCard.classList.add('matched');
                    matchedPairs++;
                    if (matchedPairs === images.length / 2) {
                        stopTimer();
                    }
                    showStarAnimation('red-star');
                    showStarAnimation('golden-star');
                    firstCard = null;
                    secondCard = null;
                } else {
                    setTimeout(() => {
                        firstCard.querySelector('img').style.display = 'none';
                        secondCard.querySelector('img').style.display = 'none';
                        firstCard = null;
                        secondCard = null;
                    }, 1000);
                }
            }
        });
    });

    document.getElementById('refreshButton').addEventListener('click', () => {
        window.location.href = window.location.href;
    });
});

let firstCard = null;
let secondCard = null;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showStarAnimation(className) {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');

    const bigStar = document.createElement('div');
    bigStar.classList.add('big-star', className);
    bigStar.innerText = '★';
    bigStar.style.left = `${Math.random() * 100}vw`;
    bigStar.style.top = `${Math.random() * 100}vh`;
    starContainer.appendChild(bigStar);

    for (let i = 0; i < 5; i++) {
        const tinyStar = document.createElement('div');
        tinyStar.classList.add('tiny-star', className);
        tinyStar.innerText = '★';
        tinyStar.style.left = `${Math.random() * 100}vw`;
        tinyStar.style.top = `${Math.random() * 100}vh`;
        starContainer.appendChild(tinyStar);
    }

    document.body.appendChild(starContainer);

    setTimeout(() => {
        document.body.removeChild(starContainer);
    }, 1000);
}
let startTime = null;
let timerInterval = null;
let matchedPairs = 0;

function startTimer() {
    if (timerInterval) return;  // Ensure the timer only starts once

    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('timer').textContent = `Time: ${elapsedTime}s`;
    }, 1000);
}


function stopTimer() {
    clearInterval(timerInterval);
}
