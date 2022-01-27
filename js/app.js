const rugbyApp = {
    appName: 'rugby',
    author: 'Jorge Garzon and Iñigo Malluguiza',
    gameSize: { w: undefined, h: undefined },
    Background: undefined,
    ctx: undefined,
    player: undefined,
    playerLeft: undefined,
    playerRight: undefined,
    playerCentre: undefined,
    players: [],
    oponent: undefined,
    oponents: [],
    ball:undefined,
    framesIndex: 0,
    score: 0,
    level: 4,
    gameOverImg:undefined,
    audio:undefined,
    image1: undefined,
    image2: undefined,
    image3: undefined,

    


    init() {
        // console.log('hola')
        this.setContext()
        this.setSize()
        this.setImages()
        this.Background = new Background(this.ctx, this.gameSize.w, this.gameSize.h, "./images/field.jpg")
        this.audio = new Audio("./audio/supporters.wav")
        this.initImageOver()
        this.newPlayer()
        this.newBall()
        this.createOponents()
        this.setEventHandlers()
        this.drawAll()

    },

    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
        // console.log(this.ctx)
    },
    setSize() {
        this.gameSize = {
            w: canvas.width,
            h: canvas.height

        }
        // console.log(this.gameSize)
    },
    newPlayer() {
        this.playerCentre = new player(this.ctx, this.gameSize.w / 2, this.gameSize.h - 100, 25, 25)
        this.playerRight = new player(this.ctx, 400, this.gameSize.h - 100, 25, 25)
        this.playerLeft = new player(this.ctx, 100, this.gameSize.h - 100, 25, 25)
        this.players.push(this.playerLeft, this.playerCentre, this.playerRight)
        console.log(this.players)
        this.player = this.playerCentre
    },
    newOponent() {
        this.oponent = new oponent(this.ctx, this.gameSize.w / 2, this.gameSize.h - 300, 50, 50)
    },
    createOponents() {
        let rowOponents = []
        for (let i = 0; i < this.level; i++) {
            let randomStart = Math.floor(Math.random() * 440)
            while (rowOponents.some(oponent => {
                return randomStart + oponent.oponentSize.w > oponent.oponentPos.x && randomStart < oponent.oponentPos.x + oponent.oponentSize.w;
            })) {
                randomStart = Math.floor(Math.random() * 440)
            }
            let opo = new oponent(this.ctx, randomStart, 30, 25, 25)
            rowOponents.push(opo)
        }
        this.oponents.push(...rowOponents)
    },
    newBall(){
        this.ball = new ball(this.ctx, this.gameSize.w / 2, this.gameSize.h - 90, 10, 10)
    },
    // createOponents() {
    //     // console.log('me llamaron wei')
    //     for (let i = 0; i < this.level; i++) {
    //         // console.log('soy el bucle')
    //         let randomStart = Math.floor(Math.random() * 440)
    //         // console.log(randomStart)
    //         let opo = new oponent(this.ctx, randomStart, 30, 25, 25)
    //         this.oponents.push(opo)

    //     }
    // },
    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event

            key === ' ' && (this.spacePush = true)
            key === 'ArrowLeft' && (this.leftPush = true)
            key === 'ArrowRight' && (this.rightPush = true)
            key === 'ArrowUp' && (this.upPush = true)
            key === 'ArrowDown' && (this.downPush = true)
            key === 'w' && (this.wPush = true)
            key === 'e' && (this.ePush = true)
        })
        document.addEventListener('keyup', event => {

            const { key } = event
            key === ' ' && (this.spacePush = false)
            key === 'ArrowLeft' && (this.leftPush = false)
            key === 'ArrowRight' && (this.rightPush = false)
            key === 'ArrowUp' && (this.upPush = false)
            key === 'ArrowDown' && (this.downPush = false)
            key === 'w' && (this.wPush = false)
            key === 'e' && (this.ePush = false)
        })
    },
    move() {

        if (!this.spacePush) {
            if (!this.horizontalCheckRight()) {
                this.rightPush && (this.player.moveRight())
            }
            if (!this.horizontalCheckLeft()) {
                this.leftPush && (this.player.moveLeft())
            }


            this.wPush && (this.wardOfPlayers())


            this.ePush && (this.closerPlayers())
            this.upPush && (this.moveAllUp())
            this.downPush && (this.moveAllDown())

        } else {
            this.rightPush && (this.player = this.playerRight)
            this.leftPush && (this.player = this.playerLeft)
            this.upPush && (this.player = this.playerCentre)
        }

    },
    moveAllUp() {
        this.playerLeft.moveUp()
        this.playerRight.moveUp()
        this.playerCentre.moveUp()
    },
    moveAllDown() {
        this.playerLeft.moveDown()
        this.playerRight.moveDown()
        this.playerCentre.moveDown()
    },
    checkColision() {

        this.oponents.forEach(opo => {
            if (this.player.playerPos.x < opo.oponentPos.x + opo.oponentSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > opo.oponentPos.x &&
                this.player.playerPos.y < opo.oponentPos.y + opo.oponentSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > opo.oponentPos.y) {

                
                this.gameOver()
                
                

            }
        })


    },
    horizontalCheckLeft() {
        let colision = false
        let leftPlayer = undefined
        this.players.forEach((pla, i) => {
            if (Object.is(this.player, pla))
                leftPlayer = this.players[i - 1]
            // console.log('ljlkjlñ', leftPlayer)
            if (leftPlayer && this.player.playerPos.x < leftPlayer.playerPos.x + leftPlayer.playerSize.w /* && (!Object.is(this.player, pla)) */) {
                // console.log('colision')
                colision = true
            }
        })
        return colision
    },
    horizontalCheckRight() {
        let colision = false
        let rightPlayer = undefined
        this.players.forEach((pla, i) => {
            if (Object.is(this.player, pla))
                rightPlayer = this.players[i + 1]
            // console.log('ljlkjlñ', leftPlayer)
            if (rightPlayer && this.player.playerPos.x + this.player.playerSize.w > rightPlayer.playerPos.x /* && (!Object.is(this.player, pla)) */) {
                // console.log('colision')
                colision = true
            }
        })
        return colision
    },
    closerPlayers() {
        this.players.forEach(pla => {

            if ((this.player.playerPos.x > pla.playerPos.x) && !this.horizontalCheckLeft()) {
                pla.moveRight()
            } else if ((this.player.playerPos.x < pla.playerPos.x) && !this.horizontalCheckRight()) {
                pla.moveLeft()
            }

        })
    },
    pass(){
        if ((this.player.playerPos.x > (this.ball.ballPos.x))) {
            this.ball.moveRight()
        } 
         if ((this.player.playerPos.x  < this.ball.ballPos.x )) {
            this.ball.moveLeft()
        } 
        // if (this.player.playerPos.x < this.ball.ballPos.x)
        this.ball.ballPos.y = this.player.playerPos.y+10
    },

    wardOfPlayers() {
        this.players.forEach(pla => {
            if (this.player.playerPos.x < pla.playerPos.x) {
                pla.moveRight()
            } else if (this.player.playerPos.x > pla.playerPos.x) {
                pla.moveLeft()
            }
        })
    },
    drawScore(){
        let score =Math.floor(this.framesIndex /10)
        this.ctx.fillStyle = 'black'
        this.ctx.font = '50px Arial'
        this.ctx.fillText(`${score} metres`,this.gameSize.w-100,50,90)
    },

    // gameOver() {
        
    //     clearInterval(intervalID)
    //     this.ctx.fillRect( this.gameSize.w - 100, 50, 90,100)
    //     this.oponents = []
    //     this.players = []
    //     this.framesIndex = 0

    // },
    initImageOver(){
        this.gameOverImg = new Image()
        this.gameOverImg.src = '../images/gameOver.jpg'
    },
    gameOver() {
        clearInterval(intervalID)
       
        this.ctx.drawImage(this.gameOverImg, 0, this.gameSize.h / 4, this.gameSize.w, 300)
        this.oponents = []
        this.players = []
        this.framesIndex = 0
    },
    drawAll() {
        intervalID = setInterval(() => {
            this.framesIndex++
            this.audio.play()
            this.framesIndex % 100 === 0 ? this.createOponents() : null
            this.clearAll()
            this.Background.draw()
            this.playerCentre.drawPlayer(this.framesIndex,this.image1)
            this.playerLeft.drawPlayer(this.framesIndex,this.image2)
            this.playerRight.drawPlayer(this.framesIndex,this.image3)
            this.pass()
            this.ball.draw()
            this.drawScore()
            this.move();
            this.pass()
            this.oponents.forEach(elm => {
                elm.draw(this.framesIndex,this.player)
            })
            this.checkColision()
            this.horizontalCheckLeft()
            this.horizontalCheckRight()

        }, 20)
    },
    clearAll() {

        console.log(this.Background)
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.clearOponents()
    },
    clearOponents() {
        this.oponents = this.oponents.filter(elm => elm.oponentPos.y <= this.gameSize.h - elm.oponentSize.h)
    },
    setImages(){
        this.image1 = new Image();
        this.image1.src = "./images/allBlacks.png";
        this.image1.frames = 2;
        this.image1.framesIndex = 1;

        this.image2 = new Image();
        this.image2.src = "./images/allBlacks11.png";
        this.image2.frames = 2;
        this.image2.framesIndex = 1;

        this.image3 = new Image();
        this.image3.src = "./images/allBlacks15.png";
        this.image3.frames = 2;
        this.image3.framesIndex = 1;

    }
}