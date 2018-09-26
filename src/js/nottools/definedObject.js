var person = new Object();
person.name = "jack";
person.age = 33;
person.job = "javascript developer";
person.sayName = function() {
	console.log(this.name);
};


var personLiterals = {
	name:"jack",
	age:33,
	job:"javascript developer",
	sayName: function() {
		console.log(this.name);
	}
}


//数据属性
//[[Configurable]] default true
//[[Enumerable]]   default true
//[[writable]] default true
//[[Value]]   undefined
var unWriteableObj = new Object();
Object.defineProperty(unWriteableObj,"name",{
	//configurable : false  不能删除   不能在改回来
	writable : false,
	value : "jack"
});
console.log(unWriteableObj.name);
unWriteableObj.name = "kyo";
console.log(unWriteableObj.name);


//访问器属性 两种写法
//[[Configurable]]    default true
//[[Enumerable]]      default true
//[[Set]]   [[Get]]   undefined


var book = {
   _year : 2004,
   edition : 1
};
/*
Object.defineProperty(book,"year", {
	get : function() {
		return this._year;
	},
	set: function(newValue) {
		if (newValue > 2004) {
			this._year = newValue;
			this.edition += newValue - 2004;
		}
	}
});

book.__defineGetter__("year",function() {
	return this._year;
});

book.__defineSetter__("year",function(newValue) {
	if (newValue > 2004) {
		this._year = newValue;
		this.edition += newValue - 2004;
	}
});
*/


//defineProperties
Object.defineProperties(book,{
	_year : {
		writable : true,
        Value : 2004
	},
	edition : {
		writable : true,
        Value : 1
	},
	year : {
		get : function() {
			return this._year;
		},
		set: function(newValue) {
			if (newValue > 2004) {
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	}
});


book.year = 2005;
console.log(book.edition);
console.log(Object.getOwnPropertyDescriptor(book,"_year"));
console.log(Object.getOwnPropertyDescriptor(book,"year"));


//工厂模式
function createPerson(name,age){
	var o = new Object();
	o.name = name;
	o.age = age;
	return o;
}

//构造函数
function Person(name,age){
	this.name = name;
	this.age = age;

	/*  每个实例一个function实例
	    this.sayName = function() {
		console.log(this.name);
	}*/
	this.sayName = sayName;
}

function sayName() {
	console.log(this.name);
}

// var this = {};  this.__proto__ = Person.prototype;  excute constructor; return this
var personObj1 = new Person("jack",33);
var personObj2 = new Person("caofeifei",22);

console.log(personObj1.constructor == personObj2.constructor);

//当普通函数调用
Person("kyo",11);
console.log(window.sayName());

//改变作用域
var o = new Object();
Person.call(o,"ooooo",11);
console.log(o.sayName());


//原型链
//isPropertypeOf
//Object.getPropertypeOf  返回[[prototype]]
//obj.hasOwnProperty(propertyName)
console.log(Object.getPrototypeOf(personObj1) == Person.prototype);


function PersonPrototype(){
}
PersonPrototype.prototype.name = "jack";
PersonPrototype.prototype.age = 11;
var PersonPrototypeObj = new PersonPrototype();

console.log(PersonPrototypeObj.name);
console.log(PersonPrototypeObj.hasOwnProperty("name"));
console.log("name" in PersonPrototypeObj);
console.log(hasPrototypeProperty(PersonPrototypeObj,"name"));
PersonPrototypeObj.name = "myJack";
console.log(PersonPrototypeObj.name);
console.log(PersonPrototypeObj.hasOwnProperty("name"));
console.log("name" in PersonPrototypeObj);
console.log(hasPrototypeProperty(PersonPrototypeObj,"name"));
delete PersonPrototypeObj.name;
console.log(PersonPrototypeObj.name);
console.log(PersonPrototypeObj.hasOwnProperty("name"));
console.log("name" in PersonPrototypeObj);
console.log(hasPrototypeProperty(PersonPrototypeObj,"name"));

function hasPrototypeProperty(obj,propertyName) {
	return !obj.hasOwnProperty(propertyName) && (propertyName in obj);
}


//for in
//Object.keys(obj)
console.log(Object.keys(PersonPrototype.prototype));



