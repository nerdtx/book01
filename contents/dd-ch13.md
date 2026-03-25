## Section 13: Review the Architecture of the App

At this point, the Battleship game is no longer just a collection of features.
It is a complete single page app with organized structure, persistent state,
rendering logic, and turn-based interaction.

This is a good moment to stop and look at the full architecture.

Doing that matters because one of the main goals of this chapter is not just to
finish a game. It is to understand how a larger browser application can be built
in a clean and manageable way.

### The Five Main Parts of the App

Your app now has five major structural parts:

* state
* rendering
* game logic
* event handling
* persistence

These parts work together, but they should not be mixed carelessly.

### 1. State

The `gameState` object is the center of the app.

It stores:

* board size
* player fleet
* computer fleet
* player shots
* computer shots
* scores
* turn
* status

This is the source of truth. If the app needs to know what is happening, it
should check the state object.

That means the app should not rely on:

* text currently visible on the page
* CSS classes as a source of truth
* assumptions about what happened earlier

The state object should be enough to describe the whole game.

### 2. Rendering

Render functions read from state and update the DOM.

Examples include:

* `renderMessage()`
* `renderScoreboard()`
* `renderPlayerBoard()`
* `renderComputerBoard()`
* `renderApp()`

These functions do not decide game rules. They do not place ships or determine
whether a move is valid. They simply display what the state already says is
true.

That separation is a major reason the app stays understandable.

### 3. Game Logic

Game logic functions define the rules of Battleship.

Examples include:

* `buildShipCells()`
* `isValidPlacement()`
* `placeSingleShip()`
* `placeFleet()`
* `fleetHasShipAt()`
* `playerHasShipAt()`
* `computerHasShipAt()`
* `getFleetCellCount()`
* `checkForGameEnd()`

These functions operate on data, not on the page. That makes them easier to test
and easier to reuse.

### 4. Event Handling

Event handlers connect user actions to state changes.

Examples include:

* the New Game button handler
* `handlePlayerShot()`
* `handleComputerTurn()`

These are the bridge between the outside world and the app’s internal logic.

A good event handler should usually:

1. check whether the action is allowed
2. update state
3. trigger rendering
4. save the app if needed

That pattern appears throughout this project.

### 5. Persistence

Persistence functions allow the app to survive a page reload.

Examples include:

* `saveGame()`
* `loadGame()`

Because the app uses centralized state, saving and loading are relatively
simple. The browser stores one JSON string, and the app rebuilds itself from
that data.

This is a strong example of why good state design matters.

> **Helpful Hint:**
> If saving and loading your app feels overly complicated, that is often a sign
> that your state is too scattered.

### The Core SPA Cycle

The app now follows a very common single page app cycle:

1. something happens
2. the state changes
3. the page re-renders
4. the new state is saved

You can see that pattern in the player turn flow:

* the player clicks a computer-board cell
* the app records a hit or miss in state
* the scoreboard and boards re-render
* the updated state is saved

You can also see it in the computer turn:

* the computer chooses a valid square
* the app records the result in state
* the player board and scoreboard re-render
* the updated state is saved

This is one of the most important patterns in frontend programming.

### Why This Structure Matters

Imagine trying to add a new feature, such as:

* difficulty levels
* smarter enemy targeting
* a ship placement screen
* a reset saved game button

Those features become much easier when the app is already organized well.

With the structure you now have, you know:

* where new state should live
* where new rendering should happen
* where rules belong
* where click or turn behavior should be handled

That is the real payoff of good architecture.

### A Quick Structural Map

Here is one way to think about the app:

**State**

* `gameState`

**Render Functions**

* `renderMessage()`
* `renderScoreboard()`
* `renderPlayerBoard()`
* `renderComputerBoard()`
* `renderApp()`

**Utility and Rule Functions**

* `createEmptyGrid()`
* `randomInt()`
* `buildShipCells()`
* `isValidPlacement()`
* `placeSingleShip()`
* `placeFleet()`
* `fleetHasShipAt()`
* `playerHasShipAt()`
* `computerHasShipAt()`
* `getFleetCellCount()`
* `checkForGameEnd()`

**Event and Turn Functions**

* `handlePlayerShot()`
* `handleComputerTurn()`
* `newGame()`
* `initApp()`

**Persistence**

* `saveGame()`
* `loadGame()`

Looking at the project this way helps you see that the app is not one giant
script. It is a set of cooperating parts.

### What You Should Take Away

This chapter is about more than Battleship. It is about learning how to build a
browser app that stays organized as it grows.

If you remember one idea from this project, let it be this:

**State, rendering, logic, and events should work together - but they should not be tangled together.**

That is one of the clearest signs of good single page app design.

In the next section, you will explore stretch goals that add features without
damaging the structure you have built.

