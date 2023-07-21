class PromiseQueue {
	constructor(tasks, concurrentCount = 1) {
		//this.totals = tasks.length
		this.todo = tasks
		this.count = concurrentCount
		this.running = []
		this.completed = []
	}

	runNext() {
		return this.running.length < this.count && this.todo.length > 0
	}

	run() {
		while (this.runNext()) {
			let promise = this.todo.shift()
			promise.then(() => {
				this.completed.push(this.running.shift())
				this.run()
			})
			this.running.push(promise)
		}
	}
}

// async function asyncPool(poolLimit, array, iteratorFn) {
// 	const ret = [] // 存储所有的异步任务
// 	const executing = [] // 存储正在执行的异步任务
// 	for (const item of array) {
// 		// 调用iteratorFn函数创建异步任务
// 		const p = Promise.resolve().then(() => iteratorFn(item, array))
// 		ret.push(p) // 保存新的异步任务

// 		// 当poolLimit值小于或等于总任务个数时，进行并发控制
// 		if (poolLimit <= array.length) {
// 			// 当任务完成后，从正在执行的任务数组中移除已完成的任务
// 			const e = p.then(() => executing.splice(executing.indexOf(e), 1))
// 			executing.push(e) // 保存正在执行的异步任务
// 			if (executing.length >= poolLimit) {
// 				await Promise.race(executing) // 等待较快的任务执行完成
// 			}
// 		}
// 	}
// 	return Promise.all(ret)
// }

// const timeout = (i) =>
// 	new Promise((resolve) =>
// 		setTimeout(() => {
// 			console.log(i)
// 			resolve(i)
// 		}, i)
// 	)
// // 当然,limit <= 0 的时候 我们可以理解为只允许一个请求存在
// asyncPool(2, [1000, 5000, 3000, 2000], timeout).then((res) => {
// 	console.log(res)
// })
