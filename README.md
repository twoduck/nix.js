## JS Terminal

A JS terminal emulator, in your browser. Created by [Michael Bilstein](https://github.com/Meegul304) and [Scott Mangiapane](https://github.com/scottmangiapane). It currently supports a limited range of commands, but more are coming soon!

## Demo

https://scottmangiapane.github.io/js-terminal/

## How to write programs for js-term

- You should have only one user-facing function, with all helper functions scope restricted.
  - Your primary function should be declared like: `function myFunction(args)`
  - Any helper functions should be scope restricted, using `const`: `const myHelper = function()`
- Your primary function should be the title of your program (hello.js should have a public *hello* function).

- Your primary function will receive an array of arguments that the user gives to it.
  - For example, `$echo hello there` results in `args` === `["hello", "there"]` in the `echo(args)` function call.

### Functions you should use:
#### addLine(text)
- Where `text` is the text you want printed to a new line.
- Returns the index of the line you just created.

#### changeLine(index, text)
- Where `index` is the index of the line you want to change.
- And `text` is the text you want the line to be changed to.
- Note that you have unlimited access with this function, and can end up changing lines you didn't indend to if you aren't careful.

## Example of a well-written program:
```javascript
function helloNameAndDate(args) {
   if (!args[0]) {
       addLine("Please provide a name");
       return;
   }
   const name = args[0];
   const date = getDate();
   addLine("Hello, " + name + ". It is: " + date);
}

const getDate = function() {
    let clock = new Date();
    return clock.toDateString() + ", " + clock.toTimeString();
}
```


## Submitting a package to js-term
In order to submit a package to be added to the repository, just make a pull request with your package in the js/programs folder. We will review your package and merge if it follows the guidelines provided.