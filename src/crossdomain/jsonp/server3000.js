const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname))

app.get('/show', (req, res) => {
    const {cb, wd} = req.query
    let result = '{"name":"Jack","age":18,"info":{"address":"xian","interest":"JS"}}'
    res.send(`${cb}(${result})`)
})

app.listen(port, () => console.log(`express is listening on ${port}`))
