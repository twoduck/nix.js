(function() {
    const clearStorage = function() {
        Object.keys(localStorage).forEach((element) => {
            localStorage.removeItem(element);
        }, this);
    };

    const clearUsername = function() {
        username = "root";
        updatePrefix();
    };
    
    clearStorage();
    clearUsername();
    window.location.reload();    
}());