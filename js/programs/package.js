var scripts = document.getElementById("scripts");

function install(package) {
    let url = 'js/programs/' + package + '.js';
    getPackage(url, function(response) {
        let newScript = document.createElement("script");
        newScript.innerHTML = response;
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
          alert("Got the response!");
          onSuccess(xhttp.responseText);
        } else {
          onError("Error");
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}