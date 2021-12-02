var findRelativeRanks = function (score) {
	const n = score.length
	const desc = ['Gold Medal', 'Silver Medal', 'Bronze Medal']
	const arr = new Array(n).fill(0).map(() => new Array(2).fill(0))

	for (let i = 0; i < n; ++i) {
		arr[i][0] = score[i]
		arr[i][1] = i
	}
	arr.sort((a, b) => b[0] - a[0])
	const ans = new Array(n).fill(0)
	for (let i = 0; i < n; ++i) {
		if (i >= 3) {
			ans[arr[i][1]] = '' + (i + 1)
		} else {
			ans[arr[i][1]] = desc[i]
		}
	}
	return ans
}

findRelativeRanks([5, 4, 3, 2, 1])
