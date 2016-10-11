## JS Terminal

A JS terminal emulator, in your browser. Created by [Michael Bilstein](https://github.com/Meegul304) and [Scott Mangiapane](https://github.com/scottmangiapane). It currently supports a limited range of commands, but more are coming soon!

## Demo

https://scottmangiapane.github.io/js-terminal/

## How to write programs for <span>os.js</span>

Any program should only rely on two functions for i/o:

#### addLine(text)
- Where `text` is the text you want printed to a new line.
- Returns the index of the line you just created.

#### changeLine(index, text)
- Where `index` is the index of the line you want to change.
- And `text` is the text you want the line to be changed to.
- Note that you have unlimited access with this function, and can end up changing lines you didn't indend to if you aren't careful.

## Submitting a package to os.js
In order to submit a package to be added to the repository, just make a pull request with your package in the js/programs folder. We will review your package and merge if it does not interfere with any other packages or core functionality.