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
		} catch (e) {
			this.reject(e)
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
		onFulfilled =
			typeof onFulfilled === 'function' ? onFulfilled : (value) => value
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (reason) => {
						throw reason
				  }

		const resolvePromise = (p2, x, resolve, reject) => {
			if (x === p2) {
				return reject(new TypeError('Chaining cycle detected for promise'))
			}

			if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
				//标记,只走一次resolvePromise或rejectPromise
				let called
				try {
					const then = x.then
					if (typeof then === 'function') {
						then.call(
							x,
							(y) => {
								//这里调用别人实现的promise中的then方法，执行自己传入的回调
								//无法控制别人的代码执行几个回调,只能控制自己传入的回调,防止多次调用
								if (called) return
								called = true
								resolvePromise(p2, y, resolve, reject)
							},
							(err) => {
								//防止多次调用
								if (called) return
								called = true
								reject(err)
							}
						)
					} else {
						resolve(x)
					}
				} catch (e) {
					//防止走成功后又走失败
					if (called) return
					called = true
					reject(e)
				}
			} else {
				resolve(x)
			}
		}

		const p2 = new MyPromise((resolve, reject) => {
			if (this.PromiseState === MyPromise.FULFILLED) {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.PromiseResult)
						resolvePromise(p2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}
			if (this.PromiseState === MyPromise.REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.PromiseResult)
						resolvePromise(p2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				})
			}
			if (this.PromiseState === MyPromise.PENDING) {
				this.onFulfilledCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.PromiseResult)
							resolvePromise(p2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.PromiseResult)
							resolvePromise(p2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					})
				})
			}
		})
		return p2
	}

	catch(cb) {
		return this.then(null, cb)
	}

	finally(cb) {
		return this.then(
			(value) => {
				return MyPromise.resolve(cb()).then(() => value)
			},
			(error) => {
				return MyPromise.resolve(cb()).then(() => {
					throw error
				})
			}
		)
	}

	static resolve(value) {
		if (value instanceof MyPromise) return value
		return new MyPromise((resolve, reject) => {
			resolve(value)
		})
	}

	static reject(reason) {
		return new MyPromise((resolve, reject) => {
			reject(reason)
		})
	}

	static all(promises) {
		const len = promises.length
		if (len === 0) return MyPromise.resolve(promises)
		return new MyPromise((resolve, reject) => {
			let ret = [],
				idx = 0
			for (let i = 0; i < len; i++) {
				//have to wrap up to a promise object
				MyPromise.resolve(promises[i]).then((value) => {
					ret[i] = value
					if (++idx === len) resolve(ret)
				}, reject)
			}
		})
	}

	static race(promises) {
		return new MyPromise((resolve, reject) => {
			for (let i = 0, len = promises.length; i < len; i++) {
				MyPromise.resolve(promises[i]).then(
					(value) => {
						resolve(value)
					},
					(reason) => {
						reject(reason)
					}
				)
			}
		})
	}

	static any(promises) {
		const len = promises.length
		return new MyPromise((resolve, reject) => {
			let errors = [],
				unRejectedCount = len
			for (let i = 0; i < len; i++) {
				MyPromise.resolve(promises[i]).then(
					(value) => {
						resolve(value)
					},
					(reason) => {
						errors[i] = reason
						if (--unRejectedCount === 0)
							reject(new AggregateError('All promises were rejected', errors))
					}
				)
			}
		})
	}

	static allSettled(promises) {
		const len = promises.length
		if (len === 0) return MyPromise.resolve([])
		return new MyPromise((resolve, reject) => {
			let ret = [],
				unSettledCount = len
			for (let i = 0; i < len; i++) {
				MyPromise.resolve(promises[i]).then(
					(value) => {
						ret[i] = {
							status: 'fulfilled',
							value,
						}
						if (--unSettledCount === 0) resolve(ret)
					},
					(reason) => {
						ret[i] = {
							status: 'rejected',
							reason,
						}
						if (--unSettledCount === 0) resolve(ret)
					}
				)
			}
		})
	}
}

MyPromise.deferred = function () {
	let result = {}
	result.promise = new MyPromise((resolve, reject) => {
		result.resolve = resolve
		result.reject = reject
	})
	return result
}

module.exports = MyPromise
