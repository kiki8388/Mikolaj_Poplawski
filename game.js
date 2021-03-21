const fieldsElements = document.querySelectorAll(".box");
const message = document.querySelector(".message");
const button = document.querySelector(".reset-button");

let fields = ['', '', '', '', '', '', '', '', ''];
let activePlayer = "X";
let isGameActive = true;

const setDefaults = () => {
    fields = ['', '', '', '', '', '', '', '', ''];
    activePlayer = "X";
    isGameActive = true;
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const isBoardFull = () => {
    return fields.find(field => field === "") === undefined;
}

const winMessage = () => {
    message.innerText = `Wygrała osoba grająca ${activePlayer}, brawo!`;
}

const drawMessage = () => {
    message.innerText = "Remis!";
}

const clearMessage = () => {
    message.innerText = "";
}

const validateGame = () => {
    let gameWon = false;
    for (let i = 0; i < 8; ++i) {
        const [positionA, positionB, positionC] = winningConditions[i];
        const a = fields[positionA];
        const b = fields[positionB];
        const c = fields[positionC];

        if (a === b && a === c && a !== "") {
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        isGameActive = false;
        winMessage();
    } else if (isBoardFull()) {
        isGameActive = false;
        drawMessage();
    }
}

fieldsElements.forEach((field) => {
    field.addEventListener("click", (e) => {
        const {position} = e.target.dataset;

        if (isGameActive && fields[position] === "") {
            fields[position] = activePlayer;
            e.target.classList.add(`box--filled-${activePlayer}`);
            validateGame();
            activePlayer = activePlayer === 'X' ? 'O' : 'X';
        }
    })
})

const resetBoard = () => {
    fieldsElements.forEach(field => {
        field.classList.remove("box--filled-X", "box--filled-O");
    })
}

const resetButtonClick = () => {
    setDefaults();
    resetBoard();
    clearMessage();
}

button.addEventListener("click", resetButtonClick)