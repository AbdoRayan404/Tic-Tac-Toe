const games = require('../../model/games')
const gameUpdate = require('./gameUpdate')
const gameEnd = require('./endGame')

module.exports = (ws, data)=>{
    try{
        data = JSON.parse(data.toString())
    }catch(err){
        ws.send(JSON.stringify({'error':'invalid json'}))
    }
    
    if(data.type === 'play'){
        for(let i = 0; i < games.length; i++){
            if(games[i].game.status !== 'ongoing') return ws.send(JSON.stringify({'error':'game not started'}))

            if(games[i].game.gameID == ws.gameID){
                let game = games[i].game;

                if(data.x > 2 || data.y > 2) return ws.send(JSON.stringify({'error':'invalid x, y'}))

                
                let response = game.play(ws.playerID, data.x, data.y)
                if(response == 'ongoing'){
                    gameUpdate(games[i].game.gameID)
                }else if(response == 'used'){
                    ws.send(JSON.stringify({'player':'error', 'reason':'this tile is already used'}))
                    ws.send(JSON.stringify(games[i].game.state())) //update the game matrix/state to the player if it's bugged on the client side
                }else if(response == 'player cannot play twice in a row'){
                    ws.send(JSON.stringify({'player':'error', 'reason':'you cannot play twice in a row'}))
                }else if(typeof response == 'object' || response == 'draw'){
                    gameUpdate(games[i].game.gameID)
                    gameEnd(games[i].game.gameID)
                }
                
            }
        }



    }
}