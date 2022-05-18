let sequence = [];
let humanSequence = [];
let level = 0;
const info = document.querySelector('.js-info');

function startGame() {
    info.textContent = 'Level 1';
}
document.addEventListener('keypress', startGame);

function nextRound() {
    level += 1;

    // copy all the elements in the `sequence` array to `nextSequence`
    const nextSequence = [...sequence];
}

function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

