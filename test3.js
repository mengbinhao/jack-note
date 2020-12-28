const compose = function (...funcs) {
	const length = funcs.length
	let count = length - 1,
		result

	return function f1() {
		result = funcs[count]()
		if (count <= 0) {
			count = length - 1
			return result
		}
		count--
		return f1(result)
	}
}
function aa() {
	console.log(11)
}

function bb() {
	console.log(22)
}
function cc() {
	console.log(33)
	return 33
}

const ret = compose(aa, bb, cc)
//ret()

function compose2(...funcs) {
	if (funcs.length === 0) {
		return (arg) => arg
	}

	if (funcs.length === 1) {
		return funcs[0]
	}
	debugger
	return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const ret2 = compose2(aa, bb, cc)
ret2()
