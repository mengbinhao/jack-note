sendRequest(
	[
		() => request('1'),

		() => request('2'),

		() => request('3'),

		() => request('4'),
	],

	3, //并发数

	(res) => {
		console.log(res)
	}
)

function request(url, time = 1) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('请求结束：' + url)

			if (Math.random() > 0.5) {
				resolve('成功')
			} else {
				reject('错误;')
			}
		}, time * 1e3)
	})
}

function sendRequest(requestList, limits, callback) {
	const promises = requestList.slice()
	// 得到开始时，能执行的并发数
	const concurrentNum = Math.min(limits, requestList.length)
	let concurrentCount = 0

	// 第一次先跑起可以并发的任务
	const runTaskNeeded = () => {
		let i = 0
		// 启动当前能执行的任务
		while (i < concurrentNum) {
			i++
			runTask()
		}
	}

	// 取出任务并且执行任务
	const runTask = () => {
		const task = promises.shift()
		task && runner(task)
	}

	// 执行异步任务，同时更新当前并发数
	const runner = async (task) => {
		try {
			concurrentCount++
			await task()
		} catch (error) {
		} finally {
			concurrentCount--
			picker()
		}
	}

	const picker = () => {
		// 任务队列里还有任务并且此时还有剩余并发数的时候执行
		if (concurrentCount < limits && promises.length > 0) {
			runTask()
			// 队列为空的时候，并且请求池清空了，就可以执行最后的回调函数了
		} else if (promises.length == 0 && concurrentCount == 0) {
			callback && callback()
		}
	}
	runTaskNeeded()
}
