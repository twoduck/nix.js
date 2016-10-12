function ls(args) {
    Object.keys(directoryIn.content).sort().forEach((element) => {
        if (typeof directoryIn.content[element].content === "object")
            addLine(`${element}/`);
        else addLine(element);
    }, this);
}