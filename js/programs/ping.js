(function() {
    function ping(host, port, pong, timeout) {
        const started = new Date().getTime();
        const http = new XMLHttpRequest();

        http.open("GET", `http://${host}:${port}`, /*async*/true);
        http.timeout = 1000;
        http.ontimeout = timeout;
        http.onerror = function() {
            addLine(`There was an error accessing ${host}`);
        };
        http.onreadystatechange = function() {
            console.log(http);
            if (http.readyState == 4) {
                const ended = new Date().getTime();
                const milliseconds = ended - started;
                if (pong != null && http.response) {
                    pong(milliseconds, http.response);
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
    let domain = stdin();
    let port = 80;
    const split = domain.split(":");
    if (split.length == 2) {
        port = split[1];
        domain = split[0];
    }
    ping(domain, port, (time, response) => {
        addLine(`${domain}:${port} | ${time}ms`);
        stdout(`${domain}:${time}ms`);
    }, () => {
        addLine(`${domain}:${port} has timed out.`);
        stdout(`${domain}:${port} has timed out.`);
    });
}());