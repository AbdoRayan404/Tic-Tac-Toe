const express = require('express');
const logit = require('logit-http');
const app = express();

//env vars
const PORT = process.env.PORT || 3000

//server
const server = app.listen(PORT, ()=>{console.log('HTTP server is up, listening on port', PORT)})

//imports
const rateLimiter = require('./middlewares/handlers/rateLimiter')
const upgradeHandler = require('./middlewares/handlers/upgradeHanlder')
const gameCreate = require('./middlewares/routes/gameCreate')

//HTTP -> WS upgrade handling
server.on('upgrade', upgradeHandler)

//middlewares
app.use(logit)
app.use(rateLimiter)

app.get('/api/game/create', gameCreate)