const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();

emitter.on('tatgetEvent', (arg1, arg2) => {
    console.log('listener1', arg1, arg2);
})

emitter.on('tatgetEvent', (arg1, arg2) => {
    console.log('listener2', arg1, arg2);
})

emitter.emit('tatgetEvent', 'jack', 1983);

//emitter.emit("error");