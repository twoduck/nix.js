var scripts = document.getElementById("scripts");

function install(package) {
    if (document.getElementById(package)) {
        addLine(package + " is already installed.");
        return;
    }
    let url = 'js/programs/' + package + '.js';
    getPackage(url, function(response) {
        let newScript = document.createElement("script");
        newScript.innerHTML = response;
        newScript.id = package;
        newScript.type = "text/javascript";
        scripts.appendChild(newScript);
        addLine(package + " has been installed.");
    }, function(errorText) {
        addLine("There was an error when installing " + package + ".");
    });
}

function getPackage(url, onSuccess, onError) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
      if (xhttp.readyState==4) {
        if(xhttp.status==200) {
          onSuccess(xhttp.responseText);
        } else {
          onError("Error");
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}