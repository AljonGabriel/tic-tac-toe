const gameBoard = document.querySelector("#board");
const infoDisplay = document.querySelector("#info");

const cells = ["", "", "", "", "", "", "", "", ""];

let playerMove = "circle";

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
}

board();
