const express = require('express');
const logitHTTP = require('logit-http');

const app = express()

//middlewares
app.use(logitHTTP)
app.use(express.json())
app.use(express.static('views/src'))

//VARS
const PORT = process.env.PORT || 4000

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/landing.html')
})

app.get('/game/:invite', (req, res)=>{
    res.sendFile(__dirname + "/views/game.html")
})

app.listen(PORT, ()=> console.log('This bad boy is up, at port', PORT))