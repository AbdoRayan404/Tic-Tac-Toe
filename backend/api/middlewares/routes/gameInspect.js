const games = require('../../model/games')

module.exports = (req,res)=>{
    let game = null;

    for(let i = 0; i < games.length; i++){
        if(games[i].invite_code == req.params.invite){
            game = games[i].game.status
            break;
        }
    }

    if(game == null){
        res.status(404).json({'game':'not found'})
    }else if(game == 'pending'){
        res.status(200).json({'game':'exists'})
    }else if(game != 'pending'){
        res.status(423).json({'game':'not accessable'})
    }else{
        res.status(500).json({'game':'error'})
    }
}