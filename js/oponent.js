class oponent{
    constructor(ctx, posX, posY,width,height){
        this.ctx = ctx
        this.oponentPos = {x: posX, y:posY}
        this.oponentSize = {w:width,h:height}
        }

draw(){
    this.ctx.strokeStyle = 'green'
     this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)   
}




}