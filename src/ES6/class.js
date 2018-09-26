//---------------------------------------------class
//ES5
/*
function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.toString = function() {
	return '(' + this.x + ', ' + this.y + ')';
}
*/


//ES6
let methodName = "getArea";
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return '(' + this.x + ', ' + this.y + ')';
	}
	[methodName]() {
		return '(' + this.x * this.y + ')';
	}
	static staticMethod() {
		return "staticMethod";
	}
}
Point.staticAttr = "staticAttr";   //static attribute
//console.log(typeof Point);  //类就是函数 语法糖
//console.log(Point === Point.prototype.constructor); //类就是构造函数  语法糖

//toString在ES6写法下是不可枚举的
//console.log(Object.keys(Point.prototype));
//console.log(Object.getOwnPropertyNames(Point.prototype));

let point = new Point(2, 3);
//console.log(point.toString());

//除非显示定义在this上,否则都定义在原型上
// console.log(point.hasOwnProperty('x'));
// console.log(point.hasOwnProperty('y'));
// console.log(point.hasOwnProperty('toString'));
// console.log(point.__proto__.hasOwnProperty('toString'));
// console.log(Point.prototype.hasOwnProperty('toString'));

let point2 = new Point(3, 3);
// console.log(point.__proto__ === point2.__proto__);
// console.log(Point.name);



//---------------------------------------------classe expression
//下面类的名字是MyClass， Me只在class内部使用，可以省略Me
const MyClass = class Me {
	getClassName() {
		return Me.name;
	}
}

let ins = new  MyClass();
//console.log(ins.getClassName());
//console.log(Me.name);  //error

let person = new class {
	constructor(name) {
		this.name = name;
	}

	sayName() {
		console.log(this.name);
	}
}("Jack");
//person.sayName();


//--------------class不存在变量提升
/*
new Foo();
class Foo{}
*/



//---------------------------------------------classe inherit
class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y);
		this.color = color;
	}

	toString() {
		return this.color + ' ' + super.toString();
	}
}
let p = new Point(1,2);
let cp = new ColorPoint(2,3,'black');
//console.log(Point.staticMethod());
//console.log(cp.toString());
//console.log(cp instanceof ColorPoint);
//console.log(cp instanceof Point);

//__proto__ and prototype
//console.log(ColorPoint.__proto__ === Point);
//console.log(cp.__proto__ === ColorPoint.prototype);
//console.log(ColorPoint.prototype.__proto__ === Point.prototype);

//setter getter
//静态方法
//静态属性
//new.target
