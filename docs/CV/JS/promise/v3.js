//then根据PromiseState执行对应的回调
//executor里没有执行resolve或reject则不执行then回调
//校验
//	then俩参数校验
//	executor里执行throw相当于reject
class MyPromise {
	static PENDING = 'pending'
	static FULFILLED = 'fulfilled'
	static REJECTED = 'rejected'

	constructor(executor) {
		this.PromiseState = MyPromise.PENDING
		this.promiseResult = null
		try {
			executor(this.resolve.bind(this), this.reject.bind(this))
		} catch (error) {
			this.reject(error)
		}
	}

	resolve(value) {
		if (this.PromiseState === MyPromise.PENDING) {
			this.PromiseState = MyPromise.FULFILLED
			this.promiseResult = value
		}
	}
	reject(reason) {
		if (this.PromiseState === MyPromise.PENDING) {
			this.PromiseState = MyPromise.REJECTED
			this.promiseResult = reason
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
			onFulfilled(this.promiseResult)
		}

		if (this.PromiseState === MyPromise.REJECTED) {
			onRejected(this.promiseResult)
		}
	}
}

const p1 = new MyPromise((resolve, reject) => {
	resolve(1)
})

p1.then(
	(val) => {
		console.log(val + '-------')
	},
	(reason) => {
		console.log(reason)
	}
)
