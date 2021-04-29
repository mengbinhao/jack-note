const obj = {
	balance: '2020',
	other: 'jack',
}

handler = {
	get(target, prop) {
		if (prop === 'balance') {
			console.log(`current balance is ${target[prop]}`)
		}
		return target[prop]
	},
	set(target, prop, val) {
		if (val < 0) {
			console.log(`can not be negative`)
			return false
		}
		target[prop] = val
		return true
	},
}

const proxyObj = new Proxy(obj, handler)

proxyObj.balance
proxyObj.other
proxyObj.balance -= 2000
proxyObj.balance -= 2000
console.log(proxyObj.balance)
