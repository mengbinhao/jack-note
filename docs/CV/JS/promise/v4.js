//async
//then回调不带setTimeout时 -> onFulfilled、onRejected后置执行 -> 先只能执行一个回掉
//then回调带setTimeout时,resolve异步 ==> then添加pending处理，定义cb数组 => resolve、reject事件末尾执行
//同一个promise的then方法可多次调用，即多个回调用数组保存
class MyPromise {
	static PENDING = 'pending'
	static FULFILLED = 'fulfilled'
	static REJECTED = 'rejected'

	constructor(executor) {
		this.PromiseState = MyPromise.PENDING
		this.promiseResult = null
		this.onFulfilledCallbacks = []
		this.onRejectedCallbacks = []
		try {
			executor(this.resolve.bind(this), this.reject.bind(this))
		} catch (error) {
			this.reject(error)
		}
	}

	resolve(value) {
		if (this.PromiseState === MyPromise.PENDING) {
			setTimeout(() => {
				this.PromiseState = MyPromise.FULFILLED
				this.promiseResult = value
				this.onFulfilledCallbacks.forEach((cb) => {
					cb(value)
				})
			})
		}
	}
	reject(reason) {
		if (this.PromiseState === MyPromise.PENDING) {
			setTimeout(() => {
				this.PromiseState = MyPromise.FULFILLED
				this.promiseResult = value
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
				: (err) => {
						throw err
				  }
		if (this.PromiseState === MyPromise.FULFILLED) {
			setTimeout(() => {
				onFulfilled(this.promiseResult)
			})
		}

		if (this.PromiseState === MyPromise.REJECTED) {
			setTimeout(() => {
				onRejected(this.promiseResult)
			})
		}

		if (this.PromiseState === MyPromise.PENDING) {
			this.onFulfilledCallbacks.push(onFulfilled)
			this.onRejectedCallbacks.push(onRejected)
		}
	}
}

const p1 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('fulfilled~~~~~~~~~~~')
	})
})

p1.then((value) => {
	console.log(1)
	console.log(value)
})

p1.then((value) => {
	console.log(2)
	console.log(value)
})

p1.then((value) => {
	console.log(3)
	console.log(value)
})
