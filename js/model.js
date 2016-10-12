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

function stdin(comingIn) {

}

function stdout(goingOut) {

}

var stderrResul = "";
function stderr(err) {
    stderrResul = err;
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
        stderr("No path to resolve.");
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
                stderr(`${JSON.stringify(on)} does not have a valid parent.`);
                worked = false;
                return true;
            }
        } else if (on.content[element]) {
            on = on.content[element];
        } else {
            stderr(`${path} cannot be resolved.`);
            worked = false;
            return true;
        }
        return false;
    }, this);
    if (worked)
        return on;
    else return undefined;
}