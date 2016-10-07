var scripts = document.getElementById("scripts");

function pkg(args) {
    if (args[0] === "install") {
        if (args.length != 2 && args.length != 3) {
            addLine("Please include just a package name.");
            return;
        }
        console.log(args);
        let package = args[1];
        let shouldPrint = (args[2] === undefined) ? true : args[2] == true; //Print by default
        if (document.getElementById(package)) {
            addLine(package + " is already installed.");
            return;
        }
        let url = 'js/programs/' + package + '.js';
        getPackage(url, function (response) {
            let newScript = document.createElement("script");
            newScript.innerHTML = response;
            newScript.id = package;
            newScript.type = "text/javascript";
            scripts.appendChild(newScript);
            addToPackageList(package);
            if (shouldPrint)
                addLine(package + " has been installed.");
        }, function (errorText) {
            addLine("There was an error when installing " + package + ".");
        });
    }
    if (args[0] === "list") {
        let packageList = Cookies.get('packages');
        if (packageList) {
            packageList.split(",").sort().forEach(function (element) {
                addLine(element);
            }, this);
        } else {
            addLine("You do not have any packages installed.");
        }
    }
}

function getPackage(url, onSuccess, onError) {
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

function addToPackageList(name) {
    let packageList = Cookies.get('packages');
    if (!packageList) {
        packageList = name;
    } else if (packageList.split(",").indexOf(name) == -1) { //only add to package list if it's not already in it
        packageList += ',' + name;
    }
    Cookies.set("packages", packageList);
}