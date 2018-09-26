/**
 * 1 chain invoke (返回一个新的promise)
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
        })
    };

    function reject(reason) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'rejeced';
                self.reason = reason;
                self.onRejectedCallbacks.forEach(fn => fn(reason));
            }
        })
    };

    try {
        excutor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

// add callback to onResolvedCallbacks / onRejectedCallbacks
// chain invoke
MyPromise.prototype.then = function (onFillfilled, onRejected) {
    let promise2;
    let self = this;
    if (self.status === 'resolved') {
        promise2 = new MyPromise(function (resolve, reject) {
            try {
                //maybe a promise or a normal value
                let x = onFillfilled(self.value);
                //x也可能是别人写的promise,统一处理
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        });
    }

    if (self.status === 'rejected') {
        promise2 = new MyPromise(function (resolve, reject) {
            try {
                let x = onRejected(self.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        });
    }

    if (self.status === 'pending') {
        promise2 = new MyPromise(function (resolve, reject) {
            self.onResolvedCallbacks.push(function (value) {
                try {
                    let x = onFillfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push(function (reason) {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            })
        });
    }

    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }

    let called; //调用成功or失败

    if (x != null && (typeof x == 'object' || typeof x == 'function')) {
        try {
            let then = x.then;
            if (typeof then == 'function') {
                then.call(x, function (y) {
                    //防止多次调用
                    if (called) return;
                    called = true;
                    //y可能还是promise继续递归解析直到返回普通值
                    resolvePromise(promise2, y, resolve, reject);
                }, function (e) {
                    if (called) return;
                    called = true;
                    reject(e);
                })
            } else {
                // 处理then不是函数的情况，如{then: 1}，就直接返回成功
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // 返回一个普通值
        resolve(x);
    }
}

console.log('1');
let myPromise = new MyPromise((resolve, reject) => {
    resolve('jack');
    console.log('2');
}).then(function (val) {
    console.log(val);
}).then(function (val) {
    console.log(val);
})
console.log('4');