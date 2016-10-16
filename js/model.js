var directoryString = "/";
var username = "root";
var fileStructure = {
    name: "",
    parent: "",
    content: {}
};
var directoryIn = fileStructure;


function updateDirectoryString() {
    if (directoryIn === fileStructure)
        directoryString = "/";
    else  {
        directoryString = `${directoryIn.parent}/${directoryIn.name}`.substring(1);
    }
    updatePrefix();
}

function readStdin() {
    const stdin = resolveResource("/dev/stdin");
    if (stdin)
        return stdin.content;
    else return "";
}

function writeStdin(comingIn) {
    writeToFile("/dev", "stdin", comingIn);
}

function readStdout() {
    const stdout = resolveResource("/dev/stdout");
    if (stdout)
        return stdout.content;
    else return "";
}

function writeStdout(goingOut) {
    writeToFile("/dev", "stdout", goingOut);
}

function stderr(err) {
    writeToFile("/dev", "stderr", err);
}

function readStderr() {
    const stderr = resolveResource("/dev/stderr");
    if (stderr)
        return stderr.content;
    else return "";
}

function write(file, fileContent) {
    if (!file) {
        stderr("No path provided.");
        addLine("No path provided.");
        return;
    }
    if (file.indexOf("/") !== -1) { //Those assholes gaves us a path.
        let path = file.split("/")
        const fileName = path.pop();
        const folder = resolveResource(path.join("/"));
        if (!folder) {
            stderr("Invalid path given.");
            addLine("Invalid path given.");
            return;
        }
        const newParent = (folder.parent === "/") ? `/${folder.name}` : `${folder.parent}/${folder.name}`;
        folder.content[fileName] = {
            name: fileName,
            parent: newParent,
            content: fileContent
        };
    } else { //They just gave us a file name, do a simple write.
        const resource = resolveResource(file);
        if (resource && typeof resource.content !== "string") {
            stderr("Can only write to files.");
            addLine("Can only write to files.");
            return;
        }
        directoryIn.content[file] = {
            name: file,
            parent: `${directoryIn.parent}/${directoryIn.name}`,
            content: fileContent
        };
    }
}

function writeToFile(path, fileName, fileContent) {
    const folder = resolveResource(path);
    if (!folder) {
        stderr("Invalid path provided.");
        return;
    }
    const newParent = (folder.parent === "/") ? `/${folder.name}` : `${folder.parent}/${folder.name}`;
    folder.content[fileName] = {
        name: fileName,
        parent: `${folder.parent}/${folder.name}`,
        content: fileContent
    };
}

function resolveResource(path) {
    if (!path || path === "") {
        //stderr("No path to resolve.");
        return;
    }
    if (path === "/")
        return fileStructure;
    const start = path.charAt(0);
    let splitPath = path.split("/");
    let on = directoryIn;
    if (start === "/") {
        on = fileStructure;
        splitPath.shift();
    } else if (start === "~") {
        on = fileStructure.content["home"];
        splitPath.shift();
    }
    let worked = true;

    splitPath.some((element) => {
        if (element === ".") {
            on = on; //Do nothing
        } else if (element === "..") {
            if (on.parent && on.parent !== "") {
                on = resolveResource(on.parent);
            } else {
                //stderr(`${JSON.stringify(on)} does not have a valid parent.`);
                worked = false;
                return true;
            }
        } else if (on.content[element]) {
            on = on.content[element];
        } else {
            //stderr(`${path} cannot be resolved.`);
            worked = false;
            return true;
        }
        return false;
    }, this);
    if (worked)
        return on;
    else return undefined;
}