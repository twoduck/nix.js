function cat(args) {
    if (!args || args.length < 1) {
        stderr("No filename/path included");
        addLine("Please include a filename/path.");
        return;
    }
    const fileName = args[0];
    const file = resolveResource(fileName);
    if (file) {
        addLine(file.content);
        return;
    } else {
        stderr("File does not exist.");
        addLine("File does not exist.");
    }
}