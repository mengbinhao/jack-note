// 1 相同type增加最大订阅数量
// 2 增加取消对应id的订阅回调 {key:value(value是数组)} -> {key:{id1:value1,id2:value2,id3:value3}}
// 3 once
class EventEmitter {
	constructor(maxListeners) {
		this.events = {}
		this.maxListeners = maxListeners || Infinity
		this.callbackId = 0
	}

	on(type, cb) {
		//if(!Reflect.has(this.events,type)){
		if (!this.events[type]) this.events[type] = {}
		if (
			this.maxListeners !== Infinity &&
			Object.keys(this.events[type]).length >= this.maxListeners
		)
			return
		const callbackId = this.callbackId++
		this.events[type][callbackId] = cb
	}

	off(type, callbackId) {
		if (!this.events[type]) return
		if (!callbackId) {
			// Reflect.deleteProperty(this.events, type)
			delete this.events[type]
		} else {
			delete this.events[type][callbackId]
			if (Object.keys(this.events[type]).length === 0) delete this.events[type]
		}
	}

	clearAll() {
		this.events = {}
	}

	emit(type, ...args) {
		if (!this.events[type]) return
		const callbackList = this.events[type]
		for (const [id, cb] of Object.entries(callbackList)) {
			cb(...args)
			if (id.startsWith('one')) delete callbackList[id]
		}
	}

	once(type, cb) {
		if (!this.events[type]) this.events[type] = {}
		const callbackId = 'one' + this.callbackId++
		this.events[type][callbackId] = cb
	}
}

let ee = new EventEmitter(2)
const f1 = (...args) => console.log(f1.name, args)
const f2 = () => console.log(f2.name)
const f3 = (...args) => console.log(f3.name, args)
ee.on('event1', f1)
ee.on('event1', f2)
ee.on('event2', f3)
ee.emit('event1')
ee.emit('event2')
ee.clearAll()
ee.emit('event1')
