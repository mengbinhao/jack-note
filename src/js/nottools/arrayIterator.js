let arrIterator = [1,2,3,4,5];

//replace for
arrIterator.forEach((item, index, arr) => {
	console.log(item, index, arr, this);
});

//数据映射
var arrIteratorMap = arrIterator.map((item, index, arr) => {
	return item * 2;
});

var arrIteratorFilter = arrIterator.filter((item, index, arr) => {
	return item > 2;
});

//某一个符合条件 返回true
var arrIteratorSome = arrIterator.some((item, index, arr) => {
	return item > 6;
});

//全部符合条件 返回true
var arrIteratorEvery = arrIterator.every((item, index, arr) => {
	return item > 0;
});

//求和  阶乘
var arrIteratorReduce = arrIterator.reduce((prev, cur, index, arr) => {
	return prev + cur;
});