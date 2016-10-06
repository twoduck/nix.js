function init() {
    loadUsername();
    updatePrefix();
}

function loadUsername() {
    if (!Cookies.get('username')) {
        addLine("If you would like to save your username, please use:");
        addLine("'setUser [username here]'");
    } else {
        username = Cookies.get('username');
    }
}

window.onload = function() {
  init();
};