function cd(args) {
    if (args.length < 1)
        return;
    let directoryTarget = args[0];
    let currentFolder = getCurrentFolderObject();
    if (directoryTarget == '/') { //Check if we should go to root
            currentFolder = fileStructure;
            directoryStack = [];
            updateDirectoryString();
            return;
    }
    directories = directoryTarget.split("/"); //Array of directories we will look through
    if (directories.length == 1) { //There is only one directory, and it's presumably in the current directory
        if (currentFolder[directoryTarget]) {
            moveIntoDirectory(directoryTarget);
            updateDirectoryString();
            return;
        } else if (directoryTarget == '..' && directoryStack.length > 0) {
            moveUpDirectory();
            updateDirectoryString();
            return;
        }
    } else { //We have more than one directory to parse through
        if (args[0][0] == '/') { //Start at root for lookup
            currentFolder = fileStructure;
            let newDirStack = [];
            directories.shift(); //Move over to get rid of the empty element caused by starting with /
            directories.forEach(function(element) {
                if (currentFolder[element]) {
                    currentFolder = currentFolder[element];
                    newDirStack.push(element);
                } else { //Folder not found
                    addLine(args[0] + "is not a valid path.");
                    updateDirectoryString();
                }
            }, this);
            directoryStack = newDirStack;
            updateDirectoryString();
        } else { //Start at current directory for lookup
            directories.forEach(function(element) {
                if (currentFolder[element]) {
                    currentFolder = currentFolder[element];
                    moveIntoDirectory(element);
                } else { //Folder not found
                    addLine(args[0] + " is not a valid path.");
                    updateDirectoryString();
                    return;
                }
            }, this);
            updateDirectoryString();
        }
    }
}