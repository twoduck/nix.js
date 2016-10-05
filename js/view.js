function enter(input) {
    addLine(input);
}

function addLine(input) {
    let outputParent = document.getElementById("output");
    let newNode = document.createElement("p");
    newNode.innerHTML = input;
    outputParent.appendChild(newNode);
}