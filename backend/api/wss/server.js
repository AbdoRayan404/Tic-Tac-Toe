const { WebSocketServer } = require('ws');

//server
const wss = new WebSocketServer({"noServer":true})

//handlers
const connectionHandler = require('./handlers/connectionHandler')

wss.on('connection', connectionHandler)

module.exports = wss;