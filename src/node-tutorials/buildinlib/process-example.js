const process = global.process;

console.log(process.argv);
console.log(process.env);

//默认关闭输入，需要开启
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