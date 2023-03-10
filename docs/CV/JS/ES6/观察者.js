class Observed {
	constructor() {
		// 我要看看到底有多少人在观察俺
		this.observers = []
	}
	addObserver(observer) {
		// 添加一个观察俺的人
		this.observers.push(observer)
	}
	notify() {
		// 我要闹点动静，所有观察者都会知道这个信息，具体怎么做就是他们自己的事情了
		this.observers.forEach((observer) => observer.update())
	}
}

class Observer {
	constructor(doSome) {
		// 观察到小白鼠有动静之后，观察者做的事情
		this.doSome = doSome
	}
	update() {
		console.log(this.doSome)
	}
}

const ob1 = new Observer('我是ob1,我观察到小白鼠有反应了,太饿了,我得去吃个饭了')
const ob2 = new Observer('我是ob2,我观察到小白鼠有反应了,我要继续工作!')
const xiaoBaiShu = new Observed()
xiaoBaiShu.addObserver(ob1)
xiaoBaiShu.addObserver(ob2)
xiaoBaiShu.notify()
