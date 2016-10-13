'use strict';
/*
 * Completes a batch of functions
 * Uses a loading bar, if specified
 */
function job(work, useLoadingBar) {
    if (useLoadingBar) {
        const increment = 100 / work.length;
        const barIndex = addLine("");
        console.log(barIndex);
        loadingBar(barIndex, 0);
        executeAsync(work.forEach(function(element, index) {
            console.log(index);
            executeAsync(parse(element));
            const percentage = (index + 1) * increment;
            loadingBar(barIndex, percentage);
        }, this));
    } else {

    }
}

function executeAsync(func) {
    setTimeout(func, 0);
}

function testJob() {
    let work = ["dumbWork", "dumbWork", "dumbWork", "dumbWork", "dumbWork"];
    job(work, true);
}

function dumbWork() {
    fib(40);
}

function fib(value) {
    if (value <= 1) {
        return value;
    } else {
        return fib(value - 1) + fib(value - 2);
    }
}

