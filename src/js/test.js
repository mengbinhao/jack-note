const chunk = (arr, size) => {
	return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
		return arr.slice(i * size, i * size + size)
	})
}

const arr = [1, 2, 3, 4, 5]

var newArr = chunk(arr, 2)

const sortBy = ['inProgress', 'todo', 'done']
const sortByObject = (data) =>
	data.reduce(
		(obj, item, index) => ({
			...obj,
			[item]: index,
		}),
		{}
	)
//console.log(sortByObject(sortBy))

let obj = {
	name: 'jack',
	age: 18,
	attr: ['coding', 123],
	date: new Date(),
	uni: Symbol(2),
	sayHi: function () {
		console.log('hi')
	},
	info: {
		sister: 'lily',
		age: 16,
		intro: {
			money: undefined,
			job: null,
		},
	},
}

console.log(jsonStringify(obj))

function jsonStringify(data) {
	let type = typeof data

	if (type !== 'object') {
		let result = data

		//data 可能是基础数据类型的情况在这里处理
		if (Number.isNaN(data) || data === Infinity) {
			//NaN 和 Infinity 序列化返回 "null"
			result = 'null'
		} else if (
			type === 'function' ||
			type === 'undefined' ||
			type === 'symbol'
		) {
			// 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理
			return undefined
		} else if (type === 'string') {
			result = '"' + data + '"'
		}
		return String(result)
	} else if (type === 'object') {
		if (data === null) {
			return 'null'
		} else if (data.toJSON && typeof data.toJSON === 'function') {
			return jsonStringify(data.toJSON())
		} else if (data instanceof Array) {
			let result = []
			//如果是数组，那么数组里面的每一项类型又有可能是多样的
			data.forEach((item, index) => {
				result[index] = jsonStringify(item)
			})
			result = '[' + result + ']'
			return result.replace(/'/g, '"')
		} else {
			// 处理普通对象
			let result = []
			Object.keys(data).forEach((item, index) => {
				if (typeof item !== 'symbol') {
					result.push('"' + item + '"' + ':' + jsonStringify(data[item]))
				}
			})
			return ('{' + result + '}').replace(/'/g, '"')
		}
	}
}
