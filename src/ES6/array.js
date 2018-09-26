//Array.of(转值)
Array.of(7);  //[7]

//Array.from(转类数组,具有length或具有iterable接口的数据)
let likeArray = {
	"0" : "a",
	"1" : "b",
	"2" : "c",
	length : 3
}

Array.from(likeArray);
Array.from({length:3});
Array.from([1,2,3], x => x * x);
Array.from([1,2,3]).map((x) => x * x);
Array.from([1, , 2, ,3], (n) => n || 0);


//arr.copyWithin(target[, start, end])

//arr.fill(value[, start[, end]])

//includes

//find(找出第一个符合条件 没返回undefined)

//findIndex(没找到返回-1)

//entries keys values



//ES5 对空位处理很不一致!
//forEach() filter() every() some()  会跳过
//[,1].forEach((x,i) => console.log(i)); //1
//map跳过但保留
[,1].map((x) => 1);   //[empty,1]
//join toString 转为undefined
[,1,undefined,null].join("#");   //#1##


//ES6 明确转成undefined!
//for of
//Array.from
//fill find findIndex
//entries keys values

for (let [index,value] of [1,2].entries()) {
  //console.log(index,value);
}

//ES5 方案
if ([1,2].indexOf(x) !== -1) {}
//indexOf问题
//console.log([NaN].indexOf(NaN));


