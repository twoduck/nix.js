(function() {
    function ping(host, port, pong) {

        var started = new Date().getTime();

        var http = new XMLHttpRequest();

        http.open("GET", "https://" + host + ":" + port, /*async*/true);
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
            var ended = new Date().getTime();

            var milliseconds = ended - started;

            if (pong != null) {
                pong(milliseconds);
            }
            }
        };
        try {
            http.send(null);
        } catch(exception) {
            // this is expected
        }

    }

    if (!stdin()) {
        stderr("No domain given.");
        return;
    }
    const domain = stdin();

    ping(domain, 80, function(time) {
        addLine(`${time}ms`);
        stdout(`${domain}:${time}ms`)
    });

}())