function func() {
	return new Promise((resolve) => {
		console.log('B')
		// resolve() 故意一直保持pending
	})
}

async function test() {
	console.log(1)
	await func()
	console.log(3)
}

test()
console.log(4)
// 最终结果👉: 1 B 4 (永远不会打印3)

async function test() {
	console.log(1)
	await new Promise((resolve) => {
		console.log('B')
		// resolve() 故意一直保持pending
	})
	console.log(3)
}

test()
console.log(4)
