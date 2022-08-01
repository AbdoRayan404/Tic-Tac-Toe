const wss = require('../../wss/server')

module.exports = (request, socket, head)=>{
    wss.handleUpgrade(request, socket, head, (ws)=>{
        wss.emit('connection', ws, request)
    })
}