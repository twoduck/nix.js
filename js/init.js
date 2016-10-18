function init() {
    initFiles();
    installPackageManager();
    loadUsername();
    loadPackages();
    updatePrefix();
    welcome();
}

const initFiles = function() {
    const rootDirectories = ["bin", "dev", "etc", "home", "root", "sbin", "tmp", "usr", "var"];
    rootDirectories.forEach((dir) => {
        fileStructure.content[dir] = {
            name: dir,
            parent: "/",
            type: "folder",
            content: {}
        };
    }, this);
    updateDirectoryString();
};

const installPackageManager = function() {
    const pkgData = getPackageManager();
    writeToFile("/bin", "pkg.js", pkgData);
};

const loadUsername = function() {
    if (localStorage.getItem("username")) {
        username = localStorage.getItem("username");
        updatePrefix();
    }
};

//const loadPackages = function() {
function loadPackages() {
    const packageList = localStorage.getItem("packages");
    if (packageList) { //The user already has a list of packages
        packageList.split(",").forEach((element) => {
            writeStdin("install");
            writeStdin(element);
            writeStdin("false");
            runFile("/bin", "pkg.js");
            clearStdin();
        }, this);
    } else { //The user doesn't have any packages. Set them up with the basics.
        const defaultList = ["cd", "clear", "echo", "ls", "pwd", "reset", "setUser", "cat", "rm", "mkdir"];
        defaultList.forEach((element) => {
            writeStdin("install");
            writeStdin(element);
            writeStdin("false");
            runFile("/bin", "pkg.js");
            clearStdin();
        }, this);
    }
};

const welcome = function() {
    addLine("");
    addLine("JS Terminal is an OS for your browser, similar to UNIX and written entirely in JavaScript. It has a virtual file system, a package manager for installing additional functions, and a command prompt interface.");
    addLine("");
    addLine("To get started, type 'setUser' to change your username or type 'pkg list' for a list of available commands. More packages can be added dynamically with the 'pkg install' command.");
    addLine("");
};

window.onload = function() {
    init();
};

const getPackageManager = function() {
    const data = document.getElementById("packageManager").import.body.innerHTML;
    return interpretHTML(data);
};

const interpretHTML = function(data) {
    let newData = data;
    newData = newData.replaceAll(/&gt;/, ">");
    newData = newData.replaceAll(/&lt;/, "<");
    return newData;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
};