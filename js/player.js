class  player{
    constructor(ctx, posX, posY, width, height){
        this.ctx = ctx
        this.playerPos = {x: posX, y: posY}
        this.playerSize = {w: width,h: height}
        this.imageInstance = undefined

    }


drawPlayer(){
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(this.playerPos.x,this.playerPos.y,this.playerSize.w,this.playerSize.h)
}
    moveLeft(){
    if (this.playerPos.x > 30) {
        this.playerPos.x -= 8
        // console.log(this.playerPos.x)
        
    }
     }
    moveRight() {
        if (this.playerPos.x < 420) {
            this.playerPos.x += 8
            // console.log(this.playerPos.x)
        }
    }
    moveUp() {

        this.playerPos.y -= 6

    }
    moveDown() {

        this.playerPos.y += 6

    }

}