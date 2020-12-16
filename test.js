var arr = [1, 2, 3]

// arr.reduce(async (prs, cur, index) => {
// 	await prs
// 	const timeout = index === 0 ? 0 : 1000 + (index - 1) * 500

// 	return new Promise((res) => {
// 		setTimeout(() => {
// 			console.log(cur)
// 			res(timeout)
// 		}, timeout)
// 	})
// }, Promise.resolve(0))

Array.prototype.myForEach = function (fn, context) {
	context = context || arguments[1]
	if (typeof fn !== 'function') {
		throw new TypeError(fn + 'is not a function')
	}
	const len = this.length
	let k = 0
	while (k < len) {
		//note！！filter empty position
		if (k in this) {
			fn.call(context, this[k], k, this)
		}
		k++
	}
}

// arr.myForEach((item) => {
// 	console.log(item + `--------`)
// 	if (item === 2) {
// 		arr.shift()
// 	}
// })
arr.myForEach((item) => {
	console.log(item)
	if (item == 2) {
		arr.push(4)
		arr.push(5)
	}
})
