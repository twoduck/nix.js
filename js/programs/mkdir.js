(function() {
    if (!stdin()) {
        stderr("No path given.");
        return;
    }
    const args = stdin().split("\n");
    if (args.length < 1)
        return;
    if (args[0].indexOf(".") != -1 || args[0].indexOf("/") != -1 )
        return;
    const directoryTarget = args[0];
    const currentFolder = directoryIn;
    const newParent = (currentFolder.parent === "/") ? `/${currentFolder.name}` : `${currentFolder.parent}/${currentFolder.name}`;
    currentFolder.content[directoryTarget] = {
        name: directoryTarget,
        parent: newParent,
        type: "folder",
        content: {}
    };
}());