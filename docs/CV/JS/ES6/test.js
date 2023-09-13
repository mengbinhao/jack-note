const getURL = (url) => {
	let obj = {}
	if (!url) return obj
	let pairs = url.split('?')[1].split('&')
	for (let pair of pairs) {
		console.log(pair)
	}
	return obj
}

let url =
	'https://www.baidu.com/m?f=8&ie=utf-8&rsv_bp=1&tn=monline_3_dg&wd=session'

console.log(getURL('12331?'))
