var commands = [];
var commandIndex = 0;
var notYetEntered = "";
var lastKeyCode = 0;
/*
 * Ensures that the user is always focused on the input text.
 */
document.onkeydown = function (event) {
    if (event.keyCode != 91 && event.keyCode != 17 && !(
        event.keyCode == 67 && (lastKeyCode === 91 || lastKeyCode === 17)))
        document.getElementById("input-text").focus();
    lastKeyCode = event.keyCode;
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
 * Parses input in a bash-like manner
 */
const parse = function(input) {
    const parts = input.split(" ");
    let root = "";
    let params = [];
    let lookingForParams = false;
    for (let i = 0; i < parts.length; i++) {
        const on = parts[i];
        switch (on) { //Check for special cases that cause execution.
            case "<":
                writeFileToStdin(parts[++i]);
                execute(root, params);
                params = [];
                lookingForParams = false;
                root = "";
                continue;
            case "|":
                execute(root, params);
                writeStdin(readStdout()); //'pipe' stdout to stdin
                params = [];
                lookingForParams = false;
                root = "";
                continue;
            case ">":
                execute(root, params);
                overwriteFromStdout(parts[++i]);
                params = [];
                lookingForParams = false;
                root = "";
                continue;
            case ">>":
                execute(root, params);
                concatFromStdout(parts[++i]);
                params = [];
                lookingForParams = false;
                root = "";
                continue;
            case "&&":
                if (root)
                    execute(root, params);
                if (readStderr())
                    writeToView(`error: ${readStderr()}`);
                if (readStdout())
                    writeToView(readStdout());
                params = [];
                lookingForParams = false;
                root = "";
                continue;
        }
        if (lookingForParams) { //We are currently looking for parameters. Save this one.
            params.push(on);
            continue;
        }
        if (root === "") { //We don't have a command right now. Get one.
            if (typeof window[on] !== "function") { //The next input isn't a function.
                addLine(`${on} is not a valid command.`);
                return;
            }
            root = on;
            lookingForParams = true;
            continue;
        }
    }
    if (root) { //We still have a command to do.
        execute(root, params);
        lookingForParams = false;
        root = "";
    }
    if (readStderr())
        writeToView(`error: ${readStderr()}`);
    if (readStdout())
        writeToView(readStdout());
}

/*
 * Executes a command with given parameters,
 * if possible.
 */
const execute = function(command, params) {
    stderr("");
    clearStdout();
    if (!command) {
        stderr("Cannot execute nothing.");
        addLine("Cannot execute nothing.");
        return;
    }
    const fn = window[command]
    if (typeof fn !== "function") {
        stderr(`${command} is not a function.`);
        addLine(`${command} is not a function.`);
        return;
    }
    fn(params);
    clearStdin();
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