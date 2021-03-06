//原型链继承
function Vehicle(prowerSource) {
	this.prowerSource = prowerSource
	this.components = ['seat', 'wheel']
}

Vehicle.prototype.run = function() {
	console.log('running!')
}

function Car(brand) {
	this.brand = brand
}

Car.prototype.playMusic = function() {
	console.log('sing')
}

Car.prototype = new Vehicle()

var car = new Car('BMW')
//1 多个实例对引用类型的操作会被篡改,new Vehicle()上面的components
//var car2 = new Car(8); car2.components.push('lamp'); console.log(car1.components)
//2 子类型上的constructor是new Vehicle().prototype上的constructor
//Car.prototype.constructor = Car,new Vehicle()上添加属性
//3 创建子类实例时无法向父类构造函数传参
//car.powerSource = 'gasoline'
//4 给子类型原型添加属性和方法必须在替换原型之后
//Car.prototype = new Vehicle()重写了原型对象


//借用构造函数Vehicle.call(this, 'gasoline')
//1 上面1.2.4问题不存在
//2 不会继承原型run方法，除非全写在constrictor里


//组合
//上面2问题不存在，调用了2次父类构造函数，存在多余的一份同名属性


//原型式
//寄生式


//寄生组合式继承
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}
