function date(args) {
    const clock = new Date();
    stdout(`${clock.toDateString()}, ${clock.toTimeString()}`);
}