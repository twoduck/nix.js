function mkdir(args) {
    if (args.length < 1)
        return;
    let directoryTarget = args[0];
    let currentFolder = getCurrentFolderObject();
    currentFolder[args[0]] = new Object();
}