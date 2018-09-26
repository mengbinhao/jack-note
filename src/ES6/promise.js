//传递异步操作的信息
//Promise只能使用异步调用方式
//1 状态不受外界影响(Pending Fulfilled Rejected)
//2 一旦状态改变就不会再变 任何时候都可以得到
//3 Pending -> Fulfilled   Pending -> Rejecteds
//4 解决了回调地狱  没解决回调
// Promise.prototype.then()
// Promise.prototype.catch()
// Promise.all()
// Promise.race()
// Promise.resolve()
// Promise.reject()


//example  original writing
function f1(fn) {
    setTimeout(function() {
        console.log("f1");
        fn();
    }, 1000)
}

function f2() {
    console.log("f2");
}

// f1(function() {
//     f2();
// });


//promise
var boilWater = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("boilWater");
            console.log("boilWater");
        }, 5000);
    });
}

var washGlass = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("washGlass");
            console.log("washGlass");
        }, 1000);
    });
}

var prepareTea = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("prepareTea");
            console.log("prepareTea");
        }, 2000);
    });
}

//not async invoke
// boilWater().then(function() {
//     return washGlass();
// }).then(function() {
//     return prepareTea();
// }).then(function() {
//     console.log("over");
// })

//async invoke
// Promise.all([boilWater(), washGlass(), prepareTea()]).then(() => {
//     console.log("async Promise over");
// });


// function timeout(ms) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(resolve, ms, "done");
// 	});
// }

// timeout(100).then((value) => {
// 	console.log(value);
// });


// var promise = new Promise((resolve, reject) => {
// 	resolve("OK");
// 	setTimeout(function() {throw new Error('test')}, 0);
// });

// promise.then(function(value) {console.log(value)});