const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#03c4ff';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
//ctx.globalCompositeOperation = 'destination-atop';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(event) {
  if(!isDrawing) {
    return; //stops function running if not mousedown
  }
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY); //start from
  ctx.lineTo(event.offsetX, event.offsetY); // go to
  ctx.stroke();

  //lastX = event.offsetX
  //lastY = event.offsetY
  //is the same as...
  [lastX, lastY] = [event.offsetX, event.offsetY];

  //note: as of the above, it draws a line but "snaps" to
  //the last mouseup on mousedown

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  //if the line is 1>, normal direction. >100, reverse direction etc
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  //grows or shrinks the line depending on status of "direction"
  if(direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

//ensures drawing resets to new mousedown event
canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
});

//ensures the function runs when only mouse down
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
