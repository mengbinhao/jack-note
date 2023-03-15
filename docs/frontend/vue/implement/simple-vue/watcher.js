class Watcher {
	constructor(vm, expOrFn, cb) {
		Dep.target = this
		this.vm = vm
		this.getter = parsePath(expOrFn)
		this.cb = cb
		this.value = this.get()
		Dep.target = null
	}
	// watcher实例触发值读取时，将依赖收集的目标对象设置成自身，
	// 通过call绑定当前Vue实例进行一次函数执行，在运行过程中收集函数中用到的数据
	// 此时会在所有用到数据的dep依赖管理中插入该观察者实例
	get() {
		const value = this.getter.call(this.vm, this.vm)
		// 函数执行完毕后将依赖收集目标清空，避免重复收集
		return value
	}
	// dep 依赖更新时会调用，执行回调函数
	update() {
		let oldValue = this.value
		this.value = this.get()
		if (this.value !== oldValue) {
			this.cb.call(this.vm, this.value, oldValue)
		}
	}
}

function parsePath(path) {
	let segments = path.split('.')
	return function (obj) {
		for (let i = 0; i < segments.length; i++) {
			if (!obj) return
			obj = obj[segments[i]]
		}
		return obj
	}
}
