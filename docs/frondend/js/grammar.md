1. function: 具名、匿名、箭头
    > 1 没有this,函数体里面的this是箭头函数定义时所在对象,不是运行时(this看上一级，若是箭头函数继续上找，作用域是栈内存不是堆内存)
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
4. this是function隐藏的第一个参数,且必须是对象，默认window,严格模式undefined, arguments是隐藏的第二个,没传就是length为0的类数组
5. call/apply
6. bind
7. curry
8. 高阶
    > 1 接受一个或多个函数作为输入    `sort、forEach、map、filter、reduce...`
    >
    > 2 输出一个函数     `fn.bind.call(fn, {}, 1,2,3)`
    >
    > 3 常常同时满足以上2个
9. callback
10. constructor
    - 首字母大写
    - 返回对象的函数
    > 1 this = {};
    >
    > 2 this.__proto__ = constructor.prototype
    >
    > 3 constructor.call(this,xxx,yyy);
    >
    > 4 return the object or an object returned by return statement