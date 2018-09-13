let http = require('http');
let url = require('url');
let util = require('util');


http.createServer( (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    console.log(req);
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);

console.log("HTTP正在监听3000端口!");