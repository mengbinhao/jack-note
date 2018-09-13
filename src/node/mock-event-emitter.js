const EventEmitter = require('events').EventEmitter;

const event = new EventEmitter();

event.on('myEvent', () => {
    console.log('myEvent occured');
});

setTimeout( () => {
    event.emit("myEvent");
}, 3000);