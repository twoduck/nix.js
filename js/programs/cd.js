{function cd(args) {
    if (!args || args.length < 1) {
        return;
    }
    if (args[0].length !== 1 && args[0].endsWith("/"))
        args[0] = args[0].substring(0,args[0].length-1);
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
}}