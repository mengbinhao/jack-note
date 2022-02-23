var reverseOnlyLetters = function (s) {
	const len = s.length
	const arr = [...s]
	let left = 0,
		right = len - 1
	while (true) {
		while (left < right && !/^[a-zA-Z]+$/.test(s[left])) left++
		while (right > left && !/^[a-zA-Z]+$/.test(s[right])) right--
		if (left >= right) break
		;[arr[left++], arr[right--]] = [arr[right], arr[left]]
	}
	return arr.join('')
}

console.log(reverseOnlyLetters('Test1ng-Leet=code-Q!'))
