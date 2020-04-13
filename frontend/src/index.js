const canvas = document.querySelector('.myCanvas')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

document.addEventListener('DOMContentLoaded', function(){
    setCanvas();
    console.log('ran')
});

function setCanvas(){
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, width, height)
    console.log('running')
}