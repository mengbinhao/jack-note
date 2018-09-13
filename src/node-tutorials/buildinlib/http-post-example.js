let http = require("http");
let util = require("util");
//can not use in production!!!!!
let querystring = require("querystring");

http.createServer(function(req, res) {
    let post = "";
    req.on("data", function(chunk) {
      post += chunk;
    });
    req.on("end", function() {
      post = querystring.parse(post);
      res.end(util.inspect(post));
    });
  }).listen(3000);