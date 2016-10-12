function cd(args) {
    if (!args || args.length < 1) {
        return;
    }
    const lookedUp = resolveResource(args[0]);
    if (lookedUp) {
        directoryIn = lookedUp;
        updateDirectoryString();
    }
}