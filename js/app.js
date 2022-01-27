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
    framesIndex: 0,
    score: 0,
    level: 4,


    init() {
        // console.log('hola')
        this.setContext()
        this.setSize()
        this.Background = new Background(this.ctx, this.gameSize.w, this.gameSize.h, "./images/field.jpg")
        this.newPlayer()
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

    wardOfPlayers() {
        this.players.forEach(pla => {
            if (this.player.playerPos.x < pla.playerPos.x) {
                pla.moveRight()
            } else if (this.player.playerPos.x > pla.playerPos.x) {
                pla.moveLeft()
            }
        })
    },

    gameOver() {
        clearInterval(intervalID)
        this.oponents = []
        this.players = []
        this.framesIndex = 0

    },
    drawAll() {
        intervalID = setInterval(() => {
            this.framesIndex++

            this.framesIndex % 100 === 0 ? this.createOponents() : null
            this.clearAll()
            this.Background.draw()
            this.playerCentre.drawPlayer(this.framesIndex)
            this.playerLeft.drawPlayer(this.framesIndex)
            this.playerRight.drawPlayer(this.framesIndex)
            this.move();
            this.oponents.forEach(elm => {
                elm.draw(this.framesIndex)
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
    }
}