//Fetch URLs
const BASE_URL = "http://localhost:3000"
const PALETTES_URL = `${BASE_URL}/palettes`
const ARTIST_URL = `${BASE_URL}/artists`

// Set up canvas initially 
const canvas = document.querySelector('.myCanvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight-60
const ctx = canvas.getContext('2d')
// const width = canvas.width
// const height = canvas.height

const paletteDiv = document.querySelector('#colorPalette')


 // store mouse pointer coordinates, and whether the button is pressed
 let curX;
 let curY;
 let pressed = false;

document.addEventListener('DOMContentLoaded', function(){
    setCanvas();
    draw();
    // palette.setUpPalette()
    fetchPalette(0)
});

function setCanvas(){
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, width, height)
}

function fetchPalette(index){
  let obj = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    } 
  }
  fetch(PALETTES_URL, obj)
  .then(response => response.json())
  .then(obj => obj[index].colors)
  .then(colors => new Palette(colors, paletteDiv))
  .then(palette => palette.setUpPalette())
  .catch(error => console.log(error.message))
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
      ctx.fillStyle = document.querySelector('#currentColor').style.backgroundColor
      ctx.beginPath();
      ctx.arc(curX, curY-60, 10, degToRad(0), degToRad(360), false);
      ctx.fill();
    }
 
    requestAnimationFrame(draw);
  }

  function saveImageToDB(){
    // e.preventDefault()

    canvas.toBlob(function(blob){
      let url = URL.createObjectURL(blob)
      console.log(url)
    }, 'image/jpeg', 0.95)

  }

