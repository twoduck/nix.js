function ls(args) {
    let currentFolder = getCurrentFolderObject();
    Object.keys(currentFolder).forEach(function(element) {
        addLine(element);
    }, this);
}