class EventEmitter {
	constructor() {
		this.event = {}
	}
	on(type, cb) {
		if (this.event[type]) {
			this.event[type].push(cb)
		} else {
			this.event[type] = [cb]
		}
	}
	off(type, cb) {
		if (!this.event[type]) return
		if (!cb) {
			delete this.event[type]
		} else {
			this.event[type] = this.event[type].filter((item) => item !== cb)
			if (this.event[type].length === 0) delete this.event[type]
		}
	}
	emit(type, ...args) {
		if (!this.event[type]) return
		this.event[type].forEach((cb) => {
			cb(...args)
		})
	}
	once(type, cb) {
		let inner = (...args) => {
			cb.call(null, ...args)
			this.off(type, inner)
		}
		this.on(type, inner)
	}
}
