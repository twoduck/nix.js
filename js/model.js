var directoryStack = [];
var directoryString = "/";
var username = "root";
var fileStructure = {};


function updateDirectoryString() {
    directoryString = "/" + directoryStack.join("/");
    updatePrefix();
}

function moveIntoDirectory(dir) {
    directoryStack.push(dir);
}

function moveUpDirectory() {
    directoryStack.pop();
}

/*
 * Returns the current folder's hashtable object
 */
function getCurrentFolderObject() {
    let lookingAt = fileStructure;
    directoryStack.forEach(function(element) {
        lookingAt = lookingAt[element];
    }, this);
    return lookingAt;
}