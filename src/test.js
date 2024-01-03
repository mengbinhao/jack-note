const fn = (a, b, c) => {
	console.log(a + b + c)
}

const curry = (fn) => {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args)
		} else {
			return curried.bind(this, ...args)
			//return (...newArgs) => curried.apply(null, [...args, ...newArgs])
		}
	}
}

const curriedFn = curry(fn)

curriedFn(1)(2)(3)
