const fs = require('fs');

const data = fs.readFileSync('http-example.js', 'utf-8');
console.log(data);
console.log('over');