let http = require("http");

let server = new http.Server();

server.on("request", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
  res.write("<h1>Hank</h1>");
  res.end("<p>Hello Node again!</p>");
});

server.listen(3000);

console.log("HTTP正在监听3000端口!");