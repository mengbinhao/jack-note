function doOperation() {
  //doStep1产生的
	doStep1(0, (result1) => {
		doStep2(result1, (result2) => {
			doStep3(result2, (result3) => {
				console.log(`结果：${result3}`)
			})
		})
	})
}
