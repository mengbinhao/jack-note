//--------------------------default value
//ES5
/*
function log(x, y) {
	y = y || "world";  //if y is a falsy value, then come out problem
	console.log("log = " + x,y);
}
log("hello");
log("hello", "Jack");
log("hello", "");

function log2(x, y) {
	if (typeof y === "undefined") {
		y  = "world";
	}
	console.log("log2 = " + x,y);
}
log2("hello");
log2("hello", "Jack");
log2("hello", "");

function log3(x, y) {
	if (arguments.length == 1) {
		y  = "world";
	}
	console.log("log3 = " + x,y);
}
log3("hello");
log3("hello", "Jack");
log3("hello", "");
*/

//ES6   ********************
//1 logES6.length reduce , which means formal param length reduce, same as rest paramater
//2 let/const can not assign value to default params
//3 put dafualt param to the end of formal param list, or you can not omit it
//4 undefined effects default value, null can not
//5 execute defualt param at run-time
function logES6(x, y = "world") {
	console.log("logES6 = " + x,y);
}
// logES6("hello");
// logES6("hello", "Jack");
// logES6("hello", "");

//work with Destructuring Assignment
function foo( {x, y = 5}) {
	console.log(x,y);
}
// foo({});
// foo({x:1});
// foo({x:1,y:2});

//double default values
function doubleDefaultValue(url,{method = "GET"} = {}) {
	console.log(method);
	console.log(typeof method);
}
//doubleDefaultValue("http://xxx","dddf");


//--------------------------param scope
// let foo123 = "outer";
// function bar123 (func = () => foo123) {
// 	let foo123 = "inner";
// 	console.log(func());
// }
// bar123();

//see the difference of below function
function difference1({ x = 0, y = 0 } = {}) {
	console.log([x, y]);
}
//work with Destructuring Assignment
function difference2({ x, y } = { x: 0, y: 0 }) {
	console.log([x, y]);
}
// difference1();
// difference2();
// difference1({ x: 3, y: 8 });
// difference2({ x: 3, y: 8 });
// difference1({ x: 3 });
// difference2({ x: 3 });
// difference1({});
// difference2({});
// difference1({ z: 3 });
// difference2({ z: 3 });


//--------------------------arrow function
//define
var f1 = () => 5;
var f2 = (num1,num2) => num1 + num2;
var f3 = (num1,num2) => {console.log(num1 + num2)};  //no return
var f4 = (id) => ({id: id, name: "Temp"});   //return object
var f5 = ({first, last}) => first + " " + last;   //work with Destructuring Assignment
const number = (...nums) => nums; //work with rest
const headAndTail = (head, ...tail) => [head, tail]; //work with rest
//console.log(headAndTail(1,2,3,4,5));


// 函数体内this指定义时所在对象，而不是使用时所在对象
// 1 this是函数定义时所在对象  不是运行时（this指向谁看上一级，若是箭头函数继续上找，作用于是栈内存不是堆内存
// 2 没有arguments   但有...
// 3 不能用作构造函数
// 4 不可用yield 因此不能用Generator函数
// 5 不能通过call apply bind改变this
function foo() {
	setTimeout(() => {
		console.log("id:" + this.id);
	});
}
//foo.call({id:42});
