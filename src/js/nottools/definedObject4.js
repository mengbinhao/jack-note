//借用构造函数
//Problem  1 方法都在构造函数中定义  2 超类原型中定义的方法不可见
function SuperType(name) {
	this.name = name;
	this.colors = ["red","black"];
}

function SubType() {
	//借用构造函数
	SuperType.call(this,"jack");
	this.age = 33;
}
var instance1 = new SubType();
instance1.colors.push("green");
console.log(instance1.colors);
console.log(instance1.name);

var instance2 = new SubType();
console.log(instance2.colors);
console.log(instance2.name);


//组合继承  不足调用两次超类构造函数
//组合继承
//组合继承
//组合继承
function SuperType2(name) {
	this.name = name;
	this.colors = ["red","black"];
}

SuperType2.prototype.sayName = function() {
	console.log(this.name);
}

function SubType2(name,age) {
	//继承属性
	SuperType2.call(this,name);
	this.age = age;
}
console.log("----" + SubType2.prototype.constructor);
//继承方法
SubType2.prototype = new SuperType2();
console.log("----" + SubType2.prototype.constructor);
SubType2.prototype.constructor = SubType2;
SubType2.prototype.sayAge = function() {
	console.log(this.age);
}
var instance21 = new SubType2("jack",33);
instance21.colors.push("gray");
console.log(instance21.colors);
instance21.sayName();
instance21.sayAge();

var instance22 = new SubType2("caofeifei",22);
console.log(instance22.colors);
instance22.sayName();
instance22.sayAge();

//原型式继承

//寄生式继承

//寄生组合式继承
function inheritPrototype(subType,superType){
	console.log("#####" + superType.prototype.constructor);
	var prototype = Object(superType.prototype);
	console.log("#####" + prototype.constructor);
	prototype.constructor = subType;
	console.log("#####" + prototype.constructor);
	subType.prototype = prototype;
}

function SuperType3(name) {
	this.name = name;
	this.colors = ["red","black"];
}

SuperType3.prototype.sayName = function() {
	console.log(this.name);
}

function SubType3(name,age) {
	//继承属性
	SuperType2.call(this,name);
	this.age = age;
}

inheritPrototype(SubType3,SuperType3);

SubType3.prototype.sayAge = function() {
	console.log(this.age);
}

var instance31 = new SubType3("jack",44);
instance31.colors.push("fffffff");
console.log(instance31.colors);
instance31.sayName();
instance31.sayAge();

var instance32 = new SubType3("caofeifei",11);
console.log(instance32.colors);
instance32.sayName();
instance32.sayAge();
