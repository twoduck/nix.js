(function() {
    if (!stdin()) {
        stderr("No files given to delete.");
        return;
    }
    const args = stdin().split("\n");
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
            const clearStorage = function() {
                Object.keys(localStorage).forEach((element) => {
                    localStorage.removeItem(element);
                }, this);
            };

            const clearUsername = function() {
                username = "root";
                updatePrefix();
            };
            
            clearStorage();
            clearUsername();
            window.location.reload();
            return;
        }
        const resource = resolveResource(element);
        if (!resource) {
            stderr(`${element} could not be found.`);
            return;
        }
        if (resource.type === "folder" && !recurse) {
            stderr(`${element} is a folder. Use -r to delete folders.`);
            return;
        }
        const parent = resolveResource(resource.parent);
        delete parent.content[resource.name];
    }, this);
}());