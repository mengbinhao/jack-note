//创建http server
const http = require('http');

http.createServer( (req, res) => {
    res.writeHead('200', {
        'content-Type': 'text/plain'
    });
    res.end('hello node!!!');
}).listen('8888');

console.log('node server running on http://localhost:8888');