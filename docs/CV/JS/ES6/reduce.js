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
//递归
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

//flat object to tree object
//迭代
const flat = [
	{ id: 1, name: '部门1', pid: 0 },
	{ id: 2, name: '部门2', pid: 1 },
	{ id: 3, name: '部门3', pid: 1 },
	{ id: 4, name: '部门4', pid: 3 },
	{ id: 5, name: '部门5', pid: 4 },
]

const flatToTree = (list) => {
	const result = []
	const itemMap = {}
	list.forEach((item) => {
		const { id, pid } = item
		itemMap[id] = { ...item, children: [] }
		// if (!itemMap[id]?.children) {
		// 	itemMap[id] = {
		// 		children: [],
		// 	}
		// }
		// // 从 `Map` 中查找相同的 `pid` 项目，放在同一层 `children` 中
		// itemMap[id] = {
		// 	...item,
		// 	children: itemMap[id]['children'],
		// }
		const treeItem = itemMap[id]
		if (pid === 0) {
			result.push(treeItem)
		} else {
			// if (!itemMap[pid]?.children) {
			// 	itemMap[pid] = {
			// 		children: [],
			// 	}
			// }
			itemMap[pid]['children'].push(treeItem)
		}
	})
	return result
}
//console.log(flatToTree(flat))

const treeToFlat = (data) => {
	const result = []
	const queue = [...data]
	while (queue.length) {
		const node = queue.shift()
		const children = node.children
		//push空数组不起作用
		if (children) queue.push(...children)
		delete node.children
		result.push(node)
	}
	return result
}

console.log(treeToFlat(tree))
