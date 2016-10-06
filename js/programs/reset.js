function reset(args) {
    clear();
    clearCookies();
    clearUsername();
}

function clearCookies() {
    Object.keys(Cookies.get()).forEach(function(element) {
        Cookies.remove(element);
    }, this);
}

function clearUsername() {
    username = "root";
    updatePrefix();
}