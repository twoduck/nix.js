function ls(args) {
    let currentFolder = getCurrentFolderObject();
    Object.keys(currentFolder).sort().forEach(function(element) {
        addLine(element);
    }, this);
}