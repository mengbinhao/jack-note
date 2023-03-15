let id = 0
class Dep {
	constructor() {
		this.id = id++
		this.subs = []
	}

	addSub(sub) {
		this.subs.push(sub)
	}
	// 收集依赖，只有此时的依赖目标（watcher 实例）存在时才收集依赖
	depend() {
		if (Dep.target) {
			this.addSub(Dep.target)
		}
	}
	// 发送更新，遍历依赖数组分别执行每个观察者定义好的 update 方法
	notify() {
		this.subs.forEach((sub) => {
			sub.update()
		})
	}
}

Dep.target = null
