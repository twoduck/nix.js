function init() {
    loadUsername();
    loadPackages();
    updatePrefix();
    initFiles();
    welcome();
}

function initFiles() {
    //if (!Cookies.get("newUser")) {
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
    //}
    //Cookies.set("newUser", false);
}

function loadUsername() {
    if (Cookies.get('username')) {
        username = Cookies.get('username');
        updatePrefix();
    }
}

function loadPackages() {
    let packageList = Cookies.get('packages');
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

/*function loadPackages() {
 let packageList = Cookies.get('packages');
 if (packageList) { //The user already has a list of packages
 packageList.split(",").forEach(function (element) {
 install([element, false]);
 }, this);
 } else { //The user doesn't have any packages. Set them up with the basics.
 install(['cd', false]);
 install(['clear', false]);
 install(['date', false]);
 install(['echo', false]);
 install(['ls', false]);
 install(['mkdir', false]);
 install(['pwd', false]);
 install(['reset', false]);
 install(['setUser', false]);
 install(['tree', false]);
 }
 }*/

function welcome() {
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