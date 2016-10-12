function init() {
    loadUsername();
    loadPackages();
    initFiles();
    updatePrefix();
    welcome();
}

const initFiles = function() {
    mkdir(["bin"]);
    mkdir(["dev"]);
    mkdir(["etc"]);
    mkdir(["home"]);
    mkdir(["root"]);
    mkdir(["sbin"]);
    mkdir(["tmp"]);
    mkdir(["usr"]);
    mkdir(["var"]);
    updateDirectoryString();
};

const loadUsername = function() {
    if (localStorage.getItem("username")) {
        username = localStorage.getItem("username");
        updatePrefix();
    }
};

const loadPackages = function() {
    const packageList = localStorage.getItem("packages");
    if (packageList) { //The user already has a list of packages
        packageList.split(",").forEach((element) => {
            pkg(["install", element, false]);
        }, this);
    } else { //The user doesn't have any packages. Set them up with the basics.
        pkg(["install", "cd", false]);
        pkg(["install", "clear", false]);
        pkg(["install", "date", false]);
        pkg(["install", "echo", false]);
        pkg(["install", "ls", false]);
        pkg(["install", "pwd", false]);
        pkg(["install", "reset", false]);
        pkg(["install", "setUser", false]);
        pkg(["install", "tree", false]);
        pkg(["install", "job", false]);
        pkg(["install", "cat", false]);
        pkg(["install", "touch", false]);
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