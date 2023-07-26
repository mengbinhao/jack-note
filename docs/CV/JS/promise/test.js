let vm = _Vue({
	el: '#app',
	data: {
		name: 'Jack',
		age: 33,
	},
})

const changeVM = () => {
	vm.name = 'changed'
}

class _Vue {
	constructor(options) {
		this.options = options
		this.data = this.options.data
		this.el = this.options.el
		if (this.data) this.proxy(this.data)
		if (this.el) {
			new Observer(this.data)
			new Compile(this, this.el)
		}
	}

	proxy(data) {
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				configurable: false,
				enumerable: true,
				get() {
					return this.data[key]
				},
				set(newVal) {
					this.data[key] = newVal
				},
			})
		})
	}
}

class Observer {
	constructor(data) {
		this.observe(data)
	}

	observe(data) {
		if (!data || typeof data !== 'object') return
		Object.keys(data).forEach((key) => {
			this.defineReactive(data, key, data[key])
		})
	}

	defineReactive(data, key, val) {
		let dep = new Dep()
		Object.defineProperty(data, key, {
			configurable: false,
			enumerable: true,
			get() {
				if (dep.target) dep.depend()
				return val
			},
			set(newVal) {
				if (val === newVal) return
				val = newVal
				dep.notify()
			},
		})
	}
}
