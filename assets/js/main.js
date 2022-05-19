let sequence = [];
let humanSequence = [];
let level = 0;
const info = document.querySelector('.js-info');
const tileContainer = document.querySelector('.js-container');

function resetGame(text) {
    info.textContent = text;
    sequence = [];
    humanSequence = [];
    level = 0;
    tileContainer.classList.add('unclickable');
}

function humanTurn(level) {
    tileContainer.classList.remove('unclickable');
}

function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        if(index == nextSequence.length - 1) {
            setTimeout(() => {
                activateTile(color);
            }, (index + 1) * 600);
        }
    });
}

function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

function nextRound() {
    level += 1;

    tileContainer.classList.add('unclickable');

    // copy all the elements in the `sequence` array to `nextSequence`
    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    info.textContent = `Level ${level}`;
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
        humanTurn(level);
    }, level * 600 + 1000);
}

function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingTaps = sequence.length - humanSequence.length;

    if (humanSequence[index] !== sequence[index]) {
        const sound = document.querySelector(`[data-sound='wrong']`);
        sound.play();
        resetGame('Game Over, Press Any Key to Restart');
        return;
    }

    if (humanSequence.length === sequence.length) {
        if (humanSequence.length === 10) {
            resetGame('Congrats! You completed all the levels');
            return
        }
        humanSequence = [];
        setTimeout(() => {
            nextRound();
        }, 500);
        return;
    }
}

function startGame() {
    info.textContent = `Level ${level}`;
    nextRound();
}
document.addEventListener('keypress', startGame);

tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset;

    if (tile) handleClick(tile);
});
