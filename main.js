let gameBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let rows = 4;
let columns = 4;

let score = 0;
let bestScore;

let btnNewGame = document.querySelector(".new-game");

// span score and best score
let elemBestScore = document.getElementById("best-score");
let elemScore = document.getElementById("score");

document.addEventListener("DOMContentLoaded", () => {
  // function is called when the page is loaded
  checkBestScore();
  setGameBoard();
});

function checkBestScore() {
  // setting value ​​from localstorage
  if (localStorage.getItem("2048-best-score") === null) {
    localStorage.setItem("2048-best-score", score); // initial score = 0
    elemBestScore.textContent = score;
  } else {
    bestScore = parseInt(localStorage.getItem("2048-best-score"));
    elemBestScore.textContent = bestScore;
  }
}

function setGameBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let square = document.createElement("div");
      square.id = `${r}-${c}`; // assign id 0-1, 0-2, 0-3, 0-4, 1-1 etc...

      let number = gameBoard[r][c];

      updateSquareValue(number, square);

      square.classList.add("square");

      if (number > 0) {
        square.classList.add(`square-${number}`);
      }
    }
  }

  randomPosition();
  randomPosition();
}

function updateSquareValue(number, square) {
  square.textContent = "";
  square.classList.value = "";

  square.classList.add("square");

  if (number > 0) {
    square.textContent = number;
    square.classList.add(`square-${number}`);
  }

  document.querySelector(".squares-container").append(square);
}

// random position square on game board
function randomPosition() {
  let flag = false;

  while (!flag) {
    // two random numbers from 0 to 3
    let num1 = Math.floor(Math.random() * rows);
    let num2 = Math.floor(Math.random() * columns);
    if (gameBoard[num1][num2] === 0) {
      let square = document.getElementById(`${num1}-${num2}`);

      // square.classList.add("square");

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
}

// keyboard button press event
document.addEventListener("keyup", controlSquares);

function controlSquares(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
  }
}

function filterZeros(array) {
  return array.filter((num) => num != 0);
}

function slide(row) {
  row = filterZeros(row); // create new array without zeros;

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

  row = filterZeros(row);

  while (row.length < rows) {
    row.push(0);
  }

  return row;
}

function moveUp() {
  console.log("Вверх");
}

function moveDown() {
  console.log("Вниз");
}

function moveLeft() {
  for (let r = 0; r < rows; r++) {
    let row = gameBoard[r]; // array

    row = slide(row);

    gameBoard[r] = row;

    for (let c = 0; c < columns; c++) {
      let square = document.getElementById(`${r}-${c}`);
      let number = gameBoard[r][c];

      updateSquareValue(number, square);
    }
  }

  checkForGameOver();
  checkForWin();
  randomPosition();
}

function moveRight() {
  for (let r = 0; r < rows; r++) {
    let row = gameBoard[r].reverse(); // array

    row = slide(row);

    gameBoard[r] = row.reverse();

    for (let c = 0; c < columns; c++) {
      let square = document.getElementById(`${r}-${c}`);
      let number = gameBoard[r][c];

      updateSquareValue(number, square);
    }
  }

  checkForGameOver();
  checkForWin();
  randomPosition();
}

function checkForGameOver() {
  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gameBoard[r][c] === 0) {
        count++;
      }
    }
  }

  if (count === 0) {
    console.log(controlSquares);
    document.removeEventListener("keydown", controlSquares);

    document.querySelector(".game-over h1").textContent = "You looser!";
    document.querySelector(".game-over").style.display = "block";
  }
}

function checkForWin() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (gameBoard[r][c] === 2048) {
        console.log(controlSquares);
        document.removeEventListener("keydown", controlSquares);

        document.querySelector(".game-over h1").textContent = "You win!";
        document.querySelector(".game-over").style.display = "block";
      }
    }
  }
}
