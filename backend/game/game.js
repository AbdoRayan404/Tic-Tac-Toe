class game {
    constructor(){
        this._gameID = Math.floor(Math.random() * 100000);
        this._state = [[" "," "," "],[" "," "," "],[" "," "," "]];
        this._player1 = {
            id: null,
            symbol: null
        };
        this._player2 = {
            id: null,
            symbol: null
        };
        this._lastPlayFrom = null;
        this._status = "pending";
    }

    get status(){
        return this._status
    }

    get gameID(){
        return this._gameID
    }

    state(arg){
        if(!arg) return this._state; //this will return state in rows
        else if(arg === "columns") return [[this._state[0][0], this._state[1][0], this._state[2][0]], [this._state[0][1], this._state[1][1], this._state[2][1]], [this._state[0][2], this._state[1][2], this._state[2][2]]]
        else if(arg === 'diagonals') return [[this._state[0][0], this._state[1][1], this._state[2][2]], [this._state[0][2], this._state[1][1], this._state[2][0]]]
        else throw new Error('unknown argument in state inspect')
    }

    signPlayer(id){
        if(this._player1.id === null){
            this._player1.id = id;
        }else if(this._player2.id === null){
            this._player2.id = id;
        }

        if(this._player1.id && this._player2.id){
            this._status = 'ongoing'
            this._player1.symbol = "X";
            this._player2.symbol = "O";
        }

        return this._status
    }

    play(id, x,y){
        if(this._status != 'ongoing') return "game is not going";
        let player = this._player1.id == id ? this._player1 : this._player2
        if(id == this._lastPlayFrom) return "player cannot play twice in a row";
        if(this._state[x][y] != " ") return "used";
        this._state[x][y] = player.symbol;
        this._lastPlayFrom = id;

        this.check(id)

        return this._status
    }

    check(id){
        let player = this._player1.id == id ? this._player1 : this._player2

        let rows = this.state();
        for(let i = 0; i < rows.length; i++){
            if(new RegExp(`^${player.symbol}{3,}$`).test(rows[i].join('')) === true) return this._status = ['win', id]
        }

        let columns = this.state('columns');
        for(let i = 0; i < columns.length; i++){
            if(new RegExp(`^${player.symbol}{3,}$`).test(columns[i].join('')) === true) return this._status = ['win', id]
        }

        let diagonals = this.state('diagonals');
        for(let i = 0; i < diagonals.length; i++){
            if(new RegExp(`^${player.symbol}{3,}$`).test(diagonals[i].join('')) === true) return this._status = ['win', id]
        }

        let hasEmptyField = false;
        for(let i = 0; i < this._state.length; i++){
            for(let j = 0; j < this._state[i].length; j++){
                if(this._state[i][j] == " ") hasEmptyField = true;
            }
        }

        if(hasEmptyField == false) return this._status = 'draw'

        return this._status = 'ongoing'
    }

    withdrawal(playerId){
        if(this._status != 'ongoing') throw new Error("cannot withdrawal a game not started yet, or done")
        if(this._player1.id == playerId || this._player2.id == playerId) return this._status = ['win', this._player1.id == playerId ? this._player2.id : this._player1.id]
        else throw new Error("this player doesn't exist")
    }
}


module.exports = game;