document.getElementById("input-text").onkeydown = function (event) {
    var input = document.getElementById("input-text");
    switch (event.keyCode) {
    case 13:
        enter(input.value);
        input.value = "";
        break;
    case 38:
        upKey(input);
        break;
    case 40:
        downKey(input);
        break;
    }
};