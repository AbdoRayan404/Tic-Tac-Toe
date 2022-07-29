const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({"noServer":true})

wss.on('connection', (ws)=>{
    ws.send('hello there')
})

module.exports = wss;