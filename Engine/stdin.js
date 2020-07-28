var EventEmitter = require('events');
var keypress = require('keypress');

class stdin extends EventEmitter {
    constructor(stdin) {
        super()
        this.stdin = stdin
        keypress(this.stdin);

        this.stdin.on('keypress', (ch, key) => {
            if (key && key.ctrl && key.name == 'c') {
                this.stdin.pause();
                return;
            }
            this.emit('keypress', ch, key)
        });

        this.stdin.setRawMode(true);
        this.stdin.resume();
    }
}

module.exports = stdin;