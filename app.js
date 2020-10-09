let canvas
let context

window.onload(() => {
  canvas = document.getElementById('canvas')
  context = canvas.getContext("2d")

  document.addEventListener('keydown', gameControl)

  let frames = 8
  setInterval(draw, 1000/frames)
})

function draw() {

}

function gameControl() {
  
}