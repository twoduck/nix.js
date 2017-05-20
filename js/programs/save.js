(function() {
    localStorage.setItem("fileStructure", JSON.stringify(fileStructure));
    const stdin = readStdin();
    if (stdin.split(" ")[0] !== "-q")
        stdout("File system saved.");
}());