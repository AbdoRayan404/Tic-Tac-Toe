var game = {
    status: null
}

var ws = null

fetch(window.location.origin + '/api/game/inspect/' + window.location.href.split('/').pop())
    .then((response)=>{
        if(response.status == 200){
            connect()
        }else{
            window.location.href = '/invalid'
        }
    })

function updateBoard(){
    let flat = game.state.flat()
    let fields = document.querySelectorAll('#game-board div')
    let status = document.querySelector('#game-status')
    let title = document.querySelector('head title')

    if(game.status == null) status.innerHTML = 'Joining...'
    else if(game.status == 'pending'){
        status.innerHTML = 'Waiting for opponent.'
        title.innerHTML = 'Waiting for opponent.'
    }
    else if(game.status == 'ongoing') {
        status.innerHTML = 'Playing.'
        title.innerHTML = 'Playing.'
    }
    else if(typeof game.status == 'object'){
        if(game.status[1] === game.playerID){
            status.innerHTML = 'You Won.'
            title.innerHTML = 'you won.'
        }else{
            status.innerHTML = 'You Lost.'
            title.innerHTML = 'you lost.'
        }
    }else if(game.status == 'draw'){
        status.innerHTML = 'Draw.'
        title.innerHTML = 'Draw.'
    }

    for(let i = 0; i < fields.length; i++){
        fields[i].innerHTML = flat[i];
    }
}

function message(msg){
    let data = JSON.parse(msg.data)

    if(data.success){
        game.playerID = data.success
    }

    if(data.status){ //game board update has been sent
        game.state = data.state
        game.status = data.status
        updateBoard()
    }
    console.log(msg.data)
}

function connect(){
    ws = new WebSocket('wss://' + window.location.host + '/game/join/' + window.location.href.split('/').pop())
    ws.onopen = ()=> document.querySelector('#game-status').innerHTML = 'Joined. waiting for opponent'
    ws.onmessage = message
}

function play(x, y){
    ws.send(JSON.stringify({"type":"play", "x":x, "y":y}))
}