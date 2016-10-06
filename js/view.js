var numLines = 0;
var output = document.getElementById('output');

/*
 * Adds the command to the history with the directory and username.
 */
function saveCommand(input) {
    let line = "<span><p class='accent'>" + directoryString + " " + username + "$&nbsp" + "</p></span>" + input;
    addLine(line);
    return numLines++;
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