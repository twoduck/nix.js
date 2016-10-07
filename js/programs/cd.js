function cd(args) {
    let currentFolder = getCurrentFolderObject();
    if (args.length < 1 || args[0] == '~') { //Check if we should go to home
        currentFolder = fileStructure;
        directoryStack = [];
        moveIntoDirectory('home');
        updateDirectoryString();
        return;
    }
    let directoryTarget = args[0];
    if (directoryTarget == '/') { //Check if we should go to root
        currentFolder = fileStructure;
        directoryStack = [];
        updateDirectoryString();
        return;
    }
    let done = false;
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
                if (!done) {
                    if (currentFolder[element]) {
                        currentFolder = currentFolder[element];
                        newDirStack.push(element);
                    } else { //Folder not found
                        addLine(args[0] + "is not a valid path.");
                        updateDirectoryString();
                        done = true;
                    }
                }
            }, this);
            directoryStack = newDirStack;
            updateDirectoryString();
        } else { //Start at current directory for lookup
            directories.forEach(function(element) {
                if(!done) {
                    if (currentFolder[element]) {
                        currentFolder = currentFolder[element];
                        moveIntoDirectory(element);
                    } else { //Folder not found
                        addLine(args[0] + " is not a valid path.");
                        updateDirectoryString();
                        done = true;
                    }
                }
            }, this);
            updateDirectoryString();
        }
    }
}