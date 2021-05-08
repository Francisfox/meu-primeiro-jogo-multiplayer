import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()       

    sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`Player connect on Server with id ${playerId}`)

    game.addPlayer({playerId: playerId })
    console.log(game.state)

    socket.emit('setup', game.state)
}) 

server.listen(3000, () => {
    console.log(`Server listening on port: 3000`)
})