class ball {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.ballPos = { x: posX, y: posY }
        this.ballSize = { w: width, h: height }


        this.image = new Image();
        this.image.src = "./images/ball.png";
        this.velX = 3;
    }
    // draw() {
    //     this.ctx.fillStyle = 'red'
    //     this.ctx.fillRect(this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    // }
    draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.drawImage(this.image,this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    }

    moveLeft() {
        if (this.ballPos.x > 30) {
            this.ballPos.x -= 15
            // console.log(this.playerPos.x)

        }
    }
    moveRight() {
        if (this.ballPos.x < 420) {
            this.ballPos.x += 15
            // console.log(this.playerPos.x)
        }
    }
   
}