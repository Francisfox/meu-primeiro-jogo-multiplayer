import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()       

    game.subscribe((command) => {
        console.log(`> Emitting ${command.type}`)    
        sockets.emit(command.type, command)
    })
    sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connect: ${playerId}`)

    game.addPlayer({playerId: playerId })
    //console.log(game.state)

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId })
        console.log(`> Player disconnect: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
}) 

server.listen(3000, () => {
    console.log(`Server listening on port: 3000`)
})