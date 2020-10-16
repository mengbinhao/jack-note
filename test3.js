var sortedSquares = function (A) {
	const len = A.length,
		ans = Array(len)
	for (let i = 0, j = len - 1, pos = len - 1; i <= j; ) {
		if (A[i] * A[i] > A[j] * A[j]) {
			ans[pos] = A[i] * A[i]
			i++
		} else {
			ans[pos] = A[j] * A[j]
			j--
		}
		pos--
	}

	return ans
}

sortedSquares([-7, -3, 2, 3, 11])
