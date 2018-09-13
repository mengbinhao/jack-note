const fs = require('fs');

fs.readFile('http-example.js', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

console.log('over');