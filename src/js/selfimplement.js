//Array
//Array
//Array
//不使用其他数据结构
const removeDuplicates1 = (nums) => {
	//precondition
	nums.sort()
	let len = 1
	for (let i = 1; i < nums.length; i++)
		if (nums[i] != nums[i - 1]) nums[len++] = nums[i]
	// 删除重复项
	nums.splice(len)
	return nums
}

const removeDuplicates2 = (nums) => {
	let len = nums.length - 1
	for (let i = len; i >= 0; i--) {
		//往前放
		if (nums.indexOf(nums[i]) != i) {
			nums[i] = nums[len--]
		}
	}
	nums.splice(len + 1)
	return nums
}

//使用其他数据结构
Array.prototype.unique1 = function () {
	//return [...new Set(this)]
	return Array.from(new Set(this))
}

Array.prototype.unique2 = function () {
	//利用Array.prototype.filter返回符合条件的元素
	//利用Array.prototype.indexOf返回数组中第一次出现当前元素的索引值
	return this.filter((item, index) => this.indexOf(item) === index)
}

Array.prototype.unique3 = function () {
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

Array.prototype.unique4 = function () {
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

Array.prototype.unique5 = function () {
	let result = []
	for (let i = 0; i < this.length; i++) {
		if (!result.includes(this[i])) {
			result.push(this[i])
		}
	}
	return result
}

Array.prototype.unique6 = (arr) => {
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

const myFlat = (arr) => {
	while (arr.some((item) => Array.isArray(item))) {
		arr = [].concat(...arr)
	}
	return arr
}

//return number arr
const myFlat2 = (arr) => {
	return arr
		.toString()
		.split(',')
		.map((item) => Number(item))
}

const myFlat3 = JSON.parse(
	'[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']'
)

const myFlat4 = (arr) => {
	let result = []
	for (let i = 0, len = arr.length; i < len; i++) {
		if (Array.isArray(arr[i])) {
			result = result.concat(flatten(arr[i]))
		} else {
			result.push(arr[i])
		}
	}
	return result
}

const myFlatFinal = (arr, depth = 1) => {
	return depth > 0
		? arr.reduce((acc, cur) => {
				if (Array.isArray(cur)) {
					return [...acc, ...flat(cur, depth - 1)]
				}
				return [...acc, cur]
		  }, [])
		: arr
}

const simulateIsArray = (target) => {
	return Object.prototype.toString.call(target) === '[object Array]'
}

const sortArrayRandom = (arr) => arr.sort((a, b) => Math.random() - 0.5)

//generate undefined array
const undefinedArray = (length) => Array.apply(null, { length })

//创建特定大小的数组
//[...Array(3).keys()]  //[0,1,2]

Array.prototype.myPush = function () {
	for (var i = 0; i < arguments.length; i++) {
		this[this.length] = arguments[i]
	}
	return this.length
}

Array.prototype.myJoin = function (separator = ',') {
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
				;[this[j], this[i]] = [this[i], this[j]]
			}
		}
	}
	return this
}

Array.prototype.myForEach = function (fn, context) {
	context = context || arguments[1]
	if (typeof fn !== 'function') {
		throw new TypeError(fn + 'is not a function')
	}
	const len = this.length
	let k = 0
	while (k < len) {
		//note！！filter empty position
		if (k in this) {
			fn.call(context, this[k], k, this)
		}
		k++
	}
}

Array.prototype.myMap = function (fn) {
	if (typeof fn !== 'function') {
		throw new TypeError(fn + 'is not a function')
	}

	let ret = []
	for (let i = 0; i < this.length; i++) {
		if (i in this) {
			ret.push(fn.call(undefined, this[i], i, this))
		}
	}
	return ret
}

Array.prototype.myFilter = function (fn) {
	if (typeof fn !== 'function') {
		throw new TypeError(fn + 'is not a function')
	}

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

Array.prototype.myEvery = function (fn, thisArg) {
	if (typeof fn !== 'function') {
		throw new TypeError(fn + 'is not a function')
	}
	for (let i = 0, len = this.length; i < len; i++) {
		if (i in this) {
			if (!fn.call(thisArg, this[i], i, this)) {
				return false
			}
		}
	}
	return true
}

Array.prototype.mySome = function (fn, thisArg) {
	if (typeof fn !== 'function') {
		throw new TypeError(fn + 'is not a function')
	}
	for (let i = 0, len = this.length; i < len; i++) {
		if (i in this) {
			if (fn.call(thisArg, this[i], i, this)) {
				return true
			}
		}
	}
	return false
}

Array.prototype.myReduce = function (fn, initialValue) {
	if (typeof fn !== 'function') {
		throw new TypeError(fn + ' is not a function')
	}

	let hasInitialValue = initialValue !== undefined,
		value = hasInitialValue ? initialValue : this[0]

	for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
		if (i in this) {
			value = fn(value, this[i], i, this)
		}
	}

	return value
}

Array.prototype.myReduce2 = (f, acc, arr) => {
	if (arr.length === 0) return acc
	const [head, ...tail] = arr
	return myReduce2(f, f(head, acc), tail)
}

const chunk = (arr, size) => {
	return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
		return arr.slice(i * size, i * size + size)
	})
}

const randomReplacementArray = (array) => {
	var len = array.length
	var temp = []
	while (len--) {
		var ran = Math.floor(Math.random() * len)
		temp.push(array.splice(ran, 1)[0])
	}
	return temp
}

const nest = (items, id = null, link = 'parent_id') =>
	items
		.filter((item) => item[link] === id)
		.map((item) => ({ ...item, children: nest(items, item.id) }))

const comments = [
	{ id: 1, parent_id: null },
	{ id: 2, parent_id: 1 },
	{ id: 3, parent_id: 1 },
	{ id: 4, parent_id: 2 },
	{ id: 5, parent_id: 4 },
]

const nestedComments = nest(comments)

//Function
//Function
//Function

//最后一个说了算
//提交按钮、联想搜索、表单验证、浏览器缩放
function simulateDebounce(fn, delay = 300) {
	let timer
	return function (...args) {
		timer && clearTimeout(timer)

		timer = setTimeout(() => {
			fn.apply(this, args)
			timer = null
		}, delay)
	}
}

const betterScrollDebounce = simulateDebounce(
	() => console.log('触发了滚动事件'),
	1000
)
document.addEventListener('scroll', betterScrollDebounce)

const debounce = function (fn, wait = 300, immediate = true) {
	let timer, result
	let later = function (context, args) {
		setTimeout(() => {
			timer = null
			if (!immediate) {
				fn.apply(context, args)
				context = args = null
			}
		}, wait)
	}
	let debounced = function (...args) {
		if (!timer) {
			timer = later(this, args)
			if (immediate) {
				result = fn.apply(this, args)
			}
		} else {
			clearTimeout(timer)
			timer = later(this, args)
		}
		return result
	}

	debounce.cancel = function () {
		clearTimeout(timer)
		timer = null
	}
	return debounced
}

//在规定时间内只触发一次
//第一个说了算
//拖拽、onscroll、按钮点击、缩放、动画、计算鼠标移动距离
function simulateThrottle(fn, interval = 300) {
	let last = 0
	return (...args) => {
		let now = +new Date()
		if (now - last >= interval) {
			fn.apply(this, args)
			last = +new Date()
		}
	}
}

function simulateThrottle2(fn, interval = 300) {
	let timer = null
	return (...args) => {
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(this, args)
				timer = null
			}, interval)
		}
	}
}

const betterScrollThrottle = simulateThrottle(
	() => console.log('触发了滚动事件'),
	1000
)
document.addEventListener('scroll', betterScrollThrottle)

const optimizedThrottle = function (fn, wait, options = {}) {
	var timeout, context, args, result
	var previous = 0

	var later = function () {
		previous =
			options.leading === false ? 0 : Date.now() || new Date().getTime()
		timeout = null
		result = fn.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function () {
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
			result = fn.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			// 判断是否设置了定时器和 trailing
			timeout = setTimeout(later, remaining)
		}
		return result
	}

	throttled.cancel = function () {
		clearTimeout(timeout)
		previous = 0
		timeout = context = args = null
	}

	return throttled
}

//用Throttle来优化Debounce
function DebounceAdvanced(fn, delay = 300) {
	let last = 0,
		timer = null

	return function () {
		let context = this
		let args = arguments

		if (now - last < delay) {
			// 如果时间间隔小于我们设定的时间间隔阈值,则为本次触发操作设立一个新的定时器
			// 总会执行一次 防止用户认为'假死'
			timer && clearTimeout(timer)
			timer = setTimeout(function () {
				fn.apply(context, args)
				last = +new Date()
			}, delay)
		} else {
			fn.apply(context, args)
			last = +new Date()
		}
	}
}
const betterScrollThrottleAdvanced = DebounceAdvanced(
	() => console.log('触发了滚动事件'),
	1000
)
document.addEventListener('scroll', betterScrollThrottleAdvanced)

/**
 * 防抖函数,返回函数连续调用时,空闲时间必须大于或等于 wait,func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为true时,是否立即调用函数
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
	return function (...params) {
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
	return function () {
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
const throttleAdvanceUnderscore = function (func, wait, options) {
	let context, args, result
	let timeout = null
	// 之前的时间戳
	let previous = 0
	// 如果 options 没传则设为空对象
	if (!options) options = {}
	// 定时器回调函数
	let later = function () {
		// 如果设置了 leading,就将 previous 设为 0
		// 用于下面函数的第一个 if 判断
		previous = options.leading === false ? 0 : _.now()
		// 置空一是为了防止内存泄漏,二是为了下面的定时器判断
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}
	return function () {
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
	return function (num) {
		total += num
		return total
	}
})()

//add(1) // 1
//add(1)(2)// 3
//add(1, 2)(3, 4, 5)(6) // 21
var add = (...args) => {
	let arr = args
	let fn = (...newArgs) => {
		arr = [...arr, ...newArgs]
		return fn
	}

	fn.toString = fn.valueOf = function () {
		return arr.reduce((acc, cur) => {
			return acc + cur
		})
	}

	return fn
}

//在JS中只有全局和函数作用域,函数作用域在函数执行完成后就会销毁,内存随之回收
//闭包是建立在函数内部的子函数,由于其可以访问上级作用域的原因,即使上级函数执行完
//作用域也不会随之销毁,这时的子函数也就是闭包拥有了访问上级作用域中的变量的权限
//上级作用域执行完成后作用域内的值也不会被销毁
//场景  Ajax回调/事件绑定回调/setTimeout
const fibClosure = (function () {
	const result = []
	return function (num) {
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
// console.time("calculateFibonacci");
// console.log(calculateFibonacci(30));
// console.timeEnd("calculateFibonacci");
// console.time("fibClosure");
// console.log(fibClosure(30));
// console.timeEnd("fibClosure");

/**
 * 1. 新生成了一个对象
 * 2. 链接到原型
 * 3. 执行constructor绑定新生成的对象
 * 4. 返回新对象
 * 优先级 new > call,apply,bind > 显示 > 隐式
 */
function simulateNew() {
	//let [Constructor, ...args] = [...arguments]
	let Constructor = Array.prototype.shift.call(arguments)
	//same as let obj = {}, obj.__proto__ == constructor.prototype
	let obj = Object.create(Constructor.prototype)
	let result = Constructor.apply(obj, arguments)
	//in case constructor return a simple type
	return result !== null &&
		(typeof result === 'object' || typeof result === 'function')
		? result
		: obj
}

//无返回值
var testConstructorWithoutReturn = function (name) {
	this.name = name
}
//有返回值
var testConstructorWithReturn = function (name) {
	this.name = name
	return {}
}
var newObj = simulateNew(testConstructorWithReturn, 'foo')
console.log(newObj, newObj instanceof testConstructorWithReturn)

Function.prototype.simulateCall = function () {
	if (typeof this !== 'function') {
		throw new TypeError('must be invoked by function')
	}
	let [context = window, ...args] = [...arguments]
	context.fn = this
	const result = context.fn(...args)
	delete context.fn
	return result
}

Function.prototype.simulateApply = function (context = window) {
	if (typeof this !== 'function') {
		throw new TypeError('must be invoked by function')
	}
	//let [context = window, ...args] = [...arguments]
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
Function.prototype.simulateBind = function (context = window) {
	if (typeof this !== 'function') throw new TypeError('this must be a function')
	let fn = this
	let args = [...arguments].slice(1)
	return function () {
		return fn.apply(context, args.concat(...arguments))
	}
}

Function.prototype.simulateBindAdvance = function (context = window) {
	if (typeof this !== 'function') throw new TypeError('this must be a function')
	let fn = this
	let args = [...arguments].slice(1)

	//if invoke by new, this is fBound
	//if function invoke, this is context
	let fBound = function () {
		return fn.apply(
			this instanceof fBound ? this : context,
			args.concat(...arguments)
		)
	}
	//very important
	//这里有bug箭头函数没有this.prototype
	//fBound.prototype = Object.create(this.prototype)
	let F = function () {}
	if (this.prototype) {
		F.prototype = this.prototype
	}
	fBound.prototype = new F()
	return fBound
}

var bar = function () {
	console.log(this.name, arguments)
}
bar.prototype.name = 'bar'
const foo = {
	name: 'foo',
}

const bound = bar.simulateBindAdvance(foo, 22, 33, 44)
new bound() // bar, [22, 33, 44]
bound() // foo, [22, 33, 44]

//将传入的对象作为原型
Function.prototype.simulateCreate = function (obj) {
	function F() {}
	F.prototype = obj
	F.prototype.constructor = F
	return new F()
}

const simulateCurry = function (fn) {
	let args = Array.prototype.slice.call(arguments, 1)
	return () => {
		return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)))
	}
}

//延迟计算 （用闭包把传入参数保存起来，当传入参数的数量足够执行函数时，开始执行函数）
//动态创建函数 （参数不够时会返回接受剩下参数的函数）
//参数复用（每个参数可以多次复用）
const simulateCurryFormalParameter = function (fn, args) {
	let length = fn.length,
		_args = args || [],
		that = this
	return function () {
		let innerArgs = _args.concat([].slice.call(arguments))
		if (innerArgs.length < length) {
			return simulateCurryFormalParameter.call(that, fn, innerArgs)
		} else {
			return fn.apply(that, innerArgs)
		}
	}
}

const curry = (fn, ...args) =>
	args.length < fn.length
		? (...arguments) => curry(fn, ...args, ...arguments)
		: fn(...args)

var compose = function (...args) {
	var len = args.length // args函数的个数
	var count = len - 1
	var result
	return function func(...args1) {
		// func函数的args1参数枚举
		result = args[count].call(this, args1)
		if (count > 0) {
			count--
			return func.call(null, result) // result 上一个函数的返回结果
		} else {
			//回复count初始状态
			count = len - 1
			return result
		}
	}
}

function compose2(...funcs) {
	if (funcs.length === 0) {
		return (arg) => arg
	}

	if (funcs.length === 1) {
		return funcs[0]
	}

	return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

//Object
//Object
//Object
const isObject = (obj) => {
	return obj !== null && typeof obj === 'object'
}

const isType = (type) => (obj) => {
	return Object.prototype.toString.call(obj) === `[object ${type}]`
}

function getType(obj) {
	const str = Object.prototype.toString.call(obj)
	const map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object',
		'[object HTMLDocument]': 'document',
		'[object Window]': 'window',
	}
	if (obj instanceof Element) {
		// 判断是否是dom元素，如div等
		return 'element'
	}
	return map[str]
}

//typeof返回的是小写需注意
const getTypeFinal = (obj) => {
	const type = typeof obj
	if (type !== 'object') return type
	return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

const hasPubProperty = (attr, obj) => {
	return attr in obj && obj.hasOwnProperty(attr) === false
}

//第一大特性
//undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 对跳过（忽略）它们进行序列化
//undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 将会将它们序列化为 null
//undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时，都会返回 undefined

//第二大特性
//非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中

//第三大特性
//转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值

//第四大特性
//JSON.stringify() 将会正常序列化Date的值

//第五大特性
//NaN和Infinity格式的数值及null都会被当做null

//第六大特性
//布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值

//第七大特性
//其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性

//第八大特性
//对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误

//第九大特性
//所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们

//JSON.parse(JSON.stringify(obj))
//JSON只能处理string、boolean、number、null、object、array
// 缺点：
// 1、会忽略undefined
// 2、会忽略symbol
// 3、不能序列化函数,，RegExp/函数不会拷贝
// 4、不能解决循环引用的对象 const a = {val:2}; a.target = a; 拷贝a会出现系统栈溢出，因为出现了无限递归的情况
// 5、不能正确处理,new Date()会被转成字符串, Set, Map等
// 6、会抛弃对象的constructor。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成Object
const deepClone = (source, cache = new WeakMap()) => {
	if (source instanceof Date) return new Date(source)
	if (source instanceof RegExp) return new RegExp(source)
	//simple type, return directly
	if (!isObject(source)) return source
	//or return directly
	if (cache.has(source)) throw new TypeError('circle reference')
	//let target = new source.constructor()
	let target = Array.isArray(source) ? [] : {}
	cache.set(source, target)

	Object.getOwnPropertySymbols(source).forEach((symKey) => {
		if (isObject(source[symKey])) {
			target[symKey] = deepClone(source[symKey], cache)
		} else {
			target[symKey] = source[symKey]
		}
	})

	for (let key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			if (isObject(source[key])) {
				target[key] = deepClone(source[key], cache)
			} else {
				target[key] = source[key]
			}
		}
	}
	return target
}

const objTest = {
	strProperty: 'strProp',
	objProperty: {
		title: "You Don't Know JS",
		price: '45',
	},
	undefinedProperty: undefined,
	nullProperty: null,
	numberProperty: 123,
	funcProperty: function () {},
	boolProperty: true,
	arrProperty: [1, 2, 3],
}

//obj.circleProperty = obj

const sym1 = Symbol('a')
const sym2 = Symbol.for('b')

objTest[sym1] = 'localSymbol'
objTest[sym2] = 'globalSymbol'
//console.log(deepClone(objTest))

const copyDeepClone = function (obj) {
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
			copy[i] = copyDeepClone(obj[i])
		}
		return copy
	}

	if (obj instanceof Function) {
		copy = function () {
			return obj.apply(this, arguments)
		}
		return copy
	}

	if (obj instanceof Object) {
		copy = {}
		for (let attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = copyDeepClone(obj[attr])
		}
		return copy
	}
	throw new Error(
		"Unable to copy obj as type isn't supported " + obj.constructor.name
	)
}

function deepClone2(data) {
	let result = {}
	const keys = [
		...Object.getOwnPropertyNames(data),
		...Object.getOwnPropertySymbols(data),
	]
	if (!keys.length) return data
	keys.forEach((key) => {
		let item = data[key]
		if (item && typeof item === 'object') {
			result[key] = deepClone2(item)
		} else {
			result[key] = item
		}
	})
	return result
}

function deepClone2Advanced(obj) {
	let map = new WeakMap()
	function deep(data) {
		let result = {}
		const keys = [
			...Object.getOwnPropertyNames(data),
			...Object.getOwnPropertySymbols(data),
		]
		if (!keys.length) return data
		const exist = map.get(data)
		if (exist) return exist
		map.set(data, result)
		keys.forEach((key) => {
			let item = data[key]
			if (typeof item === 'object' && item) {
				result[key] = deep(item)
			} else {
				result[key] = item
			}
		})
		return result
	}
	return deep(obj)
}

//inheritinheritinheritinheritinheritinherit
// function Base() {
// }
// // 派生类
// function Derived() {
//     Base.call(this);
// }
// // 将派生类的原型的原型链挂在基类的原型上
// Object.setPrototypeOf(Derived.prototype, Base.prototype);

const simulateInherit = (function () {
	let F = function () {}
	return function (Child, Parent) {
		F.prototype = Parent.prototype
		Child.prototype = new F()
		Child.prototype.constructor = Child
		Child.uber = Parent.prototype
	}
})()

//otherStar={...obj}
//Object.assign({},obj)
const cloneShallow = (obj) => {
	let target = {}
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			target[key] = obj[key]
		}
	}
	return target
}

const cloneShallow2 = (obj) => {
	let result = Array.isArray(obj) ? [] : {}
	Object.keys(obj).forEach((key) => (result[key] = obj[key]))
	return result
}

const jsonStringify = (obj) => {
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
	if (left === null || typeof left !== 'object') return false
	let proto = Object.getPrototypeOf(left)
	let prototype = right.prototype
	while (true) {
		if (proto === null) return false
		if (proto === prototype) return true
		proto = Object.getPrototypeOf(proto)
	}
}

//String
//String
//String
String.prototype.myReverse = function () {
	return Array.prototype.reverse.apply(this.split('')).join('')
}

String.prototype.myTrim = function () {
	return this.replace(/^\s+|\s+$/g, '')
}

String.prototype.myTrim2 = function () {
	return this.replace(/^\s+|\s+$/g, '')
}

//number
//number
//number
const isInteger = (num) => {
	return typeof num === 'number' && num % 1 === 0
}

const isPosZero = (num) => {
	return num === 0 && 1 / n === Infinity
}

const isNaN = (num) => {
	let ret = Number(num)
	ret += ''
	return ret === 'NaN' ? true : false
}

const round = (n, decimals = 0) =>
	Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)

const addZero = (num, len = 2) => `${num}`.padStart(len, '0')

//other
//other
//other
const makeIterator = (array) => {
	let nextIndex = 0
	return {
		next: function () {
			return nextIndex < array.length
				? { value: array[nextIndex++], done: false }
				: { done: true }
		},
	}
}
let it = makeIterator([1, 2, 3])

//Ajax
// const xhr = new XMLHttpRequest()
// xhr.open('get', url, true)
// xhr.onreadystatechange = function(){
//   if(xhr.readyState === 4){
//     if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
//       console.log('succeed')
//     }else{
//       consol.log('fail')
//     }
//   }
// }
// xhr.onerror = function(e) {
//   console.log('error')
// }
// xhr.send(null)

const myAJAX = (options) => {
	options = options || {}
	options.url = options.url || ''
	options.method = options.method.toUpperCase() || 'GET'
	options.async = options.async || true
	options.data = options.data || null
	options.success = options.success || function () {}
	var xhr = null
	if (XMLHttpRequest) {
		xhr = new XMLHttpRequest()
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}
	xhr.onreadystatechange = function () {
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
		xhr.open(options.method, options.url + postData.join('&'), options.async)
		xhr.send(null)
	}
}

const queryURLParameterByRegex = (url) => {
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

Element.prototype.insertAfter = function (targetNode, afterNode) {
	var beforeNode = afterNode.nextElementSibling
	if (beforeNode == null) {
		this.appendChild(targetNode)
	} else {
		this.insertBefore(targetNode, beforeNode)
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

const toCapitalCamelStyle = (str) => {
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

const toCamelStyleRegexp = (str) => {
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
emitter.addListener('ages', (age) => {
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
	},
})
// 输入监听
input.addEventListener('keyup', function (e) {
	obj.text = e.target.value
})

// proxy版本
const handler = {
	set(target, key, value) {
		target[key] = value
		// 数据变化 --> 修改视图
		input.value = value
		span.innerHTML = value
		return value
	},
}
const proxy = newProxy(data)

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
		this.routes[path] = cb || function () {}
	}
	// 更新
	freshRoute() {
		this.currentHash = location.hash.slice(1) || '/'
		this.routes[this.currentHash]()
	}
}

//实现一个路由 - Hash
// <!DOCTYPE html>
// <html>
// <head>
//   <title>hash 路由</title>
// </head>
// <body>
//   <header>
//     <a href="#home">首页</a>
//     <a href="#center">个人中心页</a>
//     <a href="#help">帮助页</a>
//   </header>
//   <section id="content"></section>
//   <script>
//     window.addEventListener('hashchange', (e) => {
//       let content = document.getElementById('content');
//       content.innerText = location.hash;
//     })
// </script>
// </body>
// </html>

//路由实现 - history

// <!DOCTYPE html>
// <html>
// <head>
//   <title>history 路由</title>
// </head>
// <body>
//   <header>
//     <a onclick="changeRoute(this)" data-path="home">首页</a>
//     <a onclick="changeRoute(this)" data-path="center">个人中心页</a>
//     <a onclick="changeRoute(this)" data-path="help">帮助页</a>
//   </header>
//   <section id="content"></section>
//   <script>
//     function changeRoute(route) {
//       let path = route.dataset.path;
//       /**
//        * window.history.pushState(state, title, url)
//        * state：一个与添加的记录相关联的状态对象，主要用于popstate事件。该事件触发时，该对象会传入回调函数。
//        *        也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。
//        *        如果不需要这个对象，此处可以填 null。
//        * title：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
//        * url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
//        */
//       changePage(path);
//       history.pushState({ content: path }, null, path);
//     }
//     /**
//      * 调用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。
//      * 点击后退、前进按钮、或者在 js 中调用 history.back()、history.forward()、history.go() 方法会触发
//      */
//     window.addEventListener('popstate', (e) => {
//       let content = e.state && e.state.content;
//       changePage(content);
//     });

//     function changePage(pageContent) {
//       let content = document.getElementById('content');
//       content.innerText = pageContent;
//     }
// </script>
// </body>
// </html>

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
	return new Promise((resolve) => setTimeout(resolve, ms))
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
		xhr.addEventListener('error', (e) => {
			reject(error)
		})
		xhr.send(params)
	})
}

//for in vs for off
//1 循环对象属性的时候，使用for...in,在遍历数组的时候的时候使用for...of
//2 for...in循环出的是key，for...of循环出的是value
//3 for...of是ES6新引入的特性。修复了ES5引入的for...in的不足
//4 for...of不能循环普通的对象，需要通过和Object.keys()搭配使用
//5 for of可与break、continue和return配合使用
//6 for of提供遍历所有数据结构的统一操作接口
var student = {
	name: 'jack',
	age: 22,
	locate: {
		country: 'china',
		city: 'xiamen',
		school: 'xi gong da',
	},
}
for (var key of Object.keys(student)) {
	console.log(key + ': ' + student[key])
}

function template(html, obj) {
	return html.replace(/\{\{(.*?)\}\}/g, function (match, key) {
		return obj[key.trim()]
	})
}

template('{{name}}很厉name害，才{{ age }}岁', { name: 'jack', age: '15' })

//implement promise
function MyPromise(executor) {
	this.status = 'pending'
	this.value = undefined
	this.reason = undefined
	this.onResolvedCallbacks = []
	this.onRejectedCallbacks = []

	const resolve = (value) => {
		if (this.status === 'pending') {
			this.status = 'resolved'
			this.value = value
			this.onResolvedCallbacks.forEach((fn) => fn())
		}
	}

	const reject = (reason) => {
		if (this.status === 'pending') {
			this.status = 'rejected'
			this.reason = reason
			this.onRejectedCallbacks.forEach((fn) => fn())
		}
	}

	try {
		executor(resolve, reject)
	} catch (e) {
		reject(e)
	}
}

//then方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为then(null)，这就会导致前一个Promise的结果会穿透下面
MyPromise.prototype.then = function (onFulfilled, onRejected) {
	//handle value penetration, just return the value
	onFulfilled =
		typeof onFulfilled === 'function' ? onFulfilled : (value) => value
	onRejected =
		typeof onRejected === 'function'
			? onRejected
			: (err) => {
					throw err
			  }

	let promise2
	if (this.status === 'resolved') {
		promise2 = new MyPromise((resolve, reject) => {
			setTimeout(() => {
				//executor的try不能捕获到sync,所以这里加下try
				try {
					let x = onFulfilled(this.value)
					resolvePromise(promise2, x, resolve, reject)
				} catch (e) {
					reject(e)
				}
			})
		})
	}

	if (this.status === 'rejected') {
		promise2 = new MyPromise((resolve, reject) => {
			setTimeout(() => {
				try {
					let x = onRejected(this.reason)
					resolvePromise(promise2, x, resolve, reject)
				} catch (e) {
					reject(e)
				}
			})
		})
	}

	if (this.status === 'pending') {
		promise2 = new MyPromise((resolve, reject) => {
			this.onResolvedCallbacks.push(() => {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			})

			this.onRejectedCallbacks.push(() => {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			})
		})
	}
	return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError('circular reference'))
	}
	let called
	if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
		try {
			let then = x.then
			if (typeof then === 'function') {
				then.call(
					x,
					(y) => {
						if (called) return
						called = true
						//recursion
						//y is the return of previous promise
						resolvePromise(promise2, y, resolve, reject)
					},
					(err) => {
						if (called) return
						called = true
						reject(err)
					}
				)
			} else {
				resolve(x)
			}
		} catch (e) {
			if (called) return
			called = true
			reject(e)
		}
	} else {
		//normal value
		resolve(x)
	}
}

class EventEmitter {
	constructor() {
		this._events = this._events || new Map() //储存事件/回调键值对
		this._maxListeners = this._maxListeners || 10 //设立监听上限
	}
}

EventEmitter.prototype.emit = function (type, ...args) {
	let handler
	//从储存事件键值对的this._events中获取对应事件回调函数
	handler = this._events.get(type)
	if (args.length > 0) {
		handler.apply(this, args)
	} else {
		handler.call(this)
	}
	return true
}

EventEmitter.prototype.addListener = function (type, fn) {
	//将type事件以及对应的fn函数放入this._events中储存
	if (!this._events.get(type)) {
		this._events.set(type, fn)
	}
}

function jsonp({ url, params, cb, timeout = 300 }) {
	return new Promise((resolve, reject) => {
		let scriptNode, timer
		//define global cb
		window[cb] = function (data) {
			resolve(data)
			delete window[cb]
			document.body.removeChild(script)
		}
		//combine params
		params = { ...params, cb }
		let arrays = []
		for (let key in params) {
			arrays.push(`${key}=${params[key]}`)
		}
		scriptNode = document.createElement('script')
		scriptNode.src = `${url}?${arrays.join('&')}`
		document.body.appendChild(scriptNode)
		//handle timeout
		timer = setTimeout(() => {
			reject('network issue')
		}, timeout)
		//handle exception
		scriptNode.onerror = function (e) {
			reject(e)
		}
	})
}

// 后台代码
// 因为是通过 script 标签调用的 后台返回的相当于一个 js 文件
// 根据前端传入的 callback 的函数名直接调用该函数
// 返回的是 'foo(3)'
function testJSONP(callback, a, b) {
	return `${callback}(${a + b})`
}

//实现 generator 的自动执行器,要求是 yield 后面只能是 Promise 或 Thunk 函数
function run(gen) {
	let g = gen()

	function next(data) {
		let result = g.next(data)
		if (result.done) return result.value
		if (result.value instanceof Promise) {
			result.value.then((data) => next(data))
		} else {
			result.value(next)
		}
	}

	return next()
}

// ======== e.g. ==========

function func(data, cb) {
	console.log(data)
	cb()
}

function* gen() {
	let a = yield Promise.resolve(1)
	console.log(a)
	let b = yield Promise.resolve(2)
	console.log(b)
	yield func.bind(null, a + b)
}
run(gen)
/**
output:
1
2
3
**/

//渲染几万条数据不卡住页面
setTimeout(() => {
	// 插入十万条数据
	const total = 100000
	// 一次插入的数据
	const once = 20
	// 插入数据需要的次数
	const loopCount = Math.ceil(total / once)
	let countOfRender = 0
	const ul = document.querySelector('ul')
	// 添加数据的方法
	function add() {
		const fragment = document.createDocumentFragment()
		for (let i = 0; i < once; i++) {
			const li = document.createElement('li')
			li.innerText = Math.floor(Math.random() * total)
			fragment.appendChild(li)
		}
		ul.appendChild(fragment)
		countOfRender += 1
		loop()
	}
	function loop() {
		if (countOfRender < loopCount) {
			window.requestAnimationFrame(add)
		}
	}
	loop()
}, 0)

//打印出当前网页使用了多少种HTML元素
const fn = () => {
	return [
		...new Set([...document.querySelectorAll('*')].map((el) => el.tagName)),
	].length
}

//发布订阅模式
class Observer {
	constructor() {
		this.events = {} //事件中心
	}
	publish(eventName, ...args) {
		//发布=>调用事件中心中对应的函数
		if (this.events[eventName])
			this.events[eventName].forEach((cb) => cb.apply(this, args))
	}
	subscribe(eventName, callback) {
		//订阅=>向事件中心中添加事件
		if (this.events[eventName]) {
			this.events[eventName].push(callback)
		} else {
			this.events[eventName] = [callback]
		}
	}
	unSubscribe(eventName, callback) {
		//取消订阅
		if (events[eventName])
			events[eventName] = events[eventName].filter((cb) => cb !== callback)
	}
}
