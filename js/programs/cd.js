function cd(args) {
    if (!args || args.length < 1) {
        return;
    }
    const lookedUp = resolveResource(args[0]);
    if (typeof lookedUp.content === "string") {
        stderr("Not a directory.");
        addLine(`${args[0]} is not a directory`);
        return;
    }
    if (lookedUp) {
        directoryIn = lookedUp;
        updateDirectoryString();
    } else {
        stderr("Directory not found.");
        addLine("Directory not found.");
    }
}