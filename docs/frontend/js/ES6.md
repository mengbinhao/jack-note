### ES6

1. 模板字符串,可保留多行格式，可以调用函数

   ```javascript
   ;`http://localhost:3000/api/messages/${id}`

   function test(str, age) {
     return `${str[0]}${age} lala`
   }
   let arr = [1, 2, 3]
   //note below two way the params is defferent
   //note below two way the params is defferent
   let a = `${test(1, 2)}`
   let b = test`this is 33 ${age}`
   ```

2. 函数增强

   1. 参数默认值
      //不能再用 let const 定义函数形参,函数默认参数是一个作用域,找不到往上层找
      //强制要求参数
      const required = () => {throw new Error('Missing parameter')}
      const add = (a = required(), b = required()) => a + b;
      add()
   2. 剩余参数
      1. `Array.prototype.slice.call(arguments).sort() to const sortNumbers = (...numbers) => numbers.sort()`
      2. 与解构赋值组合使用`var [a,b,...c] = array;`
   3. 箭头函数
      > 1 没有 this,函数体里面的 this 是箭头函数**定义**时所在对象,不是运行时(this 看上一级，若是箭头函数继续上找), call / apply / bind也改变不了
      >
      > 2 没有 arguments,但有...
      >
      > 3 不能用作构造函数,new 调用
      >
      > 4 没有原型对象
      >
      > 5 没有自己的 super 和 new.target 绑定
      >
      > 6 不可用 yield,因此不能用 Generator 函数
      >
      > 7 形参名称不能重复

3. 解构(数组、对象、函数参数、解构不成功`undefined`,比如不对称解构)
   1. 排除对象不需要的属性、提取 JSON 数据、Map 解构、解析模块方法
      ```javascript
      let {
        child: { name: xinming = 'Jack', age }
      } = obj
      let { id, status, data: number } = jsonData
      //for (let [key,] of map)
      //for (let [,value] of map)
      for (let [key, value] of map) {
        console.log(key + 'is' + value)
      }
      const { SourceMapConsumer, SourceNode } = require('source-map')
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
   4. 合并对象 let merged = {...obj1, ...obj2} //注意重复属性后面覆盖前面
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

   class Person extends Animal {
     constructor(name, age) {
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
5. ES6 class 和 ES5 的类区别
   1. `class`声明会提升,但不会初始化赋值,类似`const、let`
   ```javascript
		var bar = new Bar()

		function Bar() {
			this.bar = 42
		}
		//Uncaught ReferenceError: Cannot access 'Foo' before initialization
		var foo = new Foo()
		class Foo {
			constructor(){
				this.foo = 42
			}
		}
   ```
	 2. `class`内部默认严格模式
   ```javascript
		function Bar() {
			baz = 42; // it's ok
		}
		const bar = new Bar();

		class Foo {
			constructor() {
				fol = 42; // ReferenceError: fol is not defined
			}
		}
		const foo = new Foo();
   ```
	 3. `class`的所有方法(包括静态方法和实例方法)都是不可枚举的
   ```javascript
		function Bar() {
			this.bar = 42;
		}
		Bar.answer = function() {
			return 42;
		};
		Bar.prototype.print = function() {
			console.log(this.bar);
		};
		const barKeys = Object.keys(Bar); // ['answer']
		const barProtoKeys = Object.keys(Bar.prototype); // ['print']

		class Foo {
			constructor() {
				this.foo = 42;
			}
			static answer() {
				return 42;
			}
			print() {
				console.log(this.foo);
			}
		}
		const fooKeys = Object.keys(Foo); // []
		const fooProtoKeys = Object.keys(Foo.prototype); // []
   ```
	 4. `class`的所有方法(包括静态方法和实例方法)都没有原型对象 prototype，所以也没有`[[construct]]`，不能使用`new`来调用
   ```javascript
   function Bar() {
     this.bar = 42;
   }
   Bar.prototype.print = function() {
     console.log(this.bar);
   };

   const bar = new Bar();
   const barPrint = new bar.print(); // it's ok

   class Foo {
     constructor() {
       this.foo = 42;
     }
     print() {
       console.log(this.foo);
     }
   }
   const foo = new Foo();
   const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor
   ```
	 5. 必须使用`new`调用`class`
   ```javascript
	 	function Bar() {
			this.bar = 42;
		}
		const bar = Bar(); // it's ok

		class Foo {
			constructor() {
				this.foo = 42;
			}
		}
		const foo = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
   ```
	 6. `class`内部无法重写类名
   ```javascript
		function Bar() {
			Bar = 'Baz'; // it's ok
			this.bar = 42;
		}
		const bar = new Bar();
		// Bar: 'Baz'
		// bar: Bar {bar: 42}

		class Foo {
			constructor() {
				this.foo = 42;
				Foo = 'Fol'; // TypeError: Assignment to constant variable
			}
		}
		const foo = new Foo();
		Foo = 'Fol'; // it's ok
   ```
   - `ES6 class`子类必须在构造函数中调用`super()`,这样才有`this`对象;`ES5`中类继承的关系是相反的,先有子类的`this`,然后用父类的方法应用在`this`上
   - `ES6 class`有两个原型链
   - `B.__proto__ === A //核心目的是实现静态方法继承`
   - `B.prototype.__proto__ === A.prototype`

6. let & const

   1. 作用域为{}
   2. TDZ
   3. 重复 let 会 error
   4. const 还有 let 只有一次赋值机会,必须在声明的时候立马赋值
   5. 关于是否变量提升:
      > let 的「创建」过程被提升了，但是初始化没有提升
      >
      > var 的「创建」和「初始化」都被提升了
      >
      > function 的「创建」「初始化」和「赋值」都被提升了

7. new API
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
     - Object.assign //shadow copy
     - keys(自身可枚举)、entries、values
     - Object.getOwnPropertyNames //自身可枚举不可枚举属性
   - Math
     - Math.trunc //parseInt
     - Math.sign
     - Math.acosh
     - Math.hypot
     - Math.imul
8. Symbol `可创建对象私有属性`
9.  Set`唯一包括原始值和引用值`、WeakSet、Map`任何值可以作为key` WeakMap
10. Iterator
   ```javascript
   let makeIterator = array => {
     let nextIndex = 0
     return {
       next: function() {
         return nextIndex < array.length
           ? { value: array[nextIndex++], done: false }
           : { done: true }
       }
     }
   }
   let it = makeIterator([1, 2, 3])
   ```
11. generator
    ```javascript
    function* idMaker() {
      let index = 0
      while (true) {
        yield index++
      }
    }
    ```
12. Promise
13. Reflect
14. Proxy

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

const obj = { a: 1, b: { c: 0, d: { e: -1 } } }
const newObj = new Proxy(obj, handler)

newObj.a // output: GET...
newObj.b.c // output: GET...

newObj.a = 123 // output: SET...
newObj.b.c = -1 // output: GET...
```

14. module(服务器环境)

    1.  `import`
        ```javascript
        //相对/绝对路径
        //只会导入一次 无论引入多少次
        //相当于引入文件
        import "https://code.jquery.com/jquery-3.3.1.min.js"

        import x from "./a.js" 引入模块中导出的默认值

        import {a as x, modify} from "./a.js"; 引入模块中的变量

        import * as x from "./a.js" 把模块中所有的变量以类似对象属性的方式引入

        //语法要求不带 as 的默认值永远在最前。注意，这里的变量实际上仍然可以受到原来模块的控制
        import d, {a as x, modify} from "./a.js"

        import d, * as x from "./a.js"

        //import会提升
        //导出去模块内容,如果里面有定时器更改，外面也会改动，不像Common规范有缓存
        //import()   类似node里面require，可以动态引入，默认import语法不能写在if里面，返回值是个promise(按需加载/动态路径可写if里)
        ```
    2.  `export`
        ```javascript
        export {a, b, c};
        export var num1 = 1;(包括function(含async、generator)、class、let、const)
        export { a as xxx, b as yyy}
        export default () => {xxx} (class也可以這樣寫,都没有名字)

        export function add(a,b) { return a + b; }
        //这里导出的是值,以后a的变化与导出的值就无关了
        var a = {}; export {a}

        //在import语句前无法加入export，但是我们可以直接使用export from语法
        export a from "a.js"
        ```

        总结:
        1. 当用 export default people 导出时,就用 import people 导入(不带大括号)，当用 export name 时,就用 import { name }导入(带大括号)
        2. 一个文件里,有且只能有一个 export default,但可以有多个 export
        3. 当一个文件里,既有一个 export default people,又有多个 export name 或者 export age 时,导入就用 import people, { name, age }
        4. 当一个文件里出现 n 多个 export 导出很多模块,导入时除了一个一个导入,也可以用 import \* as example

    3.  和 CommonJS 区别
        1. 前者支持动态导入，也就是 require(\${path}/xx.js)，后者目前不支持，但是已有提案 import(xxx)
        2. 前者是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
        3. 前者在导出时都是值的浅拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用输出值的引用，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
        4. 后者会编译成 require/exports 来执行的

15. 扩展运算符
    1.  代替 apply `Math.max.apply(null,array); Math.max(...array)`
    2.  代替数组 push、concat`Array.prototype.push.apply(arr1, arr2); arr1.push(...arr2)`
    3.  拷贝数组或对象`var array1 = [...array0]; var obj2 = {...obj};`
    4.  将伪数组转化为数组`console.log([...nodeList]);`

### ES7

1. asyn 函数

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
       const result = await axios.get(
         `https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`
       )
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
       return axios.get(
         `https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`
       )
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

2. Decorator 修饰器
3. 幂运算符
4. array.includes()
