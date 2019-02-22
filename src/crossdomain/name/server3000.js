const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.send('hello 3000')
})
app.listen(port, () => console.log(`express is listening on ${port}`))
