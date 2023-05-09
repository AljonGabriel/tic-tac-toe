const gameBoard = document.querySelector("#board");
const infoDisplay = document.querySelector("#info");

const playerONameInput = document.getElementById("playerOName");
const playerXNameInput = document.getElementById("playerXName");
const circleName = document.getElementById("circleName");
const crossName = document.getElementById("crossName");

const startGameButton = document.querySelector("#startGameButton");

let playerO = "";
let playerX = "";

const cells = ["", "", "", "", "", "", "", "", ""];

let playerMove = "circle";

startGameButton.addEventListener("click", function () {
  playerO = playerONameInput.value;
  playerX = playerXNameInput.value;

  circleName.textContent = `Player O: ${playerO}`;
  crossName.textContent = `Player X: ${playerX}`;

  board();
});

function board() {
  cells.forEach((_id, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("squares");
    cellElement.id = index;
    cellElement.addEventListener("click", moves);
    gameBoard.append(cellElement);
  });
}

function moves(e) {
  const playerMovesElement = document.createElement("div");
  playerMovesElement.classList.add(playerMove);
  e.target.append(playerMovesElement);

  playerMove = playerMove === "circle" ? "cross" : "circle";

  infoDisplay.innerHTML = "Player" + " " + playerMove;

  e.target.removeEventListener("click", moves);

  calcWin();
}

function calcWin() {
  const squares = document.querySelectorAll(".squares");
  const winComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let countMove = 0;
  squares.forEach((square) => {
    if (square.firstChild !== null) {
      countMove++;
    }
  });
  console.log(countMove);

  if (countMove === 9) {
    infoDisplay.innerHTML = "DRAW!";
    squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
  }

  winComb.forEach((array) => {
    const circleWins = array.every((cells) =>
      squares[cells].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      infoDisplay.innerHTML = " Circle Wins! " + playerO;
      squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }
  });

  winComb.forEach((array) => {
    const crossWins = array.every((cells) =>
      squares[cells].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      infoDisplay.innerHTML = " Cross Wins! " + playerX;
      squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
      return;
    }
  });
}
