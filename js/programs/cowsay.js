(function() {
    function rightPad(text, length) {
        if (text.length >= length)
            return text;
        const spaces = " ".repeat(length - text.length);
        return text + spaces;
    }
    
    const text = stdin();
    const maxLength = (38 > text.length) ? text.length : 38;
    let on = 0;
    let result = "";
    result += (` ${"-".repeat(maxLength + 2)} \n`);
    while (on < text.length) {
        if (on === 0 && on + maxLength >= text.length) {
            result += (`< ${rightPad(text, maxLength)} >\n`);
        } else if (on === 0) {
            result += (`/ ${rightPad(text.slice(on, on + maxLength), maxLength)} \\\n`);
        } else if (on + maxLength > text.length) {
            result += (`\\ ${rightPad(text.slice(on, on + maxLength), maxLength)} /\n`);
        } else {
            result += (`| ${rightPad(text.slice(on, on + maxLength), maxLength)} |\n`);
        }
        on += maxLength;
    }
    result += (` ${"-".repeat(maxLength + 2)} \n`);
    result += ("         \\   ^__^\n");
    result += ("          \\  (oo)\\_______\n");
    result += ("             (__)\\       )\\/\\\n");
    result += ("                 ||----w |\n");
    result += ("                 ||     ||");
    stdout(result);
}());