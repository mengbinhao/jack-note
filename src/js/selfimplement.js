//Array
//Array
//Array
Array.prototype.unique1 = function() {
  //这里是利用对象键hash值的唯一性来去重
  let obj = {}
  let result = []
  for (let i = 0; i < this.length; i++) {
    if (!obj[this[i]]) {
      obj[this[i]] = true
      result.push(this[i])
    }
  }
  obj = null
  return result
}

Array.prototype.unique2 = function() {
  let obj = {}
  for (let i = 0; i < this.length; i++) {
    if (obj[this[i]]) {
      this.splice(i, 1)
      this.length--
      i--
    } else {
      obj[this[i]] = true
    }
  }
  obj = null
  return this
}

Array.prototype.unique3 = function() {
  let result = []
  for (let i = 0; i < this.length; i++) {
    if (!result.includes(this[i])) {
      result.push(this[i])
    }
  }
  return result
}

Array.prototype.unique4 = function() {
  let result = new Set(this)
  //return [...new Set(this)]
  return Array.from(result)
}

Array.prototype.unique5 = function() {
  //利用Array.prototype.filter返回符合条件的元素
  //利用Array.prototype.indexOf返回数组中第一次出现当前元素的索引值
  return this.filter((item, index) => this.indexOf(item) === index)
}

Array.prototype.unique6 = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        //in case like [2,2]
        j--
      }
    }
  }
  return arr
}

const myFlat = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

//return number arr
const myFlat2 = arr => {
  return arr
    .toString()
    .split(',')
    .map(item => Number(item))
}

const myIsArray = target => {
  return Object.prototype.toString.call(target) === '[object Array]'
}

const sortArrayRandom = arr => arr.sort((a, b) => Math.random() - 0.5)

//generate undefined array
const undefinedArray = length => Array.apply(null, { length })

//创建特定大小的数组
//[...Array(3).keys()]  //[0,1,2]

Array.prototype.myPush = function() {
  for (var i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i]
  }
  return this.length
}

Array.prototype.myJoin = function(separator = ',') {
  let result = this[0] || ''
  for (let i = 1, len = this.length; i < len; i++) {
    result += separator + this[i]
  }
  return result
}

Array.prototype.mySlice = function(start, end) {
  var start = start || 0
  var end = end || this.length
  let result = []
  for (let i = start; i < end; i++) {
    result.push(this[i])
  }
  return result
}

Array.prototype.mySort = function(fn) {
  //default func
  var fn = fn || ((a, b) => a - b)
  let len = this.length - 1
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len + 1; j++) {
      if (fn.call(undefined, this[j], this[i]) < 0) {
        ;[this[j], this[i]] = [this[i], this[j]]
      }
    }
  }
  return this
}

Array.prototype.myForEach = function(fn) {
  for (let i = 0; i < this.length; i++) {
    //filter empty position
    if (i in this) {
      fn.call(undefined, this[i], i, this)
    }
  }
}

Array.prototype.myMap = function(fn) {
  let result = []
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(fn.call(undefined, this[i], i, this))
    }
  }
  return result
}

Array.prototype.myFilter = function(fn) {
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

Array.prototype.myReduce = function(fn, initialValue) {
  let i = 0,
    result
  result = initialValue ? initialValue : this[0]
  startIndex = initialValue ? 0 : 1
  for (let len = this.length; i < len; i++) {
    if (i in this) {
      result = fn(result, this[i], i, this)
    }
  }
  return result
}

Array.prototype.myReduce2 = (f, acc, arr) => {
  if (arr.length === 0) return acc
  const [head, ...tail] = arr
  return reduce(f, f(head, acc), tail)
}

Array.prototype.myEvery = function(fn, thisArg) {
  for (let i = 0, len = this.length; i < len; i++) {
    if (i in this) {
      if (!fn.call(thisArg, this[i], i, this)) {
        return false
      }
    }
  }
  return true
}

Array.prototype.mySome = function(fn, thisArg) {
  for (let i = 0, len = this.length; i < len; i++) {
    if (i in this) {
      if (fn.call(thisArg, this[i], i, this)) {
        return true
      }
    }
  }
  return false
}

const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
    return arr.slice(i * size, i * size + size)
  })
}

const randonReplacementArray = array => {
  var len = array.length
  var temp = []
  while (len--) {
    var ran = Math.floor(Math.random() * len)
    temp.push(array.splice(ran, 1)[0])
  }
  return temp
}

//Function
//Function
//Function
//在规定时间内只触发一次
//第一个说了算
const simulateThrottle = (fn, interval = 300) => {
  let last = 0
  return function() {
    let now = +new Date()
    if (now - last >= interval) {
      fn.apply(this, arguments)
      last = +new Date()
    }
  }
}
const betterScrollThrottle = simulateThrottle(
  () => console.log('触发了滚动事件'),
  1000
)
document.addEventListener('scroll', betterScrollThrottle)

//最后一个说了算
function simulatDebounce(fn, delay = 300) {
  let timer
  return function() {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

const betterScrollDebounce = simulatDebounce(
  () => console.log('触发了滚动事件'),
  1000
)
document.addEventListener('scroll', betterScrollDebounce)

const optimizedThrottle = function(func, wait, options) {
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function() {
    previous =
      options.leading === false ? 0 : Date.now() || new Date().getTime()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function() {
    var now = Date.now() || new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function() {
    clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}

//用Throttle来优化Debounce
const DebounceAdvanced = (fn, delay = 300) => {
  let last = 0,
    timer = null

  return function() {
    let context = this
    let args = arguments
    let now = +new Date()

    if (now - last < delay) {
      // 如果时间间隔小于我们设定的时间间隔阈值,则为本次触发操作设立一个新的定时器
      // 总会执行一次 防止用户认为'假死'
      clearTimeout(timer)
      timer = setTimeout(function() {
        fn.apply(context, args)
        last = now
      }, delay)
    } else {
      fn.apply(context, args)
      last = now
    }
  }
}
const betterScrollThrottleAdvanced = DebounceAdvanced(
  () => console.log('触发了滚动事件'),
  1000
)
document.addEventListener('scroll', betterScrollThrottleAdvanced)

//debunce 在事件被触发n秒后再执行回调函数,如果在这n秒内又被触发,则重新计时。
// 1 用户在输入框中连续输入一串字符后,只会在输入完后去执行最后一次的查询Ajax请求,这样可以有效减少请求次数,节约请求资源；
// 2 window的resize、scroll事件,不断地调整浏览器的窗口大小、或者滚动时会触发对应事件,防抖让其只触发一次；
const resizeDebounceHandler = (fn, delay = 50) => {
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
 * 防抖函数,返回函数连续调用时,空闲时间必须大于或等于 wait,func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时,是否立即调用函数
 * @return {function}             返回客户调用函数
 */
const debounceAdvance = (func, wait = 50, immediate = true) => {
  let timer, context, args
  // 延迟执行函数
  const later = () =>
    setTimeout(() => {
      // 延迟函数执行完毕,清空缓存的定时器序号
      timer = null
      // 延迟执行的情况下,函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
  // 这里返回的函数是每次实际调用的函数
  return function(...params) {
    // 如果没有创建延迟执行函数（later）,就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行,调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params)
      } else {
        context = this
        args = params
      }
      // 如果已有延迟执行函数（later）,调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

//throttle 规定一个单位时间,在这个单位时间内,只能有一次触发事件的回调函数执行,如果在同一个单位时间内某事件被触发多次,只有一次能生效。
//1 鼠标连续不断地触发某事件（如点击）,只在单位时间内只触发一次；
//2 在页面的无限加载场景下,需要用户在滚动页面时,每隔一段时间发一次Ajax请求,而不是在用户停下滚动页面操作时才去请求数据；
//3 监听滚动事件,比如是否滑到底部自动加载更多,用throttle来判断；
const resizeThrottleHandler = (fn, delay, duration) => {
  let timer = null
  let beginTime = +new Date()
  return function() {
    const context = this
    const args = arguments
    const currentTime = +new Date()
    timer && clearTimeout(timer)
    //only gt duration then fn.call
    if (currentTime - beginTime >= duration) {
      fn.call(context, args)
      beginTime = currentTime
    } else {
      timer = setTimeout(() => {
        fn.call(context, args)
      }, delay)
    }
  }
}
//window.onresize = resizeThrottleHandler(fn, 1000, 1000);

/**
 * underscore 节流函数,返回函数连续调用时,func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用,传入{leading: false}。
 *                                如果想忽略结尾函数的调用,传入{trailing: false}
 *                                两者不能共存,否则函数不能执行
 * @return {function}             返回客户调用函数
 */
const throttleAdvanceUnderscore = function(func, wait, options) {
  let context, args, result
  let timeout = null
  // 之前的时间戳
  let previous = 0
  // 如果 options 没传则设为空对象
  if (!options) options = {}
  // 定时器回调函数
  let later = function() {
    // 如果设置了 leading,就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : _.now()
    // 置空一是为了防止内存泄漏,二是为了下面的定时器判断
    timeout = null
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
    // 如果设置了 trailing,只会进入这个条件
    // 如果没有设置 leading,那么第一次会进入这个条件
    // 还有一点,你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的,因为定时器的延时
    // 并不是准确的时间,很可能你设置了2秒
    // 但是他需要2.2秒才触发,这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout)
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
  return function(num) {
    total += num
    return total
  }
})()

//在JS中只有全局和函数作用域,函数作用域在函数执行完成后就会销毁,内存随之回收
//闭包是建立在函数内部的子函数,由于其可以访问上级作用域的原因,即使上级函数执行完
//作用域也不会随之销毁,这时的子函数也就是闭包拥有了访问上级作用域中的变量的权限
//上级作用域执行完成后作用域内的值也不会被销毁
//场景  Ajax回调/事件绑定回调/setTimeout
const fibClosure = (function() {
  const result = []
  return function(num) {
    const cache = result[num]
    if (cache) {
      return cache
    } else {
      if (num === 0 || num === 1) {
        cache = 1
      } else {
        cache = arguments.callee(num - 1) + arguments.callee(num - 2)
      }
      return (result[num] = cache)
    }
  }
})()
// console.time("caculateFibonacci");
// console.log(caculateFibonacci(30));
// console.timeEnd("caculateFibonacci");
// console.time("fibClosure");
// console.log(fibClosure(30));
// console.timeEnd("fibClosure");

/**
 * 1. 新生成了一个对象
 * 2. 链接到原型
 * 3. 执行constructor绑定新生成的对象
 * 4. 返回新对象
 * 优先级 new有 > call,apply,bind > 显示 > 隐式
 */
Function.prototype.simulateNew = function(constructor) {
  if (typeof constructor !== 'function') {
    throw new Error('the first param must be a function')
  }
  //same as let obj = new Object(), obj__proto == constructor.prototype
  let obj = Object.create(constructor.prototype)
  let result = constructor.apply(obj, Array.prototype.slice.call(arguments, 1))
  //in case constructor return a simple type
  return (typeof result === 'object' && typeof result !== null) ||
    typeof result === 'function'
    ? result
    : obj
}

Function.prototype.simulateCall = function(context = window) {
  if (typeof this !== 'function') throw new Error('this must be a function')
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn
  return result
}

Function.prototype.simulateApply = function(context = window) {
  if (typeof this !== 'function') throw new Error('this must be a function')
  context.fn = this
  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
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
Function.prototype.simulateBind = function(context) {
  if (typeof this !== 'function') throw new Error('this must be a function')
  let fn = this
  let args = [...arguments].slice(1)
  return function() {
    return fn.apply(context, args.concat(...arguments))
  }
}

Function.prototype.simulateBindAdvance = function(context) {
  if (typeof this !== 'function') throw new Error('this must be a function')
  let fn = this
  let args = [...arguments].slice(1)

  //if invoke by new, this is fBound
  //if function invoke, this is context
  let fBound = function() {
    let bindArgs = [...arguments]
    return fn.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    )
  }
  //very important
  fBound.prototype = Object.create(this.prototype)
  // let F = function () {}
  // F.prototype = this.prototype
  // fBound.prototype = new F()
  return fBound
}

//将传入的对象作为原型
Function.prototype.simulateCreate = function(obj) {
  function F() {}
  F.prototype = obj
  F.prototype.constructor = F
  return new F()
}

const simulateCurry = function(fn) {
  let args = Array.prototype.slice.call(arguments, 1)
  let _this = this
  return function() {
    return fn.apply(_this, args.concat(Array.prototype.slice.call(arguments)))
  }
}

const simulateCurryFormalParameter = function(fn, args) {
  let length = fn.length,
    _args = args || [],
    that = this
  return function() {
    let innerArgs = _args.concat([].slice.call(arguments))
    if (innerArgs.length < length) {
      return simulateCurryFormalParameter.call(that, fn, innerArgs)
    } else {
      return fn.apply(that, innerArgs)
    }
  }
}

//Object
//Object
//Object
const isObject = obj => {
  return obj !== null && typeof obj === 'object'
}

const isType = type => obj => {
  return Object.prototype.toString.call(obj) === '[object ' + type + ']'
}

const hasPubProperty = (attr, obj) => {
  return attr in obj && obj.hasOwnProperty(attr) === false
}

//JSON.parse(JSON.stringify(obj))
//不能处理属性值为function、undefined、date等
//json只能处理string、boolean、number、null、object、array
const deepClone = (source, hash = new WeakMap()) => {
  if (!isObject(source)) return source
  //maybe return
  if (hash.has(source)) throw new TypeError('circle reference')
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
    })
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
  strProperty: 'muyiy',
  objProperty: {
    title: "You Don't Know JS",
    price: '45'
  },
  undefinedProperty: undefined,
  nullProperty: null,
  numberProperty: 123,
  funcProperty: function() {},
  boolProperty: true,
  arrProperty: [1, 2, 3]
}

//obj.circleProperty = obj

const sym1 = Symbol('a')
const sym2 = Symbol.for('b')

objTest[sym1] = 'localSymbol'
objTest[sym2] = 'globalSymbol'
//console.log(deepClone(objTest))

const copyDeepClone = function(obj) {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (null == obj || 'object' != typeof obj) return obj

  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (obj instanceof Array) {
    copy = []
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
    copy = {}
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr])
    }
    return copy
  }
  throw new Error(
    "Unable to copy obj as type isn't supported " + obj.constructor.name
  )
}

const similateInherit = (function() {
  let F = function() {}
  return function(Child, Parent) {
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Target
    Child.uber = Parent.prototype
  }
})()

const cloneShallow = source => {
  let target = {}
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key]
    }
  }
  return target
}

const jsonStringify = obj => {
  let type = typeof obj
  if (type !== 'object' || type === null) {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"'
    }
    return String(obj)
  } else {
    let json = []
    arr = obj && obj.constructor === Array
    for (let k in obj) {
      let v = obj[k]
      let type = typeof v
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"'
      } else if (type === 'object') {
        v = jsonStringify(v)
      }
      json.push((arr ? '' : '"' + k + '":') + String(v))
    }
    return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}')
  }
}
jsonStringify({ x: 5 }) // "{"x":5}"
jsonStringify([1, 'false', false]) // "[1,"false",false]"
jsonStringify({ b: undefined }) // "{"b":"undefined"}"

const simulateInstanceOf = (left, right) => {
  //can not write like -> let proto = left.__proto__
  let proto = Object.getPrototypeOf(left)
  let prototype = right.prototype
  while (true) {
    if (proto === null) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeof(proto)
  }
}

const getBuitlInType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

const getBuitlInType2 = obj => {
  let str = Object.prototype.toString.call(obj)
  return str.match(/\[object (.*?)\]/)[1].toLowerCase()
}

//String
//String
//String
String.prototype.myReverse = function() {
  return Array.prototype.reverse.apply(this.split('')).join('')
}

String.prototype.myTrim = function() {
  return this.replace(/^\s+|\s+$/g, '')
}

String.prototype.myTrim2 = function() {
  return this.replace(/^\s+|\s+$/g, '')
}

//number
//number
//number
const isInteger = num => {
  return typeof num === 'number' && num % 1 === 0
}

const isPosZero = num => {
  return num === 0 && 1 / n === Infinity
}

const isNaN = num => {
  let ret = Number(num)
  ret += ''
  return ret === 'NaN' ? true : false
}

//other
//other
//other
const makeIterator = array => {
  let nextIndex = 0
  return {
    next: function() {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true }
    }
  }
}
let it = makeIterator([1, 2, 3])

//Ajax
// const xhr = new XMLHttpRequest()
// xhr.open('get', url, true)
// xhr.onreadystatechange = function(){
//   if(xhr.readyState === 4){
//     if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
//       conso.log('succeed')
//     }else{
//       consol.log('fail')
//     }
//   }
// }
// xhr.onerror = function(e) {
//   console.log('error')
// }
// xhr.send(null)

const myAJAX = options => {
  options = options || {}
  options.url = options.url || ''
  options.method = options.method.toUpperCase() || 'GET'
  options.async = options.async || true
  options.data = options.data || null
  options.success = options.success || function() {}
  var xhr = null
  if (XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.success(xhr.responseText)
    }
  }
  xhr.open(options.url, options.method, options.async)
  var postData = []
  for (var key in options.data) {
    postData.push(key + '=' + options.data[key])
  }
  if (options.method === 'POST') {
    xhr.open(options.method, options.url, options.async)
    xhr.send(postData)
  } else if (options.method === 'GET') {
    xhr.open(options.mehtod, options.url + postData.join('&'), options.async)
    xhr.send(null)
  }
}

const queryURLParamaterByRegex = url => {
  let obj = {}
  let reg = /([^?=&]+)=([^?=&]+)/g
  url.replace(reg, (...arg) => {
    obj[arg[1]] = arg[2]
  })
  return obj
}

const addURLParam = (url, name, value) => {
  url += url.indexOf('?') == -1 ? '?' : '&'
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}

Element.prototype.insertAfter = function(targerNode, afterNode) {
  var beforeNode = afterNode.nextElementSibling
  if (beforeNode == null) {
    this.appendChild(targerNode)
  } else {
    this.insertBefore(targerNode, beforeNode)
  }
}

//RegExp
//RegExp
//RegExp
// $1第一个括号匹配的内容
const strRegTest1 = 'the-first-name'
const regTest1 = /-(\w)/g
// console.log(strRegTest1.replace(regTest1, function($,$1) {
//     return $1.toUpperCase();
// }));

const strRegTest2 = 'aaaabbbbcccc'
const regTest2 = /(\w)\1*/g
// console.log(strRegTest2.replace(regTest2, "$1"));

const strRegTest3 = '1000000000'
// //从后面往前查,最前面是空,正向匹配非单词边界的那么多个数字
const regTest3 = /(?=(\B)(\d{3})+$)/g
// console.log(strRegTest3.replace(regTest3, "."));

const toCapitalCamelStyle = str => {
  let arr = str.split('-'),
    len = arr.length,
    result = '',
    index
  for (index = 0; index < len; index++) {
    result +=
      arr[index].substr(0, 1).toUpperCase() + arr[index].substr(1).toLowerCase()
  }
  return result
}

const toCamelStyleRegexp = str => {
  return str.replace(/-([a-z])/gi, ($0, $1) => $1.toUpperCase())
}

//Event
//Event
//Event
const addListener = (ele, type, handler) => {
  if (ele.addEventListener) {
    ele.addEventListener(type, handler, false)
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, () => handler.call(ele))
  } else {
    ele['on' + type] = handler
  }
}

// 实现一个基本的 Event Bus
class EventEmitter {
  constructor() {
    // 存储事件
    this.events = this.events || new Map()
  }
  // 监听事件
  addListener(type, fn) {
    if (!this.events.get(type)) {
      this.events.set(type, fn)
    }
  }
  // 触发事件
  emit(type) {
    let handle = this.events.get(type)
    handle.apply(this, [...arguments].slice(1))
  }
}

// 测试
let emitter = new EventEmitter()
// 监听事件
emitter.addListener('ages', age => {
  console.log(age)
})
// 触发事件
emitter.emit('ages', 18)

//实现一个双向数据绑定
let obj = {}
let input = document.getElementById('input')
let span = document.getElementById('span')
// 数据劫持
Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get() {
    console.log('获取数据了')
  },
  set(newVal) {
    console.log('数据更新了')
    input.value = newVal
    span.innerHTML = newVal
  }
})
// 输入监听
input.addEventListener('keyup', function(e) {
  obj.text = e.target.value
})

// 实现一个简单路由
// hash路由
class Route {
  constructor() {
    // 路由存储对象
    this.routes = {}
    // 当前hash
    this.currentHash = ''
    // 绑定this,避免监听时this指向改变
    this.freshRoute = this.freshRoute.bind(this)
    // 监听
    window.addEventListener('load', this.freshRoute, false)
    window.addEventListener('hashchange', this.freshRoute, false)
  }
  // 存储
  storeRoute(path, cb) {
    this.routes[path] = cb || function() {}
  }
  // 更新
  freshRoute() {
    this.currentHash = location.hash.slice(1) || '/'
    this.routes[this.currentHash]()
  }
}

//实现懒加载
/* <ul>
  <li><img src="./imgs/default.png" data="./imgs/1.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/2.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/3.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/4.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/5.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/6.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/7.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/8.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/9.png" alt=""></li>
  <li><img src="./imgs/default.png" data="./imgs/10.png" alt=""></li>
</ul> */

let imgs = document.querySelectorAll('img')
// 可视区高度
let clientHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight
function lazyLoad() {
  // 滚动卷去的高度
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  for (let i = 0; i < imgs.length; i++) {
    // 图片在可视区冒出的高度
    let x = clientHeight + scrollTop - imgs[i].offsetTop
    // 图片在可视区内
    if (x > 0 && x < clientHeight + imgs[i].height) {
      imgs[i].src = imgs[i].getAttribute('data')
    }
  }
}
// addEventListener('scroll', lazyLoad)

//rem 基本设置
// 提前执行,初始化 resize 事件不会执行
setRem()
// 原始配置
function setRem() {
  let doc = document.documentElement
  let width = doc.getBoundingClientRect().width
  let rem = width / 75
  doc.style.fontSize = rem + 'px'
}
// 监听窗口变化
addEventListener('resize', setRem)

//js获取某dom到根元素的offsetLeft/offsetTop
//父元素是offsetParent,我们循环查找offsetParent,直到根节点为止
function getElementTop(element) {
  var actualTop = element.offsetTop
  var current = element.offsetParent

  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

//promise
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function test() {
  console.log('Hello')
  await sleep(1000)
  console.log('World')
}

//使用XMLHttpRequest实现一个Promise的ajax
function myRequest(url, method, params) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) {
        return
      }
      if (xhr.state === 200) {
        resolve(xhr.response)
      }
    }
    xhr.addEventListener('error', e => {
      reject(error)
    })
    xhr.send(params)
  })
}
