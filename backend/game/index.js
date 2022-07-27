//this index.js is only to test the game

const game = require('./game')

let newGame = new game();

console.log(newGame.status)
console.log(newGame.state('diagonals'))
console.log(newGame.setPlayer(1, 123))
console.log(newGame.setPlayer(2, 321))
console.log(newGame.play(1, 0,1))
console.log(newGame.play(1, 1,1))
console.log(newGame.play(1, 2,1))