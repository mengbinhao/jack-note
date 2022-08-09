const red = () => {
	console.log('red')
}

const yellow = () => {
	console.log('yellow')
}

const green = () => {
	console.log('green')
}

const light = (timer, cb) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			cb()
			resolve()
		}, timer)
	})
}

let count = 0
const start = () => {
	if (count++ === 5) return
	Promise.resolve()
		.then(() => {
			return light(3000, red)
		})
		.then(() => {
			return light(2000, yellow)
		})
		.then(() => {
			return light(1000, green)
		})
		.then(() => {
			start()
		})
}

start()
