var commands = [];
var commandIndex = 0;
var notYetEntered = "";
var lastKeyCode = 0;
/*
 * Ensures that the user is always focused on the input text.
 */
document.onkeydown = function (event) {
    if (event.keyCode != 91 && event.keyCode != 17)
        document.getElementById("input-text").focus();
}

/*
 * Controls what happens on each keypress in the input box.
 */
document.getElementById("input-text").onkeydown = function (event) {
    var input = document.getElementById("input-text");
    input.focus();
    switch (event.keyCode) {
        case 9: //Tab key
            tab();
            break;
        case 13: //Enter key
            let command = input.value.trim();
            if (command != "") { //If a command has been entered
                saveCommand(command); //Add the command to the history.
                commands[commands.length] = command; //Append the command to the list
                commandIndex = commands.length;
                parse(command);
                input.value = ""; //reset the input
            }
            break;
        case 38: //Up arrow key
            moveCursorToEnd();
            upKey();
            break;
        case 40: //Down arrow key
            moveCursorToEnd();
            downKey();
            break;
    }
};

/*
 * Translates the input into a function call
 * Also shows declared variables
 */
function parse(input) {
    parts = input.split(" ");
    let fn = window[parts[0]];
    if (typeof fn === 'function') {
        parts.shift();
        fn(parts);
    } else if (typeof fn === "string") {
        addLine(parts[0] + ": " + "'" + fn + "'");
    } else if (typeof fn === "object") {
        addLine(parts[0] + ": " + JSON.stringify(fn));
    } else {
        addLine(parts[0] + ": command not found");
    }
}

/*
 * Occurs when the user hit's the tab key
 * Autocompletes the command
 */
function tab() {
    if (window.event)
        window.event.returnValue = false;
    else if (event.cancelable)
        event.preventDefault();
}

/*
 * Ensures that the cursor is at the end
 * of the input box, even when scrolling
 * through the command history
 */
document.getElementById("input-text").onkeyup = function(event) {
    switch (event.keyCode) {
        case 38:
            moveCursorToEnd();
            break;
        case 40:
            moveCursorToEnd();
            break;
    }
}

/*
 * Occurs when the user hit's the up arrow
 * Moves up in the command history
 */
function upKey() {
    if (commandIndex > 0) {
        if (commandIndex === commands.length)
            notYetEntered = document.getElementById("input-text").value;
        let command = commands[--commandIndex];
        changeInputText(command);
    }
}

/*
 * Occurs when the user hit's the down arrow
 * Moves down in the command history
 */
function downKey() {
    if (commandIndex < commands.length - 1) {
        let command = commands[++commandIndex];
        changeInputText(command);
    } else if (commandIndex === commands.length - 1) {
        commandIndex++;
        changeInputText(notYetEntered);
    }
}