const process = global.process;

console.log(process.argv);

// process.stdin.resume();

// process.stdin.on('data', (data) => {
//     process.stdout.write('what you type is ' + data.toString())
// })

function doSomething(callback) {
    somethingComplicated();
    //callback();
    process.nextTick(callback);
}

doSomething(function onEnd() {
    compute();
})

function somethingComplicated() {
    setTimeout(function () {
        console.log('somethingComplicated');
    }, 3000)
}

function compute() {
    setTimeout(function () {
        console.log('compute');
    }, 2000)
}