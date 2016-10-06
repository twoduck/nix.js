function setUser(args) {
    if (args.length === 0) {
        newLine("Please include a username and try again.");
    } else if (args.length !== 1) {
        newLine("Please include just a username and try again.");
    } else {
        let newName = args[0];
        username = newName;
        Cookies.set("username", newName);
        cookieNames["username"] = new Object();
        updatePrefix();
    }
}