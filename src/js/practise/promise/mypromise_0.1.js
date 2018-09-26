/**
 * promise 基本框架
 */
function MyPromise(excutor) {

    let self = this;
    this.value = undefined;
    this.resson = undefined;
    this.status = 'pending';
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    function resolve(value) {
        self.status = 'resolved';
        self.value = value;
        self.onResolvedCallbacks.forEach(fn => fn(value));
    };

    function reject(reason) {
        self.status = 'rejeced';
        self.reason = reason;
        self.onRejectedCallbacks.forEach(fn => fn(reason));
    };

    excutor(resolve, reject);
}

//add callback to onResolvedCallbacks / onRejectedCallbacks
MyPromise.prototype.then = function (onFillfilled, onRejected) {
    this.onResolvedCallbacks.push(onFillfilled);
    this.onRejectedCallbacks.push(onRejected);
}

console.log('1');
let myPromise = new MyPromise((resolve, reject) => {
    resolve();
    console.log('2');
}).then(function () {
    console.log('3');
})
console.log('4');