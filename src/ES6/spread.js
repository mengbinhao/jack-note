//*******************************************
//conclusion.
//	1 if param is array, conver it to value sequence
//	2 if param is arrLike, conver it to array
var arr1 = [1,2,3];
var arr2 = [...arr1];
function length(str) {
	return [...str].length;
}
//console.log(length("abcd"));


//rest has to locate at the last
function push (array, ...items) {
	items.forEach(function(item) {
		array.push(item);
	});
	return array;
}
//console.log(push([1,2,3],4,5,6,[7,8]));
//console.log(...[1,2,3]);
//console.log(1, ...[2,3,4], 5);


//work with Destructuring Assignment
//... must put at the last if assignment to a array
//const [first1, ...rest1] = [1,2,3,4,5];
//const [first2, ...rest2] = [];
//const [first3, ...rest3] = ["foo"];

//convert arrLike to array
let map = new Map([
	[1, "one"],
	[2, "two"],
	[3, "three"]
]);
//console.log([...map.keys()]);
