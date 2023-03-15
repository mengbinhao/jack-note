## 基本原则

- 易读性优先
- 如果不是性能瓶颈，就不要为了性能而改写代码
- 复杂性守恒原则：无论你怎么写代码，复杂性都是不会消失的
  推论：如果逻辑很复杂，那么代码看起来就应该是复杂的。如果逻辑很简单，代码看起来就应该是简单的

### 如何重构

#### 使用函数来改代码

>  将一坨代码放到一个函数里
>
> 2 将代码依赖的外部变量作为参数
>
> 3 将代码的输出作为函数的返回值
>
> 4 给函数取一个合适的名字
>
> 5 调用这个函数并传入参数
>
> 6 这个函数里的代码如果超过 5 行，则依然有优化的空间，回到第 1 步

```javascript
el1.onclick = () => {}
el2.onmouseenter = () => {}
el3.onmouseleave = () => {}
//change to
function bindEvents() {
	let events = [
		{ el: xx, event: yy, fn: zz },
		{ el: xx, event: yy, fn: zz },
		{ el: xx, event: yy, fn: zz },
	]
	events.forEach((eventObject) => {
		$(eventObject).on(eventObject.event, eventObject.fn)
	})
}
```

#### 使用对象来改代码

```javascript
;(function fn() {
	let slide = {
		currentIndex: 0,
		$slides: $('.slides'),
		timerId: undefined,
		events: [
			{
				el: '#buttonNext',
				event: 'click',
				fn: 'playNext',
			},
			{
				el: '#buttonPrevious',
				event: 'click',
				fn: 'playPrevious',
			},
			{
				el: '.slidesWindow',
				event: 'mouseenter',
				fn: 'clearTimer',
			},
			{
				el: '.slidesWindow',
				event: 'mouseleave',
				fn: 'resetTimer',
			},
		],
		init() {
			this.bindEvents()
			this.timerId = this.autoPlay()
		},
		playNext: () => {
			this.playSlide(this.currentIndex + 1)
		},
		playPrevious: () => {
			this.playSlide(this.currentIndex - 1)
		},
		playSlide(index) {
			index = fixIndex(index)
			this.$slides.css({
				transform: `translateX(${-400 * index}px)`,
			})
			this.currentIndex = index
			return index
		},
		clearTimer: () => {
			window.clearInterval(this.timerId)
		},
		resetTimer: () => {
			this.timerId = this.autoPlay()
		},
		bindEvents() {
			this.events.forEach((elObj) => {
				$(elObj.el).on(elObj.event, () => {
					this[elObj.fn].call(this)
				})
			})
		},
		fixIndex(index) {
			if (index < 0) {
				index = 4
			} else if (index > 4) {
				index = 0
			}
			return index
		},
		autoPlay() {
			return setInterval(() => {
				this.playSlide(this.currentIndex + 1)
			}, 3000)
		},
	}
	slide.init()
})()
```

#### 表驱动编程

所有一一对应的关系都可以用表来做

```javascript
function howManyDays(month) {
	if (month === 1) {
		return 2
	} else if (month === 2) {
		return 2
	} else {
		return 3
	}
}
//change to
function howManyDays(month) {
	let table = {
		1: 1,
		2: 2,
		3: 3,
    default: 'error'
	}
	return table[month] || table['default']
}
```

## JS

### 命名

- 普通变量/属性用「名词」

  ```javascript
  let person = {
      name: 'Frank'
  }
  ```

- 布尔变量

  ```javascript
  let person = {
    dead: false, // 如果是形容词，前面就没必要加 is，比如isDead
    canSpeak: true, //情态动词有 can、should、will、need 等，情态动词后面接动词
    isVip: true, // be 动词有 is、was 等，后面一般接名词
    hasChildren: true, // has 加名词
  }
  ```

- 普通函数/方法用「动词」开头

  ```javascript
  let person = {
    run(){}, // 不及物动词
    drinkWater(){}, // 及物动词
    eat(foo){}, // 及物动词加参数（参数是名词）
  }
  ```

- 回调、钩子函数用「介词」开头，或用「动词的现在完成时态」

  ```javascript
  var component = {
    beforeCreate(){},
    created(){},
  }
  ```

- 容易混淆的地方加前缀

- 属性访问器函数可以用名词

- 介词一致性

  - 若使用了 before + after，那么就在代码的所有地方都这样用，若使用了 before + 完成时，那么就坚持这样

- 顺序一致性

  -  `updateContainerWidth` 和 `updateHeightOfContainer`

- 表里一致性

  - 函数名必须完美体现函数的功能,不多也不少,否则要么改函数名，要么写多个函数

### 避免全局查找

重复使用的调用结果，事先保存到局部变量, 避免全局变量

```javascript
function fun() {
  console.log(window.location.href + window.location.host)
}
//change to
function fun() {
  let location = window.location
  console.log(location.href + location.host)
}
```

### 循环

- 将不需要重复计算的逻辑外提
- 缓存变量
- 使用哨兵值加速循环
- 不要在循环内部或要求性能的函数中使用`try-catch-finally`

### 条件分支

- 知道答案，直接返回
- 按可能性顺序从高到低调整判断顺序
- **用map or obj代替复杂分支**
- 在同一条件的多（>2）条件分支时，使用switch优于if
- 使用三目运算符替代条件分支

### 使用字面量 

```javascript
let obj = {},
    arr = [],
    reg = /[A-Z]/
```

### 使用常量(避免魔法数字)

- 如一天是 86400 秒

### 使用默认函数参数和解构

```javascript
const test = ({ name = 'Jack' } = {}) => console.log(name)
```

### 字符串连接

如果要连接多个字符串，应该少使用+=，如：`x += a;x += b;x += c`
应该写成 `x += a + b + c`
而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后使用join方法连接起来

```javascript
let arr = []
for (let i = 0; i< 100; i++) {
  arr.push(i.toString())
}
let str = arr.join("")
```

### 类型转换（总是检查数据类型）

- 数字转换成字符串 `("" +) > String() > .toString() > new String()`

- 浮点转整数 `parseInt()`是用于将字符串转换成数字，而不是浮点数和整型之间的转换，应使用`Math.floor()`或者`Math.round()`

- 如果定义了`toString()`方法来进行类型转换的话，推荐显式调用`toString()`，因为内部的操作在尝试所有可能性之后，会尝试对象的`toString()`方法尝试能否转化为String，所以直接调用这个方法效率会更高

- 字符串转其他

  ```javascript
  let myVar = '3.1415'
      str = '' + myVar
      i_int = ~~myVar
      f_float = 1*myVar
      b_bool = !!myVar
      arr = [myVar]
  ```

### 避免与null进行比较

- 如果值应为一个引用类型，使用instanceof操作符检查其构造函数
- 如果值应为一个基本类型，作用typeof检查其类型
- 如果是希望对象包含某个特定的方法名，则使用typeof操作符确保指定名字的方法存在于对象上
- 除了用于比较`null`或`undefined`,永远不要使用非严格相等`==`

### 尊重对象的所有权

- 不要为实例或原型添加属性
- 不要为实例或者原型添加方法
- 不要重定义已经存在的方法
- 不要重复定义其它团队成员已经实现的方法，永远不要修改不是由你所有的对象，你可以通过以下方式为对象创建新的功能
  - 创建包含所需功能的新对象，并用它与相关对象进行交互
  - 创建自定义类型，继承需要进行修改的类型，然后可以为自定义类型添加额外功能

### 使用setInterval代替setTimeout

因为setTimeout每一次都会初始化一个定时器，而setInterval只会在开始的时候初始化一个定时器

```javascript
let n = 0
function fun() {
  n++
  if (n < 10) setTimeout(fun, 10)
}
fun()
//change to
let m = 0
function fun2() {
  m++
  if (m >= 10) clearTimeout(timer)
}
let timer = setInterval(fun2, 10)
```

### 避免`with、eval、Function`

## DOM

### 尽量

- 尽量减少DOM操作
- 尽量使用局部变量
- 尽量只获取元素节点
- 尽量使用最新的API
- 尽量在`appendChild`前操作

### 使用DocumentFragment优化多次append

```javascript
for (let i = 0; i < 100; i++) {
  let el = document.createElement('p')
  el.innerHTML = i
  document.body.appendChild(el)
}
//change to
let fragment = document.createDocumentFragment()
for (let i = 0; i < 100; i++) {
  let el = document.createElement('p')
  el.innerHTML = i
  fragment.appendChild(el)
}
document.body.appendChild(fragment)
```

### 使用一次innerHTML赋值代替构建dom元素
对于大的DOM更改，使用innerHTML要比使用标准的DOM方法创建同样的DOM结构快得多

```javascript
let fragment = document.createDocumentFragment()
for (let i = 0; i < 100; i++) {
  let el = document.createElement('p')
  el.innerHTML = i
  fragment.appendChild(el)
}
document.body.appendChild(fragment)

let html = []
for (let i = 0; i < 100; i++) {
  html.push(`<p>${i}</>`)
}
document.body.innerHTML = html.join("")
```

### 通过模板元素clone，替代createElement

```javascript
var fragment = document.createDocumentFragment()
var pE1 = document.getElementsByTagNames('p')[0]
for (let i = 0; i< 100; i++) {
    var el = pE1.cloneNode(false)
    el.innerHTML = i
    fragment.appendChild(el)
}
document.body.appendChild(fragment)
```

### 使用firstChild和nextSibling代替childNodes遍历dom元素

```javascript
for (let i = 0; i < element.childNodes.length; i++) {
    //...
}

var node = element.firstChild
while (node) {
    //...
    node = node.nextSibling
}
```

### 使用事件代理

任何可以冒泡的事件都不仅仅可以在事件目标上进行处理，目标的任何祖先节点上也能处理，使用这个就可以将事件处理程序附加到更高的地方负责多个目标的事件处理，同样，对于内容动态增加并且子节点都需要相同的事件处理函数的情况，可以把事件注册提到父节点上，这样就不需要为每个子节点注册事件监听了

### 删除DOM节点之前,删除注册在该节点上的事件

### 避免内存泄漏

- 通过javascript创建的DOM对象，必须append到页面中(否则内存泄漏)
- 释放DOM占用的内存`el.innerHTML = ''`
- 对象：`obj = null`
- 对象属性：`delete obj.prop`

```javascript
function init() {
    var el = document.getElementById('app')
    el.onclick = function() {
        //...
    }
    //Note
    el = null
}

//solution 2
function elClickHandler(){}
function init() {
    var el = document.getElementById('app')
    el.onclick = elClickHandler
}
```

## 性能

- 尽量使用原生方法
- `switch`语句相对`if`较快
- 位运算较快

