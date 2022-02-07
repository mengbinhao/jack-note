const fn = (method) => {
	switch (method) {
		case method === '1':
			console.log(`1`)
		case method === '2':
			console.log(`2`)
			break
		case method === '3':
			console.log(`3`)
			break
		case method === '4':
			console.log(`4`)
			break
		default:
			console.log(`method value is not correct, method = ${method}`)
	}
}

fn('1')
