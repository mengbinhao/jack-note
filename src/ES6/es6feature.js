/*
ES6
    1 模板字符串,可保留多行格式
        `http://localhost:3000/api/messages/${id}`;
    2 函数增强
        默认参数
            不能再用let const定义函数形参,函数默认参数是一个作用域,找不到往上层找
            强制要求参数
                const required = () => {throw new Error('Missing parameter')}
                const add = (a = required(), b = required()) => a + b;
                //add(1)
        剩余参数必须放到最后
        箭头函数
            没有this,函数体里面的this是箭头函数定义时所在对象,不是运行时(this看上一级，若是箭头函数继续上找，作用域是栈内存不是堆内存)
            没有arguments   但有...
            不能用作构造函数
            不可用yield 因此不能用Generator函数
            不能通过call apply bind改变this
    3 解构(数组、对象、函数参数,解构不成功undefined)
        排除对象不需要的属性
        合并对象  let merged = {...obj1, ...obj2} 注意重复属性后面覆盖前面
        对称解构
        不对称解构
        数值交换  let [p1, p2] = [p2, p1]
    4 对象增强
        class constroctor extends super static
        不要用箭头
        函数、属性简写
    5 let/const
        没有预解析  不存在变量提升
    6 String(includes startWith endWith repeat)
        Number(isNaN parseInt parseFloat isInteger isFinite)
        Array(Array.from(x) Array.of(x) fill includes copyWithin find(fn) findIndex(fn) arr.keys() arr.entries())
        Object(Object.is() Object.assign() keys(自身可枚举) entries  values Object.getOwnPropertyNames()自身可枚举不可枚举属性)
    7 await 多个 async 函数
        await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])
    7 Symbol
    8 Set WeakSet Map WeakMap
    9 Iterator
    10 generator
    11 Promise
    12 Proxy
    13 module
        服务器环境
        export
            var num2 = 2; export {num2}
            export var num1 = 1;
            export { a as xxx, b as yyy}
            export default const a = 12;  只有default export的东西import的时候不加大括号，import的时候名字随便起
            export default const example2 = {
                name : 'my name',
                age : 'my age',
                getName  = function(){  return 'my name' }
            RegExp Preview and Editor}
        import
            相对/绝对路径
            只会导入一次  无论引入多少次
            import "https://code.jquery.com/jquery-3.3.1.min.js";  相当于引入文件
            import {a as xxx,b as yyyy} './App.js'
            import {* as xxx} from './App.js'
            import * as obj from './App.js'
            import a, {x,y} from './App.js'
            import {num1,num2} from './App.js'
            import会提升
            导出去模块内容,如果里面有定时器更改，外面也会改动，不像Common规范有缓存
            import()   类似node里面require，可以动态引入，默认import语法不能写在if里面，返回值是个promise （按需加载 动态路径 可写if里）
            <script type="module">
                xxxxxx
            </script>
        总结：
            1.当用 export default people 导出时，就用 import people 导入（不带大括号）
            2.一个文件里，有且只能有一个 export default。但可以有多个 export。
            3.当用 export name 时，就用 import { name }导入（记得带上大括号）
            4.当一个文件里，既有一个 export default people, 又有多个 export name 或者 export age 时，导入就用 import people, { name, age }
            5.当一个文件里出现 n 多个 export 导出很多模块，导入时除了一个一个导入，也可以用 import * as example

ES7
    asyn函数
        await 多个 async 函数
            await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])
    Decorator修饰器
*/

//对象解构
const user = {
    name: 'Jack',
    age: 33,
    hobby: 'LOL',
    ability: ['javascript', 'vue', 'nodejs'],
    wife: {
        name: 'feifei',
        age: 22
    }
}
//排除不需要的属性
let { ability, wife:{name}, ...others } = user;
let objDestructionFun = ( {name = 'feifei', age = 22, hobby = 'AOV'} = {} ) => console.log({ name, age, hobby });
//objDestructionFun(user);
//objDestructionFun({});
//objDestructionFun();


//数组解构
const arr = [1997, 'John Doe', 'US', 'john@doe.com', 'New York'];
let { 2: country, 4: state } = arr;
let [x1,,,y1] = arr;
let [x2,y2,[z2]] = [1,2,[3]];
let [,x3,,...y3] = [1,2,3,4,5,6];