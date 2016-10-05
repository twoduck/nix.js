/*
 * Adds the command to the history with the directory and username.
 */
function enter(input) {
    let line = directoryString + " " + username + "$ " + input;
    addLine(line);
}

/*
 * Adds a line to the history with the input.
 * Does not deal with lines that are too long.
 */

function addLine(input) {
    let outputParent = document.getElementById("output");
    let newNode = document.createElement("p");
    newNode.innerHTML = input;
    outputParent.appendChild(newNode);
}