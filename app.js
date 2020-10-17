let canvas
let context
let direction = null
const snakeLink = 20
let intervalID
const tagsale = '#364182'
let apple = {x: '', y: ''}
const appleSlice = 10

let snake = [
    { x: 400, y: 300},
    { x: 380, y: 300},
    { x: 360, y: 300},
    { x: 340, y: 300},
    { x: 320, y: 300},
    { x: 300, y: 300},
]

let frames = null

let levelOptions = {
    'easy': 8,
    'medium': 18,
    'hard': 28
}

window.onload = () => {
    let levels = document.getElementsByClassName('level')

    Array.from(levels).map(level => {
        level.addEventListener('click', (e) => {
            frames = levelOptions[e.target.id]
            console.log(frames)
            document.querySelector('.level-selection').remove()
            addCanvas()
            redrawApple()
            
            intervalID = setInterval(() => {

                document.addEventListener('keydown', (e) => gameControl(e))
                draw()
            } , 1000/frames)
        })
    })
}

function addCanvas() {
    document.querySelector('body').innerHTML = '<canvas id="canvas" width="1000" height="800"></canvas> <div id="reload"><h1>Game Over</h1><button type="submit" onClick="window.location.reload()">Play Again</button></div>'

    canvas = document.getElementById('canvas')
    context = canvas.getContext("2d")

    context.fillStyle = tagsale
    context.fillRect(0, 0, canvas.width, canvas.height)

}

function draw() {
    context.fillStyle = tagsale
    context.fillRect(0, 0, canvas.width, canvas.height)

    if (direction) {

        let snakeCopy = snake.map(part => {
        return {...part}
        })

        if (direction === 'UP') {
        snake[0].y -= snakeLink
        } else if (direction === 'DOWN') {
        snake[0].y += snakeLink
        } else if (direction === 'LEFT') {
        snake[0].x -= snakeLink
        } else if (direction === 'RIGHT') {
        snake[0].x += snakeLink
        }

        for (let i = 1; i < snake.length; i++) {
        snake[i] = snakeCopy[i - 1]
        }
    }

    for (let i = 0; i < snake.length; i++) {
        // console.log("should draw snake")
        context.fillStyle = 'magenta'
        context.fillRect(snake[i].x, snake[i].y, snakeLink, snakeLink)
    }
    renderApple()
    snekEatsSnak()
    snakeHitsWall()
    snakeEatsSelf()
}

function gameControl(e) {
    if (e.keyCode === 38) {
        direction = 'UP'
    } else if (e.keyCode === 40) {
        direction = 'DOWN'
    } else if (e.keyCode === 37) {
        direction = 'LEFT'
    } else if (e.keyCode === 39) {
        direction = 'RIGHT'
    }

}

function renderApple() {
    // context.fillStyle = 'red'
    // context.beginPath()
    // context.arc(apple.x, apple.y, 13, 0, Math.PI * 2, true)
    // context.fill()

    context.font = '30px serif'
// use these alignment properties for "better" positioning
    // context.textAlign = "center"; 
    // context.textBaseline = "middle"; 
    // draw the emoji
    context.fillText('🍎', apple.x, apple.y)
}

function redrawApple() {
    let appleX = Math.floor(Math.random() * (1000 - 20) + 20);
    let appleY = Math.floor(Math.random() * (800 - 20) + 20);
        apple = {x: appleX, y: appleY}
}

function snekEatsSnak() {
    if ( ( Math.abs(snake[0].x - apple.x) <= 20 ) && ( Math.abs(snake[0].y - apple.y) <= 20 ) ) {
        snake.push({x: null, y: null})
        redrawApple()
    }
}

function snakeHitsWall() {
    if (snake[0].x > canvas.width || snake[0].x < 0  || snake[0].y > canvas.height || snake[0].y < 0) {
        gameOver()
    }
}

function snakeEatsSelf() {
    let snakeHead = snake[0]

    for (let i = 1; i < snake.length; i++) {
        if(snakeHead.x === snake[i].x && snakeHead.y === snake[i].y) {
            gameOver()
        }
    }
}

function gameOver() {
    clearInterval(intervalID)
    
    // context.font = '150px sans-serif';
    // // context.textAlign = "center"; 
    // // context.textBaseline = "middle"; 
    // context.fillText('Game Over', 500, 390);
    
    let score = snake.length - 6
    context.font = '100px sans-serif';
    context.fillStyle = "lime"
    context.fillText(`Score: ${score}`, 350, 500);   
    
    document.getElementById('reload').style.display = 'block'
}
