class _Vue {
	constructor(options) {
		this.options = options
		this.data = options.data
		this.el = options.el
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
				set(val) {
					this.data[key] = val
				},
			})
		})
	}
}
