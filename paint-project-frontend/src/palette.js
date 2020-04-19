class Palette {
    constructor(colors, location){
        
        this.colors = colors
        this.location = location
        this.currentColor = '#FFFFFF'

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
        let div = document.querySelector('#currentColor')
        this.currentColor = e.target.style.backgroundColor
        div.style.backgroundColor = this.currentColor
    }


}