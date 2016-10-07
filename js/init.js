function init() {
    welcome();
    loadUsername();
    updatePrefix();
    loadPackages();
}

function welcome() {
    addLine("");
    addLine("JS Terminal is an OS for your browser, similar to UNIX and written entirely in JavaScript. It has a "
        + "virtual file system, a package manager for installing additional functions, and a command prompt interface.");
    addLine("");
    addLine("To get started, type \'setUser\' to change your username or type \'listPackages\' for a list of "
        + "available commands. More packages can be added dynamically with the \'install\' command.");
    addLine("");
}

function loadUsername() {
    if (Cookies.get('username')) {
        username = Cookies.get('username');
    }
}

function loadPackages() {
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
}

window.onload = function () {
    init();
};