const indexOf = (arr, item) => {
	if (Array.prototype.indexOf) {
		return arr.indexOf(item)
	} else {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === item) return i
		}
		return -1
	}
}
