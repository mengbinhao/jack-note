### this
1. 在全局环境中，this 的值指向全局对象( window 或 global )。


2. 在函数内部，this 的取值取决于其所在函数的调用方式，也就是说 this 的值是在函数被调用的时候确定的，在创建函数时无法确定。当然，箭头函数是个例外，箭头函数本身不存在 this，而在箭头函数中使用 this 获取到的便是创建其的上下文中的 this。同时，使用函数的继承方法 call 、 apply 和 bind 会修改 this 的指向。但值得注意的是，使用 bind 方法会使 this 的值永久的绑定到给定的对象，无法再通过调用 call 和 apply 方法修改 this 的值，箭头函数调用 call 、 apply 或 bind 方法无法修改 this。

> 作为对象的方法
> 作为构造函数
> apply call bind
> arrow function