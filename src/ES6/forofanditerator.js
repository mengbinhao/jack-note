//-------------------------------------------------for of
//适用范围: 数组 set map 类数组对象(arguments DOM NodeList) Generator 字符串

//array
let array = ['a', 'b', 'c'];
array.foo = "jack";
//for in 只能获取键名
//注意foo这个属性！！
for(let a in array) {
	//console.log(a);
}
// for of 获取键值
//注意foo这个属性！！
for(let a of array) {
	//console.log(a);
}
for(let [key, value] of array.entries()) {
	//console.log(key + ' ' + value);
}


//set map
//1 遍历的顺序是添加的顺序  2 map返回的是数组, 数组的成员是map成员的键名和键值
let map = new Map().set('a', 1).set('b', 2);
map.foo = "jack";
for (let pair of map) {
	//console.log(pair);
}
for (let [key, value] of map) {
	//console.log(key + ' ' + value);
}

for (let c of 'foo') {
	//console.log(c);
}
var text = String.fromCodePoint(0x20BB7);
for (let i = 0; i < text.length; i++) {
	//console.log(i);
}
for (let c of text) {
	//console.log(c);
}


//类数组对象
let str = "jack";
for (let x of str) {
	//console.log(x);
}

//对象
//对于普通对象 for in 可遍历键值
//for of 报错
//1 使用Object.keys将对象的键名生成数组 然后遍历这个数组
//2 将数组的Symbol.iterator属性赋值给其他对象的Symbol.iterator属性
//3 Generator包装下
var obj = {
	name : "jack",
	age : 33
}
for (var prop of Object.keys(obj)) {
	//console.log(prop);
}

//for in
//	1 是以字符串为键名 "0" "1" "2"
//	2 会遍历手动添加的其他键
//	3 某些情况下会以任意顺序遍历
//for in 主要遍历对象  不适用于数组
//for of 无for-in缺点 可以使用break continue return  提供统一接口


//-------------------------------------------------Iterator
//array、类数组对象 、set、map原生具有iterator接口
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

var someString = "hi";
//console.log(typeof someString[Symbol.iterator]);

//change to 遍历器
var strIter = someString[Symbol.iterator]();
// console.log(strIter.next());
// console.log(strIter.next());
// console.log(strIter.next());

var myIter = {};
myIter[Symbol.iterator] = function * () {
	yield 1;
	yield 2;
	yield 3;
}
//console.log(...myIter);

let objSymbol = {
	* [Symbol.iterator]() {
		yield 'hello';
		yield 'jack';
	}
}

for (let x of objSymbol) {
	//console.log(x);
}