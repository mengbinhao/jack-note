//construction
class MyPromise {
	constructor(executor) {
		executor(this.resolve, this.reject)
	}

	resolve() {}
	reject() {}
}

console.log(1)

let p = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log(2)
		resolve(4)
		console.log(3)
	}, 1000)
})

console.log(p)

p.then((data) => {
	console.log(data)
	console.log(p)
})
console.log(5)
