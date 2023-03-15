//Child.__proto__ === Parent //实现静态方法继承
//Child.prototype.__proto__ === Parent.prototype
class Parent {
	static sParent = 'staticParent'
	constructor(name, age) {
		this.name = name
		this.age = age
	}

	sayP() {
		console.log(`Parent ${this.name} ${this.age}`)
	}

	static sp() {
		console.log(`static Parent`)
	}
}

class Child extends Parent {
	constructor(name, age, ...hobbies) {
		super(name, age)
		this.hobby = hobbies
	}

	sayC() {
		//实例方法可以访问静态方法，反过来不行
		Parent.sp()
		console.log(Parent.sParent)
		//super这里指父类对象的实例
		//console.log(super.sParent)
		super.sayP()
		console.log(`child ${this.hobby}`)
	}

	static sc() {
		//super这里指父类
		console.log(super.sParent)
		console.log(Parent.sParent)
		//可用this调用其他静态函数
		this.sc2()
		super.sp()
		console.log(`static Child`)
	}
	static sc2() {
		console.log('sc2')
	}
}

let c = new Child('jack', 33, 'coding', 'leaning', 'sleeping')
//c.sayC()
Child.sc()

//ES5
const inherit = (function () {
	const F = function () {}
	return function (Target, Origin) {
		F.prototype = Origin.prototype
		//Target.prototype.__proto__ = Object.create(Parent.prototype)
		Target.prototype = new F()
		Target.prototype.constructor = Target
		Target.uber = Origin.prototype
	}
})()
