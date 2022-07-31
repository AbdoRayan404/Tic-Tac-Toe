const webSockets = require('../model/websockets')
const games = require('../../model/games')

module.exports = (gameID)=>{
    for(let i = 0; i < games.length; i++){
        if(games[i].game.gameID === gameID){
            let p1 = games[i].game._player1.id;
            let p2 = games[i].game._player2.id;
            for(let j = 0; j < webSockets.length; j++){
                if(webSockets[j].playerID === p1){
                    webSockets[j].terminate()
                }else if(webSockets[j].playerID === p2){
                    webSockets[j].terminate()
                }
            }
        }
    }
}