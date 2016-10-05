document.getElementById("input").onkeydown = function (event) {
    var input = document.getElementById("input");
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