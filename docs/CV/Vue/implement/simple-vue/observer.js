class Observer {
	constructor(data) {
		this.observe(data)
	}

	observe(data) {
		if (!data || typeof data !== 'object') return
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key])
			//recursion
			//this.observe(data[key])
		})
	}

	defineReactive(data, key, value) {
		let dep = new Dep() //每个属性都有单独的dep依赖管理
		Object.defineProperty(data, key, {
			configurable: false,
			enumerable: true,
			get() {
				if (Dep.target) dep.addSub(Dep.target)
				//if (Dep.target) dep.depend() //收集依赖
				return value
			},
			set(newVal) {
				if (newVal === value) return
				value = newVal
				//_this.observe(newVal)
				dep.notify()
			},
		})
	}
}
