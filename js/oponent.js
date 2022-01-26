class oponent{
    constructor(ctx, posX, posY,width,height){
        this.ctx = ctx
        this.oponentPos = {x: posX, y:posY}
        this.oponentSize = {w:width,h:height}
        }

draw(){
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.oponentPos.x, this.oponentPos.y, this.oponentSize.w, this.oponentSize.h) 
    this.fall()   
}
    fall() {
        this.oponentPos.y += 2
    }





}