class PromiseQueue {
	constructor(task, concurrentCount = 1) {
		this.todo = task
		this.concurrentCount = concurrentCount
		this.running = []
		this.completed = []
	}

	runNext() {
		return this.running.length < this.concurrentCount && this.todo.length
	}

	run() {
		while (this.runNext()) {
			const promise = this.todo.shift()
			promise.then(() => {
				this.completed.push(this.running.shift())
				this.run()
			})
			this.running.push(promise)
		}
	}
}
