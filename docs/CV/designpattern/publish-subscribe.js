class Publisher {
	construct() {
		this.observers = []
	}
	add(observer) {
		this.observers.push(observer)
	}

	// 通知所有订阅者
	notify() {
		this.observers.forEach((observer) => {
			observer.update(this)
		})
	}
}

// 订阅者类 顾客
class Observer {
	constructor() {}

	update() {
		console.log('Observer  buy buy buy')
	}
}
const customer = new Observer()
const amazon = new Publisher()

amazon.add(customer)
amazon.notify()
