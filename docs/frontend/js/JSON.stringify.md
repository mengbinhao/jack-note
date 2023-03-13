### 缺陷

> 1 若obj里有Date对象，转换后时间只是字符串而不是对象
>
> 2 若obj里有RegExp、Error对象，转换后得到空对象
>
> 3 若obj里有function、undefined，Symbol转换后直接丢失,若以上三个作为数组元素转换后是null,若单独转化则是undefined
>
> 4 若obj里有NaN、Infinity和-Infinity，转换后变成null
>
> 5 若对象中存在循环引用的转换报错
>
> 6 对象toJSON属性
>
> 7 只能序列化对象的可枚举的自有属性

**结论：只能处理string、boolean、number、null、object、array**

```javascript
let obj = {
 strProp: '0001',
 numProp: 1,
 boolProp: true,
 unProp: undefined,
 symbolProp: Symbol('1'),
 funcProp: function () {},
 nullProp: null,
 friends: ['小花', '小红', '小兰'],
 innerObj: {
  name: 'Jack',
 },
 dateProp: new Date(),
 regProp: /A-z/,
 errProp: new Error('error'),
}
console.log(JSON.parse(JSON.stringify(obj)))
```

### 第二个参数`replacer` 为数组

```javascript
JSON.stringify(foo, ['week', 'month'])
```

### 第二个参数`replacer` 为函数

```javascript
function replacer(key, value) {
 //filter
 if (typeof value === 'string') return undefined
 return value
}
let foo = {
 foundation: 'Mozilla',
 model: 'box',
 week: 45,
 transport: 'car',
 month: 7,
}
JSON.stringify(foo, replacer)
```

### 对象上toJSON 方法
