class EventEmitter {
	constructor() {
		// key: 事件名
		// value: 函数回调数组
		this.events = {}
	}

	on(type, cb) {
		if (this.events[type]) {
			this.events[type].push(cb)
		} else {
			this.events[type] = [cb]
		}
	}

	off(type, cb) {
		if (!this.events[type]) return
		//若无cb,就删掉整个事件
		if (!cb) {
			delete this.events[type]
		} else {
			this.events[type] = this.events[type].filter((item) => item !== cb)
			//删掉再检查一次
			if (this.events[type].length === 0) delete this.events[type]
		}
	}

	emit(type, ...args) {
		if (!this.events[type]) return
		this.events[type].forEach((cb) => cb(...args))
	}

	once(type, cb) {
		let inner = (...args) => {
			cb.apply(this, args)
			this.off(type, inner)
		}
		this.on(type, inner)
	}
}

// let obj = new EventEmitter()
// const f1 = () => console.log('type1 - 1')
// const f2 = () => console.log('type1 - 2')
// const f3 = () => console.log('type2 - 3')
// const f4 = () => console.log('type2 - 4')
// obj.on('type1', f1)
// obj.on('type1', f2)
// obj.on('type2', f3)
// obj.on('type2', f4)
// obj.once('type3', () => console.log('1111111111111'))
// obj.emit('type2')
// obj.emit('type2')
// obj.emit('type3')
// obj.emit('type3')
