function reset(args) {
    clear();
    clearStorage();
    clearUsername();
    window.location.reload();
}

const clearStorage = function() {
    Object.keys(localStorage).forEach((element) => {
        localStorage.removeItem(element);
    }, this);
};

const clearUsername = function() {
    username = "root";
    updatePrefix();
};