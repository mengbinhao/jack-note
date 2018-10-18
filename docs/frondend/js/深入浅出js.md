1. function(函数执行时所在的作用域是定义时的作用域，而不是调用时所在的作用域): 具名、匿名、箭头
    > 1 箭头函数体里面的this是箭头函数定义时所在对象,不是运行时(this看上一级，若是箭头函数继续上找，作用域是栈内存不是堆内存)
    >
    > 2 没有arguments   但有...
    >
    > 3 不能用作构造函数
    >
    > 4 不可用yield 因此不能用Generator函数
    >
    > 5 不能通过call apply bind改变this
2. 词法作用域
3. call stack
4. this是function隐藏的第一个参数,且必须是对象,默认window,严格模式则为undefined,arguments是隐藏的第二个,没传就是length为0的类数组
5. call/apply/bind
6. curry
```javascript
    let curry = function (fn, args) {
        let outterArgs = args || []
            length = fn.length
            _this = this
        return function function() {
            let innerArgs = outterArgs.concat([].slice.call(arguments))
            if (innerArgs.length < length) {
                return curry.call(_this, fn, innerArgs)
            } else {
                return fn.appy(_this, innerArgs)
            }
        }
    }
```
7. 高阶
    > 1 接受一个或多个函数作为输入 `sort、forEach、map、filter、reduce...`
    >
    > 2 输出一个函数 `fn.bind.call(fn, {}, 1,2,3)`
    >
    > 3 常常同时满足以上2个
8.  callback
9.  异步
    > try...catch 无法捕获,只能在回调里面try
    >
    > 1 脚本加载
    >
    > 2 播放器
    >
    > 3 数据访问
    >
    > 4 动画
    >
    > 5 DOM事件绑定、数据事件绑定

10. constructor
    - 首字母大写
    - 返回对象的函数
    - 如果构造函数没有参数可以省略括号 `let p = new Person`
    > 1 this = {};
    >
    > 2 this.__proto__ = constructor.prototype
    >
    > 3 constructor.call(this,xxx,yyy);
    >
    > 4 return the object or an object returned by return statement
11. prototype
12. this(默认(严格非严格) / 隐式(obj1.obj2.foo())/ 显式(call/apply/bind) / new)
    - 优先级: new > 显示绑定 > 隐式绑定 > 默认绑定
    > this是参数 运行时才知道是什么
    >
    > 只有函数有this,对象没有this
13. new
    ```javascript
        //fake code
        function Person() {
            this = {}
            this.__proto__ == Person.prototype
            Person.call(this)
            return this;
        }
    ```
14. inherit
    ```javascript
        function Person(xxx, yyy){
            this.name = xxx
            this.age = yyy
        }

        function soilder() {
            this.type = '特种兵'
        }

        /*
            this.__proto__ == Person.prototype
        */
        soilder.prototype = new Person()

        function FakePerson() {}
        FakePerson.prototype = Person.prototype
        soilder.prototype = new FakePerson()  //understand!!!!!!!
        soilder.prototype.__proto__ === FakePerson.prototype === Person.prototype
        //ES6
        soilder.prototype = Object.create(Person.prototype)
    ```

    ```javascript
        let inherit = (function() {
            let F = function(){}
            return function(Target, Origin) {
                F.prototype = Origin.prototype
                Target.prtotype = new F()
                Target.prototype.constructor = Target
                Target.uber = Origin.prototype
            }
        })()
    ```

### 封装组件
- (内部)分层原则:正交原则
- (对外)封装原则:面向接口编程
- 练习tab、sticky、dialog、suggestion、swipe

### MVC
- model 只负责存储数据、请求数据、更新数据
- view 只负责渲染 HTML（可接受一个 data 来定制数据）
- controller 负责调度 model 和 view
> Angular 与 Vue 的双向绑定
>
> React —— 单向绑定

### array
1. forEach vs for
> 1 forEach can not break
> 2 每次迭代forEach都有一个新的作用域

2. forEach、map、reduce、filter、some、every、find、findIndex (self implement)

3. reduce replace forEach map filter
```javascript
    arr.reduce((acc, cur) => {
        acc.push(cur)
        return acc
    }, [])
```

```javascript
    arr.reduce((acc, cur) => {
        if (cur % 2 === 0) {
            acc.push(cur)
        }
        return acc
    }, [])
```

4. throttle 节流, x ms内只执行1次
5. debounce 防抖, 等x ms才invoke,  eg: input / resize

### Rx.js
1. 变量难以追踪
2. try...catch
3. 内存泄漏

### <<代码大全>>中的编程技巧
1. 代码调整技巧
    1. 逻辑
        1. 在知道答案后停止判断
        2. 按照出现频率来调整判断顺序
        3. 要做性能测试，不要盲目相信结论
        4. 用表代替复杂分支
        5. 惰性求值
    2. 循环
        1. 将不需要重复计算的逻辑外提
        2. 把最忙（循环次数多）的循环放在最内层
        3. 使用哨兵值加速循环
    3. 其他
        1. 削弱运算强度：用移位运算代替乘2或除2
        2. 将一些值初始化：如一天是 86400 秒
        3. 对每一次改进进行量化
2. 管理构建
    1. 鼓励良好的编码实践
        1. 设定标准（编码规范、文档规范、checklist 等）
        2. 每个项目两个人（结对、师徒、支援）
        3. Code Review
        4. 提供最佳实践给人参考
        5. 强调代码是共有财产
    2. 需求变更和设计变更
        1. 不要马上变更，累积一些再变更
        2. 成立变更委员会，系统化地控制变更
        3. 警惕官僚主义
    3. 备份所有东西：源码、工具、需求、变更、设计、文档……
    4. 如果进度落后了怎么办
        1. 期待后期赶上——不可能
        2. 增加人手——火上浇油
        3. 砍需求——最靠谱
    5. 把程序员当人看
        1. 程序员不是机器
        2. 要有舒适的环境、要休息
        3. 个体差异
        4. 团队差异
        5. 信仰问题
    6. 管理/教育你的管理者
3. 自说明代码
    1. 复述代码——无聊
    2. 解释代码——改进代码
    3. 标记——可能用的到
    4. 概述代码——有用
    5. 代码意图说明——指出要解决的问题
    6. 传达代码无法表述的信息——非常重要