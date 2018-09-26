function Person(){}

var perBefore = new Person();
//原型封装
Person.prototype= {
		constructor:Person,   //纠正constructor指向,并且需要用Ecmascript5  defineProperty设置不可枚举
		name:"jack",
		age:11,
		friends:["caofei","caofeifei"],
		sayName:function() {
			console.log(this.name);
		}
};
//perBefore();   //throw exception 如果之前有实例，重写后会切断先前实例与原型对象的联系
var p1 = new Person();
var p2 = new Person();
p1.friends.push("laowang");
console.log(p2.friends);   //problem!!!!

String.prototype.startsWith = function(text) {
	return this.indexOf(text) == 0;
};
console.log("hello jack".startsWith("hello"));
