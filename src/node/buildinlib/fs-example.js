const fs = require("fs");
fs.open("event-example.js", "r", function (err, fd) {
    if (err) {
        console.error(err);
        return;
    }
    var buf = new Buffer(8);
    fs.read(fd, buf, 0, 8, null, function (err, bytesRead, buffer) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("读取的byte: " + bytesRead);
        console.log(buffer);
    });
});