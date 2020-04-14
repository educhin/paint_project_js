class Palette {
    constructor(colors, location){
        
        this.colors = colors
        this.location = location
        this.currentColor = 'white'

    }
    

    setUpPalette(){
        for(var col in this.colors) {
            let btn = document.createElement('button')
            btn.classList.add('colorSelectBtn')   
            btn.style.backgroundColor = this.colors[col]
            const that = this
            btn.addEventListener('click', function(e){
                that.selectColor(e).bind(that)
            })
            
            this.location.appendChild(btn)
          }
    }

    selectColor(e){
        this.currentColor = e.target.style.backgroundColor
        console.log(String(this.currentColor))
    }


}