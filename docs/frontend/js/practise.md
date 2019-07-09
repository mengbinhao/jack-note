### Array

#### deconstruction

```javascript
const csvFileLine = '1997,John Doe,US,john@doe.com,New York'
const { 2: country, 4: state } = csvFileLine.split(',')
```

#### unique arr

```javascript
//arr only includes undefined、null、boolean、string和number
const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArr = [...new Set(arr)]
Arry.from(new Set(arr))
```

#### ensure arr length

```javascript
Array(5).fill('')
```

#### Array.from(arrayLike[, mapFn[, thisArg]])

```javascript
const array = [ 
    { name: '大漠', email: 'w3cplus@hotmail.com' }, 
    { name: 'Airen', email: 'airen@gmail.com' } ] 
const name = Array.from(array, ({ name }) => name)
```

#### arr slice

```javascript
let arr= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr.length = 4

arr = arr.slice(0, 4)
```

#### clear arr

```javascript
array.length = 0
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

#### filter falsy in arr

```javascript
const array = [0, 1, '0', '1', '大漠', 'w3cplus.com', undefined, true, false, null, 'undefined', 'null', NaN, 'NaN', '1' + 0] 
const ret = array.filter(Boolean)
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
```



### Object

#### deconstruction

```javascript
const obj = { name: '大漠', blog: 'w3cplus', email: 'w3cplus@hotmail.com', joined: '2019-06-19', followers: 45 } 
let user = {}, userDetails = {};
({name: user.name, email: user.email, ...userDetails} = obj)
```

#### isType

```javascript
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target) const isArray = isType('Array')([1, 2, 3])
```

#### check property

```javascript
if (obj.xxx)

obj.hasOwnProperty('name')

'name' in obj //can get property from prototype
```

#### create pure object

```javascript
const pureObject = Object.create(null)
```

#### combine obj in arr

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
        blog: 'w3cplus', 
        ...emailIncluded && {email: 'w3cplus@hotmail.com'} 
    } 
} 
const user = getUser(true) 
console.log(user)
const userWithoutEmail = getUser(false) 
console.log(userWithoutEmail) > Result: {name: "大漠", blog: "w3cplus"}
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
const paramsString = '?&userName="damo"&userId="98409189"'
const searchParams = new URLSearchParams(paramsString)
const urlQueryObj = Object.fromEntries(searchParams)
console.log(urlQueryObj)
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
//返回的是对象
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
const a = "2014-08-08";
const b = "2014-09-09";
 
console.log(a>b, a<b); // false true
console.log("21:00"<"09:10");  // false
console.log("21:00"<"9:10");   // true   时间形式注意补0
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
const num=3
!!(num & 1)  // true
```

### 数字补0操作

```javascript
const addZero1 = (num, len = 2) => (`0${num}`).slice(-len)
const addZero2 = (num, len = 2) => (`${num}`).padStart(len, '0')
```



### Data Convert

#### boolean

```javascript
const isTrue = !0
const isFasle = !1
const isFasle = !!0

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

#### string

```javascript
const val = 1 + ''

//obj to string,实际调用toString
//当然也可以覆盖对象的toString和valueOf方法来自定义对象的类型转换
'the Math object:' + Math
```

#### number

```javascript
//obj to number实际调用valueOf
'32' * 1 
'32' / 1
+'12'
+true
```



