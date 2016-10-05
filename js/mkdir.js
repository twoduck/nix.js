function mkdir(args) {
    if (args.length < 1)
        return;
    if (args[0].indexOf('.') != -1 || args[0].indexOf('/') != -1 )
        return;
    let directoryTarget = args[0];
    let currentFolder = getCurrentFolderObject();
    currentFolder[args[0]] = new Object();
}