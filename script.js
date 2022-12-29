const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(event) {
  if(!isDrawing) {
    return; //stops function running if not mousedown
  }
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); //start from
  ctx.lineTo(e.offsetX, e.offsetY); // go to
  ctx.stroke();
}

//ensures the function runs when only mouse down
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
