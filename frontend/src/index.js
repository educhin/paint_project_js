// Set up canvas initially 
const canvas = document.querySelector('.myCanvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight-60
// const width = canvas.width
// const height = canvas.height
const ctx = canvas.getContext('2d')
const colors = {
    white: 'white',
    black: 'black',
    red: 'red',
    orange: 'orange',
    yellow: 'yellow',
    green: 'green',
    blue: 'blue',
    indigo: 'indigo',
    violet: 'violet'
}

const paletteDiv = document.querySelector('#colorPalette')

const palette = new Palette(colors, paletteDiv)

 // store mouse pointer coordinates, and whether the button is pressed
 let curX;
 let curY;
 let pressed = false;

document.addEventListener('DOMContentLoaded', function(){
    setCanvas();
    draw();
    palette.setUpPalette()
});

function setCanvas(){
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, width, height)
}



 // update mouse pointer coordinates
 document.onmousemove = function(e) {
   curX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
   curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
 }

 canvas.onmousedown = function() {
   pressed = true;
 };

 canvas.onmouseup = function() {
   pressed = false;
 }

 function degToRad(deg){
     return deg * Math.PI / 180;
 }

 function draw() {
    if(pressed) {
      ctx.fillStyle = palette.currentColor
      ctx.beginPath();
      ctx.arc(curX, curY-60, 10, degToRad(0), degToRad(360), false);
      ctx.fill();
    }
 
    requestAnimationFrame(draw);
  }

 