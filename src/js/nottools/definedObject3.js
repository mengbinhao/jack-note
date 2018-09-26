//组合加原型   最主要的使用方式！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
function Person(name,age) {
	this.name = name;
	this.age = age;
	this.friends = ["caofeifei"];
}

Person.prototype = {
	constructor: Person,
	sayName:function() {
		console.log(this.name);
	}
};

var p1 = new Person("jack",33);
var p2 = new Person("caofei",22);
p1.friends.push("caofeifei");
console.log(p1.friends);
console.log(p2.friends);
console.log(p1.friends == p2.friends);
console.log(p1.sayName == p2.sayName);

//动态原型,不能重写Person.prototype
function PersonDyn(name,age) {
	this.name = name;
	this.age = age;
	if (typeof this.sayName != "function") {
		PersonDyn.prototype.sayName = function() {
			console.log(this.name);
		};
	}
}


//寄生构造函数

//稳妥构造函数

//继承继承
//原型链继承
//深入理解原型链  SubType->SuperType->Object
//problem  1 对于引用类型(friends)  2 创建子类时不能向超类构造函数传参
function SuperType() {
	this.property = true;
}
SuperType.prototype.getSuperValue = function() {
	return this.property;
}

function SubType() {
	this.subProperty = false;
}
//实现继承！！！！！！！！！
SubType.prototype = new SuperType();

//不论是定义新方法还是override父类的方法都需要在继承后
//另外继承后不能使用字面量创建原型方法 因为会重写原型链
SubType.prototype.getSubTypeValue = function() {
	return this.subProperty;
}

var instance = new SubType();
console.log(instance.getSuperValue());
console.log(instance instanceof Object);
console.log(instance instanceof SubType);
console.log(instance instanceof SuperType);









