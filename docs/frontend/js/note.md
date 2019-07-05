### mis
- callback: u define, u donot invoke, but it is invoked afterwards
- 分号注意：
  - 小括号开头的前一条语句
  - 中括号开头的前一条语句
  - js合并的时候一般最开始加分号
  - do...while有分号
  - 函数表达式有分号
- 对象属性访问方式2种(当属姓名包含特殊字符或属姓名不确定使用中括号)
- A instanceof B: B函数的显示原型在A对象的隐式原型链上，返回true
- 比较两个数字字符串的时候，至少一边要转型 `'12121212121' < +'5'`

### this
1. new 调用：绑定到新创建的对象，注意：显示return函数或对象，返回值不是新创建的对象，而是显式返回的函数或对象
2. call 或者 apply（ 或者 bind） 调用：严格模式下，绑定到指定的第一个参数。非严格模式下，null和undefined，指向全局对象（浏览器中是window），其余值指向被new Object()包装的对象
3. 对象上的函数调用：绑定到那个对象
4. 普通函数调用： 在严格模式下绑定到 undefined，否则绑定到全局对象。
   - ES6 中的箭头函数：不会使用上文的四条标准的绑定规则， 而是根据当前的词法作用域来决定this， 具体来说， 箭头函数会继承外层函数，调用的 this 绑定(无论 this 绑定到什么)，没有外层函数，则是绑定到全局对象(浏览器中是window)。 这其实和 ES6 之前代码中的 self = this 机制一样
   - DOM事件函数：一般指向绑定事件的DOM元素，但有些情况绑定到全局对象（比如IE6~IE8的attachEvent）
   - 一定要注意，有些调用可能在无意中使用普通函数绑定规则。如果想“ 更安全” 地忽略 this 绑定，你可以使用一个对象，比如 ø = Object.create(null)，以保护全局对象
   - 优先级`new 调用 > call、apply、bind 调用 > 对象上的函数调用 > 普通函数调用`

### 'use strict'
- 必须用var声明变量
- 禁止自定义函数中的this指向window
- 创建eval作用域
- 对象不能有重名的属性

### 隐式强制类型转换
#### +/-/!/~

- +/- 一元运算符 => 运算符会将操作数进行ToNumber处理.
- ! => 会将操作数进行ToBoolean处理.
- ~ => (~x)相当于 -(x + 1) eg: ~(-1) ==> 0; ~(0) ==> 1; 在if (...)中作类型转换时, 只有-1时, 才为假值.
- +加号运算符 => 若操作数有String类型, 则都进行ToString处理, 字符串拼接. 否则进行ToNumber处理, 数字加法.

#### 条件判断

- if (...), for(;;;), while(...), do...while(...)中的条件判断表达式.
- ? : 中的条件判断表达式.
- || 和 && 中的中的条件判断表达式.

以上遵循 ToBoolean 规则.
#### ||和&&

- 返回值是两个操作数的中的一个(且仅一个). 首先对第一个操作数条件判断, 若为非布尔值则进行ToBoolean强制类型转换.再条件判断.
- || => 条件判断为true, 则返回第一个操作数; 否则, 返回第二个操作数. 相当于 a ? a : b;
- && => 条件判断为true, 则返回第二个操作数; 否则, 返回第一个操作数, 相当于 a ? b : a;

### 显示类型转换
#### 转string
- toString()
- String()  `可以转null、undefined`
- xx + ''

#### 转number
- Number()
- parseInt()   parseFloat() `针对字符串，如果是其它类型先转换成字符串`
- ES6   Number.parseInt  Number.parseFloat
- +xxxx
- 进行\-0、 *1 、/1 可以转number

#### 转boolean
- Boolean()
- !!xxx