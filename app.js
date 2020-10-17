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

  redrawApple()
  
  setInterval(() => {
    document.addEventListener('keydown', (e) => gameControl(e))
    draw()
  } , 1000/frames)
}

function draw() {
  context.fillStyle = tagsale
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < snake.length; i++) {
    // console.log("should draw snake")
    context.fillStyle = 'magenta'
    context.fillRect(snake[i].x, snake[i].y, snakeLink, snakeLink)
  }
  renderApple()
}

function gameControl(e) {
  console.log(e.keyCode)
  // up = 38
  //down = 40
  //left = 37
  //right = 39
}

function renderApple() {

  context.fillStyle = 'red'
  context.beginPath()
  context.arc(apple.x, apple.y, 10, 0, Math.PI * 2, true)
  context.fill()

}

function redrawApple() {

  let appleX = Math.floor(Math.random() * (1000 - 20) + 20);
  let appleY = Math.floor(Math.random() * (800 - 20) + 20);

  apple = {x: appleX, y: appleY}
}