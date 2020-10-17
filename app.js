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

  let frames = 8

  
  setInterval(() => {
    document.addEventListener('keydown', gameControl)
    draw()
  } , 1000/frames)
}

function draw() {
  context.fillStyle = tagsale
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < snake.length; i++) {
    console.log("should draw snake")
    context.fillStyle = 'magenta'
    context.fillRect(snake[i].x, snake[i].y, snakeLink, snakeLink)
  }

}

function gameControl() {
  console.log("game control")
}

function renderApple() {
  
}