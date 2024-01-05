const user = {
	_name: 'Guest',
	get name() {
		return this._name
	},
}

handler = {
	//读取未知属性报错、读取数组负数索引的值、封装链式操作、生成DOM嵌套节点
	get(target, key, receiver) {
		return target[key]
		//receiver指向proxy或继承于它的对象
		//return Reflect.get(target, key, receiver)
	},
	//数据绑定(Vue数据绑定实现原理)、确保属性值设置符合要求、防止内部属性被外部读写
	set(target, key, val, receiver) {
		return Reflect.set(target, key, val, receiver)
	},
}

const userProxy = new Proxy(user, handler)

let admin = {
	_name: 'Admin',
}

Object.setPrototypeOf(admin, userProxy)
console.log(admin.name)
