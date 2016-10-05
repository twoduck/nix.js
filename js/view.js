function enter(input) {
    let line = directoryString + " " + username + "$ " + input;
    addLine(line);
}

function addLine(input) {
    let outputParent = document.getElementById("output");
    let newNode = document.createElement("p");
    newNode.innerHTML = input;
    outputParent.appendChild(newNode);
}