const games = require('../../model/games')

const wss = require('../../wss/server')

module.exports = (request, socket, head)=>{
    let requestUrl = request.url.split('/').filter((v)=>v);
    if(requestUrl.length != 3) request.destroy("")

    if(requestUrl[0] === 'game' && requestUrl[1] === 'join'){
        let found = false
        for(let i = 0; i < games.length; i++){
            if(requestUrl[2] === games[i].invite_code){
                wss.handleUpgrade(request, socket, head, (ws)=>{
                    wss.emit('connection', ws, request)
                })
                found = true
            }
        }
        if(found === false){
            request.destroy("this is not a valid invite")
        }
    }else{
        request.destroy("")
    }
}