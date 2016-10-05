var scripts = document.getElementById("scripts");

function install(package) {
    let url = 'js/programs/' + package + '.js';
    let response = getPackage(url);
    let newScript = document.createElement("script");
    newScript.innerHTML = response;
    scripts.appendChild(newScript);
}

function getPackage(url) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();
    console.log(xhttp);
    return xhttp.responseText;
}