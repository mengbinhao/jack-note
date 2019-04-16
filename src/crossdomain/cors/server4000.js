const express = require('express')
const app = express()
const port = 4000

const whiteList = ['http://localhost:3000']

app.use((req, res, next) => {
    let origin = req.headers.origin
    if (whiteList.includes(origin)) {
        //如果Access-Control-Allow-Origin为*，Access-Control-Allow-Credentials不能用
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Access-Control-Allow-Headers', 'name')
        res.setHeader('Access-Control-Allow-Methods', 'PUT')
        //允许携带cookie
        res.setHeader('Access-Control-Allow-Credentials', true)
        //允许前端获取那个头
        res.setHeader('Access-Control-Expose-Headers', 'wawa')
        //设置处理预检请求的存活时间
        res.setHeader('Access-Control-Max-Age', 10)
        if (req.method === 'OPTIONS') {
            res.sendStatus(200)
        }
    }
    next()
})

app.put('/getData', (req, res) => {
    console.log(req.headers)
    res.setHeader('wawa', 'yingying')
    res.send(`hello put`)
})


app.get('/getData', (req, res) => {
    console.log(req.headers)
    res.send(`hello get`)
})

app.listen(port, () => console.log(`express is listening on ${port}`))
