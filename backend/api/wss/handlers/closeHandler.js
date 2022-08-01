const games = require('../../model/games')
const updateGame = require('../methods/updateGame')
const endGame = require('../methods/endGame')
const webSockets = require('../model/websockets')

module.exports = (ws, code, reason)=>{
    if(ws.gameID){
        for(let i = 0; i < games.length; i++){
            if(games[i].game.gameID === ws.gameID){
                games[i].game.withdrawal(ws.playerID)
                updateGame(ws.gameID)
                endGame(ws.gameID)

                for(let j = 0; j < webSockets.length; j++){
                    if(webSockets[j] === ws){
                        webSockets.splice(j, 1);
                        break;
                    }
                }

                break;
            }
        }
    }
}