function reset(args) {
    clear();
    clearStorage();
    clearUsername();
    window.location.reload();
}

let clearStorage = function() {
    Object.keys(localStorage).forEach(function(element) {
        localStorage.removeItem(element);
    }, this);
}

let clearUsername = function() {
    username = "root";
    updatePrefix();
}