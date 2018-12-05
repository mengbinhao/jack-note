### this
1. 在全局环境中，this 的值指向全局对象( window 或 global )。


2. 在函数内部，this 的取值取决于其所在函数的调用方式，也就是说 this 的值是在函数被调用的时候确定的，在创建函数时无法确定。当然，箭头函数是个例外，箭头函数本身不存在 this，而在箭头函数中使用 this 获取到的便是创建其的上下文中的 this。同时，使用函数的继承方法 call 、 apply 和 bind 会修改 this 的指向。但值得注意的是，使用 bind 方法会使 this 的值永久的绑定到给定的对象，无法再通过调用 call 和 apply 方法修改 this 的值，箭头函数调用 call 、 apply 或 bind 方法无法修改 this。

> 作为对象的方法
> 作为构造函数
> apply call bind
> arrow function

### map

1. 在数组中的每一项元素上调用一个函数 `[2,3,4].map(item => item * 2)`
2. 将字符串转换为数组
```javascript
    map.call('jack', letter => `${letter}a`)
```
3. 重新格式化数组对象
```javascript
const myUsers = [
    { name: 'chuloo', likes: 'grilled chicken' },
    { name: 'chris', likes: 'cold beer' },
    { name: 'sam', likes: 'fish biscuits' }
]
const usersByFood = myUsers.map(item => {
    const container = {};
    container[item.name] = item.likes;
    container.age = item.name.length * 10;
    return container;
})
```
4. hole  `["1", "2", "3"].map(parseInt);`

```javascript
// 通常使用parseInt时,只需要传递一个参数.
// 但实际上,parseInt可以有两个参数.第二个参数是进制数.
// 可以通过语句"alert(parseInt.length)===2"来验证.
// map方法在调用callback函数时,会给它传递三个参数:当前正在遍历的元素,元素索引, 原数组本身
// 第三个参数parseInt会忽视, 但第二个参数不会,也就是说,
// parseInt把传过来的索引值当成进制数来使用.从而返回了NaN.
function returnInt(element) {
  return parseInt(element, 10);
}
['1', '2', '3'].map(returnInt); // [1, 2, 3]
// 也可以使用简单的箭头函数
['1', '2', '3'].map( str => parseInt(str) );
```

1. `.map() ，.reduce(), .filter()` 等支持链式调用

```javascript
var myArr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
let result = myArr.map(m => m>5 ? 5 : m).reduce((x,y) => x+y);
```