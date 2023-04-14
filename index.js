// Factory Function for players
const Player = (name, symbol) => ({ name, symbol });

const playerOne = Player("Player One", "x");
const playerTwo = Player("Player Two", "o");

console.log(playerOne);
console.log(playerTwo);

// Game Module
const Game = (() => {
  let playerOneTurn = true;
  const getPlayer = () => playerOneTurn;
  const changePlayer = () => {
    playerOneTurn = !playerOneTurn;
  };
  return {
    getPlayer,
    changePlayer,
  };
})();

// Gameboard module
const Gameboard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const renderBoard = () => {
    // render the the contents of the gameboard array to the webpage
    const gameContainer = document.getElementById("game-container");
    for (let i = 0; i < board.length; i += 1) {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square-div");
      squareDiv.setAttribute("boardIndex", i);
      squareDiv.textContent = board[i];
      squareDiv.addEventListener("click", (e) => {
        if (e.target.textContent) {
          console.log("ALREADY PLAYED");
        } else {
          const arrayIndex = e.target.getAttribute("boardIndex");
          board[arrayIndex] = Game.getPlayer() ? "x" : "o";
          e.target.textContent = Game.getPlayer() ? "x" : "o";
          Game.changePlayer();
          console.log(board);
          console.log(Game.getPlayer());
        }
      });
      gameContainer.append(squareDiv);
    }
  };
  const addPlay = (play, spot) => {
    board[spot] = play;
  };
  return {
    board,
    renderBoard,
    addPlay,
  };
})();

Gameboard.renderBoard();
