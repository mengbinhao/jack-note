1. let / const 取代 var，全局环境不应该有变量, 使用变量的时候必须先声明
2. 避免全局查找
3. 使用===  !== 取代  ==  !=  (两端有true or false [] "" 0 不要使用 ==,underfined、null、0、false、NaN、空字符串的逻辑结果均为false)
4. 除了用于比较 null 或 undefined，永远不要使用非严格相等 ==
5. setInterval代替setTimeout,传给setInterval()和setTimeout()时使用函数而不是字符串
6. 避免with、eval、Function构造器
7. 类型转换
   ```javascript
   ("" +) > String() > .toString() > new String() //number to string
    Math.floor() 或者 Math.round()  //浮点转整
    !!myVar //to boolean
   ```
8. 多类型单个var声明
9. `var name=values[i]; i++`; 前面两条语句可以写成 `var name=values[i++]`
10. 使用直接量 `var aTest = [];`   `var aTest = {};`  `var reg = /../;`
11. 字符串拼接
   ```javascript
    var buf = [];

    for (var i = 0; i < 100; i++) {
        buf.push(i.toString());
    }
    var all = buf.join("");

   ```
12. 使用 DocumentFragment 优化多次 append
13. 使用一次 innerHTML 赋值代替构建 dom 元素
14. 通过模板元素 clone，替代 createElement
15. 使用 firstChild 和 nextSibling 代替 childNodes 遍历 dom 元素
16. 删除 dom 节点之前, 一定要删除注册在该节点上的事件
17. 使用事件代理
18. 优化循环
    - 减值迭代
    - 简化终止条件
    - 简化循环体
19. 不要在循环内部使用try-catch-finally,不要在要求性能的函数中使用
2. 避免与 null 进行比较
3. 使用for-in前先检测对象是否是null or undefined,保证最大兼容性
4.  尊重对象的所有权
5.  松散耦合  html/javascript、css/javascript、事件处理/事件绑定
6.  尽量使用原生方法
7.  switch 语句相对 if 较快,使用switch/case代替一大叠的if/else
8.  巧用 ||和 && 布尔运算符
9.  分号结尾,代码块使用大括号（包括一行的if）,使用小括号提升表达式优先级
10. typeof判断基本类型 constructor和instanceof存在iframe问题
11. 使用XMLHttpRequests时注意设置超时
12. 原始操作符比函数调用快
13. 将来所有编程针对 'use strict'
14. 解构赋值
15. 使用扩展运算符复制数组
16. 箭头函数(绑定this,取代bind)
17. class取代prototype
18. 构造函数函数名大写
19. 重写对象的prototype 必须重置constructor
20. 永远不要使用空单元数组
21. ESLint
22. 外部引用js,统一放到/body前
23. DOM相关
        - 减少DOM操作
        - cloneNode
        - 尽量局部变量
        - 尽量值获取元素节点
        - 尽量使用最新的API   如querySelector
        - 尽量在appendChild前操作
        - 利用cssText
        - 利用文档碎片
        - 事件委托
        - dom方法跟innerHTML对比(chrom前者好)