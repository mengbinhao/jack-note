//-------------------------------------------Set
//same as java set
//API: add clear delete has keys values entries forEach
//can add a NaN
var s = new Set();
[2, 3, 4, 5, 6, 2].map(x => s.add(x));
//console.log(s);

// for (let i of s) {
// 	console.log(i);
// }

var s2 = new Set([1, 2, 3, 4, 2]);
//console.log(s2.size);
s2.add({});
s2.add({});
//console.log(s2.size);

//console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);

//并集 交集 差集
//new Set([...a,...b])   a,b is a Set
//new Set([...a].filter(x => b.has(x)));
//new Set([...a].filter(x => !b.has(x)));


//-------------------------------------------WeakSet
//1 only add object
//2 can not iterator
//API: add delete has
var ws = new WeakSet();
//ws.add(1); //error
//ws.add({});