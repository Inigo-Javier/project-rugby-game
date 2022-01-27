class oponent {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.oponentPos = { x: posX, y: posY }
        this.oponentSize = { w: width, h: height }


        this.image = new Image();
        this.image.src = "./images/lions.png";
        this.image.frames = 2;
        this.image.framesIndex = 1;
    }

    // draw(){
    //     this.ctx.fillStyle = 'green'
    //     this.ctx.fillRect(this.oponentPos.x, this.oponentPos.y, this.oponentSize.w, this.oponentSize.h) 
    //     this.fall()   
    // }
    fall() {
        this.oponentPos.y += 2
    }


    draw(framesCounter) {

        this.ctx.drawImage(this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.oponentPos.x,
            this.oponentPos.y,
            this.oponentSize.w,
            this.oponentSize.h)
        this.animate(framesCounter)
        this.fall()

    }
    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }




}