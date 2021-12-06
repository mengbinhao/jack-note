var truncateSentence = function (s, k) {
	const len = s.length
	let end = 0,
		count = 0

	for (let i = 1; i <= len; i++) {
		if (i === len || s[i] === ' ') {
			if (++count === k) {
				end = i
				break
			}
		}
	}
	return s.slice(0, end)
}

console.log(truncateSentence('chopper is not a tanuki', 5))
