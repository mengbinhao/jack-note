const _create = (obj) => {
	function F() {}
	F.prototype = obj
	return new F()
}

//判断数据类型
//	typeof
//		注意 null === 'object'
//  	"undefined"、"string"、"boolean"、"number"、"bigint"、"symbol"、"object" 或 "function"
//	instanceof 右侧对象的原型对象是否在左侧对象的原型链上
//		IE下跨 iframe 调用时，[] instanceof Array不成立
//	Object.prototype.toString.call(obj)
//		1 若参数不为null或undefined,则将参数转为对象Object(obj),再作判断
//		2 转为对象后,取得该对象的[Symbol.toStringTag]属性值（可能会遍历原型链）作为tag,然后返回"[object " + tag +"]"形式的字符串
//  constructor

//右侧对象的原型对象是否在左侧对象的原型链上
//r mean Object or Array 构造函数
const _instanceOf = (l, r) => {
	if (r === null || (typeof r !== 'object' && typeof r !== 'function'))
		return false
	//获取对象的原型
	let proto = l === null ? null : Object.getPrototypeOf(l)
	//获取构造函数的原型对象
	const prototype = r.prototype
	while (true) {
		if (proto === null) return false
		if (proto === prototype) return true
		proto = Object.getPrototypeOf(proto)
	}
}

const getType = (obj) => {
	// return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
	// or
	// let match = Object.prototype.toString.call(obj).match(/ (\w+)]/)
	// return match[1].toLowerCase()
	return Object.prototype.toString.call(obj).replace(/^\[object (\w+)\]$/, '$1')
}

//Array.isArray 比 instanceof 或者 constructor 能胜任对 Proxy 的判定工作
//无论是从使用便利性上还是从能力范围上来讲，都建议使用 Array.isArray 来判断数组类型
//篡改 Proxy 对象的 constructor 和原型链
// const proxy = new Proxy([], {
// 	get(target, p) {
// 			if ('constructor' === p) return String;
// 			return Reflect.get(target, p);
// 	},
// 	getPrototypeOf() {
// 			return null;
// 	}
// });

// console.log(`Array.isArray(proxy)`, Array.isArray(proxy)); // true
// console.log(`proxy instanceof Array`, proxy instanceof Array); // false
// console.log(`proxy.constructor === Array`, proxy.constructor === Array); // false

const isType = (type) => (obj) => {
	return Object.prototype.toString.call(obj) === `[object ${type}]`
}

// generate a new obj
// mount prototype obj
// invoke Constructor
// return obj or ret
const _new = () => {
	let [Constructor, ...args] = [...arguments]
	//let Constructor = Array.prototype.shift.call(arguments)
	//same as let obj = {}
	//				obj.__proto__ == constructor.prototype
	let obj = Object.create(Constructor.prototype)
	let ret = Constructor.apply(obj, args)
	//in case Constructor return an object
	return ret !== null && (typeof ret === 'object' || typeof ret === 'function')
		? ret
		: obj
}

// check context
// assign context
// assign attribute to context
// invoke attribute
// delete attribute
// return ret
Function.prototype._call = function (context, ...args) {
	if (typeof this !== 'function') throw TypeError('invalid params')
	//context = context || window
	//若不为空包装一下
	context = !context ? window : Object(context)
	args = args ? args : []
	const key = Symbol()
	context[key] = this
	const ret = args.length > 0 ? context[key](...args) : context[key]()
	delete context[key]
	return ret
}

Function.prototype._apply = function (context = window, args = []) {
	if (typeof this !== 'function') throw new TypeError('invalid params')
	const key = Symbol()
	context[key] = this
	const ret = args.length > 0 ? context[key](...args) : context[key]()
	delete context[key]
	return ret
}

Function.prototype._bind = function (context = window, ...args) {
	if (typeof this !== 'function') throw new TypeError('invalid params')
	const fn = this
	//args = args ? args : []
	return function (...newArgs) {
		return fn.apply(context, [...args, ...newArgs])
	}
}

Function.prototype._bindAdvanced = function (context = window, ...args) {
	if (typeof this !== 'function') throw TypeError('invalid params')
	const fn = this
	args = args ? args : []
	const fBound = function (...newArgs) {
		//if invoke by new, this is fBound
		//if function invoke, this is context
		return fn.apply(this instanceof fBound ? this : context, [
			...args,
			...newArgs,
		])
	}
	//check下，箭头函数没有this.prototype
	//this这里指调用_bindAdvanced的那个函数,即下面的bar
	if (this.prototype) fBound.prototype = Object.create(this.prototype)
	return fBound
}

let foo = {
	prop: 'foo',
}
function bar(name, age) {
	console.log(this.prop, name, age)
}

bar.prototype.prop = 'bar'
let bindFoo = bar._bindAdvanced(foo, 'Jack')
bindFoo(33) // foo, jack, 18
new bindFoo(38) // bar, jack, 38

//curry
// const curry = function (fn) {
// 	let args = [].slice.call(arguments, 1)
// 	let that = this
// 	//return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args)
// 	return function () {
// 		return fn.apply(that, args.concat([].slice.call(arguments)))
// 	}
// }

//add(1, 2, 3) => fn = curryAdvanced(add, 1) => fn(2,3)
const curry1 = function (fn, ...args) {
	//let that = this
	return function (...newArgs) {
		let innerArgs = [...args, ...newArgs]
		if (innerArgs.length >= fn.length) {
			return fn.apply(null, innerArgs)
		} else {
			return curry1.apply(null, fn, innerArgs)
		}
	}
}

//add(1, 2, 3) => fn = curryAdvanced2(add) => fn(1)(2)(3)
const curry2 = function (fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(null, args)
		} else {
			return function (...newArgs) {
				return curried.apply(null, [...args, ...newArgs])
			}
		}
	}
}

//sum(1, 2)(3)() // 6
//sum(1)(2)(3)() // 6
const sum = (...args) => {
	let params = args
	const _sum = (...newArgs) => {
		if (newArgs.length === 0) {
			return params.reduce((acc, cur) => acc + cur, 0)
		} else {
			params = [...params, ...newArgs]
			return _sum
		}
	}
	return _sum
}

//从右往左执行
const compose = (...fns) => {
	if (!fns.length) return (v) => v
	if (fns.length === 1) return fns[0]
	return fns.reduce((a, b) => {
		return function (...args) {
			return a(b(...args))
		}
	})
}
const fn1 = (x) => {
	return x + 1
}
const fn2 = (x) => {
	return x + 2
}
const fn3 = (x) => {
	return x + 3
}
const fn4 = (x) => {
	return x + 4
}
const composeFunc = compose(fn1, fn2, fn3, fn4)
//console.log(composeFunc(1)) // 1+4+3+2+1=11

//最后一次说了算
const _debounce = (fn, timeout = 300) => {
	let timer, result
	return function (...args) {
		timer && clearTimeout(timer)
		timer = setTimeout(() => {
			result = fn.apply(this, args)
			timer = null
		}, timeout)
		return result
	}
}

//第一次说了算
function _throttle(fn, timeout = 300) {
	let last = 0,
		result
	return function (...args) {
		let now = +new Date()
		if (now - last > timeout) {
			result = fn.apply(this, args)
			last = +new Date()
		}
		return result
	}
}

//防抖代替节流
function _throttle2(fn, timeout = 300) {
	let timer
	return function (...args) {
		if (!timer) {
			timer = setTimeout(() => {
				fn.apply(this, args)
				timer = null
			}, timeout)
		}
	}
}

//setTimeout 模拟实现 setInterval
// 	1 使用setInterval时，某些间隔会被跳过
//  2 可能多个定时器会连续执行
function mySetInterval(fn, delay) {
	let timerId = null
	function interval() {
		fn()
		timerId = setTimeout(interval, delay)
	}
	timerId = setTimeout(interval, delay)
	return {
		cancel: () => {
			clearTimeout(timerId)
		},
	}
}

Array.prototype._map = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
	let ret = []
	for (let i = 0; i < this.length; i++) {
		//过滤空位
		//hasOwnProperty同效果
		if (i in this) ret.push(fn.call(undefined, this[i], i, this))
	}
	return ret
}

Array.prototype._reduce = function (fn, initialValue) {
	if (typeof fn !== 'function') throw new TypeError(fn + 'is not a function')
	let hasInitialValue = initialValue !== undefined,
		value = hasInitialValue ? initialValue : this[0]
	for (let i = hasInitialValue ? 0 : 1; i < this.length; i++) {
		if (i in this) value = fn(value, this[i], i, this)
	}
	return value
}

const once = (fn) => {
	let ret,
		isFirst = true
	return function (...args) {
		if (!isFirst) return ret
		ret = fn.call(this, ...args)
		isFirst = false
		return ret
	}
}

const _flat1 = (arr) => {
	let tmp = arr
	while (tmp.some((item) => Array.isArray(item))) tmp = [].concat(...tmp)
	return tmp
}

const _flat2 = (arr) => {
	return arr.reduce(
		//(acc, cur) => acc.concat(Array.isArray(cur) ? _flat2(cur) : cur),
		Array.isArray(cur) ? [...acc, ..._flat2(cur)] : [...acc, cur],
		[]
	)
}

const _flat3 = (arr, depth = 1) => {
	return depth > 0
		? arr.reduce(
				(acc, cur) =>
					Array.isArray(cur)
						? [...acc, ..._flat3(cur, depth - 1)]
						: [...acc, cur],
				[]
		  )
		: arr
}

//浅复制
//	1 扩展运算符
//     Object Spread 抛弃了源对象属性的描述符，无论它是数据属性还是存取器属性，无论是可配置的还是不可配置的
//     也无论是可枚举的还是不可枚举的，最终都转换为目标对象上的一个可枚举、可配置、可写的数据属性
//	2 Object.assign()
//       Object.assign() 可能会将数据赋值到目标对象的原型上，如果原型上有这个 key 的存取器属性的话
//  3 Object.defineProperties() + Object.getOwnPropertyDescriptors()
const shallowClone = (original) => {
	return Object.defineProperties({}, Object.getOwnPropertyDescriptors(original))
}

//深复制
//	1 JSON.parse(JSON.stringify(original))
//		若obj里有Date对象，转换后时间只是字符串而不是对象
//		若obj里有RegExp、Error、Map、Set对象，转换后得到空对象
//		若obj里有function、undefined，Symbol转换后直接丢失,若以上三个作为数组元素转换后是null
//		若obj里有NaN、Infinity和-Infinity，转换后变成null
//		若对象中存在循环引用则转换报错
//		JSON.stringify()只能序列化对象的可枚举的自有属性
//		对象toJSON属性
//	结论：只能处理string、boolean、number、null、object、array
//  2 手动实现
const deepClone = (source, cache = new WeakMap()) => {
	const isObject = (obj) => {
		return (
			obj !== null && (typeof obj === 'object' || typeof obj === 'function')
		)
	}
	if (!isObject) return source
	const Constructor = source.constructor
	if (/^(RegExp|Date|Map|Set)$/i.test(Constructor.name))
		return new Constructor(source)
	//根据需求是否抛
	//if (cache.has(source)) throw new TypeError('circular reference')
	if (cache.has(source)) return cache.get(source)
	//let target = new source.Constructor()
	let target = Array.isArray(source) ? [] : {}
	cache.set(source, target)

	// Reflect.ownKeys(source).forEach((key) => {
	// 	if (isObject(source[key])) {
	// 		target[key] = deepClone(source[key], cache)
	// 	} else {
	// 		target[key] = source[key]
	// 	}
	// })

	Object.getOwnPropertySymbols(source).forEach((symKey) => {
		if (isObject(source[symKey])) {
			target[symKey] = deepClone(source[symKey], cache)
		} else {
			target[symKey] = source[symKey]
		}
	})

	Object.keys(source).forEach((key) => {
		if (isObject(source[key])) {
			target[key] = deepClone(source[key], cache)
		} else {
			target[key] = source[key]
		}
	})

	// for (let key in source) {
	// 	if (Object.prototype.hasOwnProperty.call(source, key)) {
	// 		if (isObject(source[key])) {
	// 			target[key] = deepClone(source[key], cache)
	// 		} else {
	// 			target[key] = source[key]
	// 		}
	// 	}
	// }
	return target
}

const _inherit = (function () {
	let F = function () {}
	return function (Child, Parent) {
		F.prototype = Parent.prototype
		Child.prototype = new F()
		//fix constructor
		Child.prototype.constructor = Child
		Child.uber = Parent.prototype
	}
})()

//XMLHttpRequest.UNSENT
//XMLHttpRequest.OPENED
//XMLHttpRequest.HEADERS_RECEIVED
//XMLHttpRequest.LOADING
//XMLHttpRequest.DONE
const simulateAJAX = (options) => {
	options = options || {}
	options.url = options.url || ''
	options.method = options.method.toUpperCase() || 'GET'
	options.async = options.async || true
	options.data = options.data || {}
	options.success = options.success || function () {}
	options.fail = options.fail || function () {}
	if (options.headers) {
		for (let [k, v] of options.headers.entries()) xhr.setRequestHeader(k, v)
	}
	let xhr = new XMLHttpRequest()
	xhr.open(options.url, options.method, options.async)
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE) return
		const status = xhr.status
		if (status >= 200 && status < 400) {
			options.success(xhr.responseText)
		} else {
			options.fail(xhr.statusText)
		}
	}
	xhr.onerror = function () {
		//xhr.statusText
	}
	xhr.timeout = 3000
	xhr.ontimeout = function () {}
	xhr.responseType = 'json'
	let postData = []
	Object.keys(options.data).forEach((key) => {
		postData.push(key + '=' + options.data[key])
	})
	if (options.method === 'POST') {
		xhr.open(options.method, options.url, options.async)
		xhr.send(postData)
	} else if (options.method === 'GET') {
		xhr.open(
			options.method,
			`${options.url}?` + postData.join('&'),
			options.async
		)
		//xhr.send("foo=bar&lorem=ipsum")
		//xhr.send(document)
		//xhr.send('string')
		//xhr.send(new Blob())
		//xhr.send(new Int8Array())
		//xhr.send(document)
		xhr.send(null)
	}
}

const promiseAJAX = (method, url, headers, data) => {
	return new Promise((resolve, reject) => {
		let xhr = XMLHttpRequest()
		xhr.open(method, url)
		for (let [k, v] of headers.entries()) xhr.setRequestHeader(k, v)
		xhr.onreadystatechange = function () {
			if (xhr.readyState !== XMLHttpRequest.DONE) return
			const status = xhr.status
			if (status >= 200 && status < 400) {
				resolve(xhr.responseText)
			} else {
				reject(new Error(xhr.statusText))
			}
		}
		xhr.onerror = function (e) {
			reject(e)
		}
		xhr.send(data)
	})
}

//动态promise加载脚本
const loadJS = (files, done) => {
	const head = document.getElementsByTagName('head')[0]
	Promise.all(
		files.map((file) => {
			return new Promise((resolve) => {
				const s = document.createElement('script')
				s.type = 'text/javascript'
				s.async = true
				s.src = file
				s.addEventListener('load', (e) => resolve(), false)
				head.appendChild(s)
			})
		})
	).then(done)
}

// loadJS(['test1.js', 'test2.js'], () => {
//  用户的回调逻辑
// })

const getSearchParams = () => {
	const searchParams = new URLSearchParams(window.location.search)
	const paramsObj = {}
	for (const [k, v] of searchParams.entries()) paramsObj[k] = v
	return paramsObj
}

const parseParam = (url) => {
	let paramsStr = /.+\?(.+)$/.exec(url)[1]
	let paramsArr = paramsStr.split('&')
	let paramsObj = {}
	paramsArr.forEach((param) => {
		if (/=/.test(param)) {
			let [key, val] = param.split('=')
			val = decodeURIComponent(val)
			val = /^\d+$/.test(val) ? parseFloat(val) : val
			if (paramsObj.hasOwnProperty(key)) {
				paramsObj[key] = [].concat(paramsObj[key], val)
			} else {
				paramsObj[key] = val
			}
		} else {
			paramsObj[param] = true
		}
	})
	return paramsObj
}

//Proxy
const user = {
	_name: 'Guest',
	// 存取器属性与数据属性互斥
	// 可以定义一个虚拟属性
	// let user = {
	// 	 firstName: "John",
	// 	 lastName: "Smith",
	// 	 get fullName() {
	// 		 return `${this.firstName}-${this.lastName}`
	// 	 }
	// }
	get name() {
		return this._name
	},
}

const handler = {
	get(target, key, receiver) {
		//return target[key]
		return Reflect.get(target, key, receiver)
	},
	set(target, key, val, receiver) {
		return Reflect.set(target, key, val, receiver)
	},
	//拦截函数
	apply() {},
	//'a' in obj
	has() {},
	//for in
	ownKeys() {},
	construct() {},
	deleteProperty() {},
}

let userProxy = new Proxy(user, handler)

let admin = {
	__proto__: userProxy,
	_name: 'Admin',
}
//console.log(admin.name)

//practice
const actions = () => {
	const fnA = () => {
		/*do sth*/
	}

	function fnB() {
		/*do sth other*/
	}

	const fnC = () => {
		/*send log*/
	}
	return new Map([
		[/^guest_[1-4]$/, fnA],
		[/^guest_5$/, fnB],
		[/^guest_.*$/, fnC],
		//...
	])
}

const onButtonClick = (identity, status) => {
	let action = [...actions()].filter(([key, cb]) =>
		key.test(`${identity}_${status}`)
	)
	action.forEach(([key, cb]) => cb.call(this))
}

//策略
const TYPE = {
	JUICE: 'juice',
	SALAD: 'salad',
	JAM: 'jam',
}

const strategies = {
	[TYPE.JUICE]: function (fruits) {
		console.log('榨果汁中...')
		return '果汁'
	},
	[TYPE.SALAD]: function (fruits) {
		console.log('做沙拉中...')
		return '沙拉'
	},
	[TYPE.JAM]: function (fruits) {
		console.log('做果酱中...')
		return '果酱'
	},
}

function enjoy({ type, fruits }) {
	if (!type) {
		console.log('请直接享用！')
		return
	}
	if (!fruits || !fruits.length) {
		console.log('请先采购水果！')
		return
	}
	return strategies[type](fruits)
}

//enjoy({ type: 'juice1', fruits: '啦啦啦' })

//千分位
const toThousands = (num) => {
	num = num.toString()
	let result = ''
	while (num.length > 3) {
		result = ',' + num.substring(num.length - 3) + result
		num = num.substring(0, num.length - 3)
	}
	result = num + result
	return result
}

//异步执行cb
const repeat = (cb, times, delay = 1000) => {
	return async function (...args) {
		for (let i = 0; i < times; i++) {
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					cb.call(null, ...args)
					resolve()
				}, delay)
			})
		}
	}
}
const repeatFn = repeat(console.log, 4, 1000)
//repeatFn('hello')

//红绿黄灯
const red = () => console.log('red')
const yellow = () => console.log('yellow')
const green = () => console.log('green')

const light = (cb, timeout) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			cb()
			resolve()
		}, timeout)
	})
}

let endCnt = 0
const start = () => {
	if (endCnt++ >= 3) {
		console.log('finish lighting~~')
		return
	}
	Promise.resolve()
		.then(() => {
			return light(red, 3000)
		})
		.then(() => {
			return light(yellow, 2000)
		})
		.then(() => {
			return light(green, 1000)
		})
		.then(() => {
			start()
		})
}

//start()

//question: a == 1 && a == 2 && a == 3
//隐式转换会调用 valueOf
const a = {
	value: 1,
	valueOf() {
		return this.value++
	},
	//在对象 valueOf 函数不存在的情况下会调用 toString 方法
	// toString() {
	// 	return this.value++
	// },
}

let obj = {
	[Symbol.iterator]() {
		return {
			num: 0,
			max: 5,
			next() {
				if (this.num >= this.max) {
					return { value: undefined, done: true }
				} else {
					return { value: this.num++, done: false }
				}
			},
		}
	},
}

// for (let c of obj) {
// 	console.log(c)
// }

function* range(start, end) {
	for (let i = start; i < end; i++) {
		yield i
	}
}

class Range {
	constructor(start, end) {
		this.start = start
		this.end = end
	}
	*[Symbol.iterator]() {
		for (let i = this.start; i <= this.end; ++i) {
			yield i
		}
	}
}

//打印出当前网页使用了多少种HTML元素
const elementsOnCurrentPage = () => {
	return [
		...new Set([...document.querySelectorAll('*')].map((el) => el.tagName)),
	].length
}

//无限打印
function* repeatedArr(arr) {
	let i = 0
	while (true) {
		yield arr[i++ % arr.length]
	}
}

let infiniteNameList = repeatedArr([
	'Eddard Stark',
	'Catelyn Stark',
	'Rickard Stark',
])

let sleep = (ms) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, ms)
	})

// ;(async () => {
// 	for (const name of infiniteNameList) {
// 		await sleep(1000)
// 		console.log(name)
// 	}
// })()
