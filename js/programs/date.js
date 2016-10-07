function date(args) {
    var clock = new Date();
    addLine(clock.toDateString() + ", " + clock.toTimeString());
}