var arr = [1, 2, 3, 4, 5]

arr.reduce(async (prs, cur, index) => {
	await prs
	const timeout = index === 0 ? 0 : 1000 + (index - 1) * 500

	return new Promise((res) => {
		setTimeout(() => {
			console.log(cur)
			res(timeout)
		}, timeout)
	})
}, Promise.resolve(0))
