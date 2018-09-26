/**
 * @description   simulate call
 * @param  {object} context
 * @return {any} result
 */
Function.prototype.simulateCall = function (context) {
    var context = context || window;
    context.fn = this;
    var args = [].slice.call(arguments, 1);
    var result = eval("context.fn(" + args + ")");
    //delete temporary attribute
    delete context.fn;
    return result;
}

/**
 * @description   simulate apply
 * @param  {object} context
 * @param  {array} arr
 * @return {any} result
 */
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
// var name = "jack";
// function test() {
//     console.log(this.name);
// }
//test.simulateCall({name : 123});

/**
 * @description   simulate bind
 * @return {function} function
 */
Function.prototype.simulateBindBasic = function () {
    var fn = this;
    var context = arguments[0];
    var args = [].slice.call(arguments, 1);
    return function () {
        return fn.apply(context, args.concat([].slice.call(arguments, 0)));
    }
}

/**
 * @description   simulate bind
 *                resolve new newShowValue's problem
 *                according to prototype chain inherit
 * @return {function} function
 */
Function.prototype.simulateBindAdvanced = function () {
    var fn = this;
    var context = arguments[0];
    var args = [].slice.call(arguments, 1);
    var temp = function () { };
    var F = function () {
        var _args = [].slice.call(arguments, 0);
        return fn.apply(this instanceof temp ? this : context, args.concat(_args));
    };
    temp.prototype = fn.prototype;
    F.prototype = new temp();
    return F;
}
// function showValue(name,age) {
//     console.log("-----" + this.value + " " + name + " " + age);
//     return this.value + " " + name + " " + age;
// }
// var newShowValue = showValue.mockBind(objShow, "jack", 33);
// console.log(new newShowValue());


/**
 * @description   lazy function
 *                redefine the function in someone condition
 * @return {any} function result
 */
function createXHR() {
    var xhr = null;
    if (XMLHttpRequest) {
        xhr = new XMLHttpRequest();
        createXHR = function () {
            return new XMLHttpRequest();
        }
    } else if (ActiveXObject) {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
            len = versions.length,
            activeStr,
            i;
        for (i = 0, len; i < len; i++) {
            try {
                new ActiveXObject(versions[i]);
                activeStr = versions[i];
                break;
            } catch (ex) {
                //ignore
            }
        }
        xhr = new ActiveXObject(activeStr)
        createXHR = function () {
            return new ActiveXObject(activeStr);
        }
    }
    return xhr;
}
//var aaa = createXHR();
//console.log(createXHR);


/**
 * @description   curry function
 *                1 param reuse
 *                2 calculate delay
 * @return {function} function
 */
var curryfunc = function (fn) {
    //outer arguments, except arguments[0] is fn
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        //inner arguments
        var innerArgs = Array.prototype.slice.call(arguments);
        //contact
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    }
}
var add = function () {
    var args = Array.prototype.slice.call(arguments);
    var sum = 0;
    for (var i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}
//var curryAdd=curryfunc(add,3,4,5);
//console.log(curryAdd(6,7));

var curryDelay = function (fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        if (arguments.length == 0) {
            return fn.apply(null, args);
        } else {
            args = args.concat(Array.prototype.slice.call(arguments));
        }
    }
}
var curryDelayAdd = curryDelay(add, 3, 4, 5);
curryDelayAdd(6);
curryDelayAdd(7);
//console.log(curryDelayAdd());

/**
 * @description   curry function
                  thought is if param is enough, excute callback or return a function
 * @return {function} function or the result of callback
 */
function curryAdvanced(func) {
    var l = func.length;
    return function curried() {
        var args = [].slice.call(arguments);
        if (args.length < l) {
            return function () {
                var argsInner = [].slice.call(arguments);
                return curried.apply(this, args.concat(argsInner));
            }
        } else {
            return func.apply(this, args);
        }
    }
}

var f = function (a, b, c) {
    return console.log([a, b, c]);
};

var curried = curryAdvanced(f);
// curried(1)(2)(3);
// curried(1, 2)(3);
// curried(1, 2, 3);


/**
* @description   memorize function
* @return {function} function
*/
function memorize(fn) {
    var cache = {};
    return function () {
        key = arguments.length + [].join.call(arguments);
        if (cache[key]) {
            return cache[key];
        } else {
            cache[key] = fn.apply(this, arguments);
            return cache[key];
        }
    }
}
//  console.time("first");
//  console.log(caculatefactorial(10));
//  console.timeEnd("first");
//  console.time("second");
//  console.log(caculatefactorial(10));
//  console.timeEnd("second");
//  console.time("third");
//  console.log(caculatefactorial(10));
//  console.timeEnd("third");


/**
* @description   throttle function
*                apply for onresize or onscroll
*
* @param  {number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
* @param  {boolean}   noTrailing     可选，默认为false。
*                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
*                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
*                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
* @param  {function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
*                                    执行去节流功能时，调用`callback`。
* @param  {boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
*                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
*
* @return {function}  新的节流函数
*/
function throttle(delay, noTrailing, callback, debounceMode) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeoutID;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // `noTrailing` defaults to falsy.
    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }

    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {

        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;

        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
            timeoutID = undefined;
        }

        if (debounceMode && !timeoutID) {
            // Since `wrapper` is being called for the first time and
            // `debounceMode` is true (at begin), execute `callback`.
            exec();
        }

        // Clear any existing timeout.
        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        if (debounceMode === undefined && elapsed > delay) {
            // In throttle mode, if `delay` time has been exceeded, execute
            // `callback`.
            exec();

        } else if (noTrailing !== true) {
            // In trailing throttle mode, since `delay` time has not been
            // exceeded, schedule `callback` to execute `delay` ms after most
            // recent execution.
            //
            // If `debounceMode` is true (at begin), schedule `clear` to execute
            // after `delay` ms.
            //
            // If `debounceMode` is false (at end), schedule `callback` to
            // execute after `delay` ms.
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        }

    }
    // Return the wrapper function.
    return wrapper;
};


/**
 * @description 函数防抖
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  atBegin       可选，默认为false。
 *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                    如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
 * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 *
 * @return {Function} 新的防抖函数。
 */
function debounce(delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};

function debounceSimple(fn, delay = 1000) {
    let timer;
    return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 func
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}


function throttleSimple(func, wait = 100) {
    let timer = null;
    let previous;
    return function () {
        const context = this;
        const args = arguments;
        const now = +new Date();
        if (previous && now < previous + wait) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                previous = now;
                func.apply(context, args);
            }, wait);
        } else {
            previous = now;
            func.apply(context, args);
        }
    };
}



/**
 * flat array
 * @param {Array} array
 * @param {Number} depth
 * @returns flatten array
 */
function flattenDepth(array, depth = 1) {
    let result = [];
    array.forEach((item) => {
        let d = depth;
        if (Array.isArray(item) && d > 0) {
            result.push(...flattenDepth(item, --d));
        } else {
            result.push(item);
        }
    });
    return result;
}
// console.log(flattenDepth([1, [2, [3, [4]], 5]]));
// console.log(flattenDepth([1, [2, [3, [4]], 5]], 2));
// console.log(flattenDepth([1, [2, [3, [4]], 5]], 3));
