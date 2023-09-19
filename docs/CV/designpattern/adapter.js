class Eleme {
	getElePice() {
		console.log('在饿了么上商品的价格')
		return { elePrice: xx }
	}
}

class Meituan {
	getMeiPice() {
		console.log('在美团上商品的价格')
		return { meiPrice: xx }
	}
}

class ElemeAdapter {
	getPrice() {
		const e = new Eleme()
		return { price: e.getElePice() }
	}
}

class MeituanAdapter {
	getPrice() {
		const m = new Meituan()
		return { price: m.getMeiPice() }
	}
}
