var commandQueue = [];

/*
 * Ensures that the user is always focused on the input text.
 */
document.onclick = function () {
    document.getElementById("input-text").focus();
};

/*
 * Controls what happens on each keypress in the input box.
 */
document.getElementById("input-text").onkeydown = function (event) {
    var input = document.getElementById("input-text");
    switch (event.keyCode) {
        case 9:
            if (window.event)
                window.event.returnValue = false;
            else if (event.cancelable)
                event.preventDefault();
            //Will add an autocomplete function eventually
            break;
        case 13:
            if (input.value.trim() != "") { //If a command has been entered
                saveCommand(input.value.trim()); //Add the command to the history.
                parse(input.value.trim());
                input.value = ""; //reset the input
            }
            break;
        case 38:
            upKey();
            break;
        case 40:
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
        addLine(parts[0] + ": " + fn);
    } else {
        addLine(parts[0] + ": command not found");
    }
}

/*
 * Occurs when the user hit's the up arrow
 * Moves up in the command history
 */
function upKey() {

}

/*
 * Occurs when the user hit's the down arrow
 * Moves down in the command history
 */
function downKey() {

}