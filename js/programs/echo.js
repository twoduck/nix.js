function echo(text) {
    let output = "";
    if (text.length !== 0)
        output = text.join(" ");
    else output = stdin();
    stdout(output);
}