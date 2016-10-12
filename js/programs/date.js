function date(args) {
    const clock = new Date();
    addLine(`${clock.toDateString()}, ${clock.toTimeString()}`);
}