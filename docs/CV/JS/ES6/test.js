let str = 'a'
console.log(
	((str.charCodeAt(0) - 'a'.charCodeAt(0) + 1) % 26) + str.charCodeAt(0)
)
