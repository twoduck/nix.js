{function run(args) {
    const decider = decide(args);
    const flags = decider.flags;
    const params = decider.args;
    if (params.length === 0) {
        stderr("Nothing provided to run.");
        return;
    }

    params.forEach((element) => {
        const resource = resolveResource(element);
        if (!resource) {
            stderr(`${element} cannot be found.`);
            return;
        }
        if (typeof resource.content !== "string") {
            stderr(`${element} is not a file.`);
            return;
        }
        eval(resource.content);
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