Array.prototype.myJoin = function (separator) {
    let result = this[0] || ''
    for (let i = 1; i < this.length; i++) {
        result += separator + this[i]
    }
    return result
}

Array.prototype.mySlice = function (start, end) {
    start = start || 0;
    end = end || this.length;
    let result = [];
    for (let i = start; i < end; i++) {
        result.push(this[i])
    }
    return result
}

function test(a, b) {
    return a - b
}

var addOne = item => item + 1


Array.prototype.mySort = function (fn) {
    fn = fn || ((a, b) => a - b)
    let len = this.length - 1
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len + 1; j++) {
            if (fn.call(undefined, this[j], this[i]) < 0) {
                [this[j], this[i]] = [this[i], this[j]]
            }
        }
    }
    return this
}

Array.prototype.myForEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
        console.log('----' + i)
        if (i in this) { //jump empty position
            fn.call(undefined, this[i], i, this)
        }
    }
}

Array.prototype.myMap = function (fn) {
    let result = []
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            //result[i] = fn.call(undefined, this[i], i, this)
            result.push(fn.call(undefined, this[i], i, this))
        }
    }
    return result
}

var oldeeOne = item => item > 5

Array.prototype.myFilter = function (fn) {
    let result = []
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            if (fn.call(undefined, this[i], i, this)) {
                result.push(this[i])
            }
        }
    }
    return result
}

var add = (accumulator, cur) => accumulator + cur
Array.prototype.myReduce = function (fn, init) {
    let result = init
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result = fn.call(undefined, result, this[i], i, this)
        }
    }
    return result
}

//var test = [1,7,5,3,4,null,,undefined]
//var test2 = [1,2,3,4,,null,5]


function resizehandler(fn, delay) {
    let timer = null;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}
window.onresize = resizehandler(fn, 1000);


function resizehandler(fn, delay, duration) {
    let timer = null;
    let beginTime = +new Date();
    return function () {
        const context = this;
        const args = arguments;
        const currentTime = +new Date();
        timer && clearTimeout(timer);
        if ((currentTime - beginTime) >= duration) {
            fn.call(context, args);
            beginTime = currentTime;
        } else {
            timer = setTimeout(() => {
                fn.call(context, args)
            }, delay);
        }
    }
}

window.onresize = resizehandler(fn, 1000, 1000);


Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window是全局对象global的引用