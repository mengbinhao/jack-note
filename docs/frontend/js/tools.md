### tools

- 生成由随机整数组成的数组，数组长度和元素大小可自定义

```javascript
const genNumArr = (length, limit) =>
  Array.from({ length }, _ => Math.floor(Math.random() * limit))
genNumArr(10, 100)
```

- flat

```javascript
const flatten = (arr) =>
	arr.reduce(
    //Array.isArray(cur) ? [...acc, ...flatten3(cur)] : [...acc, cur],
		(flat, next) => flat.concat(Array.isArray(next) ? flatten(next) : next),
		[]
	)

const flatten3 = (arr, depth = 1) => {
	return depth > 0
		? arr.reduce(
				(acc, cur) =>
					Array.isArray(cur)
						? [...acc, ...flatten3(cur, depth - 1)]
						: [...acc, cur],
				[]
		  )
		: arr
}
```

- 将下面数组转成对象，key/value 对应里层数组的两个值

```javascript
let objLikeArr = [
	['name', 'Jim'],
	['age', 18],
	['single', true],
]

let fromPairs = (pairs) => {
	return pairs.reduce((acc, pair) => {
		acc[pair[0]] = pair[1]
		return acc
	}, {})
}
```

- 取出对象中的深层属性

```javascript
let deepAttr = { a: { b: { c: 15 } } }

let pluckDeep = (path) => (obj) =>
	path.split('.').reduce((acc, attr) => acc[attr], obj)

pluckDeep('a.b.c')(deepAttr)
```

- 将用户中的男性和女性分别放到不同的数组里

```javascript
let users = [
	{ name: 'Adam', age: 30, sex: 'male' },
	{ name: 'Helen', age: 27, sex: 'female' },
	{ name: 'Amy', age: 25, sex: 'female' },
	{ name: 'Anthony', age: 23, sex: 'male' },
]
let partition = (arr, checkCondition) => {
	return arr.reduce(
		([pass, fail], item) =>
			checkCondition(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
		[[], []]
	)
}
let isMale = (person) => person.sex === 'male'
let [maleUser, femaleUser] = partition(users, isMale)
```

- 生成树形对象结构

```javascript
const nest = (items, id = null, link = 'parent_id') =>
	items
		.filter((item) => item[link] === id)
		.map((item) => ({ ...item, children: nest(items, item.id) }))

const comments = [
	{ id: 1, parent_id: null },
	{ id: 2, parent_id: 1 },
	{ id: 3, parent_id: 1 },
	{ id: 4, parent_id: 2 },
	{ id: 5, parent_id: 4 },
]

const nestedComments = nest(comments)
```

