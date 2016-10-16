{function rm(args) {
    const decider = decide(args);
    const flags = decider.flags;
    const params = decider.args;
    if (params.length === 0) {
        stderr("No resources provided to delete.");
        return;
    }
    let recurse = false;
    let force = false;
    flags.forEach((element) => {
        if (element.indexOf("r") != -1)
            recurse = true;
        if (element.indexOf("f") != -1)
            force = true;
    }, this);

    params.forEach((element) => {
        if (element === "/") {
            if (!recurse) {
                stderr(`${element} is a folder. Use -r to delete folders.`);
                return;
            }
            if (!force) {
                stderr(`${element} is the root directory. Use -f to delete it.`);
                return;
            }
            reset();
            return;
        }
        const resource = resolveResource(element);
        if (!resource) {
            stderr(`${element} could not be found.`);
            return;
        }
        if (typeof resource.content === "object" && !recurse) {
            stderr(`${element} is a folder. Use -r to delete folders.`);
            return;
        }
        const parent = resolveResource(resource.parent);
        delete parent.content[resource.name];
    }, this);
}

const decide = function(params) {
    let flag = [];
    let arg = [];
    params.forEach((element) => {
        if (element.indexOf("-") === 0) {
            flag.push(element);
        } else {
            arg.push(element);
        }
    }, this);
    return {
        flags: flag,
        args: arg
    };
}}