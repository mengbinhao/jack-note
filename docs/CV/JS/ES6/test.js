const add = (a, b, c) => console.log(a + b + c)
const curryAdvanced2 = function (fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(null, args)
		} else {
			//return function (...newArgs) {
			return curried.apply(null, [...args, ...newArgs])
			//}
		}
	}
}

console.log(curryAdvanced2(1)(2)(3))
