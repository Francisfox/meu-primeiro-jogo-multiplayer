export default function createGame(){
    const state = {
        players:{},
        fruits:{},
        screen: {
            width: 10,
            height: 10
        }
    } 

    function setState(newState){
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = 4 //'playerX' in command ? command.playerX : Meth.floor(Meth.randdom() * state.screen.width)
        const playerY = 4 //'playerY' in command ? command.playerY : Meth.floor(Meth.randdom() * state.screen.height)

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }
    function addFruit(command) {
        const fruitId= command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId= command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command){
         
        const acceptedMoves = {
            ArrowUp(player) {
                 if (player.y - 1 >= 0){
                    player.y = player.y - 1 
                } 
            },
            ArrowRight(player) {

                if (player.x + 1 < state.screen.width){
                    player.x = player.x + 1
                    return
                }
            },
            ArrowDown(player) {

                if (player.y + 1 < state.screen.height){
                    player.y = player.y + 1
                }
            },
            ArrowLeft(player) {
                
                if (player.x - 1 >= 0){
                    player.x = player.x - 1
                }
            }
        }

        const keyPressed = command.keyPressed
        const   playerId = command.playerId
        const player = state.players[ playerId]
        const moverFunction = acceptedMoves[keyPressed]
        if (player && moverFunction){
            moverFunction(player)
            checkForFruitCollision(playerId)
        }
    }    
    function checkForFruitCollision(playerId){
        const player = state.players[playerId]
        
        for (const fruitId in state.fruits){
            const fruit = state.fruits[fruitId]
            //console.log(`Checking ${playerId} and ${fruitId}`)
            if (player.x === fruit.x && player.y === fruit.y){
                //console.log(`COLLISION Between ${playerId} and ${fruitId}`)
                removeFruit({fruitId: fruitId})
            }
        }                    
    }
    return{
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state,
        setState
    }
}