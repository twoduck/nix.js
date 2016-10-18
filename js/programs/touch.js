(function() {
    if (!stdin()) {
        stderr("No file name provided.");
        return;
    }
    const args = stdin().split("\n");
    if (!args || args.length < 1) {
        stderr("No filename/path included");
        return;
    }
    let path = args[0].split("/");
    const fileName = path.pop();
    path = path.join("/");
    if (!path)
        path = ".";
    if (resolveResource(fileName)) {
        stderr("File already exists.");
        return;
    } else {
        writeToFile(path, fileName, "");
    }
}());