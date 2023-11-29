var maxProfit = function (prices) {
	let profit = 0
	let len = prices.length
	if (len < 2) return 0
	for (let i = 1; i < len; i++) {
		//profit += Math.max(prices[i] - prices[i - 1], 0);
		// if (prices[i] > prices[i - 1]) {
		// 	profit += prices[i] - prices[i - 1]
		// }
		profit += Math.max(prices[i] - prices[i - 1], 0)
	}
	return profit
}
