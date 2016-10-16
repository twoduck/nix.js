{function touch(args) {
    if (!args || args.length < 1) {
        stderr("No filename/path included");
        return;
    }
    const fileName = args[0];
    if (resolveResource(fileName)) {
        stderr("File already exists.");
        return;
    } else {
        const dir = (directoryIn.parent === "") ? "/" : (`${directoryIn.parent}/${directoryIn.name}`).substring(1);
        console.log(dir);
        writeToFile(dir, fileName, "");
    }
}}