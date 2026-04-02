## Section 14: Stretch Goals That Respect the Architecture

A well-structured app is easier to improve. That is one of the biggest benefits
of building with good architecture from the start.

Now that your Battleship game has clear separation between state, rendering,
logic, events, and persistence, you are in a good position to add features
without turning the code into a mess.

That is the key idea in this section:

**Add features in ways that fit the existing structure.**

Do not solve every new problem by stuffing more code into one click handler.
Instead, ask:

* Does this change belong in state?
* Does this require a new render function?
* Is this a new rule or utility function?
* Is this a new event handler?

That mindset will help your app stay clean as it grows.

### Stretch Goal 1: Difficulty Levels

A simple extension is to let the player choose between different board sizes or
fleet sizes.

For example:

* Easy - 6 by 6 board
* Medium - 8 by 8 board
* Hard - 10 by 10 board

To support this cleanly, difficulty should become part of the state or setup
process.

Example idea:

```js
function createNewGameState(size) {
  return {
    size: size,
    playerShips: [],
    computerShips: [],
    playerShots: createEmptyGrid(size),
    computerShots: createEmptyGrid(size),
    playerHits: 0,
    playerMisses: 0,
    computerHits: 0,
    computerMisses: 0,
    turn: "player",
    status: "playing"
  };
}
```

This is a good architectural improvement because it expands the setup flow
without breaking the rest of the app.

### Stretch Goal 2: Smarter Computer Targeting

Right now, the computer fires randomly. That works, but a more advanced version
could make the computer smarter.

For example, after a hit, the computer might try nearby cells next.

This feature should not be mixed directly into rendering. It belongs in game
logic.

A clean design might include a new function such as:

* `chooseSmartComputerTarget()`

Then the computer turn handler could call that function instead of the random
one.

> **Helpful Hint:**
> Smarter behavior should usually be added by replacing or improving a helper
> function, not by making the event handler much more complicated.

### Stretch Goal 3: Reveal Ships After Game Over

At the end of the game, you may want to reveal the computer’s ships so the
player can see where they were hidden.

This change belongs mostly in the render layer.

For example, `renderComputerBoard()` could check:

* if the game is over
* if a computer ship exists at a cell
* if so, add a special CSS class

This is a good example of a feature that changes the display without changing
the underlying rules.

### Stretch Goal 4: Reset Saved Game Button

A useful testing and user feature is a button that clears saved data.

This belongs in persistence and event handling.

Example function:

```js
function clearSavedGame() {
  localStorage.removeItem("battleshipGame");
}
```

Then attach it to a button.

This feature is small, but it fits the architecture well because it has a clear
home.

### Stretch Goal 5: Show Remaining Ship Cells

You could expand the scoreboard to show how many ship cells remain for each
side.

This can be calculated from state. That means the feature belongs in rendering
and helper functions, not in the click handlers.

For example, you might add:

* `getRemainingPlayerCells()`
* `getRemainingComputerCells()`

Then update the scoreboard render function.

### Stretch Goal 6: Add a Setup Phase

A more advanced version of the game could let the player place ships manually
before the game begins.

This would add a new app phase, such as:

* `"setup"`
* `"playing"`
* `"playerWon"`
* `"computerWon"`

That change would expand the state model and probably require some new rendering
and event logic. It is a bigger change, but it is still manageable if the
architecture remains clear.

This is a strong example of how a good state model makes future growth possible.

### Stretch Goal 7: Add Sound or Animation

Small sound effects or animations can improve the feel of the app.

These should still respect the structure:

* game logic updates the state
* render logic updates the page
* sound or animation reacts to the result

For example, a hit sound might play after the app detects that a shot was a hit.
That should happen after the state changes, not as part of the hit detection
rule itself.

### How to Add Features Safely

Whenever you add a feature, try to follow this process:

1. Decide what new data must be remembered
2. Add that data to the state if needed
3. Write small helper functions for any new logic
4. Update rendering separately
5. Connect it with event handlers only where necessary

That approach protects the structure of the app.

### A Warning About Feature Creep

Feature creep happens when a project keeps growing without enough planning.
Small additions pile up until the code becomes difficult to understand.

That is why this section emphasizes disciplined improvement. It is better to add
one feature well than three features badly.

> **Helpful Hint:**
> Before adding a stretch feature, ask yourself: “Where does this belong?” If
> you cannot answer that clearly, the design probably needs more thought first.

### Why This Section Matters

This section is not only about extra features. It is about learning how to grow
an app responsibly.

A good single page app is not just something you finish once. It is something
you can keep improving without losing control of the codebase.

