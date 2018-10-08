/**
 * promise 基本框架
 */
function Promise(excutor) {

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
Promise.prototype.then = function (onFillfilled, onRejected) {
    this.onResolvedCallbacks.push(onFillfilled);
    this.onRejectedCallbacks.push(onRejected);
}

var promise = new Promise(function(x,y){
    setTimeout(()=>{
        x(101)
    }, 3000)
})
promise.then((z)=>{
    console.log(z)  // 101
})

