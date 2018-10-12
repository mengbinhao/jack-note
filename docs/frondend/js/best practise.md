1. `let / const` 取代 `var`，全局环境不应有变量, 使用变量的时候必须先声明
2. 多类型单个var声明
3. 避免全局查找
4. 使用`=== / !==` 取代`== / !=`(两端有`true or false [] "" 0`不要使用`==`,underfined、null、0、false、NaN、空字符串的逻辑结果均为falsey)
5. 除了用于比较`null`或`undefined`,永远不要使用非严格相等`==`
6. 避免与`null`进行比较
7. `setInterval`代替`setTimeout`,传给`setInterval()`和`setTimeout()`时使用函数而不是字符串
8. 避免`with、eval、Function`构造器
9. 类型转换
   ```javascript
   ("" + xx) > String() > .toString() > new String() //number to string
    Math.floor() 或者 Math.round()  //浮点转整
    !!myVar //to boolean
   ```
10. `var name=values[i]; i++`; to `var name=values[i++]`
11. 使用字面量 `var aTest = [];`   `var aTest = {};`  `var reg = /../;`
12. 字符串拼接
   ```javascript
    var buf = [];

    for (var i = 0; i < 100; i++) {
        buf.push(i.toString());
    }
    var all = buf.join("");

   ```
13. 优化循环
    - 减值迭代
    - 简化终止条件
    - 简化循环体
14. 使用for-in前先检测对象是否是`null or undefined`,保证最大兼容性
15. 不要在循环内部或要求性能的函数中使用`try-catch-finally`
16. 尊重对象的所有权
17. 松散耦合html/javascript、css/javascript、事件处理/事件绑定
18. 尽量使用原生方法
19. `switch`语句相对`i`f较快,使用`switch/case`代替一大叠的`if/else`
20. 巧用||和&&布尔运算符
21. 分号结尾,代码块使用大括号(包括一行的if),使用小括号提升表达式优先级
22. `typeof`判断基本类型`constructor`和`instanceof`存在`iframe`问题
23. 使用`XMLHttpRequests`时注意设置超时
24. 原始操作符比函数调用快
25. 将来所有编程针对'use strict'
26. 解构赋值
27. 使用扩展运算符复制数组
28. 箭头函数(绑定this,取代bind)
29. class取代prototype
30. 构造函数函数名大写
31. 重写对象的prototype 必须重置constructor
32. 永远不要使用空单元数组
33. Array.includes 来处理多重条件
```javascript
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}

//change to
function test(fruit) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}
```
35. 少写嵌套，尽早返回
```javascript
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (fruit) {
    if (redFruits.includes(fruit)) {
      console.log('red');

      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

//change to
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!');

  if (redFruits.includes(fruit)) {
    console.log('red');

    if (quantity > 10) {
      console.log('big quantity');
    }
  }
}
```
36. 使用函数默认参数和解构
```javascript
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1;

  console.log(`We have ${q} ${fruit}!`);
}

//change to
function test(fruit, quantity = 1) {
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}
```

```javascript
function test(fruit) {
  if (fruit && fruit.name)  {
    console.log (fruit.name);
  } else {
    console.log('unknown');
  }
}

//change to
function test({name} = {}) {
  console.log (name || 'unknown');
}

```
37. 相较于 switch，Map / Object 也许是更好的选择
```javascript
function test(color) {
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

//chang to
const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
};

//or
const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor[color] || [];
}

//or
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'strawberry', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'pineapple', color: 'yellow' },
    { name: 'grape', color: 'purple' },
    { name: 'plum', color: 'purple' }
]

function test(color) {
    return fruits.filter(f => f.color == color);
}
```
38. 使用 Array.every 和 Array.some 来处理全部/部分满足条件
```javascript
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  let isAllRed = true;

  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed);
}

//change to
function test() {
  //const isAnyRed = fruits.some(f => f.color == 'red');
  const isAllRed = fruits.every(f => f.color == 'red');
  console.log(isAllRed);
}
```
39. ESLint
40. 外部引用js,统一放到/body前
41. DOM相关
        - 减少DOM操作
        - 使用`DocumentFragment`优化多次`append`
        - 使用一次`innerHTML`赋值代替构建dom元素
        - 通过模板元素`clone`，替代`createElement`
        - 使用`firstChild`和`nextSibling`代替`childNodes`遍历dom元素
        - cloneNode
        - 尽量使用局部变量
        - 尽量只获取元素节点
        - 尽量使用最新的API,如`querySelector`
        - 尽量在`appendChild`前操作
        - 利用`cssText`
        - 事件委托
        - 删除dom节点之前,一定要删除注册在该节点上的事件
        - dom方法跟`innerHTML`对比(chrom前者好)