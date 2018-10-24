var fs = require('fs')

var readStream = fs.createReadStream('./src/node-tutorials/trap.js')
var writeStream = fs.createWriteStream('./src/node-tutorials/trap-1.js')

readStream.on('data', (chunk) => {
    if (writeStream.write(chunk) === false) {
        readStream.pause()
    }
})

readStream.on('end', () => {
    writeStream.end
})

writeStream.on('drain', () => {
    readStream.resume()
})