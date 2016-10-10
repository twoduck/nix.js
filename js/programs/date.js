function date(args) {
    let clock = new Date();
    addLine(clock.toDateString() + ", " + clock.toTimeString());
}