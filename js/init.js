function init() {
    loadUsername();
    updatePrefix();
    loadPackages();
}

function loadUsername() {
    if (!Cookies.get('username')) {
        addLine("If you would like to save your username, please use:");
        addLine("'setUser [username here]'");
    } else {
        username = Cookies.get('username');
    }
}

function loadPackages() {
    let packageList = Cookies.get('packages');
    if (packageList) { //The user already has a list of packages
        packageList.split(",").forEach(function(element) {
            install([element, false]);
        }, this);
    } else { //The user doesn't have any packages. Set them up with the basics.
        install(['cd', false]);
        install(['ls', false]);
        install(['mkdir', false]);
        install(['pwd', false]);
        install(['echo', false]);
        install(['setUser', false]);
    }
}

window.onload = function() {
  init();
};