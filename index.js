// Factory Function for players
const Player = (name, symbol) => ({ name, symbol });

const playerOne = Player("Player One", "x");
const playerTwo = Player("Player Two", "o");

// Game Module
const Game = (() => {
  let isBotOn = true;
  let playerOneTurn = true;
  let isGameOver = false;

  const getPlayerOne = () => playerOneTurn;
  const getGameOver = () => isGameOver;
  const getBot = () => isBotOn;

  const changePlayer = () => {
    playerOneTurn = !playerOneTurn;
    const playerName = document.getElementById("playerTurn");
    playerName.textContent = playerOneTurn
      ? `${playerOne.name} Turn`
      : `${playerTwo.name} Turn`;
    if (isBotOn && !playerOneTurn && !isGameOver) {
      console.log("bot playing...");
      // eslint-disable-next-line no-use-before-define
      BotPlayer.getAvailablePlays();
      // eslint-disable-next-line no-use-before-define
      BotPlayer.makeRandomMove();
    }
  };

  const changeGameOver = () => {
    isGameOver = !isGameOver;
  };

  const changeBot = () => {
    isBotOn = !isBotOn;
  };

  const displayWinner = () => {
    console.log("let's display winner");
    const playerName = document.getElementById("playerTurn");
    playerName.textContent = playerOneTurn
      ? `${playerOne.name} Wins! 🥳`
      : `${playerTwo.name} Wins! 🥳`;
    changeGameOver();
  };

  const displayTie = () => {
    const playerName = document.getElementById("playerTurn");
    playerName.textContent = "That's a Tie! 👔";
    changeGameOver();
  };

  const resetGame = () => {
    playerOneTurn = true;
    isGameOver = false;
  };

  return {
    getPlayerOne,
    getGameOver,
    getBot,
    changePlayer,
    changeGameOver,
    changeBot,
    displayWinner,
    displayTie,
    resetGame,
  };
})();

// Gameboard module
const Gameboard = (() => {
  let board = [null, null, null, null, null, null, null, null, null];

  const addPlay = (play, spot) => {
    board[spot] = play;
  };

  const getBoard = () => board;

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
    } else {
      Game.changePlayer();
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
            const spanSvg = document.createElement("span");
            spanSvg.classList.add("material-symbols-outlined");
            spanSvg.textContent = Game.getPlayerOne()
              ? "close"
              : "radio_button_unchecked";
            e.target.appendChild(spanSvg);

            const arrayIndex = e.target.getAttribute("boardIndex");
            addPlay(Game.getPlayerOne() ? "x" : "o", arrayIndex);
            checkWinner(arrayIndex);
          }
        }
      });
      gameContainer.append(squareDiv);
    }
  };

  const renderButtons = () => {
    // render the restart button
    const replayButton = document.getElementById("restartButton");
    replayButton.addEventListener("click", () => {
      const parentNode = document.getElementById("game-container");
      while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
      }
      Game.resetGame();
      const playerName = document.getElementById("playerTurn");
      playerName.textContent = "Player One Turn";
      board = [null, null, null, null, null, null, null, null, null];
      renderBoard();
    });

    // render the vs button
    const vsButton = document.getElementById("vsButton");
    vsButton.addEventListener("click", () => {
      replayButton.click();
      Game.changeBot();
      vsButton.textContent = Game.getBot() ? "Play VS Friend" : "Play VS Bot";
    });
  };

  return {
    getBoard,
    renderBoard,
    addPlay,
    renderButtons,
  };
})();

// draw the board for the first time
Gameboard.renderBoard();
Gameboard.renderButtons();

// BOT
const BotPlayer = (() => {
  let availablePlays = [];
  const getAvailablePlays = () => {
    availablePlays = [];
    Gameboard.getBoard().forEach((elem, index) => {
      if (elem === null) {
        availablePlays.push(index);
      }
    });
    console.log(availablePlays);
  };
  const makeRandomMove = () => {
    const random = Math.floor(Math.random() * availablePlays.length);
    const randomMove = availablePlays[random];
    const squareToClick = document.querySelector(
      `[boardindex="${randomMove}"]`
    );
    squareToClick.click();
  };
  return {
    getAvailablePlays,
    makeRandomMove,
  };
})();
