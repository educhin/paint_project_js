//Fetch URLs
const BASE_URL = "http://localhost:3000";
const PALETTES_URL = `${BASE_URL}/palettes`;
const MASTERPIECE_URL = `${BASE_URL}/masterpieces`;

// Set up canvas initially 
const canvas = document.querySelector('.myCanvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight-60;
const ctx = canvas.getContext('2d');

const paletteDiv = document.querySelector('#colorPalette');
let colorPalette;
 // store mouse pointer coordinates, and whether the button is pressed
 let curX;
 let curY;
 let pressed = false;

document.addEventListener('DOMContentLoaded', function(){
    setCanvas();
    draw();
    fetchPalette(0)
});

function setCanvas(){
    ctx.fillStyle = '000000'
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
  // .then(obj => console.log(obj))
  .then(obj => obj[index].colors)
  .then(colors => setPaletteObject(colors, paletteDiv))
  .then(palette => palette.setUpPalette())
  .catch(error => console.log(error.message))
}


function setPaletteObject(colors, location){
  colorPalette = new Palette(colors, location)
  return colorPalette
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

 // Looping draw function to be called during initial set up. 
 function draw() {
    if(pressed) {
      ctx.fillStyle = colorPalette.currentColor

      ctx.beginPath();
      ctx.arc(curX, curY-60, 10, degToRad(0), degToRad(360), false);
      ctx.fill();
    }
 
    requestAnimationFrame(draw);
  }
  // Event to test saveImageToDB function
  document.addEventListener('keypress', returnImageFromDB);

  // function saveImageToDB(event){
  //   if (event.code === 'Space'){
  //     event.preventDefault()


  //     var dataURL = canvas.toDataURL();
  //     // console.log(dataURL);

  //     let newImage = new Image(width, height)

  //     newImage.src = dataURL

  //     // document.body.appendChild(newImage);

  //     let artistName = 'test';
  //     let masterpieceName = 'test'
  
  //     obj = {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //             artist_name: artistName,
  //             masterpiece_name: masterpieceName,
  //             masterpiece: dataURL
  //         })
  //     }

  //     // console.log(obj)
  
  //     fetch(MASTERPIECE_URL, obj)
  //     .then(response => response.json())
  //     .then(obj => appendReturnedImage(obj))
  //     // .then(obj => console.log(obj))
  //     .catch(error => console.log(error))
  //   } else {
  //     console.log('This key don\'t do shit')
  //   }
  // }

  function returnImageFromDB(event){
    if (event.code === 'Space'){
      event.preventDefault()
      url = MASTERPIECE_URL + '/3'
      obj = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }

      // console.log(obj)

      fetch(url, obj)
      .then(response => response.json())
      .then(obj => appendReturnedImage(obj))
      // .then(obj => console.log(obj))
      .catch(error => console.log(error))
    } else {
      console.log('This key don\'t do shit')
    }
  }

  function appendReturnedImage(object){
    let newImage = new Image(width, height)

    newImage.src = object.url

    ctx.drawImage(newImage, 0, 0)
  }

