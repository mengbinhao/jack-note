/**
 * 1 implement catch / all / race / resolve / reject
 * 2 处理promise穿透
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
    onFillfilled = typeof onFillfilled === 'function' ? onFillfilled : function (val) {
        return val;
    }
    onRejected = typeof onRejected === 'function' ? onRejected : function (reason) {
        throw reason;
    }

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

MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

MyPromise.all = function (promises) {
    return new MyPromise(function (resolve, reject) {
        let result = [];
        let count = 0; //计数器，用来记录promise有没有执行完
        let len = promises.length
        for (let i = 0; i < len; i++) {
            promises[i].then(function (data) {
                result[i] = data;
                if (++count == len) {
                    resolve(result); //计数器满足条件时，触发resolve
                }
            }, function (err) {
                reject(err);
            });
        }
    });
}

// 只要有一个promise成功了 就算成功。如果第一个失败了就失败了
MyPromise.race = function (promises) {
    return new MyPromise(function (resolve, reject) {
        for (var i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        }
    })
}

// 生成一个成功的promise
MyPromise.resolve = function (value) {
    return new MyPromise(function (resolve, reject) {
        resolve(value);
    })
}
// 生成一个失败的promise
MyPromise.reject = function (reason) {
    return new MyPromise(function (resolve, reject) {
        reject(reason);
    })
}


console.log('1');
let myPromise = new MyPromise((resolve, reject) => {
    resolve('jack');
    console.log('2');
}).then(function (val) {
    console.log(val);
}).then(function (val) {
    console.log(val);
}).catch(function (err) {
    console.log(err);
})
console.log('4');