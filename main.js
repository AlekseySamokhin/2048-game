// project variable initialization
let gameBoard; // game board (two-dimensional array)
let rows = 4;
let columns = 4;
let score = 0;
let bestScore = 0;

document.addEventListener("DOMContentLoaded", () => {
  // function is called when the page is loaded
  initGame();
});

function initGame() {
  gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let square = document.createElement("div");
      // assign id 0-1, 0-2, 0-3, 0-4, 1-1 etc...
      square.id = `${r}-${c}`;

      let number = gameBoard[r][c];

      square.classList.add("square", `square-${number}`);

      if (number > 0) {
        square.textContent = number;
      }

      document.getElementById("game-board").append(square);
    }
  }

  randomPosititon();
  randomPosititon();
}

function randomPosititon() {
  // two random numbers from 0 to 3
  let r = Math.floor(Math.random() * rows);
  let c = Math.floor(Math.random() * columns);

  if (gameBoard[r][c] === 0) {
    gameBoard[r][c] = 2;

    let square = document.getElementById(`${r}-${c}`);
    square.classList.add("square", "square-2");
    square.textContent = 2;

    // нужно проверить на конец игры???
  } else {
    randomPosititon();
  }
}
