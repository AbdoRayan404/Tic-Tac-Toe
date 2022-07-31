const webSockets = require('../model/websockets')
const games = require('../../model/games')

module.exports = (ws, request)=>{
    ws.playerID = Math.floor(Math.random() * 100000);
    ws.gameID = null;
    webSockets.push(ws)

    let invite_code = request.url.split('/').filter((v)=>v)[2]

    for(let i = 0; i < games.length; i++){ //finding the game object
        if(games[i].invite_code = invite_code){
            if(games[i].game.status === 'pending'){ //game must be in pending state in order for anyone to join
                let gameStatusAfterJoin = games[i].game.signPlayer(ws.playerID)
                ws.gameID = games[i].game.gameID;

                if(gameStatusAfterJoin == 'ongoing'){
                    ws.send(JSON.stringify({"success":"joined successfully. you may start now"}))

                    for(let j = 0; j < webSockets.length; j++){
                        if(webSockets[j].gameID === ws.gameID && webSockets[j].playerID !== ws.playerID){
                            webSockets[j].send(JSON.stringify({"notify":"opponent joined. you may start now"})) //notifying the other player
                            
                            //now send the game matrix/state to the players
                            ws.send(JSON.stringify(games[i].game.state()))
                            webSockets[j].send(JSON.stringify(games[i].game.state()))
                        }
                    }
                }else if(gameStatusAfterJoin == 'pending'){
                    ws.send(JSON.stringify({"success":"joined successfully. waiting for opponent"}))
                }
            }else{
                ws.send(JSON.stringify({"error":"game is done or ongoing"}));
                return ws.terminate();
            }
        }
    }
}