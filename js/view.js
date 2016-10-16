var numLines = 0;
var output = document.getElementById('output');

/*
 * Adds the command to the history with the directory and username.
 */
function saveCommand(input) {
    let parentNode = document.createElement("p");
    let spanNode = document.createElement("span");
    let textNode = document.createElement("p");
    textNode.className = "accent";
    spanNode.appendChild(textNode);
    parentNode.appendChild(spanNode);
    document.getElementById("output").appendChild(parentNode);
    textNode.innerHTML = `${directoryString} ${username}$&nbsp`;
    parentNode.innerHTML += input;
    return numLines++;
}

/*
 * Adds a line to the history with the input.
 * Does not deal with lines that are too long.
 */
function addLine(input) {
    if (typeof input !== "string")
        return;
    let outputParent = document.getElementById("output");
    let newNode = document.createElement("p");
    const withSpacesFixed = input.replace(/ /g, "&nbsp");
    newNode.innerHTML = withSpacesFixed;
    outputParent.appendChild(newNode);
    window.scrollTo(0,document.body.scrollHeight);
    return numLines++;
}

/*
 * Updates the input-prefix in the view with current info.
 */
function updatePrefix() {
    result = directoryString + " " + username + "$&nbsp";
    document.getElementById("input-prefix").innerHTML = result;
}

/*
 * Changes a line at specified index
 */
function changeLine(index, text) {
    let line = output.childNodes[index];
    if (line)
        output.childNodes[index].innerHTML = text;
}

/*
 * Changes the input text box
 */
function changeInputText(text) {
    let inputBox = document.getElementById("input-text");
    inputBox.value = text;
}

/*
 * Moves cursor to end of input box
 */
function moveCursorToEnd() {
    let inputBox = document.getElementById("input-text");
    inputBox.selectionStart = inputBox.value.length;
    inputBox.selectionEnd = inputBox.value.length;
}

/*
 * Writes text to view. Supports \n.
 * Returns array of line indices.
 */
function writeToView(text) {
    if (!text)
        return;
    text = text + "";
    const lines = text.split("\n");
    let indices = [];
    lines.forEach((line) => {
        indices.push(addLine(line));
    }, this);
    return indices;
}