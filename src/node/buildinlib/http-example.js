const http = require('http');

function onRequest(request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello Node");
    response.end();
}

//fs.createReadStream(`${__dirname}/index.html`).pipe(response);}).listen(8080, '127.0.0.1');
http.createServer(onRequest).listen(8080, '127.0.0.1');