class Game {
    fields;
    activePlayer;
    isGameActive;

    winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    constructor() {
        this.setDefaults();
        this.board = new Board(this.itemClick, this.resetButtonClick);
    }

    validateGame = () => {
        let gameWon = false;
        for (let i = 0; i < 8; ++i) {
            const [positionA, positionB, positionC] = this.winningConditions[i];
            const a = this.fields[positionA];
            const b = this.fields[positionB];
            const c = this.fields[positionC];

            if (a === b && a === c && a !== "") {
                gameWon = true;
                break;
            }
        }
        if (gameWon) {
            this.isGameActive = false;
            this.board.winMessage(this.activePlayer);
        } else if (this.isBoardFull()) {
            this.isGameActive = false;
            this.board.drawMessage();
        }
    };

    isBoardFull = () => {
        return this.fields.find(field => field === "") === undefined;
    };

    resetButtonClick = () => {
        this.setDefaults();
        resetBoard();
        clearMessage();
    };

    itemClick = e => {
        const {position} = e.target.dataset;

        if (this.isGameActive && this.fields[position] === "") {
            this.fields[position] = this.activePlayer;
            e.target.classList.add(`box--filled-${this.activePlayer}`);
            this.validateGame();
            this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
        }
    };

    setDefaults = () => {
        this.fields = ['', '', '', '', '', '', '', '', ''];
        this.activePlayer = "X";
        this.isGameActive = true;
    };

}

class Board {
    fieldsElements = document.querySelectorAll(".box");
    message = document.querySelector(".message");
    button = document.querySelector(".reset-button");

    constructor(onItemClick, onButtonClick) {
        this.onButtonClick = onButtonClick;
        this.button.addEventListener("click", this.resetButtonClick);

        this.fieldsElements.forEach((field) => {
            field.addEventListener("click", onItemClick)
        });
    }

    resetButtonClick = () => {
        this.resetBoard();
        this.clearMessage();
        this.onButtonClick();
    }

    resetBoard = () => {
        this.fieldsElements.forEach(field => {
            field.classList.remove("box--filled-X", "box--filled-O");
        });
    };

    winMessage = (activePlayer) => {
        this.message.innerText = `Wygrała osoba grająca ${activePlayer}, brawo!`;
    };

    drawMessage = () => {
        this.message.innerText = "Remis!";
    };

    clearMessage = () => {
        this.message.innerText = "";
    };
}

const game = new Game();