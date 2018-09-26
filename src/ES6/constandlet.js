// ES5 只有全局和函数作用域
// var 和 function声明的全局变量是全局对象的属性,但是let const import class不是
// var winAttribute = 1;
// console.log(window.winAttribute);
// let notWinAttribute = 1;
// console.log(window.notWinAttribute);


//块级作用域
//1 不能重复赋值和声明,let不能重复赋值(引用对象不能改引用)
//2 const使用前必须初始化
//3 变量不提升
//4 temporal dead zone

//error
function fooWrong(arg) {
	let arg;
}

//correct
function fooCorrect(arg) {
	console.log(arg);
	{
		let arg;
		console.log(arg);
	}
}


let objIterator = {a:1,b:2};
//console.log(Object.keys(objIterator));
let constantize = (obj) => {
	Object.freeze(obj);
	Object.keys(obj).forEach((key,value) => {
			console.log(key + " " + value);
			if (typeof obj[key] === 'object') {
				constantize(obj[key]);
			}
	});
};
//constantize(objIterator);