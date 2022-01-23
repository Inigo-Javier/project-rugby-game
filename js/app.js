const rugbyApp = {
    appName: 'rugby',
    author: 'Jorge Garzon and Iñigo Malluguiza',
    gameSize: { w: undefined, h: undefined },
    ctx: undefined,
    player: undefined,
    players:[],
    oponent: undefined,
    oponents: [],
    framesIndex: 0,
    score: 0,
    level:4,


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
    },
    newOponent(){
        this.oponent = new oponent(this.ctx, this.gameSize.w / 2, this.gameSize.h - 300, 50, 50 )
    },
    createOponents(){
        console.log('me llamaron wei')
        for(let i=0;i<this.level;i++){
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
            key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.moveUp() : null
            key === 'ArrowDown' ? this.player.moveDown() : null
        })
    },
    drawAll() {
        intervalID = setInterval(() => {
            this.framesIndex ++

            this.framesIndex % 60 === 0 ? this.createOponents() : null
            this.clearAll()
            this.player.drawPlayer()
            
            this.oponents.forEach(elm => {
                elm.draw()
            })

        }, 20)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    }
}