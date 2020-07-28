let updatesPerMS = 30; // Default
let groundLayers = [`Loading GUI...`, ``, ``, ``, `----------------------------------------------`,
        `//////////////////////////////////////////////`,
        `//////////////////////////////////////////////`
    ],
    stickmanH = `<.<`,
    stickmanHn = `/|\\`,
    stickmanT = ` |`,
    stickmanL = `/ \\`;

let stickManX = 0,
    stickManY = 4;

let isStickmanJumping = false;
let lastKey = null;

var btoa = require('btoa');

// Frame updating

function updateFrame() {
    setInterval(() => {
        console.clear()
        groundLayers[0] = `Jumping: ` + isStickmanJumping
        for (var i = 0; i < groundLayers.length; i++) {
            if (i == stickManY) {
                let coords = ' '.repeat(stickManX)
                console.log(`${coords + stickmanH}\n${coords + stickmanHn}\n${coords + stickmanT}\n${coords + stickmanL}\n${groundLayers[i]}`)
            } else console.log(`${groundLayers[i]}`)
        }
    }, updatesPerMS)
}

// Controls

var stdin = require('./Engine/stdin');
var Controller = new stdin(process.stdin);

Controller.on('keypress', (chunk, key) => {
    if (key.name == 'escape') {
        console.clear()
        console.log("  ________                __           ____                    __            _             __\r\n /_  __/ /_  ____ _____  / /_______   / __/___  _____   ____  / /___ ___  __(_)___  ____ _/ /\r\n  / / / __ \\/ __ `/ __ \\/ //_/ ___/  / /_/ __ \\/ ___/  / __ \\/ / __ `/ / / / / __ \\/ __ `/ / \r\n / / / / / / /_/ / / / / ,< (__  )  / __/ /_/ / /     / /_/ / / /_/ / /_/ / / / / / /_/ /_/  \r\n/_/ /_/ /_/\\__,_/_/ /_/_/|_/____/  /_/  \\____/_/     / .___/_/\\__,_/\\__, /_/_/ /_/\\__, (_)   \r\n                                                    /_/            /____/        /____/  ")
        return process.exit()
    }
    if (key.name == 'm') {
        updatesPerMS -= 1
        if (key.shift) {
            updatesPerMS -= 9
        }
    }
    if (key.name == 'n') {
        updatesPerMS += 1
        if (key.shift) {
            updatesPerMS += 9
        }
    }
    if (key.name == 'right' && stickManX <= 42) {
        stickmanH = '<.<'
        stickManX += 1
    }
    if (key.name == 'left' && !stickManX == 0) {
        stickmanH = '>.>'
        stickManX -= 1
    }
    if (key.name == 'up' && !isStickmanJumping && stickManX <= 40) {
        isStickmanJumping = true;
        stickManY -= 2
        if (lastKey == null) stickManX += 0
        else lastKey.name == 'right' ? stickManX += 3 : lastKey.name == 'left' ? stickManX -= 3 : 'oof i guess'
        setTimeout(() => {
            stickManY += 1
            setTimeout(() => {
                stickManY += 1
                isStickmanJumping = false
            }, 150)
        }, 150)
    }

    lastKey = key

})

// Start updating frames

updateFrame()

// Error handling

process.on('uncaughtException', (err) => {
    console.warn('A unexcepted error ocurred: \n\n'+err.stack+'\n\t' + btoa('key ' + lastKey.name + ', jumping ' + isStickmanJumping) + '\n\n')
    process.stdout.write('Would you like to restart the game? (Y/N) ')
    Controller.on('keypress', (c, k) => {
        if(k.name==='y') {
            console.clear()
            stickManX = 0
            stickManY = 4
            isStickmanJumping = false
            updateFrame()
        } else if(k.name==='n') {
            console.clear()
            console.log("  ________                __           ____                    __            _             __\r\n /_  __/ /_  ____ _____  / /_______   / __/___  _____   ____  / /___ ___  __(_)___  ____ _/ /\r\n  / / / __ \\/ __ `/ __ \\/ //_/ ___/  / /_/ __ \\/ ___/  / __ \\/ / __ `/ / / / / __ \\/ __ `/ / \r\n / / / / / / /_/ / / / / ,< (__  )  / __/ /_/ / /     / /_/ / / /_/ / /_/ / / / / / /_/ /_/  \r\n/_/ /_/ /_/\\__,_/_/ /_/_/|_/____/  /_/  \\____/_/     / .___/_/\\__,_/\\__, /_/_/ /_/\\__, (_)   \r\n                                                    /_/            /____/        /____/  ")
            return process.exit()
        }
    })
})