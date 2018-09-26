/**
 * 1 solve resolve / reject async
 * 2 status only be changed once
 */
function MyPromise(excutor) {

    let self = this;
    this.value = undefined;
    this.resson = undefined;
    this.status = 'pending';
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    function resolve(value) {
        //second param default is zero
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.value = value;
                self.onResolvedCallbacks.forEach(fn => fn(value));
            }
        }, 1000)
    };

    function reject(reason) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'rejeced';
                self.reason = reason;
                self.onRejectedCallbacks.forEach(fn => fn(reason));
            }
        }, 1000)
    };

    try {
        excutor(resolve, reject);
    } catch (err) {
        reject(err);
    }
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
})
myPromise.then(function () {
    console.log('3');
})
myPromise.then(function () {
    console.log('5');
})
console.log('4');