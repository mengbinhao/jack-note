let fs = require('fs');

let files = ['http-example.js', 'mock-event-emitter.js', 'read-file.js'];

// for (let i = 0; i < files.length; i++) {
//     fs.readFile(files[i], 'utf-8', (err, data) => {
//         console.log(files[i] + ':' + data);
//     });
// }

files.forEach(function (filename) {
    fs.readFile(filename, "utf-8", function (err, contents) {
        console.log(filename + ": " + contents);
    });
});