### 数组创建

```javascript 
let arr1 = []
let arr2 = Array(3) // [empty × 3]
let arr3 = Array('3') // ["3"]
let arr4 = Array.of(3) // [3]
let arr5 = Array.of('3') // ['3']
let arr6 = Array.from({length: 3}) // [undefined, undefined, undefined]
```

### 稀疏数组

#### 空位的检测 in
```javascript
//空位是没有任何值，可以用 in 运算符检测
let a = [,,,] // [empty × 3]
0 in a // false
```

#### 造成稀疏数组的操作
- delete 操作符

```javascript
let b = [1,2,3]
delete b[0] // [empty, 2, 3]
```

- 构造函数

```javascript
let a = Array(3)  // [empty × 3]
```

- 在数组字面量中省略值

```javascript
[,,,] // [empty × 3]
```

- 指定数组索引大于数组长度

```javascript
let c = []
c[10] = 0
console.log(c) // [empty × 10, 0]
```

- 指定数组长度大于当前数组长度

```javascript
let a = []
a.length = 10 // [empty × 10]
```

**尽量避免创建和使用稀疏数组，因为在ES6之前的方法，对稀疏数组的处理存在很多不统一的地方**


#### 操作的不统一
- ES5 对空位的处理很不一致了，大多数情况下会忽略空位
  - forEach(), filter(), reduce(), every() 和 some() 跳过空位
  - map() 会跳过空位，但会保留这个值
  - join() 和 toString() 会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串

- ES6 则是明确将空位转为 undefined
  - Array.from 方法会将数组的空位，转为 undefined
  - 扩展运算符（...）也会将空位转为 undefined
  - copyWithin() 会连空位一起拷贝
  - fill() 会将空位视为正常的数组位置
  - for...of 循环也会遍历空位
  - entries()、keys()、values()、find()和 findIndex() 会将空位处理成 undefined

#### undefined数组的正确创建方式

```javascript
Array.apply(null, {length: 4}) // [undefined, undefined, undefined, undefined]
Array.from({length: 4}) // [undefined, undefined, undefined, undefined]
[...Array(4)] // [undefined, undefined, undefined, undefined]
```

### 数组去重
1. 入门
```javascript
const unique = (origin) => {
	let result = []
	for (var i = 0; i < origin.length; i++) {
		for (var j = 0; j < result.length; j++) {
			if (origin[i] === result[j]) break
		}
		result.push(origin[i])
	}
	return result
}
```

2. indexOf(IE8及更早版本不支持)
```javascript
const unique = (origin) => {
	let result = []
	for (var i = 0; i < origin.length; i++) {
		let item = origin[i]
		if (result.indexOf(item) === -1) result.push(item)
	}
	return result
}
```

3. filter(IE9+)
```javascript
const unique = (origin) => {
	let result = origin.filter((item, index, array) => {
		// 只返回那些索引等于当前元素索引的值
		return array.indexOf(item) === index
	})
	return result
}
```

4. Object 的 key value
```javascript
const unique = (origin) => {
	let result = []
	let hashTable = {}
	for (var i = 0; i < origin.length; i++) {
		let current = origin[i]
		//数字1和字符串'1'，在键中是相等的，区分这种情况
		let key = typeof current + current
		if (!hashTable[key]) {
			hashTable[key] = true
			result.push(current)
		}
	}
	return result
}
```

5. sort
```javascript
const unique = (origin) => {
	return origin.concat.sort().filter(function (item, index, array) {
		// !index 表示第 0 个元素应该被返回
		return !index || item !== origin[index - 1]
	})
}

const unique1 = (array) => {
	array.sort() // 排序字符串
	array.sort(function (a, b) {
		return a - b // 排序数字
	})
	for (let i = 0; i < array.length; i++) {
		if (array[i] === array[i + 1]) {
			array.splice(i, 1)
			i--
		}
	}
	return array
}
```

6. ES6 Set
```javascript
Array.from(new Set(origin)
```

7. ES6 Map
```javascript
const unique = (origin) => {
	let map = new Map()
	return origin.filter((item) => !map.has(item) && map.set(item, true))
}
```
