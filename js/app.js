const rugbyApp = {
    appName: 'rugby',
    author: 'Jorge Garzon and Iñigo Malluguiza',
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    player: undefined,
    playerLeft: undefined,
    playerRight: undefined,
    playerCentre: undefined,
    players: [],
    oponent: undefined,
    oponents: [],
    framesIndex: 0,
    score: 0,
    level: 4,


    init() {
        console.log('hola')
        this.setContext()
        this.setSize()
        this.newPlayer()
        this.createOponents()
        this.setEventHandlers()
        this.drawAll()
    },

    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
        console.log(this.ctx)
    },
    setSize() {
        this.gameSize = {
            w: canvas.width,
            h: canvas.height

        }
        console.log(this.gameSize)
    },
    newPlayer() {
        this.player = new player(this.ctx, this.gameSize.w / 2, this.gameSize.h - 100, 50, 50)
        this.playerRight = new player(this.ctx, 400, this.gameSize.h - 100, 50, 50)
        this.playerLeft = new player(this.ctx, 100, this.gameSize.h - 100, 50, 50)
        this.playerCentre = this.player
    },
    newOponent() {
        this.oponent = new oponent(this.ctx, this.gameSize.w / 2, this.gameSize.h - 300, 50, 50)
    },
    createOponents() {
        console.log('me llamaron wei')
        for (let i = 0; i < this.level; i++) {
            console.log('soy el bucle')
            let randomStart = Math.floor(Math.random() * 440)
            console.log(randomStart)
            let opo = new oponent(this.ctx, randomStart, 30, 50, 50)
            this.oponents.push(opo)

        }
    },
    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event

            key === ' ' && (this.spacePush = true)
            key === 'ArrowLeft' && (this.leftPush = true)
            key === 'ArrowRight' && (this.rightPush = true)
            key === 'ArrowUp' && (this.upPush = true)
            key === 'ArrowDown' && (this.downPush = true)
        })
        document.addEventListener('keyup', event => {

            const { key } = event
            key === ' ' && (this.spacePush = false)
            key === 'ArrowLeft' && (this.leftPush = false)
            key === 'ArrowRight' && (this.rightPush = false)
            key === 'ArrowUp' && (this.upPush = false)
            key === 'ArrowDown' && (this.downPush = false)
        })
    },
    move() {

        if (!this.spacePush) {
            this.rightPush && (this.player.moveRight())
            this.leftPush && (this.player.moveLeft())
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
                console.log('colision')
                this.gameOver()
            }
        })


    },
    gameOver() {
        clearInterval(intervalID)
        this.oponents = []
        this.framesIndex = 0

    },
    drawAll() {
        intervalID = setInterval(() => {
            this.framesIndex++

            this.framesIndex % 60 === 0 ? this.createOponents() : null
            this.clearAll()
            this.playerCentre.drawPlayer()
            this.playerLeft.drawPlayer()
            this.playerRight.drawPlayer()
            this.move();
            this.oponents.forEach(elm => {
                elm.draw()
            })
            this.checkColision()

        }, 20)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    }
}