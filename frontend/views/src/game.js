var game = {
}

var ws = null

fetch('http://localhost:3000/api/game/inspect/' + window.location.href.split('/').pop())
    .then((response)=>{
        if(response.status == 200){
            connect()
        }else{
            window.location.href = '/invalid'
        }
    })

function updateBoard(matrix){
    let flat = matrix.flat()
    let fields = document.querySelectorAll('#game-board div')

    for(let i = 0; i < fields.length; i++){
        fields[i].innerHTML = flat[i];
    }
}

function message(msg){
    let data = JSON.parse(msg.data)

    if(data.success){
        game.playerID = data.success
    }else if(data.status == 'ongoing'){
        document.querySelector('#game-status').innerHTML = 'playing. opponent joined.'
        document.querySelector('head title').innerHTML = 'playing...'
    }else if(typeof data.status == 'object'){
        console.log(game)
        if(data.status[1] === game.playerID){
            document.querySelector('#game-status').innerHTML = 'you won.'
            document.querySelector('head title').innerHTML = 'you won.'
        }else{
            document.querySelector('#game-status').innerHTML = 'you lost.'
            document.querySelector('head title').innerHTML = 'you lost.'
        }
    }else if(data.status == 'draw'){
        document.querySelector('#game-status').innerHTML = 'draw.'
    }

    if(data.status){ //game board update has been sent
        game.state = data.state
        updateBoard(data.state)
    }
    console.log(msg.data)
}

function connect(){
    ws = new WebSocket('ws://localhost:3000/game/join/' + window.location.href.split('/').pop())
    ws.onopen = ()=> document.querySelector('#game-status').innerHTML = 'Joined. waiting for opponent'
    ws.onmessage = message
}

function play(x, y){
    ws.send(JSON.stringify({"type":"play", "x":x, "y":y}))
}