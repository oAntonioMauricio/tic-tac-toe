// Gameboard module
const Gameboard = (() => {
  const board = ["x", null, "x", null, null, null, null, null, "o"];
  const addPlay = (play, spot) => {
    board[spot] = play;
  };
  return {
    board,
    addPlay,
  };
})();

// Factory Function for players
const Player = (name, symbol) => ({ name, symbol });

const playerOne = Player("Player One", "x");
const playerTwo = Player("Player Two", "o");

console.log(playerOne);
console.log(playerTwo);

// render the the contents of the gameboard array to the webpage
const gameContainer = document.getElementById("game-container");

for (let i = 0; i < Gameboard.board.length; i += 1) {
  const squareDiv = document.createElement("div");
  squareDiv.classList.add("square-div");
  squareDiv.setAttribute("boardIndex", i);
  squareDiv.addEventListener("click", () => {
    console.log("hey");
  });
  gameContainer.append(squareDiv);
}
