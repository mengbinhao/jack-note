//Array
//Array
//Array
let simulateIsArray = (target) => {
    if (Array.isArray) {
        return Array.isArray(target);
    } else {
        return Object.prototype.toString.call(target) === "[object Array]";
    }
}


//generate random array
const sortArrRandom = (arr) => arr.sort((a, b) => Math.random() - 0.5);

//generate undefined array
const undefinedArray = (len) => Array.apply(null, {length:len})

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

Array.prototype.mySort = function (fn) {
    //default func
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
        //jump empty position
        if (i in this) {
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

Array.prototype.myReduce = function (fn, init) {
    let result = init
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result = fn.call(undefined, result, this[i], i, this)
        }
    }
    return result
}



//Function
//Function
//Function

//throttle
let resizeThrottleHandler = (fn, delay) => {
    let timer = null
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(context, args)
        }, delay)
    }
}
//window.onresize = resizehandler(fn, 1000);

//debunce
let resizeDebounceHandler = (fn, delay, duration) => {
    let timer = null;
    let beginTime = +new Date();
    return function () {
        const context = this;
        const args = arguments;
        const currentTime = +new Date();
        timer && clearTimeout(timer);
        //only gt duration then fn.call
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
//window.onresize = resizehandler(fn, 1000, 1000);

//闭包实现一个累加器
const add = (() => {
    var total = 0;
    return function (num) {
        total += num;
        return total;
    }
})();

const fibClosure = (function () {
    //cache
    const result = [];
    return function (num) {
        const cache = result[num];
        if (cache) {
            return cache;
        } else {
            if (num === 0 || num === 1) {
                cache = 1;
            } else {
                cache = arguments.callee(num - 1) + arguments.callee(num - 2);
            }
            result[num] = cache;
            return result[num];
        }
    };
})();


let inherit = (function () {
    let F = function () {};
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.uber = Origin.prototype;
    }
}());

let deepClone = (target, origin) => {
    let target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";
        prop;
    for (prop in origin) {
        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        prop = initalObj[i];
        if (prop === target) {
            continue;
        }
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] != null && typeof (origin[prop]) === "object") {
                target[prop] = (toStr.call(origin[prop]) === arrStr) ? [] : {};
                deepClone(target[prop], origin[prop]);
            } else {
                target[prop] = origin[prop];
            }
        }
    }
}

/**
 * 1. 新生成了一个对象
 * 2. 链接到原型
 * 3. 绑定 this
 * 4. 返回新对象
 * 优先级 new有 > call，apply，bind > 显示 > 隐式
*/
Function.prototype.simulateNew = (constructor, params) => {
    //same as let obj = new Object(), obj__proto == constructor.prototype
    let obj = Object.create(constructor.prototype);
    let result = constructor.call(obj, params);
    //in case constructor return a simple type
    return (typeof result === 'object' && result != null) ? result : obj;
}

Function.prototype.simulateCall = function (context) {
    var context = context || window;
    context.fn = this;
    var args = [].slice.call(arguments, 1);
    var result = eval("context.fn(" + args + ")");
    //delete temporary attribute
    delete context.fn;
    return result;
}

Function.prototype.simulateApply = function (context, arr) {
    var context = context || window;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [].slice.call(arguments, 0);
        result = eval("context.fn(" + args + ")");
    }
    delete context.fn;
    return result;
}

Function.prototype.simulateBind = () => {
    var fn = this;
    var context = arguments[0];
    var args = [].slice.call(arguments, 1);
    return function () {
        return fn.apply(context, args.concat([].slice.call(arguments, 0)));
    }
}

let curry = function (fn) {
    let args = [].slice.call(arguments, 1);
    let that = this;
    return function () {
        return fn.apply(that, args.concat([].slice.call(arguments)));
    }
}

let curryFormalParameter = function (fn, args) {
    let length = fn.length,
        _args = args || [];
    that = this;
    return function () {
        let innerArgs = _args.concat([].slice.call(arguments));
        if (innerArgs.length < length) {
            return curryFormalParameter.call(that, fn, innerArgs)
        } else {
            return fn.apply(that, innerArgs);
        }
    }
}

Element.prototype.insertAfter = function (targerNode, afterNode) {
    var beforeNode = afterNode.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(targerNode);
    } else {
        this.insertBefore(targerNode, beforeNode);
    }
}


//String
//String
//String
String.prototype.MyReverse = function () {
    return Array.prototype.reverse.apply(this.split('')).join('');
};

String.prototype.MyTrim = function () {
    return this.replace(/^\s+|\s+$/g, '');
};