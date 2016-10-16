function cat(args) {
    if (!args || args.length < 1) {
        stderr("No filename/path included");
        return;
    }
    const fileName = args[0];
    const file = resolveResource(fileName);
    if (!file) {
        stderr("File does not exist.");
        return;
    }
    stdout(file.content);
}