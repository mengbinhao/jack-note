var alternateDigitSum = function (n) {
	let sum = 0,
		sign = 1,
		arr = Array.from(String(n), (num) => {
			return +num
		})
	for (let i = 0, len = arr.length; i < len; i++) {
		if (i % 2 === 1) {
			sum -= arr[i]
		} else {
			sum += arr[i]
		}
	}
	console.log(sum)
	return sum
}

alternateDigitSum(512)
