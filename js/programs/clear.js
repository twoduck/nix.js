function clear(args) {
    document.getElementById("output").innerHTML = "";
    clearCookies();
    clearUsername();
}

function clearCookies() {
    Object.keys(cookieNames).forEach(function(element) {
        console.log(element);
        Cookies.remove(element);
    }, this);
}

function clearUsername() {
    username = "root";
    updatePrefix();
}