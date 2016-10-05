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
    case 13:
        saveCommand(input.value); //Add the command to the history.
        parse(input.value);
        input.value = ""; //reset the input
        break;
    case 38:
        upKey(input);
        break;
    case 40:
        downKey(input);
        break;
    }
};

function parse(input) {
    //TODO:
    //parse for commands, flags, etc.
}