const fieldsElements = document.querySelectorAll(".box");
const panel = document.querySelector('.panel');
const button = document.querySelector('.reset-button');

let fields = ['', '', '', '', '', '', '', '', ''];
let activePlayer = "X";
let gameActive = true;

const setDefaults = () => {
    fields = ['', '', '', '', '', '', '', '', ''];
    activePlayer = "X";
    gameActive = true;
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
]

const validateGame = () => {
    for (let i = 0; i < 7; ++i) {
        const [posA, posB, posC] = winningConditions[i];
        const value1 = fields[posA];
        const value2 = fields[posB];
        const value3 = fields[posC];

        if (value1 === value2 && value1 === value3 && value1 !== "") {
            gameActive = false;
            displayWinMessage();
            //panel.innerText = 'Wygrałeś!';
        }
    }
}

const displayWinMessage = () => {
    panel.innerText = `Wygrałeś ${activePlayer}, brawo!`
}

const clearPanel = () => {
    panel.innerText = "";
}

fieldsElements.forEach((field) => {
    field.addEventListener("click", (e) => {
        const {pos} = e.target.dataset;

        if (gameActive && fields[pos] === "") {
            fields[pos] = activePlayer;
            e.target.classList.add(`box--filled-${activePlayer}`);
            validateGame();
            activePlayer = activePlayer === 'X' ? 'O' : 'X';
        }
    })
})

const handleButtonClick = () => {
    setDefaults();
    fieldsElements.forEach(field => {
        field.classList.remove("box--filled-X", "box--filled-O");
    })
    clearPanel();
}

button.addEventListener("click", handleButtonClick)