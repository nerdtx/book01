## Section 12: Save and Load the Game

A single page app feels much more complete when it can remember what was
happening, even after the browser is refreshed or closed. In this Battleship
game, that means the app should be able to restore:

* both fleets
* both shot grids
* the score values
* the current turn
* the game status

This is where `localStorage` becomes useful.

`localStorage` allows the browser to save small pieces of data as strings.
Because your game state is stored in one centralized object, saving and loading
the app becomes much simpler. You do not need to save dozens of unrelated
values. You only need to save one object.

### Why Centralized State Helps with Saving

Because `gameState` already stores the truth of the app, saving is
straightforward:

1. convert `gameState` into a JSON string
2. store it in `localStorage`

Loading is just the reverse:

1. read the string from `localStorage`
2. convert it back into an object
3. assign it to `gameState`
4. re-render the page

This is one of the strongest arguments for centralized state in a single page
app. A well-designed state object makes persistence much easier.

### Save the Game State

Create a function to save the current state.

```js id="4a2pd8"
function saveGame() {
  localStorage.setItem("battleshipGame", JSON.stringify(gameState));
}
```

This function takes the full `gameState` object, converts it into text using
`JSON.stringify()`, and stores it under the key `"battleshipGame"`.

Any time something important changes, such as:

* the player fires
* the computer fires
* a new game begins

the app should call `saveGame()`.

> **Helpful Hint:**
> Save after each meaningful state change. If you wait too long, the browser may
> close or refresh before the app has stored the latest data.

### Load the Saved Game

Now create a function that restores the app from saved data.

```js id="yzx8f3"
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
```

This function checks whether saved data exists. If it does:

* the saved JSON string is converted back into an object
* that object replaces the current `gameState`
* the app shows an appropriate message
* the app re-renders from the restored state

If no saved data exists, the app simply starts a new game.

### Why the Page Must Re-Render After Loading

When the page refreshes, the DOM is rebuilt from the HTML file. It does **not**
automatically remember the old board display. That means loading the state is
only half the job. The app must also redraw the interface.

That is why `loadGame()` calls:

```js id="c4g6w1"
renderApp();
```

Without that line, the data would be restored, but the user would still see an
empty or incorrect screen.

This shows an important SPA principle:

**The interface is rebuilt from the state.**

### Handle Turn and Status Carefully

Because the game includes two sides and turn-based logic, `loadGame()` must
restore more than just the board contents. It must also restore the correct flow
of the game.

For example:

* if the saved state says it is the player’s turn, the player should be able to
  click the computer board
* if the saved state says the game is already over, clicking should do nothing
* if the saved state says it is the computer’s turn, the app may need to
  continue that flow

For this chapter’s version, it is acceptable to restore the turn value and
message without automatically forcing the computer to act on page load. The
important thing is that the game does not lose track of whose turn it is.

### Optional: Clear the Saved Game

Sometimes it is useful during testing to remove saved data entirely.

You can remove just the Battleship entry like this:

```js id="v8q9m2"
function clearSavedGame() {
  localStorage.removeItem("battleshipGame");
}
```

This is optional for the project, but it can be helpful if you want to reset the
app completely.

### Update the Initialization Flow

Now that the app can save and load state, the startup function becomes even more
important.

Your `initApp()` function should already look something like this:

```js id="3p1rj7"
function initApp() {
  document.getElementById("newGameBtn").addEventListener("click", newGame);
  loadGame();
}
```

This means that whenever the page loads:

* the New Game button is connected
* the app tries to restore an existing game
* if nothing is saved, a new game begins

This is a clean and reliable SPA startup flow.

### Why This Makes the App Feel More Real

Without saving, the game feels temporary. A page refresh destroys everything.
With `localStorage`, the Battleship app begins to feel like real software.

The player can:

* leave the page
* refresh the browser
* come back later

and the app still knows what was happening.

That is a major improvement in usability, and it is one of the reasons single
page apps often rely on persistent state.

### What the App Can Do Now

At this point, the Battleship app can:

* start a new game
* manage turns
* track hits and misses
* detect wins and losses
* save progress
* restore progress after refresh

This is a strong example of a complete single page app workflow.

In the next section, you will review the architecture of the full app and see
how the major pieces fit together as a structured system.

