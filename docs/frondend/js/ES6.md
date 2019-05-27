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

    1. 参数默认值
            //不能再用let const定义函数形参,函数默认参数是一个作用域,找不到往上层找
            //强制要求参数
            const required = () => {throw new Error('Missing parameter')}
            const add = (a = required(), b = required()) => a + b;
            add()
    2. 剩余参数
       1. `Array.prototype.slice.call(arguments).sort() to const sortNumbers = (...numbers) => numbers.sort()`
       2. 与解构赋值组合使用`var [a,b,...c] = array;`
    3. 箭头函数
        > 1 没有this,函数体里面的this是箭头函数定义时所在对象,不是运行时(this看上一级，若是箭头函数继续上找,作用域是栈内存不是堆内存)
        >
        > 2 没有arguments,但有...
        >
        > 3 不能用作构造函数,new调用
        >
        > 4 不可用yield,因此不能用Generator函数
        >
        > 5 不能改变this绑定,即使通过call / apply / bind
        >
        > 6 形参名称不能重复
        >
        > 7 没有原型对象
        >
        > 8 没有自己的super和new.target绑定
3. 解构(数组、对象、函数参数、解构不成功`undefined`,比如不对称解构)
    1. 排除对象不需要的属性、提取JSON数据、Map解构、解析模块方法
        ```javascript
        let {child: {name:xinming='Jack', age}} = obj
        let {id, status, data: number} = jsonData
        //for (let [key,] of map)
        //for (let [,value] of map)
        for (let [key, value] of map) {
            console.log(key + 'is' + value)
        }
        const {SourceMapConsumer, SourceNode} = require("source-map")
        ```
    2. 数值交换`let [p1, p2] = [p2, p1]`
    3. 接收函数返回值
        ```javascript
        //有序
        function f([x, y, z]) {...}
        f([1, 2, 3])
        //无序
        function f({x, y, z}) {...}
        f({z: 3, y: 2, z: 1})
        ```
    4. 合并对象  let merged = {...obj1, ...obj2} //注意重复属性后面覆盖前面
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
    4. [ES6 class和ES5的类区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)
      - ES6 class 子类必须在父类的构造函数中调用super(),这样才有this对象;ES5中类继承的关系是相反的,先有子类的this,然后用父类的方法应用在this上
      - class有两个原型链
      - `B.__proto__ === A //核心目的是实现静态方法继承`
      - `B.prototype.__proto__ === A.prototype`
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
        - Array.isArray(arr)
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

```javascript
const handler = {
  // receiver 指向 proxy 实例
  get(target, property, receiver) {
    console.log(`GET: target is ${target}, property is ${property}`)
    return Reflect.get(target, property, receiver)
  },
  set(target, property, value, receiver) {
    console.log(`SET: target is ${target}, property is ${property}`)
    return Reflect.set(target, property, value)
  }
}

const obj = { a: 1 , b: {c: 0, d: {e: -1}}}
const newObj = new Proxy(obj, handler)

newObj.a // output: GET...
newObj.b.c // output: GET...

newObj.a = 123 // output: SET...
newObj.b.c = -1 // output: GET...
```
14.  module(服务器环境)
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
        3. 当用export name时,就用import { name }导入(带大括号)
        4. 当一个文件里,既有一个 export default people,又有多个export name或者 export age时,导入就用import people, { name, age }
        5. 当一个文件里出现n多个export导出很多模块,导入时除了一个一个导入,也可以用 import * as example
    3. 和CommonJS区别
        1. 前者支持动态导入，也就是 require(${path}/xx.js)，后者目前不支持，但是已有提案import(xxx)
        2. 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
        3. 前者在导出时都是值的浅拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用输出值的引用，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
        4. 后者会编译成 require/exports 来执行的

2.   扩展运算符
     1. 代替apply `Math.max.apply(null,array); Math.max(...array)`
     2. 代替数组push、concat`Array.prototype.push.apply(arr1, arr2);  arr1.push(...arr2)`
     3. 拷贝数组或对象`var array1 = [...array0]; var obj2  = {...obj};`
     4. 将伪数组转化为数组`console.log([...nodeList]);`

### ES7
1. asyn函数

    await 多个 async 函数

    `await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])`
    ```javascript
    async function getData() {
        const result = await axios.get('https://dube.io/service/ping')
        const data = result.data
        console.log('data', data)
        return data
    }
    getData()
    ```

    ```javascript
    async function fetchData(dataSet) {
        for (entry of dataSet) {
            const result = await axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
            const newData = result.data
            updateData(newData)
            console.log(myData)
        }
    }
    ```

    ```javascript
    import axios from 'axios'

    let myData = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
    async function fetchData(dataSet) {
        const pokemonPromises = dataSet.map(entry => {
            return axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
        })
        const results = await Promise.all(pokemonPromises)
        results.forEach(result => {
            updateData(result.data)
        })
        console.log(myData)
    }
    function updateData(newData) {
        myData = myData.map(el => {
            if (el.id === newData.id) return newData
            return el
        })
    }
    fetchData(myData)
    ```
2. Decorator修饰器
3. 幂运算符
4. array.includes()