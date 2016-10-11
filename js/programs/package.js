var scripts = document.getElementById("scripts");

function pkg(args) {
    if (args[0] === "install") {
        install(args[1], args[2]);
    }
    if (args[0] === "list") {
        list();
    }
    if (args[0] === "uninstall") {
        uninstall(args[1], args[2]);
    }
}

let list = function() {
    let packageList = Cookies.get('packages');
    if (packageList) {
        packageList.split(",").sort().forEach(function (element) {
            addLine(element);
        }, this);
    } else {
        addLine("You do not have any packages installed.");
    }
}

let uninstall = function(packageName, shouldPrint) {
    let packageList = Cookies.get("packages");
    if (!packageList) {
        addLine("You don't have any packages to uninstall.");
        return;
    }
    let packagesParent = document.getElementById("scripts");
    let element = document.getElementById(packageName);
    if (!element) {
        addLine(packageName + " is not installed.");
        return;
    }
    packagesParent.removeChild(element);
    window[packageName] = undefined;
    let newPackageList = "";
    let packagesInstalled = packageList.split(",");
    newPackageList = packagesInstalled.sort().map(function(element) {
        if (element !== packageName)
            return element;
        else return " ";
    }).reduce(function(total, element) {
        if (element !== " ")
            if (total === " ")
                return element;
            else return total + "," + element;
        else return total;
    });
    Cookies.set("packages", newPackageList);
    if (shouldPrint || shouldPrint === undefined)
        addLine(packageName + " has been uninstalled.");
}

let install = function(packageName, shouldPrint) {
    if (!packageName) {
            addLine("Please include a package name.");
            return;
        }
        if (document.getElementById(packageName)) {
            addLine(packageName + " is already installed.");
            return;
        }
        let url = 'js/programs/' + packageName + '.js';
        getPackage(url, function (response) {
            let newScript = document.createElement("script");
            newScript.innerHTML = response;
            newScript.id = packageName;
            newScript.type = "text/javascript";
            scripts.appendChild(newScript);
            addToPackageList(packageName);
            if (shouldPrint === undefined || shouldPrint)
                addLine(packageName + " has been installed.");
        }, function (errorText) {
            addLine("There was an error when installing " + packageName + ".");
        });
}

let getPackage = function(url, onSuccess, onError) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
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
}

let addToPackageList = function(name) {
    let packageList = Cookies.get('packages');
    if (!packageList) {
        packageList = name;
    } else if (packageList.split(",").indexOf(name) == -1) { //only add to package list if it's not already in it
        packageList += ',' + name;
    }
    Cookies.set("packages", packageList);
}