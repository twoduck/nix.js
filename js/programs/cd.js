function cd(args) {
    if (!args || args.length < 1) {
        return;
    }
    const lookedUp = resolveResource(args[0]);
    if (lookedUp) {
        directoryIn = lookedUp;
        updateDirectoryString();
    } else {
        stderr("Directory not found.");
        return;
    }
    if (typeof lookedUp.content === "string") {
        stderr(`${args[0]} is not a directory`);
        return;
    }
    return;
}