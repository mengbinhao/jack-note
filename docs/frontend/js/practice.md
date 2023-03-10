### Array

#### deconstruction

```javascript
const csvFileLine = '1997,John Doe,US,john@doe.com,New York'
const { 2: country, 4: state } = csvFileLine.split(',')

//交换参数数值
let param1 = 1
let param2 = 2;
[param1, param2] = [param2, param1]

//接收函数返回的多个结果
async function getFullPost(){
  return await Promise.all([
     fetch('/post'),
     fetch('/comments')
  ]);
}
const [post, comments] = getFullPost()
```

#### unique arr

```javascript
//arr only includes undefined、null、boolean、string和number
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArr = [...new Set(arr)]
Array.from(new Set(arr))
```

#### merge

```javascript
const mergedArr = [...arrOne, ...arrTwo ]
```

#### ensure arr length

```javascript
//指定长度值也相等
Array(5).fill('')

[...new Array(3).keys()]
```

#### Array.from(arrayLike[, mapFn[, thisArg]])

```javascript
const array = [
    { name: '大漠', email: 'w3cplus@hotmail.com' },
    { name: 'Airen', email: 'airen@gmail.com' } ]
const name = Array.from(array, ({ name }) => name)
```

#### filter falsy

```javascript
const array = [0, 1, '0', '1', '大漠', 'w3c.com', undefined, true, false, null, 'undefined', 'null', NaN, 'NaN', '1' + 0]
const ret = array.filter(Boolean)
```

#### arr slice

```javascript
let arr= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr.length = 4
//or
arr = arr.slice(0, 4)
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
const randomItem = arr[Math.floor(Math.random() * arr.length)]
```

#### clear arr

```javascript
array.length = 0
```

#### isEmptyArr

```javascript
const flag = Array.isArray(arr) && !arr.length
```

#### arr.flat(depth)  or  ...

```javascript
//如果数组中有多个空值时，使用flat()来转换数组时，将会把空值丢弃
const arr = ['a', , , , 'b', ['c', , , 'd'], 'e']
const flatArray = arr.flat()
console.log(flatArray)

function flattenArray(arr) {
    const flattened = [].concat(...arr)
    return flattened.some(item => Array.isArray(item)) ? flattenArray(flattened) : flattened
}
```

#### 快速创建数字数组

```javascript
const numArray = Array.from(new Array(10), (x, i)=> i)
```

#### 数组交集

```javascript
const similarity = (arr, values) => arr.filter(v => values.includes(v))
```

#### reduce

```javascript
const arr = [1, 2, 3, 4, 5]
//累和
arr.reduce((prev, cur) => prev + cur))
//阶乘
arr.reduce((prev, cur) => prev * cur)
//最大值
arr.reduce((prev, cur) => Math.max(prev, cur))
//最小值
arr.reduce((prev, cur) => Math.min(prev, cur))

//数组去重
arr.reduce((prev, cur)=>{
  !prev.includes(cur) && prev.push(cur)
  return prev
}, [])

//reduce方法同时实现map和filter
const numbers = [10, 20, 30, 40]
const doubledOver50 = numbers.reduce((finalList, num) => {
  num = num * 2
  if (num > 50) {
    finalList.push(num)
  }
  return finalList
}, [])


//统计数组中相同项的个数
const cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota']
const carsObj = cars.reduce(function (obj, name) {
  obj[name] = obj[name] ? ++obj[name] : 1
  return obj
}, {});
```

#### 过滤对象数组

```javascript
const reducedFilter = (data, keys, fn) =>data.filter(fn).map(el =>keys.reduce((acc, key) => {          acc[key] =el[key]
   return acc
}, {}))
```



### Object

#### deconstruction

```javascript
const obj = { name: '大漠', blog: 'w3c', email: 'w3cplus@hotmail.com', joined: '2019-06-19', followers: 45 }
let user = {}, userDetails = {};
({name: user.name, email: user.email, ...userDetails} = obj)

//删除不必要的属性
let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:"secret", tooBig:{}, el2: '2', el3: '3'}
```

#### isType

```javascript
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target) const isArray = isType('Array')([1, 2, 3])
```

#### isEmptyObject

```javascript
const flag = isType('Object')(obj) && !Object.keys(obj).length
```

#### merge

```javascript
const mergedObject = { ...objectOne, ...objectTwo }
const mergedObject2 = { ...{name: 'John', age: '18'}, ...{name: 'John1', age:'12'}}
//Object.assign(target, ...sources)
const returnedTarget = Object.assign(target, source)
```

#### clone

```javascript
const obj = JSON.parse(JSON.stringify(_obj));
```

#### check property

```javascript
if (obj.xxx)

obj.hasOwnProperty('name')

'name' in obj //can get property according to __proto__
```

#### create pure object

```javascript
const pureObject = Object.create(null)
```

#### arr obj to obj

```javascript
const array = [
    { name: '大漠', email: 'w3cplus@gmail.com' },
    { name: 'Airen', email: 'airen@gmail.com' }
]
const result = array.reduce((accumulator, item) => {
    return {
        ...accumulator,
        [item.name]: item.email
    }
}, {})
```

#### add property with condition

```javascript
const getUser = (emailIncluded) => {
    return {
        name: '大漠',
        blog: 'w3c',
        ...emailIncluded && {email: 'w3cplus@hotmail.com'}
    }
}
const user = getUser(true)
console.log(user)
const userWithoutEmail = getUser(false)
console.log(userWithoutEmail) > Result: {name: "大漠", blog: "w3c"}
```

#### `Object.entries(obj)、Object.fromEntries(iterable) `

```javascript
const obj = {
    one: 2,
    two: 4,
    three: 9
}

console.log(Object.entries(obj)) //[['one', 2], ['two', 4], ['three', 9]]

const map = new Map()
map.set('one', 2)
map.set('two', 4)
map.set('three', 9)
console.log(Object.fromEntries(map)）

const array = [['one',2],['two',4],['three',9]]
console.log(Object.fromEntries(Array))
//不使用fromEntries
const obj = Array.from(myArray).reduce((acc, [key, val]) => Object.assign(acc, {[key]:val}), {})

//求平方根
const map = array.map(([key, val]) => [key, Math.sqrt(val)])

//handle url
const paramsString = '?&userName="demo"&userId="98409189"'
const searchParams = new URLSearchParams(paramsString)
const urlQueryObj = Object.fromEntries(searchParams)
console.log(urlQueryObj)
```

#### JSON.stringify 过滤需要的字段

```javascript
const settings = {
  username: "Jack",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```



#### obj.flatMap

```javascript
const scattered = ['my favorite', 'hamburger', 'is a', 'chicken sandwich']
// 使用map()来转换数组
const huh = scattered.map(chunk => chunk.split(' '))
console.log(huh); // ⇒ [["my", "favorite"], ["hamburger"], ["is", "a"], ["chicken", "sandwich"]] // 使用flat()来拍平数组
const flatHuh = huh.flat()
console.log(flatHuh) // ⇒ ["my", "favorite", "hamburger", "is", "a", "chicken", "sandwich"]

// 使用flatMap可以一步到位实现map()和flat()的效果
const flatMapScattered = scattered.flatMap(chunk => chunk.split(' '))
console.log(flatMapScattered) // ⇒ ["my", "favorite", "hamburger", "is", "a", "chicken", "sandwich"]
```



### Function

#### deconstruction params、default value

```javascript
//null会覆盖默认参数
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  // ...
}

var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345
  }
}
const modelAndVIN = ({model, engine: {vin}}) => {
  console.log(`model: ${model} vin: ${vin}`)
}
```

#### required params

```javascript
mandatory = ( ) => {
  throw new Error('Missing parameter!');
}
foo = (bar = mandatory()) => {
  return bar
}
```

#### 隐式返回值

```javascript
//同 {} 返回
const calcCircumference = diameter => (
  Math.PI * diameter
)
```

#### 惰性载入函数

```javascript
function foo(){
    if(a != b){
        foo = function(){
            console.log('aaa')
        }
    }else{
        foo = function(){
            console.log('bbb')
        }
    }
    return foo();
}
```

#### 一次性函数

```javascript
const sca = () => {
    console.log('msg')
    sca = () => {
        console.log('foo')
    }
}
```



### String

#### 字符串比较时间先后

```javascript
const a = "2014-08-08"
const b = "2014-09-09"

console.log(a>b, a<b) // false true
console.log("21:00"<"09:10")  // false
console.log("21:00"<"9:10")  // true   时间形式注意补0
```

#### JS 对象转 url 查询字符串

```javascript
const objectToQueryString = (obj) => Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&')
```

#### 生成随机ID

```javascript
const RandomId = len => Math.random().toString(36).substr(3, len)
const id = RandomId(10)
```

#### 生成随机HEX色值

```javascript
const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")
const color = RandomColor()
```

#### 生成星级评分

```javascript
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);
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
let str = "1553"
Number(str.substring(0, str.length - 1))
console.log(1553 / 10 | 0)
console.log(1553 / 100 | 0)
console.log(1553 / 1000 | 0)
```

#### 判断奇偶数

```javascript
//对一个数字& 1可以判断奇偶数，负数也同样适用
const OddEven = num => !!(num & 1) ? "odd" : "even";
```

#### 数字补0操作

```javascript
const addZero1 = (num, len = 2) => (`0${num}`).slice(-len)
const addZero2 = (num, len = 2) => (`${num}`).padStart(len, '0')
```

#### 随机生成六位数字验证码

```javascript
const code = Math.floor(Math.random() * 1000000).toString().padStart(6, "0")
```

#### 精确小数

```javascript
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal
const num = RoundNum(1.69, 1)
```

#### 生成范围随机数

```javascript
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const num = RandomNum(1, 10)
```

### Boolean

```javascript
const flagA = true // 条件A
const flagB = false // 条件B
(flagA || flagB) && Func() // 满足A或B时执行
(flagA || !flagB) && Func() // 满足A或不满足B时执行
flagA && flagB && Func() // 同时满足A和B时执行
flagA && !flagB && Func() // 满足A且不满足B时执行
!flag && Func()
arr.length && Func()
Object.keys(obj).length && Func()
```



### Data Convert

#### 隐式强制类型转换

1. +/-/!/~

- +/- 一元运算符 => 运算符会将操作数进行ToNumber处理
- ! => 会将操作数进行ToBoolean处理
- ~ => (~x)相当于 -(x + 1) eg: ~(-1) ==> 0; ~(0) ==> 1; 在if (...)中作类型转换时, 只有-1时, 才为假值
- +加号运算符 => 若操作数有String类型, 则都进行ToString处理, 字符串拼接. 否则进行ToNumber处理, 数字加法

2. 条件判断

- if (...), for(;;;), while(...), do...while(...)中的条件判断表达式
- ? : 中的条件判断表达式
- || 和 && 中的中的条件判断表达式

以上遵循 ToBoolean 规则

3. ||和&&

- 返回值是两个操作数的中的一个(且仅一个). 首先对第一个操作数条件判断, 若为非布尔值则进行ToBoolean强制类型转换.再条件判断
- || => 条件判断为true, 则返回第一个操作数; 否则, 返回第二个操作数. 相当于 a ? a : b
- && => 条件判断为true, 则返回第二个操作数; 否则, 返回第一个操作数, 相当于 a ? b : a

#### 显示类型转换(除了各个基本类型的构造函数还有以下方法)

1. boolean

```javascript
const isTrue = !0
const isFalse = !1
const isFalse = !!0

!!"" // > false
!!0 // > false
!!null // > false
!!undefined // > false
!!NaN // > false
!!"hello" // > true
!!1 // > true
!!{} // > true
!![] // > true
```

2. string

```javascript
const val = 1 + ''

//obj to string,实际调用toString
//当然也可以覆盖对象的toString和valueOf方法来自定义对象的类型转换
'the Math object:' + Math

([1, 2, 3].map(String))
```

3. number

```javascript
//obj to number实际调用valueOf
'32' * 1
'32' / 1
//+只对null、""、false、数值字符串有效
+'12'
+true
+new Date("2019-02-14")

(['1', '2', '3'].map(Number))

//进行-0、 *1 、/1 可以转number
//ES6的Number.parseInt  Number.parseFloat 针对字符串，如果是其它类型先转换成字符串
```

### Promise

#### 优雅处理Async/Await参数

```javascript
function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err])
}
const [err, res] = await AsyncTo(Func())
```

#### 循环promise

```javascript
//Array.forEach不会处理回调函数返回的promise,只是简单无视
//当需要执行顺序如下
async function printFiles() {
  const files = await getFilePaths()

  for (const file of files) {
    const contents = await fs.readFile(file, 'utf8')
    console.log(contents)
  }
}
```

#### 并行循环promise

```javascript
//当需要并行执行
async function printFiles() {
  const files = await getFilePaths()

  await Promise.all(
    files.map(async file => {
      const contents = await fs.readFile(file, 'utf8')
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
    const timeStamp = +new Date(val)

    // 如果转换成数字出错
    if (!timeStamp) {
        return val
    }
    let str
    // 得到时间字符串
    const dateStr = new Date(timeStamp)
    str = dateType.replace('YYYY', dateStr.getFullYear())
    str = str.replace('MM', (dateStr.getMonth() + 1 < 10 ? '0' : '') + (dateStr.getMonth() + 1))
    str = str.replace('DD', (dateStr.getDate() < 10 ? '0' : '') + dateStr.getDate())
    str = str.replace('hh', (dateStr.getHours() < 10 ? '0' : '') + dateStr.getHours())
    str = str.replace('mm', (dateStr.getMinutes() < 10 ? '0' : '') + dateStr.getMinutes())
    str = str.replace('ss', (dateStr.getSeconds() < 10 ? '0' : '') + dateStr.getSeconds())

    return str
}

switchTime(new Date(), 'YYYY-MM-DD hh') // 返回 2019-05-22 11
switchTime(new Date(), 'YYYYMMDD hh:mm:ss') // 返回 20190522 11:00:00
```

#### 时间显示转换

```javascript
timeView: function (val) {
    const now = +new Date() // 当时时间
    const timeStamp = +new Date(val) // 需要处理的时间
    const result = now - timeStamp // 相差的时间戳
    const min = 60 * 1000 // 分钟的毫秒数
    const hour = 60 * 60 * 1000 // 小时的毫秒数
    const day = 60 * 60 * 1000 * 24 // 日的毫秒数
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



### Module

```javascript
//import 执行顺序
//import命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行
//这是CommonJS中require（）和import之间的区别。使用require()，您可以在运行代码时根据需要加载依赖项。 如果我们使用require而不是import，running index.js，running sum.js，3会被依次打印
//CommonJS同步加载 import异步加载

// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```



### DOM

#### 显示全部DOM边框：调试页面元素边界时使用

```javascript
[].forEach.call($$("*"), dom => {
    dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
})
```

#### 自适应页面

```javascript
function AutoResponse(width = 750) {
    const target = document.documentElement;
    target.clientWidth >= 600
        ? (target.style.fontSize = "80px")
        : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}
```

#### XSS

```javascript
function FilterXss(content) {
    let elem = document.createElement("div");
    elem.innerText = content;
    const result = elem.innerHTML;
    elem = null;
    return result;
}
```

#### 存取LocalStorage

```java
const love = JSON.parse(localStorage.getItem("love"))
localStorage.setItem("love", JSON.stringify("I Love You"))
```

#### 文件大小显示转换

```javascript
bytesToSize (bytes) {
    if (bytes === 0) return '0 B'
    var k = 1024 // or 1024
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    var i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
```



### Code

#### 1 不要使用否定条件式

```javascript
const isEmailVerified = (email) => {
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
const checkCarModel = (model) => {
    const models = ['peugeot', 'renault']
    if (models.includes(model)) {
    	console.log('model valid')
    }
}
```

#### 3 匹配所有条件，使用 `Array.every` 或者 `Array.find`

```javascript
const checkEveryModel = (model) => {
  return cars.every(car => car.model === model)
}

const checkEveryModel = (model) => {
  return cars.find(car => car.model !== model) === undefined
}
```

#### 4 匹配部分条件，使用 `Array.some`

```javascript
const checkForAnyModel = (model) => {
  return cars.some(car => car.model === model)
}
```

#### 5 提前返回而不是使用 `if...else` 分支

```javascript
const checkModel = ({model, year} = {}) => {
  if(!model && !year) return 'No car'
  if(!model) return 'No car model'
  if(!year) return 'No car year'
  ...
}
```

#### 6 使用索引或者映射，而不是 `switch` 语句

```javascript
//not switch
const getCarsByState = (state) => {
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
const cars = new Map()
  .set('usa', ['Ford', 'Dodge'])
  .set('france', ['Renault', 'Peugeot'])
  .set('italy', ['Fiat'])

const getCarsByState = (state) => {
  return cars.get(state) || []
}

//use obj
const carState = {
  usa: ['Ford', 'Dodge'],
  france: ['Renault', 'Peugeot'],
  italy: ['Fiat']
};

const getCarsByState2 = (state) => {
  return carState[state] || []
}
```

### Mis

- callback: u define, u don't invoke, but it is invoked afterwards

- 分号注意：
    - 以小括号开头的前一条语句
    ```javascript
    (function(a){
        console.log(a);
    })()/* 这里没有被自动插入分号 */
    (function(a){
        console.log(a);
    })()
    ```
    - 以中括号开头的前一条语句
    ```javascript
    var a = [[]]/* 这里没有被自动插入分号 */
    [3, 2, 1, 0].forEach(e => console.log(e))
    ```
    - 以正则开头的前一条语句
    ```javascript
    var x = 1, g = {test:()=>0}, b = 1/* 这里没有被自动插入分号 */
    /(a)/g.test("abc")
    console.log(RegExp.$1)
    ```
    - 以`Template`开头的前一条语句
    ```javascript
    var f = function(){
      return "";
    }
    var g = f/* 这里没有被自动插入分号 */
    `Template`.match(/(a)/);
    console.log(RegExp.$1)
    ```
    - js文件合并的时候最好开始加分号,或`void function()()`
    - do...while有分号
    - 函数表达式有分号

- `use strict`只能出现在脚本、模块和函数体的最前面
- debug border
```javascript

[].forEach.call($$("*"), dom => {
    dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});
```
- 优雅处理aa
```javascript
function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func())
```