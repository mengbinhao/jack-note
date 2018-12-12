### this
1. 在全局环境中，this 的值指向全局对象( window 或 global )。
2. 在函数内部，this值在函数被调用的时候确定，在创建函数时无法确定。箭头函数是个例外，箭头函数本身不存在this，而在箭头函数中使用this获取到的便是创建其的上下文中的this。同时，使用函数的继承方法call 、apply 和bind会修改this的指向。但值得注意的是，使用bind方法会使 this 的值永久的绑定到给定的对象，无法再通过调用call和 apply方法修改this的值，箭头函数调用call 、apply或bind方法无法修改this。

> 作为对象的方法
> 作为构造函数
> apply call bind
> arrow function


### 'use strict'
- 必须用var声明变量
- 禁止自定义函数中的this指向window
- 创建eval作用域
- 对象不能有重名的属性
