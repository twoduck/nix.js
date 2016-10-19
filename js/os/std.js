/**
 * Functions intended for general use:
 * stdin() - reads stdin and returns it.
 * stdout(out) - writes `out` to stdout.
 * stderr(err) - writes `err` to stderr.
 * 
 * Other functions can be used, however they
 * are primarily intended for internal use.
 */

function stdin() {
    return readStdin();
}

function writeStdin(comingIn) {
    if (stdin()) {
        writeToFile("/dev", "stdin", `${stdin()}\n${comingIn}`);
    } else writeToFile("/dev", "stdin", comingIn);
}

function readStdin() {
    const stdin = resolveResource("/dev/stdin");
    if (stdin)
        return stdin.content;
    else return "";
}

function clearStdin() {
    writeToFile("/dev", "stdin", "");
}

function stdout(goingOut) {
    writeStdout(goingOut);
}

function writeStdout(goingOut) {
    if (!goingOut) //nothing was passed, skip it.
        return;
    if (readStdout()) {
        writeToFile("/dev", "stdout", `${readStdout()}\n${goingOut}`);
    } else writeToFile("/dev", "stdout", goingOut);
}

function readStdout() {
    const stdoutFile = resolveResource("/dev/stdout");
    if (stdoutFile)
        return stdoutFile.content;
    else return "";
}

function clearStdout() {
    writeToFile("/dev", "stdout", "");
}

function stderr(err) {
    writeStderr(err);
}

function writeStderr(err) {
    if (readStderr()) {
        writeToFile("/dev", "stderr", `${readStderr()}\n${err}`);
    } else writeToFile("/dev", "stderr", err);
}

function readStderr() {
    const stderrFile = resolveResource("/dev/stderr");
    if (stderrFile)
        return stderrFile.content;
    else return "";
}

function clearStderr() {
    writeToFile("/dev", "stderr", "");
}



