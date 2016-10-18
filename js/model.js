var directoryString = "/";
var username = "root";
var fileStructure = {
    name: "",
    parent: "",
    type: "folder",
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

function stdin() {
    const stdin = resolveResource("/dev/stdin");
    if (stdin)
        return stdin.content;
    else return "";
}

function writeStdin(comingIn) {
    writeToFile("/dev", "stdin", comingIn);
}

function clearStdin() {
    writeToFile("/dev", "stdin", "");
}

function readStdout() {
    const stdoutFile = resolveResource("/dev/stdout");
    if (stdoutFile)
        return stdoutFile.content;
    else return "";
}

function clearStdout() {
    writeToFile("/dev", "stdout", "");
}

function stdout(goingOut) {
    if (readStdout()) {
        writeToFile("/dev", "stdout", `${readStdout()}\n${goingOut}`);
    } else writeToFile("/dev", "stdout", goingOut);
}

function clearStderr() {
    writeToFile("/dev", "stderr", "");
}

function stderr(err) {
    if (readStderr()) {
        writeToFile("/dev", "stderr", `${readStderr()}\n${err}`);
    } else writeToFile("/dev", "stderr", err);
}

function readStderr() {
    const stderrFile = resolveResource("/dev/stderr");
    if (stderrFile)
        return stderrFile.content;
    else return "";
}

function write(file, fileContent) {
    if (!file) {
        stderr("No path provided.");
        addLine("No path provided.");
        return;
    }
    if (file.indexOf("/") !== -1) { //Those assholes gaves us a path.
        const path = file.split("/");
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
            type: "file",
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
            type: "file",
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
        type: "file",
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
    const splitPath = path.split("/");
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


/*
 * Writes a file to stdin.
 */
const writeFileToStdin = function (location) {
    const resource = resolveResource(location);
    if (!resource) {
        stderr(`${location} cannot be located.`);
        addLine(`${location} cannot be located.`);
        return;
    }
    if (typeof resource.content !== "string") {
        stderr(`${location} is not a file.`);
        addLine(`${location} is not a file.`);
        return;
    }
    writeStdin(resource.content);
    return resource.content;
}

/*
 * Writes stdout to a file, overwriting the file.
 */
const overwriteFromStdout = function (location) {
    write(location, readStdout());
}

/*
 * Writes stdout to a file, concatenating the file.
 */
const concatFromStdout = function (location) {
    const resource = resolveResource(location);
    if (resource) {
        if (typeof resource.content != "string") {
            stderr("Cannot write to a folder");
            addLine("Cannot write to a folder");
            return;
        }
        write(location, `${resource.content}${readStdout()}`);
    } else write(location, readStdout());
}

function isInPath(name) {
    const bin = resolveResource("/bin");
    if (bin)
        return bin.content[name];
    return undefined;
}