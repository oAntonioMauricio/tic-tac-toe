// Factory Function for players
const Player = (name, symbol) => ({ name, symbol });

const playerOne = Player("Player One", "x");
const playerTwo = Player("Player Two", "o");

console.log(playerOne);
console.log(playerTwo);

// Game Module
const Game = (() => {
  let playerOneTurn = true;
  const getPlayerOne = () => playerOneTurn;
  const changePlayer = () => {
    playerOneTurn = !playerOneTurn;
    const playerName = document.getElementById("playerTurn");
    playerName.textContent = playerOneTurn
      ? `${playerOne.name} Turn`
      : `${playerTwo.name} Turn`;
  };
  let isGameOver = false;
  const getGameOver = () => isGameOver;
  const changeGameOver = () => {
    isGameOver = !isGameOver;
  };
  const displayWinner = () => {
    const playerName = document.getElementById("playerTurn");
    playerName.textContent = playerOneTurn
      ? `${playerTwo.name} Wins!`
      : `${playerOne.name} Wins!`;
    changeGameOver();
  };
  const displayTie = () => {
    const playerName = document.getElementById("playerTurn");
    playerName.textContent = "That's a Tie!";
    changeGameOver();
  };
  return {
    getPlayerOne,
    changePlayer,
    getGameOver,
    changeGameOver,
    displayWinner,
    displayTie,
  };
})();

// Gameboard module
const Gameboard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const addPlay = (play, spot) => {
    board[spot] = play;
  };
  const checkWinner = () => {
    // horizontal matches
    if (board[0] !== null && board[0] === board[1] && board[1] === board[2]) {
      console.log("horizontal win!");
      for (let i = 0; i <= 2; i += 1) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    } else if (
      board[3] !== null &&
      board[3] === board[4] &&
      board[4] === board[5]
    ) {
      console.log("horizontal win!");
      for (let i = 3; i <= 5; i += 1) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    } else if (
      board[6] !== null &&
      board[6] === board[7] &&
      board[7] === board[8]
    ) {
      console.log("horizontal win!");
      for (let i = 6; i <= 8; i += 1) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    }

    // vertical matches
    else if (
      board[0] !== null &&
      board[0] === board[3] &&
      board[3] === board[6]
    ) {
      console.log("vertical win!");
      for (let i = 0; i <= 6; i += 3) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    } else if (
      board[1] !== null &&
      board[1] === board[4] &&
      board[4] === board[7]
    ) {
      console.log("vertical win!");
      for (let i = 1; i <= 7; i += 3) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    } else if (
      board[2] !== null &&
      board[2] === board[5] &&
      board[5] === board[8]
    ) {
      console.log("vertical win!");
      for (let i = 2; i <= 8; i += 3) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    }

    // perpendicular win
    else if (
      board[0] !== null &&
      board[0] === board[4] &&
      board[4] === board[8]
    ) {
      console.log("perpendicular win!");
      for (let i = 0; i <= 8; i += 4) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    } else if (
      board[2] !== null &&
      board[2] === board[4] &&
      board[4] === board[6]
    ) {
      console.log("perpendicular win!");
      for (let i = 2; i <= 6; i += 2) {
        const winnerBlock = document.querySelector(`[boardindex="${i}"]`);
        winnerBlock.classList.add("square-win");
      }
      Game.displayWinner();
    }

    // tie
    else if (!board.includes(null)) {
      console.log("that's a tie!");
      Game.displayTie();
    }
  };
  const renderBoard = () => {
    // render the the contents of the gameboard array to the webpage
    const gameContainer = document.getElementById("game-container");
    for (let i = 0; i < board.length; i += 1) {
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square-div");
      squareDiv.setAttribute("boardIndex", i);
      squareDiv.textContent = board[i];
      squareDiv.addEventListener("click", (e) => {
        if (!Game.getGameOver()) {
          if (e.target.textContent) {
            console.log("ALREADY PLAYED");
          } else {
            const arrayIndex = e.target.getAttribute("boardIndex");
            e.target.textContent = Game.getPlayerOne() ? "x" : "o";
            addPlay(Game.getPlayerOne() ? "x" : "o", arrayIndex);
            Game.changePlayer();
            checkWinner(arrayIndex);
            console.log(board);
          }
        }
      });
      gameContainer.append(squareDiv);
    }
  };
  return {
    renderBoard,
    addPlay,
  };
})();

Gameboard.renderBoard();
