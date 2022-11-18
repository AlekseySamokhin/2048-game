let gameBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const rows = 4;
const columns = 4;

let score = 0;
let bestScore;

let flag = true; // for don't show game message "you win" after 2048 point's

const elemSquaresContainer = document.querySelector(".squares-container");

const btnNewGame = document.querySelector(".new-game");
const btnContinueGame = document.querySelector(".continue-game");

const elemMessageBlockGame = document.querySelector(".game-message");
const elemMessageTitleGame = document.querySelector(".game-message__title");
const elemMessageTextGame = document.querySelector(".game-message__text");
const elemMessageContinue = document.querySelector(".game-message__continue");

// span score and best score
const elemBestScore = document.getElementById("best-score");
const elemScore = document.getElementById("score");

// random position square on game board
const randomPosition = () => {
  let flag = true;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gameBoard[r][c] === 0) {
        flag = false;
      }
    }
  }

  while (!flag) {
    // two random numbers from 0 to 3
    let num1 = Math.floor(Math.random() * rows);
    let num2 = Math.floor(Math.random() * columns);
    
    if (gameBoard[num1][num2] === 0) {
      let square = document.getElementById(`${num1}-${num2}`);

      square.textContent = "";
      square.classList.value = "";
      square.classList.add("square");

      // if random number = 0
      if (Math.floor(Math.random() * 10) === 0) {
        gameBoard[num1][num2] = 4;

        square.classList.add("square-4");
        square.textContent = 4;

        flag = true;
      } else {
        gameBoard[num1][num2] = 2;

        square.classList.add("square-2");
        square.textContent = 2;

        flag = true;
      }

      checkForGameOver();
    }
  }
};

const updateSquareValue = (number, square) => {
  square.textContent = "";
  square.classList.value = "";

  square.classList.add("square");

  if (number > 0) {
    square.textContent = number.toString();
    square.classList.add(`square-${number}`);
  }
};

const setGameBoard = () => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let square = document.createElement("div");
      square.id = `${r}-${c}`; // assign id 0-1, 0-2, 0-3, 0-4, 1-1 etc..

      let number = gameBoard[r][c];

      updateSquareValue(number, square);

      square.classList.add("square");

      if (number > 0) {
        square.classList.add(`square-${number}`);
      }

      elemSquaresContainer.append(square);
    }
  }

  randomPosition();
  randomPosition();
};

const checkBestScore = () => {
  // setting value ​​from localstorage
  if (localStorage.getItem("2048-best-score") === null) {
    localStorage.setItem("2048-best-score", score); // initial score = 0
    elemBestScore.textContent = score;
  } else {
    bestScore = parseInt(localStorage.getItem("2048-best-score"));
    elemBestScore.textContent = bestScore;
  }
};

const controlSquares = (event) => {
  switch (event.key) {
    case "ArrowUp":
      console.log("UP");
      moveUp();
      break;
    case "ArrowDown":
      console.log("DOWN");
      moveDown();
      break;
    case "ArrowLeft":
      console.log("LEFT");
      moveLeft();
      break;
    case "ArrowRight":
      console.log("RIGHT");
      moveRight();
      break;
  }
};

const move = (row) => {
  row = row.filter((num) => num != 0); // create new array without zeros;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === row[i + 1]) {
      // if the values ​​of adjacent cells are the same
      row[i] = row[i] * 2;
      row[i + 1] = 0;

      score = score + row[i];

      elemScore.textContent = score;
    }
  }

  // value best score in local-storage
  if (score > bestScore) {
    // replace value from localsrorage value from score
    localStorage.setItem("2048-best-score", score);
    elemBestScore.textContent = score;
  }

  row = row.filter((num) => num != 0); // create new array without zeros;

  while (row.length < rows) {
    row.push(0);
  }

  return row;
};

const moveUp = () => {
  for (let c = 0; c < columns; c++) {
    let row = [gameBoard[0][c], gameBoard[1][c], gameBoard[2][c], gameBoard[3][c]];
    row = move(row);
    for (let r = 0; r < rows; r++) {
      gameBoard[r][c] = row[r];

      const square = document.getElementById(`${r}-${c}`);
      const number = gameBoard[r][c];

      updateSquareValue(number, square);
    }
  }

  randomPosition();
  checkForGameOver();
  checkForWin();
};

const moveDown = () => {
  for (let c = 0; c < columns; c++) {
    let row = [gameBoard[0][c], gameBoard[1][c], gameBoard[2][c], gameBoard[3][c]];
    row.reverse();
    row = move(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      gameBoard[r][c] = row[r];

      const square = document.getElementById(`${r}-${c}`);
      const number = gameBoard[r][c];

      updateSquareValue(number, square);
    }
  }

  randomPosition();
  checkForGameOver();
  checkForWin();
};

const moveLeft = () => {
  for (let r = 0; r < rows; r++) {
    let row = gameBoard[r]; // array

    row = move(row);

    gameBoard[r] = row;

    for (let c = 0; c < columns; c++) {
      let square = document.getElementById(`${r}-${c}`);

      let number = gameBoard[r][c];

      updateSquareValue(number, square);
    }
  }

  randomPosition();
  checkForGameOver();
  checkForWin();
};

const moveRight = () => {
  for (let r = 0; r < rows; r++) {
    let row = gameBoard[r].reverse(); // array

    row = move(row);

    gameBoard[r] = row.reverse();

    for (let c = 0; c < columns; c++) {
      let square = document.getElementById(`${r}-${c}`);

      let number = gameBoard[r][c];

      updateSquareValue(number, square);
    }
  }

  randomPosition();
  checkForGameOver();
  checkForWin();
};

const checkForGameOver = () => {
  let number = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gameBoard[r][c] === 0) {
        number++;
      }
    }
  }

  if (number === 0) {
    generateGameMessage(number);
  }
};

const checkForWin = () => {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let number = gameBoard[r][c];

      if (number === 2048 && flag) {
        generateGameMessage(number);

        flag = false;
      }

      if (number === 8192) {
        generateGameMessage(number);
      }
    }
  }
};

const generateGameMessage = (number) => {
  document.removeEventListener("keyup", controlSquares);

  elemMessageBlockGame.style.display = "block";

  if (number === 0) {
    elemMessageTitleGame.textContent = "You loose!";
    elemMessageTextGame.textContent = "Please, press New Game!";
  } else if (number === 2048) {
    elemMessageContinue.style.display = "block";
    elemMessageTitleGame.textContent = "You win!";
    elemMessageTextGame.textContent = "Our congratulations!";
  } else if (number === 8192) {
    elemMessageTitleGame.textContent = "You сrazy!";
    elemMessageTextGame.textContent = "You completed all game!";
  }
};

const restartGame = () => {
  gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const squares = document.querySelectorAll(".square");

  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
    squares[i].classList.value = "";
    squares[i].classList.add("square");
  }

  elemMessageBlockGame.style.display = "none";

  document.addEventListener("keyup", controlSquares);

  randomPosition();
  randomPosition();
};

const continueGame = () => {
  elemMessageContinue.style.display = "none";
  elemMessageBlockGame.style.display = "none";

  document.addEventListener("keyup", controlSquares);
};

// events
document.addEventListener("DOMContentLoaded", () => {
  // functions is called when the page is loaded
  checkBestScore();
  setGameBoard();
});

document.addEventListener("keyup", controlSquares);

btnNewGame.addEventListener("click", restartGame);

btnContinueGame.addEventListener("click", continueGame);
