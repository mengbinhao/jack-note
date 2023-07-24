//将数组中VIP用户余额加10
let accounts = [
	{ username: 'Kelly', isVIP: true, balance: 20 },
	{ username: 'Tom', isVIP: false, balance: 10 },
	{ username: 'Stephanie', isVIP: true, balance: 30 },
]
accounts.map((account) =>
	account.isVIP ? { ...account, balance: account.balance + 10 } : account
)

//arrLikeObj to obj
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

//重新组织对象{item.value: item.email}
let array = [
	{ name: '大漠', email: 'w3cplus@gmail.com' },
	{ name: '大雉', email: 'airen@gmail.com' },
]
let result = array.reduce((acc, item) => {
	return {
		...acc,
		[item.name]: item.email,
	}
}, {})

//get deepAttr
let deepAttr = { a: { b: { c: 15 } } }

let pluckDeep = (path) => (obj) =>
	path.split('.').reduce((acc, attr) => acc[attr], obj)

//console.log(pluckDeep('a.b.c')(deepAttr))

//get two arrays according to check condition
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
//console.log(maleUser, femaleUser)

//生成树形对象结构
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

console.log(nest(comments))
