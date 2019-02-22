const express = require('express')
const app = express()
const port = 4000

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.send(`hello 4000`)
})

app.listen(port, () => console.log(`express is listening on ${port}`))
