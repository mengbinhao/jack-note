const defineReactive = (data, key, val) => {
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get() {
			console.log(`get`)
			return val
		},
		set(newVal) {
			console.log(`set`)
			if (val === newVal) return
			val = newVal
		},
	})
}

let obj = {}

defineReactive(obj, 'name', 'Jack')
defineReactive(obj, 'hobby', ['code', 'game'])

obj.name = 'Kyo'
console.log(`obj.name = ${obj.name}`)

obj.age = 33
console.log(`obj.age = ${obj.age}`)

obj.hobby[0] = 123
console.log(`obj.hobby = ${obj.hobby}`)
