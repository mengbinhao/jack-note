class Route {
	constructor() {
		// 路由存储对象
		this.routes = {}
		// 当前hash
		this.currentHash = ''
		this.freshRoute = this.freshRoute.bind(this)
		window.addEventListener('load', this.freshRoute, false)
		window.addEventListener('hashchange', this.freshRoute, false)
	}
	storeRoute(path, cb) {
		this.routes[path] = cb || function () {}
	}
	freshRoute() {
		this.currentHash = location.hash.slice(1) || '/'
		this.routes[this.currentHash]()
	}
}
