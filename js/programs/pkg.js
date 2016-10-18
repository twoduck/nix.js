(function() {
    const help = function() {
        stdout("Currently available commands:");
        stdout("install - install a new package - 'pkg install [package]'");
        stdout("uninstall - uninstall a package - 'pkg uninstall [package]'");
        stdout("list - list installed packages - 'pkg list'");
        stdout("available - list all packages available to install from the internet - 'pkg available'");
    };
    const list = function() {
        const packageList = localStorage.getItem("packages");
        if (packageList) {
            packageList.split(",").sort().forEach((element) => {
                stdout(element);
            }, this);
        } else {
            stdout("You do not have any packages installed.");
        }
    };
    const uninstall = function(packageName, shouldPrint) {
        if (packageName === undefined) {
            stderr("You did not specify a package to uninstall.");
            stdout("Usage: pkg uninstall [package]");
            return;
        }
        const packageList = localStorage.getItem("packages");
        if (!packageList) {
            stderr("You don't have any packages to uninstall.");
            return;
        }
        if (!resolveResource(`/bin/${packageName}.js`)) {
            stderr(`${packageName} is not installed.`);
            return;
        }
        let newPackageList = "";
        const packagesInstalled = packageList.split(",");
        newPackageList = packagesInstalled.sort().map((element) => {
            if (element !== packageName)
                return element;
            else return " ";
        }).reduce((total, element) => {
            if (element !== " ")
                if (total === " ")
                    return element;
                else return `${total},${element}`;
            else return total;
        });
        localStorage.setItem("packages", newPackageList);
        const bin = resolveResource("/bin");
        delete bin.content[`${packageName}.js`];
        if (shouldPrint || shouldPrint === undefined)
            stdout(`${packageName} has been uninstalled.`);
    };
    const install = function(packageName, shouldPrint) {
        if (!packageName) {
            stderr("Please include a package name.");
            return;
        }
        if (document.getElementById(packageName)) {
            stderr(`${packageName} is already installed.`);
            return;
        }
        const url = `js/programs/${packageName}.js`;
        getPackage(url, (response) => {
            writeToFile("/bin", `${packageName}.js`, response);
            addToPackageList(packageName);
            if (shouldPrint != "false")
                addLine(`${packageName} has been installed.`);
        }, (errorText) => {
            addLine(`There was an error when installing ${packageName}.`);
        });
    };
    const available = function() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    const packages = xhttp.responseText.split(",");
                    packages.forEach((element) => {
                        if (resolveResource(`/bin/${element}.js`))
                            addLine(`* ${element}`);
                        else addLine(element);
                    }, this);
                } else {
                    addLine("There was an error downloading the list of available packages.");
                }
            }
        };
        const url = "js/programs/packages";
        xhttp.open("GET", url, true);
        xhttp.send();
    };
    const getPackage = function(url, onSuccess, onError) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    onSuccess(xhttp.responseText);
                } else {
                    onError("Error");
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };
    const addToPackageList = function(name) {
        let packageList = localStorage.getItem("packages");
        if (!packageList) {
            packageList = name;
        } else if (packageList.split(",").indexOf(name) == -1) { //only add to package list if it's not already in it
            packageList += `,${name}`;
        }
        localStorage.setItem("packages", packageList);
    };
    if (!stdin()) {
        help();
        return;
    }
    const args = stdin().split("\n");
    if (!args[0] || args[0] === "help") {
        help();
    } else if (args[0] === "install") {
        install(args[1], args[2]);
    } else if (args[0] === "list") {
        list();
    } else if (args[0] === "uninstall") {
        uninstall(args[1], args[2]);
    } else if (args[0] === "available") {
        available();
    } else {
        help();
    }
}());