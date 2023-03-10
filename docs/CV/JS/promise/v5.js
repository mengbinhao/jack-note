//then chain invoke
//abstract resolvePromise -> try/catch -> pending condition -> implement resolvePromise
//resolvePromise
//	1 x === promise2
class MyPromise {
	static PENDING = 'pending'
	static FULFILLED = 'fulfilled'
	static REJECTED = 'rejected'
	constructor(executor) {
		this.PromiseState = MyPromise.PENDING
		this.PromiseResult = null
		this.onFulfilledCallbacks = []
		this.onRejectedCallbacks = []
		try {
			executor(this.resolve.bind(this), this.reject.bind(this))
		} catch (err) {
			this.reject(err)
		}
	}

	resolve(value) {
		if (this.PromiseState === MyPromise.PENDING) {
			setTimeout(() => {
				this.PromiseState = MyPromise.FULFILLED
				this.PromiseResult = value
				this.onFulfilledCallbacks.forEach((cb) => {
					cb(value)
				})
			})
		}
	}
	reject(reason) {
		if (this.PromiseState === MyPromise.PENDING) {
			setTimeout(() => {
				this.PromiseState = MyPromise.REJECTED
				this.PromiseResult = reason
				this.onRejectedCallbacks.forEach((cb) => {
					cb(reason)
				})
			})
		}
	}

	then(onFulfilled, onRejected) {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (reason) => {
						throw reason
				  }
		const promise2 = new MyPromise((resolve, reject) => {
			if (this.PromiseState === MyPromise.FULFILLED) {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.PromiseResult)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			} else if (this.PromiseState === MyPromise.REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.PromiseResult)
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			} else if (this.PromiseState === MyPromise.PENDING) {
				this.onFulfilledCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.PromiseResult)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.PromiseResult)
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
		})
		return promise2

		function resolvePromise(promise2, x, resolve, reject) {
			if (x === promise2)
				return reject(new TypeError('Chaining cycle detected for promise'))

			if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
				//如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
				let called
				try {
					const then = x.then
					if (typeof then === 'function') {
						//thenable的x回调，y是x的回调返回的值
						then.call(
							x,
							(y) => {
								if (called) return
								called = true
								//recursion
								//y is the return of previous promise
								resolvePromise(promise2, y, resolve, reject)
							},
							(err) => {
								if (called) return
								called = true
								reject(err)
							}
						)
					} else {
						resolve(x)
					}
				} catch (e) {
					if (called) return
					called = true
					reject(e)
				}
			} else {
				resolve(x)
			}
		}
	}
}

const p1 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve(1)
	})
})

p1.then((value) => {
	console.log(value)
	return value * 2
}).then((value) => {
	console.log(value)
})
