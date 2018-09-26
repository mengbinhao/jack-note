//can write variable directely
var foo = "bar";
var baz = {foo};   // {foo : "bar"}
//console.log(baz);

function f(x, y){
	return {x, y};//rerutn {x:x, y:y};
}
//console.log(f(1,2));


//ES5
//for in            遍历自身和继承的可枚举属性(不含Symbol)
//Object.key()      自身可枚举(不含Symbol)
//JSON.stringify()  串行化对象自身的可枚举

//ES6 new methods
// Object.getOwnPropertyDescriptor
// Object.is
// Object.assign    //inherit
// Object.setPrototypeOf
// Object.getPrototypeOf
// Object.defineProperty       ******************

// let proto = {};
// let obj = {x : 10};
// Object.setPrototypeOf(obj, proto);
// proto.y = 20;
// proto.z = 30;
// console.log(obj.x);
// console.log(obj.y);
// console.log(obj.z);
// console.log(Object.getPrototypeOf(obj));



//以下遍历都遵循3条规则
//1 首先遍历属性名为数值的属性 按数字排序
//2 再遍历属性名为字符串的属性 按生成时间排序
//3 最后遍历Symbol 按生成时间排序

//for in 自身和继承的可枚举属性(不含Symbol)
//Objec.keys(obj) 返回数组,自身的不含继承的可枚举属性(不含Symbol)
//Object.getOwnPropertyNames(obj)  返回数组, 自身所有，包括不可枚举(不含Symbol)
//Object.getOwnPropertySymbols(obj)  返回数组, 所有Symbol
//Reflect.ownKeys(obj) 返回数组, 返回自身所有属性(包括Symbol、不可枚举)
