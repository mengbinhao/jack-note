const horribleCode = () => {
	console.log('old logic')
}

//change to
const _horribleCode = fn
horribleCode = () => {
	_horribleCode()
	console.log('new logic')
}
