
const shipLengths = [3, 2, 2];

function createEmptyGrid(size) {
  let grid = [];

  for (let row = 0; row < size; row++) {
    let rowData = [];

    for (let col = 0; col < size; col++) {
      rowData.push("");
    }

    grid.push(rowData);
  }

  return grid;
}

function createNewGameState() {
  return {
    size: 6,
    playerShips: [],
    computerShips: [],
    playerShots: createEmptyGrid(6),
    computerShots: createEmptyGrid(6),
    playerHits: 0,
    playerMisses: 0,
    computerHits: 0,
    computerMisses: 0,
    turn: "player",
    status: "playing"
  };
}

let gameState = createNewGameState();

function renderMessage(text) {
  document.getElementById("message").textContent = text;
}

function renderScoreboard() {
  document.getElementById("playerHits").textContent = gameState.playerHits;
  document.getElementById("playerMisses").textContent = gameState.playerMisses;
  document.getElementById("computerHits").textContent = gameState.computerHits;
  document.getElementById("computerMisses").textContent = gameState.computerMisses;
}

function renderPlayerBoard() {
  const board = document.getElementById("playerBoard");
  board.innerHTML = "";

  for (let row = 0; row < gameState.size; row++) {
    for (let col = 0; col < gameState.size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (playerHasShipAt(row, col)) {
        cell.classList.add("ship");
      }

      const shotState = gameState.computerShots[row][col];

      if (shotState === "hit") {
        cell.classList.add("hit");
        cell.textContent = "X";
      } else if (shotState === "miss") {
        cell.classList.add("miss");
        cell.textContent = "O";
      }

      board.appendChild(cell);
    }
  }
}

function renderComputerBoard() {
  const board = document.getElementById("computerBoard");
  board.innerHTML = "";

  for (let row = 0; row < gameState.size; row++) {
    for (let col = 0; col < gameState.size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const shotState = gameState.playerShots[row][col];

      if (shotState === "hit") {
        cell.classList.add("hit");
        cell.textContent = "X";
      } else if (shotState === "miss") {
        cell.classList.add("miss");
        cell.textContent = "O";
      }

      cell.addEventListener("click", function () {
        handlePlayerShot(row, col);
      });

      board.appendChild(cell);
    }
  }
}


function playerHasShipAt(row, col) {
  for (let ship of gameState.playerShips) {
    for (let cell of ship.cells) {
      if (cell.row === row && cell.col === col) {
        return true;
      }
    }
  }

  return false;
}


function renderApp() {
  renderScoreboard();
  renderPlayerBoard();
  renderComputerBoard();
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function buildShipCells(startRow, startCol, length, horizontal) {
  let cells = [];

  for (let i = 0; i < length; i++) {
    cells.push({
      row: horizontal ? startRow : startRow + i,
      col: horizontal ? startCol + i : startCol
    });
  }

  return cells;
}

function isValidPlacement(size, cells, occupied) {
  for (let cell of cells) {
    const key = `${cell.row},${cell.col}`;

    if (
      cell.row < 0 ||
      cell.row >= size ||
      cell.col < 0 ||
      cell.col >= size ||
      occupied.has(key)
    ) {
      return false;
    }
  }

  return true;
}

function placeSingleShip(size, length, occupied) {
  while (true) {
    const horizontal = Math.random() < 0.5;
    const startRow = randomInt(size);
    const startCol = randomInt(size);

    const cells = buildShipCells(startRow, startCol, length, horizontal);

    if (isValidPlacement(size, cells, occupied)) {
      for (let cell of cells) {
        occupied.add(`${cell.row},${cell.col}`);
      }

      return { "cells": cells };
    }
  }
}

function placeFleet(size) {
  let ships = [];
  let occupied = new Set();

  for (let length of shipLengths) {
    let ship = placeSingleShip(size, length, occupied);
    ships.push(ship);
  }

  return ships;
}


function setupNewGame() {
  gameState = createNewGameState();

  gameState.playerShips = placeFleet(gameState.size);
  gameState.computerShips = placeFleet(gameState.size);
}


function newGame() {
  setupNewGame();
  saveGame();
  renderMessage("Click a square on the computer board to fire.");
  renderApp();
}

function initApp() {
  document.getElementById("newGameBtn").addEventListener("click", newGame);
  loadGame();
}


function fleetHasShipAt(row, col, fleet) {
  for (let ship of fleet) {
    for (let cell of ship.cells) {
      if (cell.row === row && cell.col === col) {
        return true;
      }
    }
  }

  return false;
}


function playerHasShipAt(row, col) {
  return fleetHasShipAt(row, col, gameState.playerShips);
}

function computerHasShipAt(row, col) {
  return fleetHasShipAt(row, col, gameState.computerShips);
}

function isHitOnFleet(row, col, fleet) {
  return fleetHasShipAt(row, col, fleet);
}

function handlePlayerShot(row, col) {
  if (gameState.status !== "playing") {
    return;
  }

  if (gameState.turn !== "player") {
    return;
  }

  if (gameState.playerShots[row][col] !== "") {
    return;
  }

  if (computerHasShipAt(row, col)) {
    gameState.playerShots[row][col] = "hit";
    gameState.playerHits++;
    renderMessage("Hit!");
  } else {
    gameState.playerShots[row][col] = "miss";
    gameState.playerMisses++;
    renderMessage("Miss!");
  }

  checkForGameEnd();

  if (gameState.status === "playerWon") {
    renderMessage("You sank every computer ship. You win!");
  } else if (gameState.status === "playing") {
    gameState.turn = "computer";
  }

  saveGame();
  renderApp();

  if (gameState.status === "playing" && gameState.turn === "computer") {
    setTimeout(handleComputerTurn, 500);
  }

}

function getUnfiredCells(grid) {
  let cells = [];

  for (let row = 0; row < gameState.size; row++) {
    for (let col = 0; col < gameState.size; col++) {
      if (grid[row][col] === "") {
        cells.push({ row: row, col: col });
      }
    }
  }

  return cells;
}

function chooseComputerTarget() {
  let available = getUnfiredCells(gameState.computerShots);

  if (available.length === 0) {
    return null;
  }

  let index = randomInt(available.length);
  return available[index];
}

function handleComputerTurn() {
  if (gameState.status !== "playing") {
    return;
  }

  if (gameState.turn !== "computer") {
    return;
  }

  let target = chooseComputerTarget();

  if (target === null) {
    return;
  }

  let row = target.row;
  let col = target.col;

  if (playerHasShipAt(row, col)) {
    gameState.computerShots[row][col] = "hit";
    gameState.computerHits++;
    renderMessage("Computer scored a hit!");
  } else {
    gameState.computerShots[row][col] = "miss";
    gameState.computerMisses++;
    renderMessage("Computer missed.");
  }

  checkForGameEnd();

  if (gameState.status === "computerWon") {
    renderMessage("The computer sank all your ships. You lose.");
  } else if (gameState.status === "playing") {
    gameState.turn = "player";
    renderMessage("Your turn. Click a square on the computer board.");
  }

  saveGame();
  renderApp();
}


function getFleetCellCount(fleet) {
  let total = 0;

  for (let ship of fleet) {
    total += ship.cells.length;
  }

  return total;
}


function checkForGameEnd() {
  const totalComputerCells = getFleetCellCount(gameState.computerShips);
  const totalPlayerCells = getFleetCellCount(gameState.playerShips);

  if (gameState.playerHits === totalComputerCells) {
    gameState.status = "playerWon";
    return;
  }

  if (gameState.computerHits === totalPlayerCells) {
    gameState.status = "computerWon";
  }
}


function saveGame() {
  localStorage.setItem("battleshipGame", JSON.stringify(gameState));
}


function loadGame() {
  const saved = localStorage.getItem("battleshipGame");

  if (saved !== null) {
    gameState = JSON.parse(saved);

    if (gameState.status === "playerWon") {
      renderMessage("You already won this game!");
    } else if (gameState.status === "computerWon") {
      renderMessage("The computer already won this game.");
    } else if (gameState.turn === "player") {
      renderMessage("Game loaded. Your turn.");
    } else {
      renderMessage("Game loaded. Computer turn.");
    }

    renderApp();
  } else {
    newGame();
  }
}

function clearSavedGame() {
  localStorage.removeItem("battleshipGame");
}


initApp();
