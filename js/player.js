class  player{
    constructor(ctx, posX, posY, width, height){
        this.ctx = ctx
        this.playerPos = {x: posX, y: posY}
        this.playerSize = {w: width,h: height}


        
        




        // this.image = new Image();
        // this.image.src = "./images/allBlacks.png";
        // this.image.frames = 2;
        // this.image.framesIndex = 1;

    }
    drawPlayer(framesCounter,image) {

        this.ctx.drawImage(image,
         image.framesIndex * (image.width /image.frames),
        0,        
        image.width /image.frames,
        image.height,
        this.playerPos.x,
        this.playerPos.y,
        this.playerSize.w+6,
        this.playerSize.h+6)
        this.animate(framesCounter,image)

    }
    animate(framesCounter,image) {
        if (framesCounter % 5 == 0) {
            image.framesIndex++;
        }
        if (image.framesIndex >= image.frames) {
            image.framesIndex = 0;
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
        if (this.playerPos.y > 200) {
        this.playerPos.y -= 6
        }
    }
    moveDown() {
        if (this.playerPos.y < 400) {

        this.playerPos.y += 6
        }
    }

}