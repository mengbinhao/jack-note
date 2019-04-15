//Array
//Array
//Array
const myFlat = arr => {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

const myFlat2 = arr => {
    return arr.toString().split(',').map(item => Number(item))
}

const simulateIsArray = target => {
    return Object.prototype.toString.call(target) === "[object Array]"
}

const sortArrayRandom = arr => arr.sort((a, b) => Math.random() - 0.5)

//generate undefined array
const undefinedArray = length => Array.apply(null, {length})

Array.prototype.myJoin = function (separator) {
    let result = this[0] || ''
    for (let i = 1, len = this.length; i < len; i++) {
        result += separator + this[i]
    }
    return result
}

Array.prototype.mySlice = function (start, end) {
    var start = start || 0
    var end = end || this.length
    let result = []
    for (let i = start; i < end; i++) {
        result.push(this[i])
    }
    return result
}

Array.prototype.mySort = function (fn) {
    //default func
    var fn = fn || ((a, b) => a - b)
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
        //filter empty position
        if (i in this) {
            fn.call(undefined, this[i], i, this)
        }
    }
}

Array.prototype.myMap = function (fn) {
    let result = []
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
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
    //has bug
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
function throttle(fn, interval) {
    let last = 0
    return function () {
        let now = +new Date()
        if (now - last >= interval) {
            fn.apply(this, arguments)
            last = +new Date()
        }
    }
}
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)

function debounce(fn, delay) {
    let timer
    return function () {
        let context = this
        let args = arguments

        if(timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)

//用Throttle来优化Debounce
function throttle(fn, delay) {
    let last = 0, timer = null

    return function () {
      let context = this
      let args = arguments
      let now = +new Date()

      if (now - last < delay) {
         // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
         clearTimeout(timer)
         timer = setTimeout(function () {
            last = now
            fn.apply(context, args)
          }, delay)
      } else {
          last = now
          fn.apply(context, args)
      }
    }
  }
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000)
document.addEventListener('scroll', better_scroll)


//debunce 在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。
// 1 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询Ajax请求，这样可以有效减少请求次数，节约请求资源；
// 2 window的resize、scroll事件，不断地调整浏览器的窗口大小、或者滚动时会触发对应事件，防抖让其只触发一次；
let resizeDebounceHandler = (fn, delay = 50) => {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
//window.onresize = resizeDebounceHandler(fn, 1000)

/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounceAdvance (func, wait = 50, immediate = true) {
    let timer, context, args
    // 延迟执行函数
    const later = () => setTimeout(() => {
      // 延迟函数执行完毕，清空缓存的定时器序号
      timer = null
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
    // 这里返回的函数是每次实际调用的函数
    return function(...params) {
      // 如果没有创建延迟执行函数（later），就创建一个
      if (!timer) {
        timer = later()
        // 如果是立即执行，调用函数
        // 否则缓存参数和调用上下文
        if (immediate) {
          func.apply(this, params)
        } else {
          context = this
          args = params
        }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
      } else {
        clearTimeout(timer)
        timer = later()
      }
    }
  }


//throttle 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
//1 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；
//2 在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次Ajax请求，而不是在用户停下滚动页面操作时才去请求数据；
//3 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断；
const resizeThrottleHandler = (fn, delay, duration) => {
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
//window.onresize = resizeThrottleHandler(fn, 1000, 1000);


/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttleAdvance = function(func, wait, options) {
    let context, args, result
    let timeout = null
    // 之前的时间戳
    let previous = 0
    // 如果 options 没传则设为空对象
    if (!options) options = {}
    // 定时器回调函数
    let later = function() {
      // 如果设置了 leading，就将 previous 设为 0
      // 用于下面函数的第一个 if 判断
      previous = options.leading === false ? 0 : _.now()
      // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
      timeout = null;
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function() {
      // 获得当前时间戳
      let now = _.now()
      // 首次进入前者肯定为 true
	  // 如果需要第一次不执行函数
	  // 就将上次时间戳设为当前的
      // 这样在接下来计算 remaining 的值时会大于0
      if (!previous && options.leading === false) previous = now
      // 计算剩余时间
      let remaining = wait - (now - previous)
      context = this
      args = arguments
      // 如果当前调用已经大于上次调用时间 + wait
      // 或者用户手动调了时间
 	  // 如果设置了 trailing，只会进入这个条件
	  // 如果没有设置 leading，那么第一次会进入这个条件
	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
	  // 其实还是会进入的，因为定时器的延时
	  // 并不是准确的时间，很可能你设置了2秒
	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
      if (remaining <= 0 || remaining > wait) {
        // 如果存在定时器就清理掉否则会调用二次回调
        if (timeout) {
          clearTimeout(timeout);
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        // 判断是否设置了定时器和 trailing
	    // 没有的话就开启一个定时器
        // 并且不能不能同时设置 leading 和 trailing
        timeout = setTimeout(later, remaining)
      }
      return result
    }
}

//闭包实现一个累加器
const add = (() => {
    let total = 0
    return function (num) {
        total += num
        return total
    }
})()

//在JS中只有全局和函数作用域,函数作用域在函数执行完成后就会销毁,内存随之回收
//闭包是建立在函数内部的子函数,由于其可以访问上级作用域的原因,即使上级函数执行完
//作用域也不会随之销毁,这时的子函数也就是闭包拥有了访问上级作用域中的变量的权限
//上级作用域执行完成后作用域内的值也不会被销毁
//场景  Ajax回调/事件绑定回调/setTimeout
const fibClosure = (function () {
    const result = [];
    return function (num) {
        const cache = result[num];
        if (cache) {
            return cache
        } else {
            if (num === 0 || num === 1) {
                cache = 1
            } else {
                cache = arguments.callee(num - 1) + arguments.callee(num - 2)
            }
            return result[num] = cache
        }
    };
})()
// console.time("caculateFibonacci");
// console.log(caculateFibonacci(30));
// console.timeEnd("caculateFibonacci");
// console.time("fibClosure");
// console.log(fibClosure(30));
// console.timeEnd("fibClosure");


const inherit = (function () {
    let F = function () {};
    return function (Target, Origin) {
        F.prototype = Origin.prototype
        Target.prototype = new F()
        Target.prototype.constructor = Target
        Target.uber = Origin.prototype
    }
}())

const cloneShallow = source => {
    let target = {}
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)){
            target[key] = source[key]
        }
    }
    return target
}

//乞丐版 JSON.parse(JSON.stringify(sourceObj))
//不能处理属性值为function、undefined、date等
//json只能处理string、boolean、number、null、object、array
const isObject = obj => {
    return obj !== null && typeof obj === 'object'
}

const deepClone = (source, hash = new WeakMap()) => {
    if (!isObject(source)) return source
    //maybe return
    if (hash.has(source)) throw TypeError('circle reference')
    let target = Array.isArray(source) ? [] : {}
    hash.set(source, target)

    let symKeys = Object.getOwnPropertySymbols(source)
    if (symKeys.length) {
        symKeys.forEach(symKey => {
            if (isObject(source[symKey])) {
                target[symKey] = deepClone(source[symKey], hash)
            } else {
                target[symKey] = source[symKey]
            }
        });
    }

    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = deepClone(source[key], hash)
            } else {
                target[key] = source[key]
            }
        }
    }
    return target
}

const objTest = {
    strProperty: "muyiy",
    objProperty: {
        title: "You Don't Know JS",
        price: "45"
    },
    undefinedProperty: undefined,
    nullProperty: null,
    numberProperty: 123,
    funcProperty: function () { },
    boolProperty: true,
    arrProperty: [1, 2, 3]
}

//obj.circleProperty = obj

const sym1 = Symbol("a")
const sym2 = Symbol.for("b")

objTest[sym1] = "localSymbol";
objTest[sym2] = "globalSymbol";
//console.log(deepClone(objTest))

const copyDeepClone = function (obj) {
    let copy

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj

    if (obj instanceof Date) {
      copy = new Date()
      copy.setTime(obj.getTime())
      return copy
    }

    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
          copy[i] = deepClone(obj[i])
      }
      return copy
    }

    if (obj instanceof Function) {
        copy = function() {
            return obj.apply(this, arguments)
        }
        return copy
    }

    if (obj instanceof Object) {
        copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr])
        }
        return copy
    }
    throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name)
}

/**
 * 1. 新生成了一个对象
 * 2. 链接到原型
 * 3. 绑定 this
 * 4. 返回新对象
 * 优先级 new有 > call，apply，bind > 显示 > 隐式
*/
Function.prototype.simulateNew = function (constructor) {
    if(typeof constructor !== 'function'){
        throw new Error('the first param must be a function')
    }
    //same as let obj = new Object(), obj__proto == constructor.prototype
    let obj = Object.create(constructor.prototype)
    let result = constructor.apply(obj, Array.prototype.slice.call(arguments, 1))
    //in case constructor return a simple type
    return (typeof result === 'object' && result !== null) ? result : obj
}

Function.prototype.simulateCall = function (context = window) {
    context.fn = this
    let args = [...arguments].slice(1)
    let result = context.fn(args)
    //delete temporary attribute
    delete context.fn
    return result
}

Function.prototype.simulateApply = function (context = window) {
    context.fn = this
    let result
    if (arguments[1]) {
        result = context.fn(...aruments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

// 1 指定this
// 2 返回函数
// 3 可以传入参数
// 4 柯里化
Function.prototype.simulateBind = function (context) {
    if (typeof this !== 'function') throw new Error('this must be a function')
    let fn = this
    let args = [...arguments].slice(1)
    return function () {
        return fn.apply(context, args.concat([...arguments].slice(0)))
    }
}

Function.prototype.simulateBindAdvance = function (context) {
    if (typeof this !== 'function') throw new Error('this must be a function')
    let fn = this
    let args = [].slice.call(arguments, 1)

    //judge this
    //if invoke by new, this is bar
    //if function invoke, this is context
    let fBound = function () {
        let bindArgs = [].slice.call(arguments)
        return fn.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    fBound.prototype = Object.create(this.prototype)
    // let F = function () {}
    // F.prototype = this.prototype
    // fBound.prototype = new F()
    return fBound
}

const curry = function (fn) {
    let args = Array.prototype.slice.call(arguments, 1)
    let _this = this
    return function () {
        return fn.apply(_this, args.concat(Array.prototype.slice.call(arguments)))
    }
}

const curryFormalParameter = function (fn, args) {
    let length = fn.length,
        _args = args || [];
    that = this;
    return function () {
        let innerArgs = _args.concat([].slice.call(arguments))
        if (innerArgs.length < length) {
            return curryFormalParameter.call(that, fn, innerArgs)
        } else {
            return fn.apply(that, innerArgs)
        }
    }
}

function jsonStringify(obj) {
    let type = typeof obj;
    if (type !== "object" || type === null) {
        if (/string|undefined|function/.test(type)) {
            obj = '"' + obj + '"';
        }
        return String(obj);
    } else {
        let json = []
        arr = (obj && obj.constructor === Array);
        for (let k in obj) {
            let v = obj[k];
            let type = typeof v;
            if (/string|undefined|function/.test(type)) {
                v = '"' + v + '"';
            } else if (type === "object") {
                v = jsonStringify(v);
            }
            json.push((arr ? "" : '"' + k + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
    }
}
jsonStringify({x : 5}) // "{"x":5}"
jsonStringify([1, "false", false]) // "[1,"false",false]"
jsonStringify({b: undefined}) // "{"b":"undefined"}"

function instanceOf(left,right) {
    let proto = left.__proto__
    let prototype = right.prototype
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__
    }
}


//String
//String
//String
String.prototype.MyReverse = function () {
    return Array.prototype.reverse.apply(this.split('')).join('')
}

String.prototype.MyTrim = function () {
    return this.replace(/^\s+|\s+$/g, '')
}

//number
//number
//number
const isInteger = Number.isInteger || function(num) {
    return typeof num === "number" && num % 1 === 0
}

const isPosZero  = function(num) {
    return num === 0 && 1 / n === Infinity
}




//other
//other
//other
let makeIterator = array => {
    let nextIndex = 0
    return {
        next: function() {
            return nextIndex < array.length ? {value: array[nextIndex++], done:false} : {done:true}
        }
    }
}
let it = makeIterator([1,2,3])


//Ajax
let xhr = new XMLHttpRequest()
xhr.open('get', url, true)
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4){
    if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
      conso.log('succeed')
    }else{
      consol.log('fail')
    }
  }
}
xhr.onerror = function(e) {
  console.log('error')
}
xhr.send()
