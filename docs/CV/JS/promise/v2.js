//加状态
//初始状态pending
//三种状态，状态一经改变就无法更改，画个图
class MyPromise {
	static PENDING = 'pending'
	static FULFILLED = 'fulfilled'
	static REJECTED = 'rejected'

	constructor(executor) {
		this.PromiseState = MyPromise.PENDING
		this.promiseResult = null
		executor(this.resolve.bind(this), this.reject.bind(this))
	}

	resolve(value) {
		if (this.PromiseState === MyPromise.PENDING) {
			this.promiseResult = MyPromise.FULFILLED
			this.promiseResult = value
		}
	}
	reject(reason) {
		if (this.PromiseState === MyPromise.PENDING) {
			this.promiseResult = MyPromise.REJECTED
			this.promiseResult = reason
		}
	}
}

let p1 = new MyPromise((resolve, reject) => {
	resolve('jack')
})

let p2 = new MyPromise((resolve, reject) => {
	reject('jack')
})

console.log(p1)
console.log(p2)
