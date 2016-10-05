function cd(target) {
    if (target.length < 1)
        return;
    let directoryTarget = target[0];
    moveIntoDirectory(directoryTarget);
    updateDirectoryString();
}