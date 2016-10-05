function cd(args) {
    if (args.length < 1)
        return;
    let directoryTarget = args[0];
    let currentFolder = getCurrentFolderObject();
    directories = directoryTarget.split("/");
    if (currentFolder[directoryTarget]) {
        moveIntoDirectory(directoryTarget);
        updateDirectoryString();
        return;
    } else if (directoryTarget == '..' && directoryStack.length > 0) {
        moveUpDirectory();
        updateDirectoryString();
        return;
    }
    
}