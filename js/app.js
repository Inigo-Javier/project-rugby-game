const rugbyApp = {
    appName: 'rugby',
    author: 'Jorge Garzon and Iñigo Malluguiza',
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    player: undefined,
    oponent: undefined,
    oponents: [],
    framesIndex: 0,
    score: 0,


    init() {
        console.log('hola')
        this.setContext()
        this.setSize()
        this.newPlayer()
        this.player.drawPlayer()
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
    },
    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.moveUp() : null
            key === 'ArrowDown' ? this.player.moveDown() : null
        })
    },
    drawAll() {
        intervalID = setInterval(() => {
            this.clearAll()
            this.player.drawPlayer()

        }, 20)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    }
}