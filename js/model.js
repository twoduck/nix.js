var directoryStack = [];
var directoryString = "/";
var username = "root";


function updateDirectoryString() {
    directoryString = "/" + directoryStack.join("/");
    updatePrefix();
}

function moveIntoDirectory(dir) {
    directoryStack.push(dir);
}