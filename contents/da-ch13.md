## Section 10: Add the Computer’s Turn

A Battleship game is not complete if only the player can fire. To make this a
true single-player game, the app must allow the **computer to take a turn**
after the player acts.

This section adds that behavior while preserving good single page app structure.

The computer’s turn should follow the same overall pattern as the player’s turn:

1. Check that the action is allowed
2. Choose a valid target
3. Update the state
4. Update the message
5. Check for a win or loss
6. Save the game
7. Re-render the app

The computer should not cheat. It should only fire at squares it has not already
targeted.

### Start with a Helper Function to Find Valid Targets

The computer needs a way to choose a square that has not already been used.
Since `gameState.computerShots` stores every computer attack, the easiest
strategy is to build a list of all untouched cells and choose one at random.

```js id="c4n8p1"
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
```

This function does not change the app. It only returns useful data.

### Choose a Random Target

Now create a helper that picks one valid target from the remaining cells.

```js id="r7m2k5"
function chooseComputerTarget() {
  let available = getUnfiredCells(gameState.computerShots);

  if (available.length === 0) {
    return null;
  }

  let index = randomInt(available.length);
  return available[index];
}
```

If the board is somehow full, this function returns `null`. In normal play, it
should always return a valid target until the game ends.

> **Helpful Hint:**
> The computer does not need to be smart for the game to work. A clean random
> strategy is a good starting point, and you can always improve it later.

### Write the Computer Turn Handler

Now create the main function for the computer’s turn.

```js id="w5p9x3"
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

  if (gameState.status === "playing") {
    gameState.turn = "player";
    renderMessage("Your turn. Click a square on the computer board.");
  }

  saveGame();
  renderApp();
}
```

This function follows the same pattern as the player’s shot handler. It checks
whether the turn is valid, selects a target, updates state, checks for game end,
and re-renders.

### Notice the Structural Similarity

Compare the player’s turn and the computer’s turn. They are different actions,
but they are built from the same structure:

* validate
* update state
* check game end
* switch turn
* save
* render

That consistency is a sign of good app architecture.

If your code uses the same pattern in multiple places, it becomes easier to
understand and easier to maintain.

### Trigger the Computer’s Turn After the Player’s Turn

Now update the player’s shot handler so the computer acts after the player fires.

At the end of `handlePlayerShot()`, after saving and rendering, add a delayed call:

```js id="f8q4j6"
if (gameState.status === "playing" && gameState.turn === "computer") {
  setTimeout(handleComputerTurn, 500);
}
```

This small delay improves the experience because it gives the player time to see
the result of their shot before the computer responds.

Your updated ending for `handlePlayerShot()` should look like this:

```js id="k2v7m9"
checkForGameEnd();

if (gameState.status === "playing") {
  gameState.turn = "computer";
}

saveGame();
renderApp();

if (gameState.status === "playing" && gameState.turn === "computer") {
  setTimeout(handleComputerTurn, 500);
}
```

### Why Use `setTimeout()`?

Without a delay, the player’s move and the computer’s move may feel like one
instant blur. A short pause makes the turn flow much easier to understand.

This also makes the app feel more like a real game and less like a script that
instantly updates everything.

### Keep the Computer Board Hidden

Remember that the computer’s ships should still remain hidden on the screen. The
player should only see the results of their own shots on the computer board.

That means `renderComputerBoard()` should continue to show only:

* hits
* misses

It should not show ship positions directly.

By contrast, the player board should continue to show:

* player ships
* computer hits
* computer misses

This difference in rendering is an important part of the game design.

### What the App Can Do Now

At this point, the game now behaves like a real two-sided single-player
Battleship app:

* the player fires at the computer board
* the computer fires back at the player board
* both sides track hits and misses
* turns alternate properly
* state stays centralized
* rendering still happens through dedicated render functions

That is a major improvement over the earlier one-board version.

In the next section, you will write the game-end logic so the app can detect
when the player has won or when the computer has won.

