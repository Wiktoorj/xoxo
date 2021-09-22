alert(`"Kółko-krzyżyk" napisane przy pomocy: HTML, CSS, JavaScript.
Jeśli znajdziesz błędy lub masz jakieś uwagi - daj znać.
Peace and Love! ~wiciu`);
 
const fieldsElements = document.querySelectorAll('.boardItem');
const result = document.querySelector('.result');
const resultMessage = document.querySelector('p');
const restart = document.querySelector('button');
const xScore = document.querySelector('.xScore');
const oScore = document.querySelector('.oScore');
let xAddScore = 0;
let oAddScore = 0;

let fields;
let activePlayer;
let gameActive;

const setDefaults = () => {
    fields = ['', '', '', '', '', '', '', '', ''];
    activePlayer = "x";
    gameActive = true;
};

setDefaults();

const winningSets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const addScore = () => {
    if (activePlayer == 'x') {
        ++xAddScore;
        xScore.innerText = xAddScore;
    } else {
        ++oAddScore;
        oScore.innerText = oAddScore;
    }
}

const displayResult = () => {
    result.classList.add('show');
    resultMessage.innerText = `Wygrywa [${activePlayer}] !`
    addScore()
};

const tieMessage = () => {
    result.classList.add('show');
    resultMessage.innerText = `remis !`
};

const isBoardFull = () => {
    return fields.find(field => field === "") === undefined;
}

const validateGame = () => {
    let gameWon = false;
    for (let i = 0; i < 8; i++) {
        const [numberA, numberB, numberC] = winningSets[i];
        const value1 = fields[numberA];
        const value2 = fields[numberB];
        const value3 = fields[numberC];

        if (value1 !== "" && value1 === value2 && value1 === value3) {
            gameWon = true;
            break
        }
    }

    if (gameWon) {
        gameActive = false;
        displayResult();
    } else if (isBoardFull()) {
        gameActive = false;
        tieMessage();
    }
};

fieldsElements.forEach(field => {
    field.addEventListener("click", e => {
        const {
            number
        } = e.target.dataset

        if (gameActive && fields[number] === '') {
            fields[number] = activePlayer;
            e.target.classList.add(`boardItem--${activePlayer}`)
            validateGame();
            activePlayer = activePlayer === 'x' ? 'o' : 'x'
        }
    });
});

const activateButton = () => {
    setDefaults();
    result.classList.remove('show');
    fieldsElements.forEach(field => {
        field.classList.remove('boardItem--x', 'boardItem--o');
    })
};

restart.addEventListener('click', activateButton);