//-------------------------------------------Map
//same as java map
//Obj类型只能字符串或者symbol作为建   map可随意
//对同一个键多次赋值,后面覆盖前面
//读取未知键值为undefined
//API: size set get has delete clear keys values entries  forEach

var m = new Map();
var map = new Map([["name", "zhangsan"], ["title", "Author"]]);
// console.log(map.size);
// console.log(map.has("name"));
// console.log(map.get("name"));
// console.log(map.get("xxxxxxx"));

//只有对同一个对象的引用Map才将其视为同一个键
map.set(['a'], 555);
//console.log(map.get(['a']));
var k1 = ['a'];
var k2 = ['a'];
map.set(k1, "k1").set(k2, "k2");
//console.log(map.get(k1));
//console.log(map.get(k2));

//console.log(map[Symbol.iterator] === map.entries);


//map convert to array
//[...map]  [...map.keys()]

//array convert to map
//new Map([["name", "zhangsan"], ["title", "Author"]]);


//若map键值全是字符串 可转为对象
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

//obj convert to map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

//map convert to JSON
//1 键全是字符串
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}
//2 键有非字符串
function strMapToArrayJson(strMap) {
    return JSON.stringify([...strMap]);
}

//JSON convert to map
//1 键全是字符串
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}
//2 键有非字符串
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}


//-------------------------------------------WeakMap
//1 only add object
//2 can not iterator
//3 no size
//4 API: set get has delete
var wm = new WeakMap();
//console.log(wm.size);

