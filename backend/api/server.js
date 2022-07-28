const express = require('express');
const app = express();

//env vars
const PORT = process.env.PORT || 3000

//lib
const makeid = require('./lib/makeid')

//imports
const games = require('./model/games')
const Game = require('../game/game')
const rateLimiter = require('./middlewares/handlers/rateLimiter')

//middlewares
app.use(rateLimiter)

app.get('/api/game/create', (req,res)=>{
    let newGame = {
        created_at: new Date().toDateString(),
        created_from: req.ip,
        invite_code: makeid(10),
        game: new Game()
    }

    games.push(newGame)
    res.status(200).json(newGame)
})

app.listen(PORT, ()=>{console.log('I AM UP, listening on port', PORT)})