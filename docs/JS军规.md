1. 避免全局查找(重复使用的调用结果，事先保存到局部变量, 避免全局量)
```javascript
function fun() {
    console.log(window.location.href + window.location.host)
}
//change to
function fun() {
    var location = window.location
    console.log(location.href + location.host)
}
```

2. 定时器
如果针对的是不断运行的代码，不应该使用setTimeout，而应该是用setInterval，因为setTimeout每一次都会初始化一个定时器，而setInterval只会在开始的时候初始化一个定时器
```javascript
var n = 0
function fun() {
    n++
    if (n < 10) {
        setTimeout(fun, 10)
    }
}
fun()

//change to
var m = 0
function fun2() {
    m++
    if (m >= 10) {
        clearTimeout(timer)
    }
}
var timer = setInterval(fun2, 10)
```

3. 字符串连接
如果要连接多个字符串，应该少使用+=，如：`x+=a;x+=b;x+=c;`
应该写成 `x+= a + b + c;`
而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后使用join方法连接起来

```javascript
var arr = []
for (let i = 0; i< 100; i++) {
    arr.push(i,toString())
}
var str = arr.join("")
```

4. 避免with语句
```javascript
with (a.b.c) {
    property1 = 1
    property2 = 2
}

var obj = a.b.c
obj.property1 = 1
obj.property2 = 2
```

5. 数字转换成字符串 `("" +) > String() > .toString() > new String()`

6. 浮点数转换成整型
很多人喜欢使用`parseInt()`，其实`parseInt()`是用于将字符串转换成数字，而不是浮点数和整型之间的转换，我们应该使用`Math.floor()`或者`Math.round()`

7. 各种类型转换
如果定义了`toString()`方法来进行类型转换的话，推荐显式调用`toString()`，因为内部的操作在尝试所有可能性之后，会尝试对象的`toString()`方法尝试能否转化为String，所以直接调用这个方法效率会更高
```javascript
var myVar = '3.1415'
    str = '' + myVar
    i_int = ~ ~myVar
    f_float = 1*myVar
    b_bool = !!myVar
    arr = [myVar]
```
8. 多个类型声明(如上)

9.  插入迭代器
```javascript
var a=arr[i];
i++;

var a=arr[i++]
```
10. 使用直接量
11. 使用DocumentFragment优化多次append
```javascript
for (let i = 0; i < 100; i++) {
    var el = document.createElement('p')
    el.innerHTML = i
    document.body.appendChild(el)
}

var frag = document.createDocumentFragment()
for (let i = 0; i < 100; i++) {
    var el = document.createElement('p')
    el.innerHTML = i
    frag.appendChild(el)
}
document.body.appendChild(frag)
```

12. 使用一次innerHTML赋值代替构建dom元素
对于大的DOM更改，使用innerHTML要比使用标准的DOM方法创建同样的DOM结构快得多。
```javascript
var frag = document.createDocumentFragment()
for (let i = 0; i < 100; i++) {
    var el = document.createElement('p')
    el.innerHTML = i
    frag.appendChild(el)
}
document.body.appendChild(frag)

var html = []
for (let i = 0; i < 100; i++) {
    html.push(`<p>${i}</>`)
}
document.body.innerHTML = html.join("")
```

13. 通过模板元素clone，替代createElement
```javascript
var frag = document.createDocumentFragment()
var pE1 = document.getElementsByTagNames('p')[0]
for (let i = 0; i< 100; i++) {
    var el = pE1.cloneNode(false)
    el.innerHTML = i
    frag.appendChild(el)
}
document.body.appendChild(frag)
```

14. 使用firstChild和nextSibling代替childNodes遍历dom元素
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

15. 删除DOM节点
除dom节点之前,一定要删除注册在该节点上的事件,不管是用`observe`方式还是用`attachEvent`方式注册的事件,否则将会产生无法回收的内存。另外，在`removeChild`和`innerHTML=’’`二者之间,尽量选择后者. 因为在sIEve(内存泄露监测工具)中监测的结果是用removeChild无法有效地释放dom节点。

16. 使用事件代理
任何可以冒泡的事件都不仅仅可以在事件目标上进行处理，目标的任何祖先节点上也能处理，使用这个知识就可以将事件处理程序附加到更高的地方负责多个目标的事件处理，同样，对于内容动态增加并且子节点都需要相同的事件处理函数的情况，可以把事件注册提到父节点上，这样就不需要为每个子节点注册事件监听了

17. 优化循环
    - 减值迭代
    - 简化终止条件 `for (let i =0, len = list.length; i < 100; i++)`
    - 简化循环体
    - 使用后测试循环
    ```javascript
        var arr = [1,2,3]
        while (len--) {
            sum += arr[len]
        }
    ```
18. 避免双重解释
    - 避免`eval`
    - 避免`Function`
    - 不要给`setTimeout`或者`setInterval`传递字符串参数
    ```javascript
    function add(){}
    setTimeout(add, 10)
    ```

19. 缩短否定检测(**错误优先编程**)
```javascript
    if (flag !== 'a') return
```
20. 条件分支
    将条件分支，按可能性顺序从高到低排列：可以减少解释器对条件的探测次数

    在同一条件的多（>2）条件分支时，使用switch优于if：switch分支选择的效率高于if，在IE下尤为明显。4分支的测试，IE下switch的执行时间约为if的一半

    使用三目运算符替代条件分支

21. 使用常量

22. 避免与null进行比较
    如果值应为一个引用类型，使用instanceof操作符检查其构造函数，

    如果值应为一个基本类型，作用typeof检查其类型

    如果是希望对象包含某个特定的方法名，则使用typeof操作符确保指定名字的方法存在于对象上

23. 尊重对象的所有权
- 不要为实例或原型添加属性
- 不要为实例或者原型添加方法
- 不要重定义已经存在的方法
- 不要重复定义其它团队成员已经实现的方法，永远不要修改不是由你所有的对象，你可以通过以下方式为对象创建新的功能
- 创建包含所需功能的新对象，并用它与相关对象进行交互
- 创建自定义类型，继承需要进行修改的类型，然后可以为自定义类型添加额外功能

24. 循环引用
```javascript
function init() {
    var el = document.getElementById('app')
    el.onclick = funciton() {
        //...
    }
}
//init在执行的时候，当前上下文我们叫做context。这个时候，context引用了el，el引用了function，function引用了context。这时候形成了一个循环引用
init()
```

```javascript
//solution 1
function init() {
    var el = document.getElementById('app')
    el.onclick = funciton() {
        //...
    }
    el = null
}
init()
```

```javascript
//solution 2
function elClickHandler(){}
function init() {
    var el = document.getElementById('app')
    el.onclick = elClickHandler
}
init()
```

25. 通过javascript创建的dom对象，必须append到页面中(否则内存泄漏)
26. 释放dom元素占用的内存`el.innerHTML = ''`
27. 释放javascript对象
- 对象：`obj = null`
- 对象属性：`delete obj.myproperty`
- 数组item：使用数组的splice方法释放数组中不用的item
28. 避免string的隐式装箱
29. 性能方面的注意事项
- 尽量使用原生方法
- switch语句相对if较快
- 位运算较快
- 巧用||和&&布尔运算符
```javascript
function f1(e){
    if (!e) e = window.event
    //e = e || window.event
}

// a && doSomething(a)
if (a) {doSomething(a)}
```
30.  总是检查数据类型
31.  \==和===的区别