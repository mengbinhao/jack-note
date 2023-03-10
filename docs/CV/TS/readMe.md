### Get Started

1. install node

2. npm i typescript -g

   1. tsc -v
   1. tsc -h
   1. tsc  compile command

3. tsc --init generate tsconfig.json

4. tsc -w(watch and compile) -> 再开一个终端node index.js

   > //更好的调试
   >
   > 1 npm i ts-node -g
   >
   > 2 npm init -y
   >
   > 3 tsc --init
   >
   > //声明文件
   >
   > 4 npm i @types/node -D
   >
   > 5 ts-node index.ts

### 类型

#### 基础类型

```typescript
let str:string = 'Jack'
let b:boolean = true
//Infinity、NaN、其他进制等
let num:number = 33
let n:null =  null
let un:undefined = undefined
//let v:void = null
let v:void = undefined

function fn ():void {
  return undefined
}
```

#### 任意类型

```typescript
//类型层级关系
//1 any    unknown
//2 Object
//3 Number Boolean String
//4 number boolean string
//5   1   false   'Jack'
//6   never

//与any区别
//unknown 只能赋值给unknown或any
//unknown 没有办法读任何属性,方法也不可调用
//unknown 比any更安全
let a:any = 1
let b:number = 2
a = b
b = a

let obj:unknown = {name: 'Jack', learn: () => 'learning'}
```

##### Object、object、{}

```typescript
//包含所有类型的Object
let a:Object = 123
let a1:Object = '123'
let a2:Object = false
let a3:Object = []
let a4:Object = {}
let a5:Object = () => {}

//小object写代表非原始类型,即所有引用类型
let b:object = []
let b1:object = {}
let b2:object = () => {}

//类似第一个
let c:{} = 123
c.age = 2 //无法增加属性，少用
```

#### never

```typescript
//表示不应该存在的状态
type A = string & number

function error(message: string): never {
    throw new Error(message);
}

function loop(): never {
    while (true) {
    }
}
```

##### 与void差异

- void类型只是没有返回值,但本身不会出错
- never在联合类型中会被直接移除 `type A = void | number | never`

##### 场景

```typescript
type A = '唱' | '跳' | '吹' | '不可能'

function hobby(value:A) {
  switch (value) {
    case "唱":
      break
    case "跳":
      break
    case "吹":
      break
    default:
      //兜底逻辑
      const error:never = value;
      return error
  }
}
```

#### interface

```typescript
//重名interface会自动重合
//任意key  索引签名
// ?、readonly
//接口继承,可多个
//定义函数类型

interface MB {
  name:string,
  age:number
  //[propName:string]:any
  //prop?:string
  //readonly id:string
  //readonly cb:() => boolean
}

let a:MB = {
  name: 'Jack',
  age:33
}

//定义函数类型
interface Fn {
  (name:string):number[]
}

let fn:Fn = function (name:string) {
  return []
}
```

#### 数组

```typescript
//普通类型
let arr:number[] = [1,2,3]
let arr2:Array<boolean> = [true, false]

//定义对象数组
interface X {
  name:string
}
let arr:X[] = [{name:'Jack'},{name:'Kyo'}]

//二维数组
let arr:number[][] = [[1], [2]]

//大杂烩
let arr:any[] = [1, true, 's']
let arr2:[number, boolean, string] = [1, true, 's']

function f(...args:any[]) {
  //typescript内置interface定义类数组
  let a:IArguments = arguments
}
```

#### 元祖

```typescript
let arr:[number, boolean] = [1, true]
let arr2: readonly [number, boolean] = [1, true]
let arr3:[x:number, y?:boolean] = [1]

type first = typeof arr[0]
type length = typeof arr['length']
```

#### 函数

```typescript
const fn = function (name:string, age:number):string {
  return name + age
}
const fn = function (name:string, age:number = 30):string {
  return name + age
}
const fn = function (name:string, age?:number):string {
  return name + age
}

interface User {
  name:string,
  age:number
}
const fn = function (user:User):User {
  return user
}
fn({name: 'Jack', age:33})
```

##### 函数重载

```typescript
//前两个是重载函数,第三个是执行函数
function fn(param:number):void
function fn(param:string, param2:number):void
function fn(param:any, param2?:any):void {
  console.log(param, param2)
}
```

#### 联合

```typescript
let n:number | boolean = 13
let fn = function (type:number | boolean):boolean {
  return !!type
}
```

#### 交叉

```typescript
interface People {
  name:string,
  age:number
}
interface Man {
  code: boolean
}
const fn = (val:People & Man):void => {
  console.log(val)
}

fn({
  name: 'Jack',
  age: 33,
  code: true
})
```

#### 类型断言

```typescript
const fn = (val:number | string):void => {
  //(<string>val).length
  console.log((val as string).length)
}

fn(123)
fn('123')

(window as any).abc = 123

const fn = (type:any):boolean => {
  return type as boolean
}
```

#### 类型推论

```typescript
let s = 'Jack'

let a //any
a = 1
a = []
```

#### 类型别名type

```typescript
//类型别名
type str = string
let a:str = 'Jack'

//函数别名
type str = () => string
let s:str = () => 'Jack'

//联合类型别名
type str = string | number
let s:str = 123
let s2:str = '123'

//值的别名
type value = boolean | 0 | '213'
let s:value = true
```

##### 对比interface

1. interface可以继承 type 只能通过 & 交叉类型合并
2. type 可以定义 联合类型 和 可以使用一些操作符interface不行
3. interface 遇到重名的会合并 type 不行

##### 高级用法

```typescript
type a = 1 extends number ? 1 : 0 //1
type a = 1 extends Number ? 1 : 0 //1
type a = 1 extends Object ? 1 : 0 //1
type a = 1 extends any ? 1 : 0 //1
type a = 1 extends unknown ? 1 : 0 //1
type a = 1 extends never ? 1 : 0 //0
```

#### 内置类型

##### ECMAScript 的内置对象

```typescript
let b:Boolean = new Boolean(1)
let n:Number = new Number(true)
let s:String = new String('Jack')
let d:Date = new Date()
let r:RegExp = /^1/
let e:Error = new Error("error!")
```

##### DOM 和 BOM 的内置对象

```typescript
let body:HTMLElement = document.body;
let allDiv:NodeList = document.querySelectorAll('div');
//读取div这种需要类型断言或者加个判断因为读不到返回null
let div:HTMLElement = document.querySelector('div') as HTMLDivElement
document.addEventListener('click', function (e: MouseEvent) {

});
interface HTMLElementTagNameMap {
    "a": HTMLAnchorElement;
    "abbr": HTMLElement;
    "address": HTMLElement;
    "applet": HTMLAppletElement;
    "area": HTMLAreaElement;
    "article": HTMLElement;
    "aside": HTMLElement;
    "audio": HTMLAudioElement;
    "b": HTMLElement;
    "base": HTMLBaseElement;
    "bdi": HTMLElement;
    "bdo": HTMLElement;
    "blockquote": HTMLQuoteElement;
    "body": HTMLBodyElement;
    "br": HTMLBRElement;
    "button": HTMLButtonElement;
    "canvas": HTMLCanvasElement;
    "caption": HTMLTableCaptionElement;
    "cite": HTMLElement;
    "code": HTMLElement;
    "col": HTMLTableColElement;
    "colgroup": HTMLTableColElement;
    "data": HTMLDataElement;
    "datalist": HTMLDataListElement;
    "dd": HTMLElement;
    "del": HTMLModElement;
    "details": HTMLDetailsElement;
    "dfn": HTMLElement;
    "dialog": HTMLDialogElement;
    "dir": HTMLDirectoryElement;
    "div": HTMLDivElement;
    "dl": HTMLDListElement;
    "dt": HTMLElement;
    "em": HTMLElement;
    "embed": HTMLEmbedElement;
    "fieldset": HTMLFieldSetElement;
    "figcaption": HTMLElement;
    "figure": HTMLElement;
    "font": HTMLFontElement;
    "footer": HTMLElement;
    "form": HTMLFormElement;
    "frame": HTMLFrameElement;
    "frameset": HTMLFrameSetElement;
    "h1": HTMLHeadingElement;
    "h2": HTMLHeadingElement;
    "h3": HTMLHeadingElement;
    "h4": HTMLHeadingElement;
    "h5": HTMLHeadingElement;
    "h6": HTMLHeadingElement;
    "head": HTMLHeadElement;
    "header": HTMLElement;
    "hgroup": HTMLElement;
    "hr": HTMLHRElement;
    "html": HTMLHtmlElement;
    "i": HTMLElement;
    "iframe": HTMLIFrameElement;
    "img": HTMLImageElement;
    "input": HTMLInputElement;
    "ins": HTMLModElement;
    "kbd": HTMLElement;
    "label": HTMLLabelElement;
    "legend": HTMLLegendElement;
    "li": HTMLLIElement;
    "link": HTMLLinkElement;
    "main": HTMLElement;
    "map": HTMLMapElement;
    "mark": HTMLElement;
    "marquee": HTMLMarqueeElement;
    "menu": HTMLMenuElement;
    "meta": HTMLMetaElement;
    "meter": HTMLMeterElement;
    "nav": HTMLElement;
    "noscript": HTMLElement;
    "object": HTMLObjectElement;
    "ol": HTMLOListElement;
    "optgroup": HTMLOptGroupElement;
    "option": HTMLOptionElement;
    "output": HTMLOutputElement;
    "p": HTMLParagraphElement;
    "param": HTMLParamElement;
    "picture": HTMLPictureElement;
    "pre": HTMLPreElement;
    "progress": HTMLProgressElement;
    "q": HTMLQuoteElement;
    "rp": HTMLElement;
    "rt": HTMLElement;
    "ruby": HTMLElement;
    "s": HTMLElement;
    "samp": HTMLElement;
    "script": HTMLScriptElement;
    "section": HTMLElement;
    "select": HTMLSelectElement;
    "slot": HTMLSlotElement;
    "small": HTMLElement;
    "source": HTMLSourceElement;
    "span": HTMLSpanElement;
    "strong": HTMLElement;
    "style": HTMLStyleElement;
    "sub": HTMLElement;
    "summary": HTMLElement;
    "sup": HTMLElement;
    "table": HTMLTableElement;
    "tbody": HTMLTableSectionElement;
    "td": HTMLTableDataCellElement;
    "template": HTMLTemplateElement;
    "textarea": HTMLTextAreaElement;
    "tfoot": HTMLTableSectionElement;
    "th": HTMLTableHeaderCellElement;
    "thead": HTMLTableSectionElement;
    "time": HTMLTimeElement;
    "title": HTMLTitleElement;
    "tr": HTMLTableRowElement;
    "track": HTMLTrackElement;
    "u": HTMLElement;
    "ul": HTMLUListElement;
    "var": HTMLElement;
    "video": HTMLVideoElement;
    "wbr": HTMLElement;
}

function promise():Promise<number> {
  return new Promise<number>((resolve, reject) => {
    resolve(1)
  })
}
```

### Class

```typescript
class Person {
  name:string
  //若定义变量不用的话，通常是给个默认值或进行赋值
  age:number
  constructor(name:string, age:number) {
    this.name = name
    this.age = age
  }
}
```

#### 类属性修饰符

```typescript
class Person {
  name:string
  private age:number
  protected p:any = ''
  constructor(name:string, age:number) {
    this.name = name
    this.age = age
  }
}
const p = new Person("Jack", 33)
```

#### static属性和static方法

```typescript
class Person {
  name:string
  private age:number
  //通过类名访问
  static p:number = 123
  constructor(name:string, age:number) {
    this.name = name
    this.age = age
  }
  //通过类名访问
  static aaa() {
    //静态内部可以使用this调用其他静态
    this.p
    this.bbb()
  }
  static bbb() {
    console.log('bbb')
  }
}
```

#### interface定义类

```typescript
interface PersonClass {
	get(type: boolean): boolean
}
interface PersonClass2{
	set():void,
	asd:string
}
class A {
	name: string
  constructor() {
    this.name = "123"
  }
}

class Person extends A implements PersonClass,PersonClass2 {
  asd: string
  constructor() {
    super()
    this.asd = '123'
  }
  get(type:boolean) {
    return type
  }
  set () {

  }
}
```

#### abstract class

```typescript
abstract class A {
  name:string
  constructor(name:string) {
    this.name = name
  }
  setName(name:string) {
    this.name = name
  }
  abstract getName():string
}
class B extends A {
  constructor() {
    super('Jack')
  }
  getName():string {
    return this.name
  }
}
let b = new B()
console.log(b.getName())
b.setName('Kyo')
console.log(b.getName())
```

### 枚举

```typescript
enum Types {
  Red,
  Green,
  Blue
}
console.log(Types.Red)
console.log(Types.Green)
console.log(Types.Blue)

//增长枚举
enum Types {
  Red = 3,
  Green,
  Blue
}

//字符串枚
enum Types {
 Red = 'red',
 Green = 'green',
 Blue = 'blue'
}

//异构枚举
enum Types {
 No = "No",
 Yes = 1,
}

//接口枚举
enum Types {
  yyds,
  dddd
}
interface A {
  red:Types.yyds
}

let obj:A = {
  red:Types.yyds
}

//let和var都是不允许的声明只能使用const
//const 声明的枚举会被编译成常量
//普通声明的枚举编译完后是个对象
const enum Types {
 No = "No",
 Yes = 1,
}

//正向映射(name -> value)和反向映射(value -> name)
//注意不会为字符串枚举成员生成反向映射
enum Enum {
  fall
}
let a = Enum.fall
console.log(a) //0
let nameOfA = Enum[a]
console.log(nameOfA) //fall
```

### 泛型

```typescript
/*
function num (a:number,b:number) : Array<number> {
    return [a ,b];
}
function str (a:string,b:string) : Array<string> {
    return [a ,b];
}
*/

function fn<T>(a:T, b:T):Array<T> {
  return [a, b]
}
fn(1,2)
fn('1','2')

type A<T> = string | number | T
let a:A<boolean> = true
let a1:A<null> = null

interface Data<T> {
  msg: T
}
let data:Data<number> = {
  msg: 1
}

function fn<T, K>(a:T, b:K):Array<T | K> {
  return [a, b]
}

function fn<T = number, K = number>(a:T, b:K):Array<T | K> {
  return [a, b]
}
```

#### 泛型约束

```typescript
interface Len {
  length:number
}

function getLength<T extends Len>(arg:T) {
 return arg.length
}
getLength('123')


function fn<T, K extends keyof T>(obj:T, key:K) {
  return obj[key]
}

let obj = {a:1, b:2, c:3}

fn(obj, 'a')
fn(obj, 'd')

//泛型类
class Sub<T>{
  attr: T[] = [];
  add (a:T):T[] {
     return [a]
  }
}

let num = new Sub<number>()
num.attr = [1,2,3]
num.add(123)

let str = new Sub<string>()
str.attr = ['1','2','3']
str.add('123')
```

### tsconfig.json

- target
- include/exclude
- allowJS
- removeComments
- rootDir/outDir
- sourceMap
- strict
- module

### namespace

> TypeScript与ECMAScript 2015一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

```typescript
namespace a {
  export const Time: number = 1000
  export const fn = <T>(arg: T): T => {
    return arg
  }
  fn(Time)
}


namespace b {
   export const Time: number = 1000
   export const fn = <T>(arg: T): T => {
    return arg
  }
  fn(Time)
}

a.Time
b.Time
```

#### 嵌套

```typescript
namespace a {
  export namespace b {
    export class Vue {
      parameters: string
      constructor(parameters: string) {
        this.parameters = parameters
      }
    }
  }
}
let v = a.b.Vue
new v('1')
```

#### 抽离

```typescript
//a.ts
export namespace V {
  export const a = 1
}
//b.ts
import { V } from './a'
console.log(V)
```

#### 简化

```typescript
namespace A  {
  export namespace B {
    export const C = 1
  }
}

import X = A.B.C
console.log(X)
```

#### 合并

```typescript
namespace a {
  export const a = 1
}
namespace a {
  export const b = 2
}
```

### 三斜线

```typescript
//a.ts
namespace A {
    export const fn = () => 'a'
}

//b.ts
namespace A {
    export const fn2 = () => 'b'
}

///<reference path="./index2.ts" />
///<reference path="./index3.ts" />

console.log(A)

//声明文件引入
///<reference types="node" />
```

### 声明文件

当使用第三方库时，我们需要引用它的[声明文件](https://www.npmjs.com/~types?activeTab=packages)，才能获得对应的代码补全、接口提示等功能

> declare var 声明全局变量
> declare function 声明全局方法
> declare class 声明全局类
> declare enum 声明全局枚举类型
> declare namespace 声明（含有子属性的）全局对象
> interface 和 type 声明全局类型
> /// <reference /> 三斜线指令

1. 尝试npm install @types/XXX -D
2. 自己手写

```typescript
declare module 'express' {
    interface Router {
        get(path: string, cb: (req: any, res: any) => void): void
    }
    interface App {

        use(path: string, router: any): void
        listen(port: number, cb?: () => void): void
    }
    interface Express {
        (): App
        Router(): Router

    }
    const express: Express
    export default express
}
```

### Mix

#### 对象混入

```typescript
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}

let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }

const people = Object.assign(people1,people2,people3)
```

#### 类混入

```typescript
class A {
    type: boolean = false;
    changeType() {
        this.type = !this.type
    }
}

class B {
    name: string = '张三';
    getName(): string {
        return this.name;
    }
}

class C implements A,B{
    type:boolean
    changeType:()=>void;
    name: string;
    getName:()=> string
}

Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
        Object.getOwnPropertyNames(item.prototype).forEach(name => {
            curCls.prototype[name] = item.prototype[name]
        })
    })
}
```

### Decorator

它能够被附加到[类声明](https://www.tslang.cn/docs/handbook/decorators.html#class-decorators)，[方法](https://www.tslang.cn/docs/handbook/decorators.html#method-decorators)， [访问符](https://www.tslang.cn/docs/handbook/decorators.html#accessor-decorators)，[属性](https://www.tslang.cn/docs/handbook/decorators.html#property-decorators)或[参数](https://www.tslang.cn/docs/handbook/decorators.html#parameter-decorators)上

```typescript
//target是装饰类的构造函数
const watcher: ClassDecorator = (target: Function) => {
	target.prototype.name = 'Jack'
  target.prototype.fn = () => {
    console.log('Kyo')
  }
  // target.prototype.getParams = <T>(params: T):T => {
  //     return params
  // }
}

@watcher
class A {
  constructor() {
  }
}

const a = new A() as any
a.fn()
```

#### 装饰器工厂

```typescript
const watcher = (name: string): ClassDecorator => {
    return (target: Function) => {
        target.prototype.getParams = <T>(params: T): T => {
            return params
        }
        target.prototype.getOptions = (): string => {
            return name
        }
    }
}

@watcher('name')
class A {
    constructor() {

    }
}

const a = new A();
console.log((a as any).getParams('123'))
```

#### 装饰器组合

#### 方法装饰器

```typescript
//三个参数
//	对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
//	方法的名字
//	方法的属性描述符
const met:MethodDecorator = (...args) => {
    console.log(args);
}

class A {
    constructor() {

    }
    @met
    getName ():string {
        return '小满'
    }
}

const a = new A()
```

#### 属性装饰器

```typescript
//两个参数
//	对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
//	属性的名字
const met:PropertyDecorator = (...args) => {
    console.log(args)
}

class A {
    @met
    name:string
    constructor() {

    }

}

const a = new A()
```

#### 参数装饰器

```typescript
//三个参数
//	对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
//	方法的名字
//	参数在函数参数列表中的索引
const met:ParameterDecorator = (...args) => {
    console.log(args);
}

class A {
    constructor() {

    }
    setParams (@met name:string = '213') {

    }
}

const a = new A()
```

#### 元数据存储

- `import 'reflect-metadata'`

```typescript
//1.类装饰器 ClassDecorator
//2.属性装饰器 PropertyDecorator
//3.参数装饰器 ParameterDecorator
//4.方法装饰器 MethodDecorator PropertyDescriptor 'https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10'
//5.装饰器工厂
import axios from 'axios'
import 'reflect-metadata'
const Base  = (base:string) => {
    const fn:ClassDecorator = (target) => {
        target.prototype.base = base;
    }
    return fn
}

const Get = (url:string) => {
   const fn:MethodDecorator = (target:any,key,descriptor:PropertyDescriptor) => {
        axios.get(url).then(res=>{
            const key = Reflect.getMetadata('key',target)
            descriptor.value(key ? res.data[key] : res.data)
        })

   }
   return fn
}

const result = () => {
    const fn:ParameterDecorator = (target:any,key,index) => {
        Reflect.defineMetadata('key','result',target)
    }
    return fn
}

const Bt:PropertyDecorator = (target,key) => {
   console.log(target,key)
}

@Base('/api')
class Http {
    @Bt
    xiaoman:string
    constructor () {
        this.xiaoman = 'xiaoman'
    }
    @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
    getList (@result() data:any) {
        // console.log(data)

    }
    // @Post('/aaaa')
    create () {

    }
}

const http = new Http() as any
// console.log(http.base)
```



