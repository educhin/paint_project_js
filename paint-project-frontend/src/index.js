//Fetch URLs
const BASE_URL = "https://paint-project-js-api.herokuapp.com/";
const PALETTES_URL = `${BASE_URL}/palettes`;
const MASTERPIECE_URL = `${BASE_URL}/masterpieces`;

// Set up canvas initially 
const canvas = document.querySelector('.myCanvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight-60;
const ctx = canvas.getContext('2d');

// Set up objects to act on canvas
const paletteDiv = document.querySelector('#colorPalette');
const toolBar = document.querySelector('#toolbar');

let colorPalette;

let penSize;
let penSizeSlider = document.querySelector('#penSize')
let penSizeText = document.getElementById('penSizeText')

penSize = penSizeText.innerHTML = penSizeSlider.value;

penSizeSlider.addEventListener('change', function(e){
  penSize = penSizeText.innerHTML = e.srcElement.value
})

// Store mouse pointer coordinates, and whether the button is pressed
let curX;
let curY;
let pressed = false;

let sortButton = document.getElementById('sort')

document.addEventListener('DOMContentLoaded', function(){
    setCanvas();
    draw();
    setUpSave();
    fetchMasterpieces();
    fetchPalette(0);
});
// sortButton.addEventListener('click', sortHandler)

// function sortHandler(){
  
//   console.log('Clicked!')
//   // button.innerHTML('Sort')
//   // button

//   // toolBar.appendChild(button)

//   let obj = {
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     } 
//   }

//   fetch(MASTERPIECE_URL, obj)
//   .then(response => response.json())
//   .then(obj => sortMasterpieces(obj))
//   .then(arr => displaySortedMasterpieces(arr))
//   .catch(error => console.log(error))


// }

function sortMasterpieces(arr){
  arr.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return arr
}

// function displaySortedMasterpieces(arr){
//   let sortedUl = document.getElementById('sortUl')
//   if(!sortedUl){
//     let ul = document.createElement('ul')
//     ul.setAttribute('id', 'sortUl')
//     buildLi(arr, ul)
//   } 
  
//   // else { 
//   //   document.removeChild(sortedUl)
//   //   buildLi(arr)
//   // }
// }

// function buildLi(arr, ul) {
//   for (let i = 0; i < arr.length; i++) {
//     let li = document.createElement('li')
//     li.innerHTML = `${arr[i].name} -- by: ${arr[i].artist.name}`
//     ul.appendChild(li)
//   }
//   document.body.appendChild(ul)
// }

// Set up canvas size and background color
function setCanvas(){
    ctx.fillStyle = '000000'
    ctx.fillRect(0, 0, width, height)
}

//Fetch and build color palette 
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
  .then(colors => setPaletteObject(colors, paletteDiv))
  .then(palette => palette.setUpPalette())
  .catch(error => console.log(error.message))
}


function setPaletteObject(colors, location){
  colorPalette = new Palette(colors, location)
  return colorPalette
}

 // Update mouse pointer coordinates
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
    ctx.arc(curX, curY-60, penSize, degToRad(0), degToRad(360), false);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

/**************************

Set Up Save Functionality

***************************/

//Build Save Form
function setUpSave(){
  let saveForm = document.createElement('form')
  saveForm.classList.add('form')
  saveForm.id = 'saveForm'

  let title = document.createElement("INPUT");
  title.setAttribute("type", "text");
  title.setAttribute("required", true)
  title.setAttribute("minlength", 3)
  title.setAttribute("maxlength", 10)
  title.placeholder = 'Title'
  saveForm.appendChild(title)

  let name = document.createElement("INPUT");
  name.setAttribute("type", "text");
  name.setAttribute("required", true)
  name.setAttribute("minlength", 3)
  name.setAttribute("maxlength", 10)
  name.placeholder = 'Artist'
  saveForm.appendChild(name)

  let submit = document.createElement("INPUT");
  submit.setAttribute("type", "submit");
  submit.value = 'Save'
  saveForm.appendChild(submit)
  saveForm.addEventListener('submit', saveImageToDB)

  toolBar.appendChild(saveForm)
}


/****************************************

Function to SAVE a Masterpiece to the DB

****************************************/

function saveImageToDB(event){
  event.preventDefault()
  console.log(event)

  var dataURL = canvas.toDataURL();

  let masterpieceName = event.srcElement[0].value;
  let artistName = event.srcElement[1].value;
  
  if (masterpieceName && artistName){
    obj = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          artist_name: artistName,
          masterpiece_name: masterpieceName,
          masterpiece: dataURL
      })
  }

  fetch(MASTERPIECE_URL, obj)
  .then(response => response.json())
  // .then(obj => appendReturnedImage(obj))
  .then(obj => console.log(obj))
  .catch(error => console.log(error))
  }
}

/**************************

Set Up Load Functionality

***************************/

//Fetch masterpieces
function fetchMasterpieces(){
  obj = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch(MASTERPIECE_URL, obj)
  .then(response => response.json())
  .then(obj => setUpLoad(obj))
  .catch(error => console.log(error))
}

// Build Load Form
function setUpLoad(array){
  let arr = sortMasterpieces(array)
  let loadForm = document.createElement('form')
  loadForm.classList.add('form')
  loadForm.id = 'loadForm'

  let selecter = document.createElement("SELECT");
  for (let i = 0; i < arr.length; i++){
    let option = document.createElement("option")
    option.text = `${arr[i].name} -- by: ${arr[i].artist.name}`
    option.value = arr[i].id
    selecter.add(option)
  }
  loadForm.appendChild(selecter)
  
  let submit = document.createElement("INPUT");
  submit.setAttribute("type", "submit");
  submit.value = 'Load'
  
  loadForm.appendChild(submit)
  loadForm.addEventListener('submit', returnImageFromDB)
  toolBar.appendChild(loadForm)
}



/****************************************

Function to LOAD a Masterpiece from the DB

****************************************/
function returnImageFromDB(event){
  event.preventDefault()

  let number = event.srcElement[0].value
  url = MASTERPIECE_URL + `/${number}`
  obj = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  }

  fetch(url, obj)
  .then(response => response.json())
  .then(obj => appendReturnedImage(obj))
  .catch(error => console.log(error))
}

// Display image on top of canvas (Used in Load function)
function appendReturnedImage(object){
  let newImage = new Image(width, height)

  newImage.src = object.url

  ctx.drawImage(newImage, 0, 0)

  // window.alert('you successfully saved your masterpiece!')
}

