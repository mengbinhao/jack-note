class _Promise {
	static PENDING = 'pending'
	static FULFILLED = 'fulfilled'
	static REJECTED = 'rejected'

	constructor(executor) {
		this.PromiseState = _Promise.PENDING
		this.PromiseResult = ''
		this.onFulfilledCallbacks = []
		this.onRejectedCallbacks = []
		executor(this.resolve.bind(this), this.reject.bind(this))
	}

	resolve(value) {
		if (this.PromiseState === _Promise.PENDING) {
			//setTimeout(() => {
			this.PromiseState = _Promise.FULFILLED
			this.PromiseResult = value
			this.onFulfilledCallbacks.forEach((cb) => cb(value))
			//})
		}
	}
	reject(reason) {
		if (this.PromiseState === _Promise.PENDING) {
			this.PromiseState = _Promise.REJECTED
			this.PromiseResult = reason
			this.onFulfilledCallbacks.forEach((cb) => cb(reason))
		}
	}

	then(onFulfilled, onRejected) {
		if (this.PromiseState === _Promise.FULFILLED) {
			setTimeout(() => {
				onFulfilled(this.PromiseResult)
			})
		} else if (this.PromiseState === _Promise.REJECTED) {
			onRejected(this.PromiseResult)
		} else if (this.PromiseState === _Promise.PENDING) {
			this.onFulfilledCallbacks.push(onFulfilled)
			this.onRejectedCallbacks.push(onRejected)
		}
	}
}

console.log(1)
const p = new _Promise((resolve, reject) => {
	console.log(2)
	//setTimeout(() => {
	console.log(3)
	resolve('done')
	console.log(4)
	//})
	console.log(5)
})
//console.log(p)
p.then((data) => {
	console.log(data)
})

console.log(6)
