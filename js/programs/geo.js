{let line;

function geo(args) {
    if (args.length !== 0) {
        addLine("This command does not accept inputs.");
    }
    
    if (localStorage.getItem("geoPermission") === null) {
        addLine("Please accept this request if you would like to see your location.");
    } else if (localStorage.getItem("geoPermission") === 0) {
        addLine("You have previously declined to grant permission to locate you.");
        return;
    }
    
    line = addLine("This will be replaced shortly...");
    
    // Check to see if the browser supports the GeoLocation API.
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
                
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            changeLine(line, `Your location: ${lat.toFixed(5)}, ${lon.toFixed(5)}`);
            localStorage.setItem("geoPermission", 1);
        }, error, options);
    } else {
        changeLine(line, "Your browser does not support geolocation.");
    }
}

const error = function(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === 1) {
        localStorage.setItem("geoPermission", 0);
        changeLine(line, "You have declined to grant permission to locate you.");
    } else {
        changeLine(line, "An unexpected error has occured. Please try again.");
    }
};}