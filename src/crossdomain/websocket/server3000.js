
const WebSocket = require('ws')

let wss = new WebSocket.Server({port:3000})

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log(data)
        ws.send('from backend')
    })
})