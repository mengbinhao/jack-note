[阮一峰es6](http://es6.ruanyifeng.com/)

### ES6
1. 模板字符串,可保留多行格式，可以调用函数
    ```javascript
        `http://localhost:3000/api/messages/${id}`

        function test(str, age) {
            return `${str[0]}${age} lala`
        }
        let arr = [1,2,3]
        //note below two way the params is defferent
        //note below two way the params is defferent
        let a = `${test(1,2)}`
        let b = test`this is 33 ${age}`
    ```

2. 函数增强

    1. 默认参数

            //不能再用let const定义函数形参,函数默认参数是一个作用域,找不到往上层找
            //强制要求参数
            const required = () => {throw new Error('Missing parameter')}
            const add = (a = required(), b = required()) => a + b;
            add()
    2. 剩余参数
    3. 箭头函数
        > 1 没有this,函数体里面的this是箭头函数定义时所在对象,不是运行时(this看上一级，若是箭头函数继续上找,作用域是栈内存不是堆内存)
        >
        > 2 没有arguments,但有...
        >
        > 3 不能用作构造函数
        >
        > 4 不可用yield,因此不能用Generator函数
        >
        > 5 不能通过call / apply / bind改变this

3. 解构(数组、对象、函数参数、解构不成功`undefined`)
    1. 排除对象不需要的属性 `var {child: {name:xinming='Jack', age}} = obj`
    2. 合并对象  let merged = {...obj1, ...obj2} 注意重复属性后面覆盖前面
    3. 对称解构
    4. 不对称解构
    5. 数值交换 `let [p1, p2] = [p2, p1]`
4. 对象增强
    1. `class new constructor extends super get set static`
    ```javascript
        class Animal {
            constructor() {
                this.species = '动物'
            }
            move() {
                console.log('move')
            }
        }

        class Person extends Animal{
            constructor(name, age){
                super()
                this.name = name
                this.age = age
                this._private = 'private'
            }
            walk() {
                console.log('I can walk')
            }
            get private() {
                return this._private
            }
            set private(val) {
                this._private = val
            }
            static staticMethod() {
                return 'static'
            }
        }
    ```
    1. 不要用箭头
    2. 函数、属性简写
    3. 对象键可以使用变量 `obj = {[n+1*2]:'a'}`
    4. class和自定义类型的区别
      - class的声明不会提升，与let类似
      - class的声明自动运行于严格模式之下
      - class声明的方法不可枚举
      - class的内部方法没有 constructor 属性，无法new
      - 调用class的构造函数必须new
      - class内部方法不能同名
5. let & const
    1. 作用域为{}
    2. TDZ
    3. 重复let会error
    4. const还有let只有一次赋值机会,必须在声明的时候立马赋值
    5. 关于是否变量提升:
        >let 的「创建」过程被提升了，但是初始化没有提升
        >
        >var 的「创建」和「初始化」都被提升了
        >
        >function 的「创建」「初始化」和「赋值」都被提升了

6.  new API
    - String
        - includes
        - repeat
        - startWith
        - endWith
    - Number
        - Number.isNaN
        - Number.parseInt
        - Number.parseFloat
        - Number.isInteger
        - Number.isSafeInteger
        - Number.isFinite
        - Number.EPSILON
    - Array
        - Array.from
        - Array.of
        - fill
        - includes
        - copyWithin
        - find(fn)、findIndex(fn)
        - keys、values、entries
    - Object
        - Object.is
        - Object.assign   //shadow copy
        - keys(自身可枚举)、entries、values
        - Object.getOwnPropertyNames //自身可枚举不可枚举属性
    - Math
        - Math.trunc  //parseInt
        - Math.sign
        - Math.acosh
        - Math.hypot
        - Math.imul
7.  Symbol `可创建对象私有属性`
8.  Set`唯一包括原始值和引用值`、WeakSet、Map`任何值可以作为key` WeakMap
9.  Iterator
    ```javascript
        let makeIterator = (array) => {
            let nextIndex = 0;
            return {
                next: function() {
                    return nextIndex < array.length ? {value: array[nextIndex++], done:false} : {done:true}
                }
            }
        }
        let it = makeIterator([1,2,3]);
    ```
10. generator
    ```javascript
    function* idMaker() {
        let index = 0;
        while(true) {
            yield index++
        }
    }
    ```
11. Promise
12. Reflect
13. Proxy
14. module(服务器环境)
    1. export
            ```javascript
            var num2 = 2; export {num2}
            export var num1 = 1;
            export { a as xxx, b as yyy}
            export default const a = 12;//只有default export的东西import的时候不加大括号，import的时候名字随便起
            export default const example2 = {
                name : 'my name',
                age : 'my age',
                getName  = function(){  return 'my name' }
            ```
    2. import
            //相对/绝对路径
            //只会导入一次  无论引入多少次
            //相当于引入文件
            import "https://code.jquery.com/jquery-3.3.1.min.js";

            import {a as xxx,b as yyyy} './App.js'

            import {* as xxx} from './App.js'

            import * as obj from './App.js'

            import a, {x,y} from './App.js'

            import {num1,num2} from './App.js'

            import会提升

            导出去模块内容,如果里面有定时器更改，外面也会改动，不像Common规范有缓存

            import()   类似node里面require，可以动态引入，默认import语法不能写在if里面，返回值是个promise （按需加载 动态路径 可写if里）
        总结:
        1. 当用 export default people导出时,就用 import people导入(不带大括号)
        2. 一个文件里,有且只能有一个export default,但可以有多个export
        3. 当用export name时,就用import { name }导入(记得带上大括号)
        4. 当一个文件里,既有一个 export default people,又有多个export name或者 export age时,导入就用import people, { name, age }
        5. 当一个文件里出现n多个export导出很多模块,导入时除了一个一个导入,也可以用 import * as example

### ES7
1. asyn函数

    await 多个 async 函数

    `await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])`
2. Decorator修饰器
3. 幂运算符
4. array.includes()