{function ls(args) {
    let results = "";
    Object.keys(directoryIn.content).sort().forEach((element) => {
        if (typeof directoryIn.content[element].content === "object")
            results += `${element}/ `;
        else results += `${element} `;
    }, this);
    stdout(results);
}}