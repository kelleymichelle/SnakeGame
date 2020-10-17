let canvas
let context
let direction = null
const snakeLink = 20
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


window.onload = () => {

  canvas = document.getElementById('canvas')
  context = canvas.getContext("2d")


  context.fillStyle = tagsale
  context.fillRect(0, 0, canvas.width, canvas.height);

  let frames = 15

  redrawApple()
  
  setInterval(() => {
    document.addEventListener('keydown', (e) => gameControl(e))
    draw()
  } , 1000/frames)
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
  context.fillStyle = 'red'
  context.beginPath()
  context.arc(apple.x, apple.y, 13, 0, Math.PI * 2, true)
  context.fill()
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
  //TODO: needs to check if snake is touching edge of canvas
}

function snakeEatsSelf() {
  //TODO: needs to check if snake eats himself
}

function gameOver() {
  //TODO: should wipe canvas and display game over message
}

function levelPicker() {
  //TODO: lets user choose desired level adn set speed of snake
}
