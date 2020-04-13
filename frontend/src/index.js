
// Set up canvas initially 
const canvas = document.querySelector('.myCanvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

 // store mouse pointer coordinates, and whether the button is pressed
 let curX;
 let curY;
 let pressed = false;

document.addEventListener('DOMContentLoaded', function(){
    setCanvas();
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



 