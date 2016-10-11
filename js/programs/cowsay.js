function cowsay(args) {
    const text = args.join(" ");
    const maxLength = (38 > text.length) ? text.length : 38;
    let on = 0;
    addLine(" " + "-".repeat(maxLength + 2) + " ");
    while (on < text.length) {
        if (on === 0 && on + maxLength >= text.length) {
            addLine("< " + rightPad(text, maxLength) + " >");
        } else if (on === 0) {
            addLine("/ " + rightPad(text.slice(on, on + maxLength), maxLength) + " \\");
        } else if (on + maxLength > text.length) {
            addLine("\\ " + rightPad(text.slice(on, on + maxLength), maxLength) + " /");
        } else {
            addLine("| " + rightPad(text.slice(on, on + maxLength), maxLength) + " |");
        }
        on += maxLength;
    }
    addLine(" " + "-".repeat(maxLength + 2) + " ");
    addLine("         \\   ^__^");
    addLine("          \\  (oo)\\_______");
    addLine("             (__)\\       )\\/\\");
    addLine("                 ||----w |");
    addLine("                 ||     ||");
}

function rightPad(text, length) {
    if (text.length >= length)
        return text;
    const spaces = " ".repeat(length - text.length);
    return text + spaces;
}