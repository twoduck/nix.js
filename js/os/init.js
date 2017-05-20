function init() {
    initFiles();
    installPackageManager();
    loadUsername();
    loadPackages();
    updatePrefix();
    welcome();
}

const initFiles = function() {
    const savedFileSystem = localStorage.getItem("fileStructure");
    if (savedFileSystem) { //Restore the user's files.
        fileStructure = JSON.parse(savedFileSystem);
        directoryIn = fileStructure;
    } else { //Give the user the defaults.
        const rootDirectories = ["bin", "dev", "home", "tmp", "var"];
        rootDirectories.forEach((dir) => {
            fileStructure.content[dir] = {
                name: dir,
                parent: "/",
                type: "folder",
                content: {}
            };
        }, this);
        updateDirectoryString();
    }
};

const decode = function(data) {
    let newData = data;
    newData = newData.replaceAll(/&gt;/, ">");
    newData = newData.replaceAll(/&lt;/, "<");
    return newData;
};

const installPackageManager = function() {
    const code = decode(document.getElementById("packageManager").import.body.innerHTML);
    writeToFile("/bin", "pkg.js", code);
};

const loadUsername = function() {
    if (localStorage.getItem("username")) {
        username = localStorage.getItem("username");
        updatePrefix();
    }
};


function loadPackages() {
    const packageList = localStorage.getItem("packages");
    if (packageList) { //The user already has a list of packages
        packageList.split(",").forEach((element) => {
            if (!resolveResource(`${element}.js`)) { //Make sure we don't install over files.
                writeStdin("install");
                writeStdin(element);
                writeStdin("false");
                runFile("/bin", "pkg.js");
                clearStdin();
            }
        }, this);
    } else { //The user doesn't have any packages. Set them up with the basics.
        const defaultList = ["cd", "clear", "echo", "ls", "pwd", "reset", "setUser", "cat", "rm", "mkdir", "save"];
        defaultList.forEach((element) => {
            writeStdin(`install ${element} false`);
            runFile("/bin", "pkg.js");
            clearStdin();
        }, this);
    }
};

const welcome = function() {
    const welcomeText = `
Nix.js is an OS for your browser, similar to UNIX (But totally not POSIX compliant) and written entirely in JavaScript. It has a virtual file system, a package manager for installing additional functions, and a command line interface.

To get started, type 'setUser' to change your username or type 'pkg' available' for a list of commands available for use or install. More packages can be added dynamically with the 'pkg install' command.
`;
    writeToView(welcomeText);
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
};

window.onload = init;