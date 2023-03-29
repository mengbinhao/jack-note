//原型链继承
function Vehicle(powerSource) {
	this.powerSource = powerSource
	this.components = ['seat', 'wheel']
}

Vehicle.prototype.run = function () {
	console.log('running!')
}

function Car(brand) {
	this.brand = brand
}

//下面被替换了
//下面被替换了
// Car.prototype.playMusic = function () {
// 	console.log('sing')
// }

Car.prototype = new Vehicle()
//fix constructor
Car.prototype.constructor = Car

Car.prototype.playMusic = function () {
	console.log('sing')
}

let car = new Car('BMW')
//1 多个实例对引用类型的操作会被篡改,new Vehicle()上面的components
//2 子类型上的constructor是new Vehicle().prototype上的constructor
//3 创建子类实例时无法向父类构造函数传参 car.powerSource = 'gasoline'
//4 给子类型原型添加属性和方法必须在替换原型之后,因为重写了Car的原型对象

//借用构造函数
//Vehicle.call(this, 'gasoline')
//1 上面1、2、3问题不存在
//2 不会继承父类原型上的方法，除非全写在constrictor里

//组合
//调用了2次父类构造函数，存在多余的一份同名属性
function Child(name, like) {
	Parent.call(this, name, like) // 第二次
	this.like = like
}
Child.prototype = new Parent() // 第一次

//原型式
//寄生式

//寄生组合式继承
function inheritPrototype(child, parent) {
	const prototype = Object.create(parent.prototype)
	//fix constructor
	prototype.constructor = child
	child.prototype = prototype
}

const _inherit = (function () {
	let F = function () {}
	return function (Child, Parent) {
		F.prototype = Parent.prototype
		Child.prototype = new F()
		//fix constructor
		Child.prototype.constructor = Child
		Child.uber = Parent.prototype
	}
})()