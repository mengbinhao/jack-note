let twoSumBruteForce = (arr, target) => {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] + arr[j] === target) {
				return [i, j]
			}
		}
	}
}

let twoSumTwoPassHashTable = (arr, target) => {
	let map = new Map()

	//do not duplicate, store last index of an item
	for (let i = 0; i < arr.length; i++) {
		map.set(arr[i], i)
	}

	for (let i = 0; i < arr.length; i++) {
		let temp = target - arr[i]
		// [3,2,4] 6
		// i is use in arr, find two different index
		// map.get(temp) is bigger index
		if (map.has(temp) && map.get(temp) !== i) {
			return [i, map.get(temp)]
		}
	}
}

let twoSumOnePassHashTable = (arr, target) => {
	let map = new Map()
	for (let i = 0; i < arr.length; i++) {
		let temp = target - arr[i]
		if (map.has(temp)) {
			// i is bigger index
			return [map.get(temp), i]
		}
		map.set(arr[i], i)
	}
}
