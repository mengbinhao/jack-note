Function.prototype.simulateCall = function (context, ...args) {
	context = context || window
	context.fn = this
	//let args = [].slice.call(arguments, 1)
	//let args = [...arguments].slice(1)
	//let result = eval('context.fn(' + args + ')')
	let result = context.fn(...args)
	//delete temporary attribute
	delete context.fn
	return result
}

Function.prototype.simulateApply = function (context, args = []) {
	context = context || window
	context.fn = this
	const result = context.fn(args)
	delete context.fn
	return result
}

function fn(arr) {
	console.log(this.name, arr[0], arr[1])
}

const obj = {
	name: 'Jack',
	age: 33,
}

fn.simulateApply(obj, [1, 2])

//fn.call(obj, 18, 22)
