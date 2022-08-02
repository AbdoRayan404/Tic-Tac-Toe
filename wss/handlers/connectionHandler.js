const webSockets = require('../model/websockets')
const games = require('../../model/games')
const gameUpdate = require('../methods/updateGame')

module.exports = (ws, request)=>{
    let invite_code = request.url.split('/').filter((v)=>v)[2]
    let game = null;

    for(let i = 0; i < games.length; i++){
        if(games[i].invite_code === invite_code){
            game = games[i];
        }
    }
    if(!game){
        ws.send({'error':'invalid invite code'})
        ws.terminate()
        return;
    }

    ws.playerID = Math.floor(Math.random() * 100000);
    game.game.signPlayer(ws.playerID)
    ws.gameID = game.game.gameID;
    webSockets.push(ws)

    ws.send(JSON.stringify({'success':ws.playerID}))
    gameUpdate(game.game.gameID)
}