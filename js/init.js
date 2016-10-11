function init() {
    loadUsername();
    loadPackages();
    updatePrefix();
    initFiles();
    welcome();
}

let initFiles = function() {
    let folder = getCurrentFolderObject();
    folder["bin"] = {};
    folder["dev"] = {};
    folder["etc"] = {};
    folder["home"] = {};
    folder["root"] = {};
    folder["sbin"] = {};
    folder["tmp"] = {};
    folder["usr"] = {};
    folder["var"] = {};
    moveIntoDirectory('home');
    updateDirectoryString();
}

let loadUsername = function() {
    if (localStorage.getItem("username")) {
        username = localStorage.getItem("username");
        updatePrefix();
    }
}

let loadPackages = function() {
    let packageList = localStorage.getItem('packages');
    if (packageList) { //The user already has a list of packages
        packageList.split(",").forEach(function (element) {
            pkg(["install", element, false]);
        }, this);
    } else { //The user doesn't have any packages. Set them up with the basics.
        pkg(['install', 'cd', false]);
        pkg(['install', 'clear', false]);
        pkg(['install', 'date', false]);
        pkg(['install', 'echo', false]);
        pkg(['install', 'ls', false]);
        pkg(['install', 'mkdir', false]);
        pkg(['install', 'pwd', false]);
        pkg(['install', 'reset', false]);
        pkg(['install', 'setUser', false]);
        pkg(['install', 'tree', false]);
        pkg(["install", "job", false]);
    }
}

let welcome = function() {
    addLine("");
    addLine("JS Terminal is an OS for your browser, similar to UNIX and written entirely in JavaScript. It has a "
        + "virtual file system, a package manager for installing additional functions, and a command prompt interface.");
    addLine("");
    addLine("To get started, type \'setUser\' to change your username or type \'pkg list\' for a list of "
        + "available commands. More packages can be added dynamically with the \'pkg install\' command.");
    addLine("");
}

window.onload = function () {
    init();
};