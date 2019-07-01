### JavaScript 中数组的特殊性
- 每一项都可以保存任意类型的数据，数组大小可以动态调整，即可以随着数据的添加自动增长以容纳新数据
- 数组中可能会存在空位
- 稀疏数组
    > 具有不连续索引的数组，其 length 属性值大于元素的个数
- 密集数组
    > 具有连续索引的数组，其 length 属性值等于元素的个数

在 JavaScript 中，数组本质上也是对象，是对象的一种特殊形式。
数组索引实际上和碰巧是整数名的对象属性没有什么差别，不过数组的实现是经过了优化的，通过数组索引访问数组元素比访问一般对象的属性要快的多。
规定数组索引的范围是 `0 ~ 4294967294(2^32 - 2)`, 所有的索引都是属性名， 但是只有在这个范围内的整数才是数组索引，数组索引会触发数组的特殊行为。

### 数组创建

```javascript 
const arr1 = []
```

#### 构造函数
    > 利用构造函数创建数组的时候，在只有一个参数的情况下，根据参数的类型不同，会返回不同的结果。

```javascript
// 注：这种方式创建的数组属于稀疏数组，每一项都是空位，下边会具体介绍稀疏数组。
// 请避免使用这样的方式创建数组。
const arr1 = Array(3) // [empty × 3]
const arr2 = Array('3') // ["3"]
```
#### of()
    > 这是 ES6 中新增的方法，用来弥补构造函数的的缺陷。 不会根据参数的类型不同导致创建行为的不同。

```javascript
const arr1 = Array.of(3) // [3]
const arr2 = Array.of('3') // ['3']
```

#### from()
    > ES6 新增的方法，这个方法的主要用途就是将类数组对象转为数组对象。 创建给定长度的数组这个方法会很好用。

```javascript
const arr1 = Array.from({length: 3}) // [undefined, undefined, undefined]
```

### 稀疏数组

#### 空位的检测 in
    > 空位是没有任何值，可以用 in 运算符检测。我们可以根据 in 字符来检测数组某一项是否是空位。

```javascript
const a = [,,,] // [empty × 3]
0 in a // false
const b = [1,2,3]
0 in b //true
```

#### 造成稀疏数组的操作
- delete 操作符
    > 使用 delete 操作符可以将数组项从数组中删除，数组的长度并不会发生变化，而是会留下一个空位。

```javascript
const b = [1,2,3]
delete b[0]
console.log(b) // [empty, 2, 3]
```

- 构造函数

```javascript
const a = Array(3)
console.log(a) // [empty × 3]
```

- 在数组字面量中省略值

```javascript
[,,,] // [empty × 3]
```

- 指定数组索引大于数组长度

```javascript
const c = []
c[10] = 0;
console.log(c) // [empty × 10, 0]
```

- 指定数组长度大于当前数组长度

```javascript
const a = []
a.length = 10 // [empty × 10]
```

**我们在平时要尽量避免创建和使用稀疏数组，因为在 ES6 之前的方法，对稀疏数组的处理存在很多不统一的地方。**


#### 操作的不统一
> ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

> forEach(), filter(), reduce(), every() 和 some() 都会跳过空位。
> map() 会跳过空位，但会保留这个值。
> join() 和 toString() 会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。

> ES6 则是明确将空位转为 undefined。

> Array.from 方法会将数组的空位，转为 undefined。
> 扩展运算符（...）也会将空位转为 undefined。
> copyWithin() 会连空位一起拷贝。
> fill() 会将空位视为正常的数组位置。
> for...of 循环也会遍历空位。
> entries()、keys()、values()、find()和 findIndex() 会将空位处理成 undefined。

**注意： 操作的不统一可能会有产生很多意料之外的结果，所以“墙裂”建议不要创建和使用稀疏数组。**

可以参考以下方法来创建：

1. Array.apply

```javascript
// 这个方法也是将一个类数组对象转为数组对象。
// 在创建 undefined 值的数组时有些奇怪和繁琐，但是结果远比 Array(3) 更准确可靠。
Array.apply(null, {length: 4}) // [undefined, undefined, undefined, undefined]
```

2. Array.from()

```javascript
// 将类数组对象转换为数组对象
Array.from({length: 4}) // [undefined, undefined, undefined, undefined]
```

3. 扩展运算符

```javascript
[...Array(4)] // [undefined, undefined, undefined, undefined]
```

### 总而言之
- 不要创建和使用稀疏数组
- 避免使用 Array 构造函数创建数组
- 推荐对象字面量、of()、from()、扩展运算符...创建数组

### 数组去重
1. 入门
```javascript
function unique(origin) {
    var result = [];
    for(var i = 0; i < origin.length; i++) {
        var arrayItem = origin[i];

        for(var j= 0; j< result.length; j++) {
            var resultItem = result[j];

            // 如果在结果数组循环中找到了该元素，则跳出循环，进入下一个源数组元素的判断
            if(resultItem === arrayItem) {
                break;
            }
        }

        // 如果把结果数组循环完都没有找到该元素，就将该元素压入结果数组中
        if(j === result.length) {
            result.push(arrayItem);
        }
    }
    return result;
}
```

2. indexOf(IE8及更早版本不支持)
```javascript
function unique(origin){
    var result = [];
    for(var i = 0; i< origin.length; i++) {
        var item = origin[i];
        if(result.indexOf(item) === -1) {
            result.push(item);
        }
    }
    return result;
}
```

3. filter(IE9+)
```javascript
function unique(origin) {
    var result = origin.filter(function (item, index, array){
        // 获取元素在源数组的位置，只返回那些索引等于当前元素索引的值。
        return array.indexOf(item) === index;
    });
    return result;
}
```

4. Object 的 key value
```javascript
//数字1和字符串'1'，在键中是相等的，所以，上面这种方法不适合字符串和数字混合的去重
function unique(origin) {
    var result = [];
    var hashTable = {};
    for(var i = 0; i< origin.length; i++) {
        // 如果键对应的值，为真，意味着对象的键中已经有重复的键了。
        if(!hashTable[origin[i]]) {
            // 将元素作为对象的键，默认键对应的值为 true,
            hashTable[origin[i]] = true;
            // 如果对象中没有这个键，则将这个元素放入结果数组中去。
            result.push(origin[i]);
        }
    }
    return result;
}
```

```javascript
function unique(origin) {
    var result = [];
    var hashTable = {};
    for(var i = 0; i< origin.length; i++) {
        var current = origin[i];
        // 字符串拼接元素的类型和元素
        var key = typeof(current) + current;
        if(!hashTable[key]) {
            hashTable[key] = true;
            result.push(current);
        }
    }
    return result;
}
```

5. sort
```javascript
function unique(origin) {
    return origin.concat.sort().filter(function(item, index, array) {
        // !index 表示第 0 个元素应该被返回。
        return !index || item !== origin[index-1]
    })
}

function unique(array) {
    array.sort(); // 排序字符串
    array.sort(function(a, b) {
        return a-b; // 排序数字
    })
    for(let i=0; i<array.length; i++) {
        if(array[i] === array[i+1]) {
            array.splice(i, 1);
            i--; // 应该将前一个数删除，而不是删除后一个数。是因为元素被删除之后，后面元素的索引会迁移，所以要 i--;
        }
    }
    return array;
}
```

6. ES6 Set
**在判断的时候如果数据里有NaN和对象时要避免使用indexOf和===, Set方法是可以去重NaN**
```javascript
function unique(origin) {
    return Array.from(new Set(origin));
}
```

7. ES6 Map
```javascript
function unique(origin){
    const map = new Map()
    return origin.filter((item) => !map.has(item) && map.set(item, true))
}
```
