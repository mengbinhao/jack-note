### varibale type
Boolean、Number、String、Undefined、Null、Symbol

typeof => undefiend, string, number, boolean, object, function, symbol

//是否在原型脸上
instanceof

```javascript
function Foo(name) {
    this.name = name
}
var foo = new Foo('bar')
console.log(foo instanceof Foo)
```

### 值类型VS引用类型
//值类型是按值传递，引用类型是按共享传递
```javascript
function foo(a){
    a = a * 10;
}
function bar(b){
    b.value = 'new';
}
var a = 1;
var b = {value: 'old'};
foo(a);
bar(b);
console.log(a);
console.log(b);
```

### 原型和原型链

- 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）
- 所有的引用类型（数组、对象、函数），都有一个隐式原型__proto__属性，属性值是一个普通的对象
- 所有的**函数**，都有一个显示原型prototype属性，属性值也是一个普通的对象(自定义函数prototype是一个没有自定义属性的空对象,及Object的实例对象，定义函数时添加显示原型prototype属性)
- 所有的引用类型（数组、对象、函数），隐式原型__proto__属性值指向它的构造函数的prototype属性值

```javascript
//注意点
console.log(Object.prototype instanceof Object)
console.log(Object.prototype.__proto__ === null)
console.log(Function.__proto__ === Function.prototype)


```

```javascript
// 构造函数
function Foo(name, age) {
    this.name = name
}
Foo.prototype.alertName = function () {
    alert(this.name)
}
// 创建示例
var f = new Foo('zhangsan')
f.printName = function () {
    console.log(this.name)
}
// 测试
f.printName()
f.alertName()
f.toString()
```

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
```javascript
console.log(a)  // undefined
var a = 100

fn('zhangsan')  // 'zhangsan' 20
function fn(name) {
    age = 20
    console.log(name, age)
    var age
}

console.log(b); // 这里报错
// Uncaught ReferenceError: b is not defined
b = 100;
```

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
    var name = 'zhangsan'
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
    * 意外的全局变量`c = 1`
    * 没有及时清理的计时器或回调函数`clearInterval(intervalId)`
    * 闭包`f = null`

```javascript
function F1() {
    let a = 100
    return function () {
        console.log(a)
    }
}
var f1 = F1()
var a = 200
f1()
```

```javascript
function F1() {
    var a = 100
    return function () {
        console.log(a)
    }
}
function F2(f1) {
    var a = 200
    console.log(f1())
}
var f1 = F1()
F2(f1)
```


### 异步
- setTimeout setInterval
- ajax img加载

### 箭头函数
```javascript
function fn() {
    console.log('real', this)
    var arr = [1, 2, 3]

    arr.map(function (item) {
        console.log('js', this)
        return item + 1
    })

    arr.map(item => {
        console.log('es6', this)
        return item + 1
    })
}
fn.call({a: 100})
```

### Module

```javascript
// 创建 util1.js 文件，内容如
export default {
    a: 100
}

// 创建 index.js 文件，内容如
import obj from './util1.js'
console.log(obj)
```

```javascript
// 创建 util2.js 文件，内容如
export function fn1() {
    alert('fn1')
}
export function fn2() {
    alert('fn2')
}

// 创建 index.js 文件，内容如
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

### Promise

3-2-1
