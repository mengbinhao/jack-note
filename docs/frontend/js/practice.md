### Array

#### deconstruction

```javascript
let csvFileLine = '1997,John Doe,US,john@doe.com,New York'
let { 2: country, 4: state } = csvFileLine.split(',')

//交换参数数值
let param1 = 1
let param2 = 2
;[param1, param2] = [param2, param1]

//接收函数返回的多个结果
let getFullPost = async () => {
	return await Promise.all([fetch('/post'), fetch('/comments')])
}
let [post, comments] = getFullPost()
```

#### unique arr

```javascript
//arr only includes undefined、null、boolean、string、number
let array = [1, 1, 2, '3', false, undefined, null, NaN, '', 0]
let uniqueArr = [...new Set(array)]
let a = Array.from(new Set(array))
```

#### merge

```javascript
let mergedArr = [...arr1, ...arr2]
```

#### ensure arr length

```javascript
//指定长度值也相等
let arr1 = Array(5).fill('')
let arr2 = [...new Array(3).keys()]
```

#### Array.from(arrayLike[, mapFn[, thisArg]])

```javascript
let array = [
	{ name: '大漠', email: 'w3cplus@hotmail.com' },
	{ name: 'Airen', email: 'airen@gmail.com' },
]
let name = Array.from(array, ({ name }) => name)
let index = Array.from({length: 5}, (_, idx) => idx)
```

#### filter falsy

```javascript
let array = [0,1,'0','1',undefined,true,false,null,'undefined','null',NaN,'1' + 0]
let ret = array.filter(Boolean)
```

#### arr slice

```javascript
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr.length = 4
//or
arr = arr.slice(0, 4)
```

#### clear arr

```javascript
array.length = 0
```

#### get arr item

```javascript
//get last
array.slice(-1)
array.slice(array.length - 1)

//min
Math.min(...numbers)
Math.min.apply(Math, numbers)

//max
Math.max(...numbers)
Math.max.apply(Math, numbers)

//random get item
let randomItem = arr[Math.floor(Math.random() * arr.length)]
```

#### isEmptyArr

```javascript
let flag = Array.isArray(arr) && !arr.length
```

#### arr.flat(depth) or ...

```javascript
//如果数组中有多个空值时，flat()会把空值丢弃
let arr = ['a', , , , 'b', ['c', , , 'd'], 'e']
let flatArray = arr.flat()

let _flat = (arr, depth = 1) => {
	return depth > 0
		? arr.reduce(
				(acc, cur) =>
					Array.isArray(cur)
						? [...acc, ...flatten3(cur, depth - 1)]
						: [...acc, cur],
				[]
		  )
		: arr
}
```

#### 快速创建数字数组

```javascript
let numArray = Array.from(new Array(10), (x, i) => i)
let numArray = Array.from({length: 10}, (x, i) => i)
[...new Array(3).keys()]
```

#### 数组交集

```javascript
let similarity = (arr1, arr2) => arr.filter((v) => arr2.includes(v))
//加new Set()去重
new Set([...arr1, ...arr2])
arr1.filter(v => arr2.has(v))
arr1.filter(v => !arr2.has(v))
```

#### reduce

```javascript
let arr = [1, 2, 3, 4, 5]
//数组去重
arr.reduce((prev, cur)=>{
  !prev.includes(cur) && prev.push(cur)
  return prev
}, [])

//reduce方法同时实现map和filter
let numbers = [10, 20, 30, 40]
let doubledOver50 = numbers.reduce((acc, cur) => {
  cur = cur * 2
  if (cur > 50) acc.push(cur)
  return acc
}, [])

//统计数组中相同项的个数
let cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota']
let carsObj = cars.reduce((obj, name) => {
  obj[name] = obj[name] ? obj[name]++ : 1
  return obj
}, {})
```

#### 过滤对象数组

```javascript
let reducedFilter = (data, keys, fn) =>
	data.filter(fn).map((el) =>
		keys.reduce((acc, key) => {
			acc[key] = el[key]
			return acc
		}, {})
	)
```

#### 生成由随机整数组成的数组，数组长度和元素大小可自定义

```javascript
let genNumArr = (length, limit) =>
  Array.from({ length }, _ => Math.floor(Math.random() * limit))
genNumArr(10, 100)
```

#### 洗牌算法

```javascript
let shuffle = (arr) => {
	// copy一份
	const result = [...arr]
	for (let i = result.length; i > 0; i--) {
		// 随机从[0,i - 1]产生一个index, 将i - 1与index对应数组的值进行交换
		const index = Math.floor(Math.random() * i)
		;[result[index], result[i - 1]] = [result[i - 1], result[index]]
	}
	return result
}
```

### Object

#### deconstruction

```javascript
let obj = {
	name: '大漠',
	email: 'w3cplus@hotmail.com',
	joined: '2019-06-19',
	followers: 45,
}
let user = {},
	userDetails = {}
;({ name: user.name, email: user.email, ...userDetails } = obj)

//删除不必要的属性
let { _internal, tooBig, ...cleanObject } = {
	prop1: '1',
	_internal: 'secret',
	tooBig: {},
	prop2: '2',
	prop3: '3',
}
```

#### isType

```javascript
let isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target) 
let isArray = isType('Array')([1, 2, 3])
```

#### isEmptyObject

```javascript
let flag = isType('Object')(obj) && Object.keys(obj).length === 0
```

#### merge(ShallowCopy)

```javascript
let mergedObject = { ...object1, ...object2 }
let mergedObject2 = {
	...{ name: 'John', age: '18' },
	...{ name: 'John1', age: '12' },
}

let returnedTarget = Object.assign(target, source)
```

#### clone

```javascript
//stringify有缺陷
let obj = JSON.parse(JSON.stringify(_obj))
```

#### check property

```javascript
if (obj.xxx) 

obj.hasOwnProperty('name')

'name' in obj //检测原型
```

#### create pure object

```javascript
let pureObject = Object.create(null)
```

#### arr obj to obj

```javascript
let array = [
	{ name: '大漠', email: 'w3cplus@gmail.com' },
	{ name: 'Airen', email: 'airen@gmail.com' },
]
let result = array.reduce((acc, item) => {
	return {
		...acc,
		[item.name]: item.email,
	}
}, {})
```

#### add property with condition

```javascript
let getUser = (emailIncluded) => {
  return {
    name: '大漠',
    blog: 'w3c',
    ...emailIncluded && {email: 'w3cplus@hotmail.com'}
  }
}
```

#### `Object.entries(obj)、Object.fromEntries(iterable) `

```javascript
let obj = {
    one: 2,
    two: 4,
    three: 9
}
//[['one', 2], ['two', 4], ['three', 9]]
console.log(Object.entries(obj)) 

let map = new Map()
map.set('one', 2)
map.set('two', 4)
map.set('three', 9)
console.log(Object.fromEntries(map))

let array = [['one',2],['two',4],['three',9]]
console.log(Object.fromEntries(array))
//不使用fromEntries
let obj = Array.from(array).reduce((acc, [key, val]) => Object.assign(acc, {[key]:val}), {})
let obj1= Array.from(array).reduce((acc, [key, val]) => ({...acc, [key]:val}), {})

//求平方根
let map = array.map(([key, val]) => [key, Math.sqrt(val)])

//handle url
let paramsStr = 'userName=demo&userId=98409189'
let searchParams = new URLSearchParams(paramsStr)
let urlQueryObj = Object.fromEntries(searchParams)
console.log(urlQueryObj)
```

#### obj.flatMap

```javascript
let scattered = ['my favorite', 'hamburger', 'is a', 'chicken sandwich']
// 使用map()来转换数组
// [["my", "favorite"], ["hamburger"], ["is", "a"], ["chicken", "sandwich"]] 
let huh = scattered.map((chunk) => chunk.split(' '))
// 使用flat()来拍平数组
let flatHuh = huh.flat()
// ["my", "favorite", "hamburger", "is", "a", "chicken", "sandwich"]

// 使用flatMap可以一步到位
let flatMapScattered = scattered.flatMap((chunk) => chunk.split(' '))
```

### Function

#### deconstruction params、default value

```javascript
//null会覆盖默认参数
let doSomething = ({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) => {
	// ...
}

let car = {
	model: 'bmw 2018',
	engine: {
		v6: true,
		turbo: true,
		vin: 12345,
	},
}
let modelAndVIN = ({ model, engine: { vin } }) => {
	console.log(`model: ${model} vin: ${vin}`)
}
```

#### required params

```javascript
let mandatory = () => {
	throw new Error('Missing parameter!')
}
let foo = (bar = mandatory()) => bar
```

#### 惰性载入函数

```javascript
let foo = (a, b) => {
	if (a != b) {
		foo = function () {
			console.log('aaa')
		}
	} else {
		foo = function () {
			console.log('bbb')
		}
	}
	return foo()
}
```

#### 一次性函数

```javascript
let once = () => {
	console.log('msg')
	once = () => {
		console.log('foo')
	}
}
```

### String

#### 字符串比较时间先后

```javascript
let a = '2014-08-08'
let b = '2014-09-09'
console.log(a > b, a < b) // false true
console.log('21:00' < '09:10') // false
console.log('21:00' < '9:10') // true 时间形式注意补0
```

#### JS 对象转 url 查询字符串

```javascript
let obj2QueryStr = (obj) => {
	return Object.keys(obj)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
		.join('&')
}
```

#### 生成随机 ID

```javascript
let randomId = (len) => Math.random().toString(36).substr(3, len)
let id = randomId(10)
```

#### 生成随机 HEX 色值

```javascript
let randomColor = () => {
	return (
		'#' +
		Math.floor(Math.random() * 0xffffff)
			.toString(16)
			.padEnd(6, '0')
	)
}
let color = randomColor()
```

#### 生成星级评分

```javascript
let startScore = (rate) => '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
console.log(startScore(3))
```

### Number

#### 取整

```javascript
//to integer
//数字字符串转换成整数型
~~'15.123'

//浮点数转换为整数
//Math.floor()、Math.ceil()或Math.round()
//|的行为取决于处理的是正数还是负数
console.log(23.9 | 0)
console.log(-23.9 | 0)

//|还可以用于从整数的末尾删除任意数量的数字
let str = '1553'
Number(str.substring(0, str.length - 1))
console.log((1553 / 10) | 0)
console.log((1553 / 100) | 0)
console.log((1553 / 1000) | 0)
```

#### 判断奇偶数

```javascript
//对一个数字& 1可以判断奇偶数，负数也同样适用
let OddEven = (num) => (!!(num & 1) ? 'odd' : 'even')
```

#### 数字补零操作

```javascript
let addZero1 = (num, len = 2) => `0${num}`.slice(-len)
let addZero2 = (num, len = 2) => `${num}`.padStart(len, '0')
```

#### 随机生成六位数字验证码

```javascript
let code = Math.floor(Math.random() * 1000000)
	.toString()
	.padStart(6, '0')
```

#### 精确小数

```javascript
let roundNum = (num, decimal) =>
	Math.round(num * 10 ** decimal) / 10 ** decimal
let num = roundNum(1.69, 1)
```

#### 生成范围随机数

```javascript
let randomNum = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min
let num = randomNum(1, 10)
```

### Boolean

```javascript
let flagA = true // 条件A
let flagB = false // 条件B
;(flagA || flagB) && Func() // 满足A或B时执行
;(flagA || !flagB) && Func() // 满足A或不满足B时执行
flagA && flagB && Func() // 同时满足A和B时执行
flagA && !flagB && Func() // 满足A且不满足B时执行
!flag && Func()
arr.length && Func()
Object.keys(obj).length && Func()
```

### Data Convert

#### 隐式强制类型转换

1. +/-/!/~

- +/- 一元运算符 => 运算符会将操作数进行 ToNumber 处理
- ! => 会将操作数进行 ToBoolean 处理
- ~ => (~x)相当于 -(x + 1) eg: ~(-1) ==> 0; ~(0) ==> 1; 在 if (...)中作类型转换时, 只有-1 时, 才为假值
- +加号运算符 => 若操作数有 String 类型, 则都进行 ToString 处理, 字符串拼接. 否则进行 ToNumber 处理, 数字加法

2. 条件判断

- if (...), for(;;;), while(...), do...while(...)中的条件判断表达式
- ? : 中的条件判断表达式
- || 和 && 中的中的条件判断表达式

以上遵循 ToBoolean 规则

3. ||和&&

- 返回值是两个操作数的中的一个(且仅一个). 首先对第一个操作数条件判断, 若为非布尔值则进行 ToBoolean 强制类型转换.再条件判断
- || => 条件判断为 true, 则返回第一个操作数; 否则, 返回第二个操作数. 相当于 a ? a : b
- && => 条件判断为 true, 则返回第二个操作数; 否则, 返回第一个操作数, 相当于 a ? b : a

#### 显示类型转换(除了各个基本类型的构造函数还有以下方法)

1. boolean

```javascript
let isTrue = !0
let isFalse = !1
let isFalse = !!0

!!'' // > false
!!0 // > false
!!null // > false
!!undefined // > false
!!NaN // > false
!!'hello' // > true
!!1 // > true
!!{} // > true
!![] // > true
```

2. string

```javascript
let val = 1 + ''
//obj to string,实际调用toString
//当然也可以覆盖对象的toString和valueOf方法来自定义对象的类型转换
'the Math object:' + Math([1, 2, 3].map(String))
```

3. number

```javascript
//obj to number实际调用valueOf
'32' * 1
'32' / 1 +
	//+只对null、""、false、数值字符串有效
	'12' +
	true +
	new Date('2019-02-14')(['1', '2', '3'].map(Number))

//进行-0、 *1 、/1 可以转number
//ES6的Number.parseInt  Number.parseFloat 针对字符串，如果是其它类型先转换成字符串
```

### Promise

#### 优雅处理 AA 参数

```javascript
let AsyncTo = (promise) => {
	return promise.then((data) => [undefined, data]).catch((err) => [err])
}
let [err, res] = await AsyncTo(Func())
```

#### 循环 promise

```javascript
//Array.forEach不会处理回调函数返回的promise,只是简单无视
//当需要执行顺序如下
let printFiles = async () => {
	let files = await getFilePaths()
	for (let file of files) {
		let contents = await fs.readFile(file, 'utf8')
		console.log(contents)
	}
}
```

#### 并行循环 promise

```javascript
//当需要并行执行
let printFiles = async () => {
	let files = await getFilePaths()
	await Promise.all(
		files.map(async (file) => {
			let contents = await fs.readFile(file, 'utf8')
			console.log(contents)
		})
	)
}
```

### Date

#### 得到想要的时间格式

```javascript
switchTime: (val = +new Date(), dateType = 'YYYY-MM-DD hh:mm:ss') => {
	// 将字符串转换成数字
	let timeStamp = +new Date(val)
	// 如果转换成数字出错
	if (!timeStamp) return val
	let str
	// 得到时间字符串
	let dateStr = new Date(timeStamp)
	str = dateType.replace('YYYY', dateStr.getFullYear())
	str = str.replace(
		'MM',
		(dateStr.getMonth() + 1 < 10 ? '0' : '') + (dateStr.getMonth() + 1)
	)
	str = str.replace(
		'DD',
		(dateStr.getDate() < 10 ? '0' : '') + dateStr.getDate()
	)
	str = str.replace(
		'hh',
		(dateStr.getHours() < 10 ? '0' : '') + dateStr.getHours()
	)
	str = str.replace(
		'mm',
		(dateStr.getMinutes() < 10 ? '0' : '') + dateStr.getMinutes()
	)
	str = str.replace(
		'ss',
		(dateStr.getSeconds() < 10 ? '0' : '') + dateStr.getSeconds()
	)
	return str
}

switchTime(new Date(), 'YYYY-MM-DD hh') // 2019-05-22 11
switchTime(new Date(), 'YYYYMMDD hh:mm:ss') // 20190522 11:00:00
```

#### 时间显示转换

```javascript
let timeView = (val) => {
    let now = +new Date() // 当时时间
    let timeStamp = +new Date(val) // 需要处理的时间
    let result = now - timeStamp // 相差的时间戳
    let min = 60 * 1000 // 分钟的毫秒数
    let hour = 60 * 60 * 1000 // 小时的毫秒数
    let day = 60 * 60 * 1000 * 24 // 日的毫秒数
    if (result / min < 1) {
        return '刚刚发布'
    } else if (result / min < 60) {
        return Math.floor(result / min) + '分钟前'
    } else if (result / hour > 1 && result / hour < 24) {
        return Math.floor(result / hour) + '小时前'
    } else if (result / day > 1 && result / day < 7) {
        return Math.floor(result / day) + '天前'
    } else if (this.switchTime(now, 'YYYY') === this.switchTime(timeStamp, 'YYYY')) {
        return this.switchTime(timeStamp, 'MM月DD日')
    } else {
        return this.switchTime(timeStamp, 'YYYY年MM月DD日')
    }
}
```

### DOM

#### 显示全部 DOM 边框：调试页面元素边界时使用

```javascript
;[].forEach.call($$('*'), (dom) => {
	dom.style.outline =
		'1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
})
```

#### 自适应页面

```javascript
let AutoResponse = (width = 750) => {
	let target = document.documentElement
	target.clientWidth >= 600
		? (target.style.fontSize = '80px')
		: (target.style.fontSize = (target.clientWidth / width) * 100 + 'px')
}
```

#### XSS

```javascript
let FilterXss = (content) => {
	let elem = document.createElement('div')
	elem.innerText = content
	let result = elem.innerHTML
	elem = null
	return result
}
```

#### 存取 LocalStorage

```java
let love = JSON.parse(localStorage.getItem("love"))
localStorage.setItem("love", JSON.stringify("I Love You"))
```

#### 文件大小显示转换

```javascript
let bytesToSize = (bytes) => {
	if (bytes === 0) return '0 B'
	let k = 1024 // or 1024
	let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	let i = Math.floor(Math.log(bytes) / Math.log(k))
	return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
```

### Code

#### 1 不要使用否定条件式

```javascript
let isEmailVerified = (email) => {
	// 实现
}
if (isEmailVerified(email)) {
	// 做一些事...
}
if (isVerified) {
	// 做一些事...
}
```

#### 2 对于多个条件，使用 `Array.includes`

```javascript
let checkCarModel = (model) => {
	let models = ['peugeot', 'renault']
	if (models.includes(model)) {
		console.log('model valid')
	}
}
```

#### 3 匹配所有条件，使用 `Array.every` 或者 `Array.find`

```javascript
let checkEveryModel = (model) => {
	return cars.every((car) => car.model === model)
}
let checkEveryModel = (model) => {
	return cars.find((car) => car.model !== model) === undefined
}
```

#### 4 匹配部分条件，使用 `Array.some`

```javascript
let checkForAnyModel = (model) => {
	return cars.some((car) => car.model === model)
}
```

#### 5 提前返回而不是使用 `if...else` 分支

```javascript
let checkModel = ({model, year} = {}) => {
  if(!model && !year) return 'No car'
  if(!model) return 'No car model'
  if(!year) return 'No car year'
  ...
}
```

#### 6 使用索引或者映射，而不是 `switch` 语句

```javascript
//not switch
let getCarsByState = (state) => {
	switch (state) {
		case 'usa':
			return ['Ford', 'Dodge']
		case 'france':
			return ['Renault', 'Peugeot']
		case 'italy':
			return ['Fiat']
		default:
			return []
	}
}

//use map
let cars = new Map()
	.set('usa', ['Ford', 'Dodge'])
	.set('france', ['Renault', 'Peugeot'])
	.set('italy', ['Fiat'])

let getCarsByState = (state) => cars.get(state) || []

//use obj
let carState = {
	usa: ['Ford', 'Dodge'],
	france: ['Renault', 'Peugeot'],
	italy: ['Fiat'],
}

let getCarsByState2 = (state) => carState[state] || []
```

### Mis

- callback: u define, u don't invoke, but it is invoked afterwards

- 分号注意

  - 以小括号开头的前一条语句

  ```javascript
  ;(function (a) {
  	console.log(a)
  })()
  // 这里没有被自动插入分号
  (function (b) {
    console.log(b)
  })()
  ```

  - 以中括号开头的前一条语句

  ```javascript
  let a = [[]]
  // 这里没有被自动插入分号
  [(3, 2, 1, 0)].forEach((e) => console.log(e))
  ```

  - 以正则开头的前一条语句

  ```javascript
  let x = 1,
  	g = { test: () => 0 },
  	b = 1
    // 这里没有被自动插入分号
    /a/g.test('abc')
  ```

  - 以`Template`开头的前一条语句

  ```javascript
  let f = () => ''
  let g = f
  // 这里没有被自动插入分号
  `Template`.match(/(a)/)
  ```

  - js 文件合并的时候最好开始加分号或`void function()()`
  - do...while 有分号
  - 函数表达式有分号

- `use strict`只能出现在脚本、模块和函数体的最前面
- debug border
