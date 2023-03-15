### 数据类型
- `Boolean、Null、Undefined、Number、String、Symbol`
- `Object(Array、Regex、Date、Error)`

![](../images/typeconvert-1.png)


### 显式强制类型转换
#### 1 `ToPrimitive(obj[,type])`
- `type`为`string`

> 调用obj的toString方法,如果为原始值,则返回,否则进行第2步
>
> 调用obj的valueOf方法,如果为原始值,则返回,否则进行第3步
>
> 抛出错误

- `type`为`number`

> 调用obj的valueOf方法,如果为原始值,则返回,否则进行第2步
>
> 调用obj的toString方法,如果为原始值,则返回,否则进行第3步
>
> 抛出错误

- `type`参数为空
> 该对象为Date,则默认转换成string类型
>
> 否则,默认转换成number类型

**隐式类型某个引用类型转换为原始值就是在后台调用ToPrimitive方法, 转换逻辑就和type参数为空时的转换逻辑一致**

#### 2. `toString`
每个对象都有一个 toString() 方法，当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用

#### 3. `valueOf`
不同内置对象的`valueOf`实现:

- String => 返回字符串值
- Number => 返回数字值
- Date => 返回一个数字，即时间值,字符串中内容是依赖于具体实现
- Boolean => 返回Boolean的this值
- Array => 默认返回自身
- Object => 默认返回自身，可以通过重写对象的valueOf方法来让它返回我们想要的结果

#### 4. Number
Number运算符转换规则:

- `null` 转换为0
- `undefined` 转换为`NaN`
- `true`转换为1, `false`转换为0
- 字符串转换时遵循数字常量转换规则,转换失败返回`NaN`
- 如果要调用Number方法转换对象,则会调用ToPrimitive转换,type指定为number

#### 4. String
String 运算符转换规则

- `null` 转换为`null`
- `undefined` 转换为 `undefined`
- `true` 转换为`true`，`false` 转换为 `false`
- 数字转换遵循通用规则，极大极小的数字使用指数形式
- 如果要调用String方法转换对象,则会调用ToPrimitive转换,type指定为string

#### 5. Boolean
- falsy(undefined、null、-0、0或+0、NaN、''、 false)

#### Example
后台返回值为一个字符串，内容是0 ~ 5的数字，现在使用时需将参数转化为数字类型
```javascript
// wrong
return Number(value)
// '' -> 0
// undefined -> throw TypeError
// 'aaa' -> NaN

// 前面是剔除掉''、undefined ，后面剔除掉NaN的类型
if (value && Number(value) >= 0) {
  return Number(value)
} else {
  return null
}
```
#### 浮点数转换成整型
很多人喜欢使用`parseInt()`，其实`parseInt()`是用于将字符串转换成数字，而不是浮点数和整型之间的转换，我们应该使用`Math.floor()`或者`Math.round()`

#### **转换 trick**
```javascript
let myVar = '3.1415'
    str = '' + myVar
    i_int = ~~myVar // to integer,对正数来说 ~~运算结果与Math.floor()运算结果相同，而对于负数来说与Math.ceil()的运算结果相同
	  f_float = 1 * myVar  //or to int, then check NaN
    b_bool = !!myVar
    arr = [myVar]

		+'123' //str to number, then check NaN
    1.3 | 0 //number to integer,对正数来说 ~~运算结果与Math.floor()运算结果相同，而对于负数来说与Math.ceil()的运算结果相同
    !!(num & 1) //check if odd number or not

//字符串比较时间先后大小是按照字符串从左到右每个字符的charCode来的，所以特别要注意时间形式注意补0
'21:00' < '09:10'
'21:00' < '9:10'
```

关于值的比较，当我们只关心值是否正常时，比较靠谱的方法：正则表达式，上面的例子也可以这样来
```javascript
if (/[0-5]/.test(value)) {
  return Number(value)
} else {
  return null
}
```

**小结：在判断两个值是否相等时，最好显式的转化，让代码更加清晰易读，然后用全等运算符 \=\=\= 或者 !== 来比较**

### 隐式强制类型转换
####  加法运算符
- 当一侧为String类型时,另一侧也会被转换成字符串类型,做拼接操作
- 当一侧为Number类型,另一侧为非String类型的原始类型时,另一侧会被转换成number类型,做加法运算
- 当一侧为Number类型,另一侧为引用类型时,会将引用类型和Number类型都转换成字符串做拼接操作

**除了Number类型 + (Null, Undefined, Boolean,Number)会做加法运算,其他情况下都是做字符串拼接操作**

#### if语句和逻辑语句
#### ==
- null除了跟自己和undefined相比返回true,其他返回false
- undefined除了和自己和null相比返回true,其他返回false
- NaN和任何值比较都返回false
- Boolean跟其他类型的值比较,会被转换为Number类型
- true只有和1比较会返回true, false只有和0比较会返回true
- String和Number比较,现将String转换为Number
- 当原始类型和引用类型做比较时，对象类型会依照ToPrimitive规则转换为原始类型, {}放在运算符左侧会报错

#### ToBoolean
- if (..) 语句中的天健判断表达式。
- for (.. ; .. ; ..) 语句中的条件判断表达式。
- while (..) 循环中的条件判断表达式。
- ? : 中的条件判断表达式
- || 和 && 的做操作数
而 switch 语句使用的是全等判断，不会发生隐式的强制转换
[js compare](https://dorey.github.io/JavaScript-Equality-Table/)

### 对象转换为原始值
#### 对象转换为字符串 String(Object)
1. 当对象具有toString()会优先调用
2. 如果没有toString()方法，或者toString()没有返回一个原始值，则会调用valueOf()方法
3. 无法从toString()和valueOf()获取原始值的时候，则会抛出一个类型错误异常
```javascript
String([1,2,3])  // "1,2,3"
String(function(x) {return x+1})  // "function(x) {return x+1;}"
String("/\d+/g") // "/\d+/g"
String(new Date(2019,4,14)) // "Tue May 14 2019 00:00:00 GMT+0800 (中国标准时间)"
```
#### 对象转换为数字 Number(Object)
1. 当对象具有valueOf()会优先调用
2. 如果没有valueOf()方法，或者valueOf()没有返回一个原始值，则会调用toString()方法
3. 无法从toString()和valueOf()获取原始值的时候，则会抛出一个类型错误异常
```javascript
Number([1,2,3])  // NaN 原始类型
Number(function(x) {return x+1;})  // NaN
Number("/\d+/g") // NaN
Number(new Date(2019,4,14)) // 1557763200000
```

**当判断两个数组是否相等时，可以简单的将其转换为String类型进行比较**

**当判断两个对象是否相等时，就需要借助其他工具, 比如[lodash](https://lodash.com/docs/4.17.11#isEqual)**
