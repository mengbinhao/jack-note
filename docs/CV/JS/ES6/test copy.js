var threeSum = function (nums) {
	const len = nums.length
	let ret = []
	nums.sort((a, b) => a - b)
	for (let i = 0; i < len - 2; i++) {
		if (nums[i] > 0) break
		if (nums[i] === nums[i - 1]) continue
		let l = i + 1,
			r = len - 1
		while (l < r) {
			const sum = nums[i] + nums[l] + nums[r]
			if (sum === 0) {
				ret.push([nums[i], nums[l], nums[r]])
				while (nums[l] === nums[l + 1]) l++
				l++
				while (nums[r - 1] === nums[r]) r--
				r--
			} else if (sum < 0) {
				l++
			} else {
				r--
			}
		}
	}
	return ret
}
