class  player{
    constructor(ctx, posX, posY, width, height){
        this.ctx = ctx
        this.playerPos = {x: posX, y: posY}
        this.playerSize = {w: width,h: height}
        this.imageInstance = undefined



        this.image = new Image();
        this.image.src = "./images/allBlacks.png";
        this.image.frames = 2;
        this.image.framesIndex = 1;

    }
    drawPlayer(framesCounter) {

        this.ctx.drawImage(this.image,
         this.image.framesIndex * (this.image.width / this.image.frames),
        0,        
        this.image.width / this.image.frames,
        this.image.height,
        this.playerPos.x,
        this.playerPos.y,
        this.playerSize.w,
        this.playerSize.h)
        this.animate(framesCounter)

    }
    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }
       
  


// drawPlayer(){
//     this.ctx.fillStyle = 'black'
//     this.ctx.fillRect(this.playerPos.x,this.playerPos.y,this.playerSize.w,this.playerSize.h)

// }
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