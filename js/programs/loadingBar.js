var percentage;
var intervalID;

function loadingBar(index) {
    percentage = 0;
    intervalID = window.setInterval(updateBar, 50, index, intervalID);
}

function updateBar(index, ID) {
    let line = percentage + "% " + "|".repeat(percentage/2);
    changeLine(index, line);
    percentage++;
    if (percentage > 100) {
        clearInterval(intervalID);
    }
}