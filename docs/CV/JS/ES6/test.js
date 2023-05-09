const compose = (...funcs) => {
	if (!funcs.length) return (v) => v
	if (funcs.length === 1) return funcs[0]
	return funcs.reduce((a, b) => {
		//console.log(a)
		return function (...args) {
			return a(b(...args))
		}
	})
}

function fn1(x) {
	return x + 1
}
function fn2(x) {
	return x + 2
}
function fn3(x) {
	return x + 3
}
function fn4(x) {
	return x + 4
}
const composeFunc = compose(fn1, fn2, fn3, fn4)
console.log(composeFunc(1)) // 1+4+3+2+1=11
