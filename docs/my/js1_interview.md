### variable type
Boolean、Number、String、Undefined、Null、Symbol and Object

typeof => undefined, string, number, boolean, object, function, symbol

//是否在原型链上
A instanceof B, B.prototype是否在A.__proto__的原型链上


### 值类型VS引用类型
//值类型是按值传递，引用类型是按共享传递

### 原型和原型链

- 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性(null除外)
- 所有的引用类型（数组、对象、函数），都有一个隐式原型__proto__属性，属性值是一个普通的对象
- 所有的**函数**，都有一个显示原型prototype属性，属性值也是一个普通的对象(自定义函数prototype是一个没有自定义属性的空对象,及Object的实例对象，定义函数时添加显示原型prototype属性)
- 所有的引用类型（数组、对象、函数），隐式原型__proto__属性值指向它的构造函数的prototype属性值

### 作用域和闭包

```html
<ul>
    <li>编号1，点击我请弹出1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>

<script>
var list = document.getElementsByTagName('li');
for (var i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function(i){
        return function(){
            alert(i + 1)
        }
    }(i), true)
}
</script>
```

### 执行上下文 vs 执行上下文栈
在一段 JS 脚本（即一个`<script>`标签中）执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个**全局执行上下文**环境，先把代码中即将执行的（内部函数的不算，因为你不知道函数何时执行）变量、函数声明都拿出来。变量先暂时赋值为`undefined`，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。再次强调，这是在代码执行之前才开始的工作。

另外，一个函数在执行之前，也会创建一个**函数执行上下文**环境，跟**全局上下文**差不多，不过**函数执行上下文**中会多出`this`,`arguments`和`函数的参数`

- 范围：一段`<script>`、js 文件或者一个函数
- 全局上下文：变量定义(只有var定义的才会hoisting)，函数声明
- 函数上下文：变量定义，函数声明，this，arguments
  1. 建AO(执行区上下文)
  2. 找形参和变量声明,将变量和形参命作为AO的属性名,值为undefined
  3. 将实参值和形参统一
  4. 在函数体里面找函数声明  值为函数体

### 上下文与作用域区别
- 全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了。而不是在函数调用时
- 全局执行上下文环境是在全局作用域确定之后, js代码马上执行之前创建
- 函数执行上下文是在调用函数时, 函数体代码执行之前创建
- 作用域是静态的, 只要函数定义好了就一直存在, 且不会再变化
- 执行上下文是动态的, 调用函数时创建, 函数调用结束时就会自动释放


### 作用域 / 作用域链
```javascript
if (true) {
    var name = 'Jack'
}
console.log(name)
```

```javascript
var a = 100
function F1() {
    var b = 200
    function F2() {
        var c = 300
        console.log(a) // 自由变量，顺作用域链向父作用域找
        console.log(b) // 自由变量，顺作用域链向父作用域找
        console.log(c) // 本作用域的变量
    }
    F2()
}
F1()
```

### 闭包
当子函数引用了外部函数的变量时,就产生闭包
#### 产生条件
1. 函数嵌套
2. 引用外部函数的变量

#### 常见闭包
1. 函数作为返回值
2. 函数作为参数传递

#### 作用
1. 函数内部的变量在函数执行完后仍然存活在内存中
2. 让函数外部可以操作到函数内部的数据

#### 缺点
1. 函数执行完后，内部的局部变量没有释放，内存占用时间变长
2. 容易内存泄漏

#### 相关延伸问题
1. 内存溢出
  * 一种程序运行出现的错误
  * 当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误
2. 内存泄露
  * 占用的内存没有及时释放
  * 内存泄露积累多了就容易导致内存溢出
  * 常见的内存泄露:
    * 意外的全局变量`'use strict'`解决
    ```javascript
    function foo1(arg) {
      bar = "this is a hidden global variable"
    }

    function foo2() {
      this.variable = "potential accidental global"
    }
    foo2()
    ```
    * 循环引用
    ```javascript
    function func() {
        let obj1 = {}
        let obj2 = {}

        obj1.a = obj2
        obj2.a = obj1
    }
    //obj1 = null
    //obj2 = null
    ```
    * 没有及时清理的计时器或回调函数`clearInterval(intervalId)`
    * 没有清理的DOM元素引用
    ```javascript
    var refA = document.getElementById('refA')
    document.body.removeChild(refA)
    //refA = null
    ```
    * 给DOM对象添加的属性是一个对象的引用
    ```javascript
    var MyObject = {}
    document.getElementById('myDiv').myProp = MyObject
    // document.getElementById('myDiv').myProp = null
    ```
    * DOM对象与JS对象相互引用
    ```javascript
    function Encapsulation(element) {
        this.elementReference = element;
        element.myProp = this;
    }
    new Encapsulation(document.getElementById('myDiv'));
    ```
    * 从外到内执行appendChild
    ```javascript
    var parentDiv = document.createElement("div");
    var childDiv = document.createElement("div");
    document.body.appendChild(parentDiv);
    parentDiv.appendChild(childDiv);

    // 从内到外执行appendChild
    var parentDiv = document.createElement("div");
    var childDiv = document.createElement("div");
    parentDiv.appendChild(childDiv);
    document.body.appendChild(parentDiv);
    ```
### 异步
- setTimeout setInterval
- ajax img加载

### 箭头函数
### Promise
- resolved状态的Promise会回调后面的第一个then
- rejected状态的Promise会回调后面的第一个catch
- 任何一个rejected状态且后面没有catch的Promise都会造成浏览器/node环境的全局错误
- 执行then和catch会返回一个新的Promise，该Promise的最终状态根据then和catch的回调函数的执行结果决定
  - 若最终是throw则该Promise是rejected状态
  - 若最终是return则该Promise是resolved状态
  - 若最终return了一个Promise，该Promise会和回调函数return的Promise状态保持一致

### async/await
- aa只是Promise的语法糖
- 以同步的方式写异步
  - await可以‘暂停’async function的执行
  - await可以以同步的写法获取Promise的执行结果
  - try-catch可以获取await所得到的错误
### Module

```javascript
// 创建 util.js 文件
export default {
    a: 100
}

// 创建 index.js 文件
import obj from './util.js'
console.log(obj)
```

```javascript
// 创建 util2.js 文件
export function fn1() {
    alert('fn1')
}
export function fn2() {
    alert('fn2')
}

// 创建 index.js 文件
import { fn1, fn2 } from './util2.js'
fn1()
fn2()
```

### class

```javascript
function MathHandle(x, y) {
  this.x = x;
  this.y = y;
}

MathHandle.prototype.add = function () {
  return this.x + this.y;
};

var m = new MathHandle(1, 2);
console.log(m.add())
```

```javascript
class MathHandle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add() {
    return this.x + this.y;
  }
}
const m = new MathHandle(1, 2);
console.log(m.add())
```

### extends
```javascript
// 动物
function Animal() {
    this.eat = function () {
        console.log('animal eat')
    }
}
// 狗
function Dog() {
    this.bark = function () {
        console.log('dog bark')
    }
}
Dog.prototype = new Animal()
// 哈士奇
var hashiqi = new Dog()
```

```javascript
class Animal {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat`)
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name)
    }
    say() {
        console.log(`${this.name} say`)
    }
}
const dog = new Dog('哈士奇')
dog.say()
dog.eat()
```

### example
```javascript
let arrLike = {
    "2" : "a",
    "3" : "b",
    length : 2,
    push : Array.prototype.push
}
arrLike.push("c")
arrLike.push("d")
console.log(arrLike)
```

```javascript
// 空数组遍历不到
// undefined可以遍历
let arrEmpty = [, , ,];
let arrUndefined = [undefined,undefined,undefined];
// 不产生任何输出
arrEmpty.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出
for (var i in arrEmpty) {
  console.log(i);
}
// console.log(Object.keys(arrEmpty));
```

```javascript
//safe constructor
function Person(name, age, job) {
    //ES6
    //new.target === Person
    if (this instanceof Person) {
        this.name = name
        this.age = age
        this.job = job
    } else {
        return new Person(name, age, job)
    }
}
```

```javascript
//resolve click and mousedown
// var firstTime = 0;
// var secondTime = 0;
// var flag = false;
// document.onclick = function() {
//     if (flag) {
//         console.log("onclick");
//         flag = false;
//     }
// }
// document.onmousedown = function() {
//     firstTime = new Date().getTime();
// }
// document.onmouseup = function() {
//     secondTime = new Date().getTime();
//     if (secondTime - firstTime < 300) {
//         flag = true;
//     }
// }
```

```javascript
const getByteLength = (str) => {
    let len = str.length,
        count = len,
        i;
    for (i = 0; i < len; i++) {
        // in case has chinese
        if (str.charCodeAt(i) > 255) {
            count++
        }
    }
    return count
}
```

```javascript
function isPalindrome(str) {
    if (!(typeof str === "string")) return false;
    var temp = str.replace(/\W/g, "").toLowerCase()
    return temp == temp.split("").reverse().join("")
}
```

```javascript
//arguments
function sum(x, y) {
    if (y !== undefined) {
        return x + y
    } else {
        return function (y) {
            return x + y
        }
    }
}
console.log(sum(2)(3))
console.log(sum(2, 3))
```

```javascript
function Traverse(p_element, p_callback) {
    p_callback(p_element)
    var list = p_element.children
    for (var i = 0; i < list.length; i++) {
        Traverse(list[i], p_callback)
    }
}
```

```javascript
//素数
const isPrimeNumber = (num) => {
    if (num <= 1 || num % 1 !== 0) {
        return false
    }
    var n = 2
    while (n < num) {
        if (num % n++ === 0) {
            return false
        }
    }
    return true
}
console.log(isPrimeNumber(997))
```

```javascript
//字符串中找出最长最多重复的子串
const sortStrByCount = (str) => {
    if (!(typeof str === "string")) return str;
    return str.split("").sort().join("").match(/(.)\1*/g)
        .sort((a, b) => {
            return a.length - b.length
        }).join("")
}
console.log(sortStrByCount("dddbbbiiiiiicccca"))
```

```javascript
Element.prototype.insertAfter = function (targetNode, afterNode) {
    var beforeNode = afterNode.nextElementSibling
    if (beforeNode == null) {
        this.appendChild(targetNode)
    } else {
        this.insertBefore(targetNode, beforeNode)
    }
}
```

```javascript
//分批次添加DOM
const addByBatch = (() => {
    var container = document.querySelector('.list')
    if (!container) return

    const total = 10000
    batchSize = 4 // 每批插入的节点次数，越大越卡
    batchCount = total / batchSize // 需要批量处理多少次
    let batchDone = 0,
        i;

    function appendItems() {
        const fragment = document.createDocumentFragment()
        let i
        for (i = 0; i < batchSize; i++) {
            const li = document.createElement('li')
            li.innerText = (batchDone * batchSize) + i + 1
            fragment.appendChild(li)
        }

        container.appendChild(fragment)

        batchDone += 1;
        doBatchAppend()
    }

    function doBatchAppend() {
        if (batchDone < batchCount) {
            window.requestAnimationFrame(appendItems)
        }
    }

    // kickoff
    doBatchAppend()

    //采用事件委托
    //addEventListener处理函数中this指的是实际的dom
    //也可以通过外层let定义循环变量
    //addEventListener与onclick
    //   1 允许注册多个事件
    //   2 可以控制事件捕获还是冒泡
    //   3 对任何DOM元素都有效
    container.addEventListener('click', (e) => {
        const target = e.target
        if (target.tagName.toLowerCase() === 'li') {
            console.log(target.innerText)
        }
    });
})();
```

```javascript
var queryParams = url => {
    let obj = {}
    let reg = /([^&?=]+)=([^&?=]+)/g
    url.replace(reg, (...arg) => {
        obj[arg[1]] = arg[2]
    })
    return obj
}
```

```javascript
//isParentBalance
const isParentBalance = (str) => {
    return str.split('').reduce((count, char) => {
        if (count < 0) {
            return count
        } else if (char === '(') {
            return ++count
        } else if (char === ')') {
            return --count
        } else {
            return count
        }
    }, 0)
}
```