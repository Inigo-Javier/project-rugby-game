class oponent {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.oponentPos = { x: posX, y: posY }
        this.oponentSize = { w: width, h: height }


        this.image1 = new Image();
        this.image1.src = "./images/lions.png";
        this.image1.frames = 2;
        this.image1.framesIndex = 1;

        this.image2 = new Image();
        this.image2.src = "./images/france.png";
        this.image2.frames = 2;
        this.image2.framesIndex = 1;

        this.image3 = new Image();
        this.image3.src = "./images/wallabies.png";
        this.image3.frames = 2;
        this.image3.framesIndex = 1;

        this.image4 = new Image();
        this.image4.src = "./images/bears.png";
        this.image4.frames = 2;
        this.image4.framesIndex = 1;


        this.image = this.image1
    }

    // draw(){
    //     this.ctx.fillStyle = 'green'
    //     this.ctx.fillRect(this.oponentPos.x, this.oponentPos.y, this.oponentSize.w, this.oponentSize.h) 
    //     this.fall()   
    // }
    fall(player) {
        this.oponentPos.y += 1.25
        if (this.oponentPos.y > player.playerPos.y - 100) {
            console.log('eii')
            if (player.playerPos.x > this.oponentPos.x) {
                this.oponentPos.x += .5
            }
            if (player.playerPos.x < this.oponentPos.x) {
                this.oponentPos.x -= .5
            }
        }

    }


    draw(framesCounter, player,level) {
        this.changeImg(level)
        console.log(this.ctx.level)
        this.ctx.drawImage(this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.oponentPos.x,
            this.oponentPos.y,
            this.oponentSize.w + 4,
            this.oponentSize.h + 4)
        this.animate(framesCounter)
        this.fall(player)

    }
    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }
    changeImg(level){
         if(level === 5){
             this.image=this.image2
         }
        if (level === 6) {
            this.image = this.image3
        }
        if (level === 7) {
            this.image = this.image4
        }
    }






}