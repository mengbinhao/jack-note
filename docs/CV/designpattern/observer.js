/*
 * @Author: JackMeng mengbinhao2018@gmail.com
 * @Date: 2023-09-19 15:11:32
 * @LastEditors: JackMeng mengbinhao2018@gmail.com
 * @LastEditTime: 2023-09-19 15:11:37
 * @FilePath: \jack-note\docs\CV\designpattern\观察者.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class Observed {
	constructor() {
		// 我要看看到底有多少人在观察俺
		this.observers = []
	}
	addObserver(observer) {
		// 添加一个观察俺的人
		this.observers.push(observer)
	}
	removeObserve(observer) {
		this.observers = this.observers.filter((observer) => observer !== observer)
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
