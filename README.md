# scratch-off!

live at: [https://ywpang.com/scratch-off/]

Welcome to Scratch Off, a fun browser-based game where users can "scratch off" to reveal emojis underneath. It's a simple interactive canvas-based web application where users can pick a color to scratch off and see how many emojis they've uncovered.

## Features
- Color Picker: Allows users to choose a color to scratch off.
- Scratch and Reveal: Users can "scratch" the canvas with their mouse to uncover hidden emojis.
- Emoji Counter: The game counts how many emojis the user has revealed so far.

## How to use
1. Click on the "Pick a color" button to select a color.
2. Start "scratching" the canvas using your mouse to reveal the hidden emojis.
3. Keep an eye on the counter to see how many emojis you've uncovered.
4. Once all emojis are revealed, a congratulatory message will pop up.
5. If you want to start over, just hit the "Reset" button.

## Implementation Details
The application is built using vanilla JavaScript, HTML, and CSS. The "scratching" effect is achieved using the <canvas> element and the 2D rendering context methods.

- Emojis are randomly placed on a canvas, and their positions are tracked.
- The top canvas layer is filled with a user-selected color.
- When the user moves their mouse over the canvas, the top layer is cleared away, revealing the underlying emojis.
- Once an emoji is more than half-revealed, it's considered "found" and contributes to the counter.


