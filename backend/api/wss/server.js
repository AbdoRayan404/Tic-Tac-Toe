const { WebSocketServer } = require('ws');

//server
const wss = new WebSocketServer({"noServer":true})

//handlers
const connectionHandler = require('./handlers/connectionHandler')
const messageHandler = require('./handlers/messageHandler')

//sockets
const webSockets = require('./model/websockets')

wss.on('connection', (ws, request)=>{
    connectionHandler(ws, request)
    
    if(ws.gameID){ //this means the user have joined a game.
        ws.on('message', (data)=>{
            messageHandler(ws, data)
        })
    }
})

module.exports = wss;