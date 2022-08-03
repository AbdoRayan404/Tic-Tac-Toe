const express = require('express');
const logit = require('logit-http');
const app = express();
const cors = require('cors');

//env vars
const PORT = process.env.PORT || 3000

//server
const server = app.listen(PORT, ()=>{console.log('HTTP server is up, listening on port', PORT)})

//imports
const rateLimiter = require('./middlewares/handlers/rateLimiter')
const upgradeHandler = require('./middlewares/handlers/upgradeHanlder')
const gameCreate = require('./middlewares/routes/gameCreate')
const gameInspect = require('./middlewares/routes/gameInspect')

//HTTP -> WS upgrade handling
server.on('upgrade', upgradeHandler)

//middlewares
app.use(cors())
app.use(logit)
app.use('/src', express.static('views/src'))
app.use('/api/game/create', rateLimiter)

//api routes
app.get('/api/game/create', gameCreate)
app.get('/api/game/inspect/:invite', gameInspect)

//static files route
app.get('/', (req, res)=> res.sendFile(__dirname + '/views/landing.html'))
app.get('/game/:invite', (req, res)=> res.sendFile(__dirname + '/views/game.html'))
app.get('/invalid', (req, res)=> res.sendFile(__dirname + '/views/invalid.html'))