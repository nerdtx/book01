## Section 11: Check for Win and Loss as State Rules

Now that both the player and the computer can take turns, the app needs a
reliable way to decide when the game is over.

This is another place where good structure matters. A win or loss should not be
decided by looking at the page. It should be decided by looking at the
**state**.

In a well-designed single page app, the page reflects the game state. It does
not define it.

### What Counts as Winning?

A side loses when **all of its ship cells have been hit**.

That means:

* the **player wins** when all computer ship cells have been hit
* the **computer wins** when all player ship cells have been hit

To detect that, the app must count how many ship cells exist in each fleet and
compare that number to the number of successful hits.

### Count the Total Ship Cells in a Fleet

Start with a helper function that counts the number of cells occupied by a
fleet.

```js
function getFleetCellCount(fleet) {
  let total = 0;

  for (let ship of fleet) {
    total += ship.cells.length;
  }

  return total;
}
```

This function works for either side:

* `getFleetCellCount(gameState.playerShips)`
* `getFleetCellCount(gameState.computerShips)`

Because it is generic, you can reuse it anywhere you need to measure a fleet.

### Compare Hits Against Fleet Size

Now create the function that checks whether the game should end.

```js
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
```

This function changes only the state. It does not update the DOM directly.

That is exactly what you want.

### Why This Function Should Stay Small

Notice what `checkForGameEnd()` does **not** do:

* it does not change the board display
* it does not update the scoreboard
* it does not save the game
* it does not attach classes to cells
* it does not decide whose turn is next

Its job is very narrow:

> Examine the current state and update the `status` if the game is over.

That kind of focused function is easier to test and easier to trust.

> **Helpful Hint:**
> If a function starts answering too many questions at once, split it. A good
> state-rule function should be small and easy to understand.

### Update the Turn Handlers to Show the Right Message

Now that the app can detect a win or loss, the turn handlers should respond
appropriately.

In `handlePlayerShot()`, after checking for game end, update the message based
on the status.

A cleaner version looks like this:

```js
checkForGameEnd();

if (gameState.status === "playerWon") {
  renderMessage("You sank every computer ship. You win!");
} else if (gameState.status === "playing") {
  gameState.turn = "computer";
}
```

And in `handleComputerTurn()`, do the same:

```js
checkForGameEnd();

if (gameState.status === "computerWon") {
  renderMessage("The computer sank all your ships. You lose.");
} else if (gameState.status === "playing") {
  gameState.turn = "player";
  renderMessage("Your turn. Click a square on the computer board.");
}
```

This keeps the rules clear:

* `checkForGameEnd()` changes state
* the turn handlers decide what message to show after reading that state

### Why the Status Property Matters

At this point, `gameState.status` can have three meaningful values:

* `"playing"`
* `"playerWon"`
* `"computerWon"`

This is better than using a vague Boolean like `gameOver = true`, because it
tells the app exactly what kind of ending happened.

For example:

* if status is `"playerWon"`, the player should not be allowed to fire again
* if status is `"computerWon"`, the computer should not take another turn
* if status is `"playing"`, the turn cycle should continue normally

This is one reason descriptive state values are so useful in single page apps.

### Update the Interface from the New Status

Because the app already uses render functions and state-based event handling,
the interface will remain consistent as long as the turn handlers respect the
status.

For example:

* the click handler already returns early if `gameState.status !== "playing"`
* the computer turn handler already returns early if the game is over
* the boards will render from the current shot grids
* the scoreboard will render from the current counters

That means the new win/loss logic fits naturally into the existing app
structure.

### What the App Can Do Now

At this point, the app can now:

* alternate between player and computer turns
* detect hits and misses
* keep score
* determine whether either side has won
* stop normal play when the game ends

This is a major milestone. The game now has a full beginning, middle, and end.

In the next section, you will update the save and load logic so the app can
restore a game with both boards, both fleets, the current turn, and the correct
end-state if the page is refreshed.

