/*
 * Adds the command to the history with the directory and username.
 */
function saveCommand(input) {
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

/*
 * Updates the input-prefix in the view with current info.
 */
function updatePrefix() {
    result = directoryString + " " + username + "$&nbsp";
    document.getElementById("input-prefix").innerHTML = result;
}