var directoryStack = [];
var directoryString = "/";
var username = "root";


function updateDirectoryString() {
    directoryString = "/" + directoryStack.join("/");
}

function moveIntoDirectory(dir) {
    directoryStack.push(dir);
}