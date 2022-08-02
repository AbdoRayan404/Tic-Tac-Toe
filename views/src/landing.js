//HELLO there, open source code reader, just wanted to say that i like you brotha.
//add me in discord, we might have small talk about coding Nameless#8663

function create(){
    fetch('api/game/create')
        .then((response)=>{
            if(response.status == 200){
                return response.json()
            }
        })
        .then((data)=>{
            window.location.href = 'game/' + data.invite;
        })
}

function join(){
    let invite = document.querySelector('#game #invite_code')
    let error = document.querySelector('#game #error')

    //check the invite code first
    fetch(window.location.origin + '/api/game/inspect/' + invite.value)
        .then((response)=>{
            if(response.status == 200){
                window.location.href = 'game/' + invite.value
            }else if(response.status == 404){
                error.style.display = 'block';
                error.innerHTML = 'game wasnt found'
            }else if(response.status == 423){
                error.style.display = 'block'
                error.innerHTML = 'game is ongoing, you cannot join'
            }
        })
}