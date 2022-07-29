//lib
const makeid = require('../../lib/makeid')

//imports
const games = require('../../model/games')
const Game = require('../../../game/game')

module.exports = (req,res)=>{
    let newGame = {
        created_at: new Date().toDateString(),
        created_from: req.ip,
        invite_code: makeid(10),
        game: new Game()
    }

    games.push(newGame)
    res.status(200).json({"invite":newGame.invite_code})
}