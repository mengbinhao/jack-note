//---------------------------------------------------purpose
//1 交换值
//[x, y] = [y, x];

//2 函数返回多个值
function exampleDestructuring() {
  return [1,2,3];
}
let [a, b, c] = exampleDestructuring();

//3 函数返回一个对象
function exampleDestructuring2() {
  return {
    foo:1,
    bar:2
  }
}
var {foo, bar} = exampleDestructuring2();

//4 函数参数的定义
function f1([x,y,z]){}
f1([1,2,3]);

function f2({x,y,z}){}
f2({z:3,y:2,x:1});

//5 提取json
var jasonData = {
  id:42,
  status:"OK",
  data:[867,898]
}
let {id, status, data:number} = jasonData;

//6 函数参数默认值
function f3({foo='hi', bar='yo'} = {}) {}

//7 遍历map
var map = new Map();
map.set('first','hello');
map.set('second','world');

for (let [key, value] of map) {
  //console.log(key + " is " + value);
}
for (let [key] of map) {
  //console.log("key is " + key);
}
for (let [value] of map) {
  //console.log("value is " + value);
}


//---------------------------------------------------array destructuring
//某数据具有Iterator接口(var let const Set)即可解构
//模式匹配即可解构
var [a,b,c] = [1,2,3];
let [foo,[[bar],baz]] = [1,[[2],3]];
let [,,third] = [1,2,3];
let [x,,y] = [1,2,3];
let [head,...tail] = [1,2,3,4]
let [x1,y1,...z1] = ['a'];  // a, undefine  []
var [foo1] = [];
var [foo2,bar2] = [1];

//不完全解构
let [x2,y2] = [1,2,3];
let [x5,[y5],z5] = [1,[2,3],4];

//若等号右边不是可遍历解构
//let [foo9] = 1;  //error

//Set
let [s1,s2,s3] = new Set(["a","b","c"]);
//console.log(s1 + " " + s2 + " " + s3);


//---------------------------------------------------string destructuring
const [str1,str2,str3,str4,str5] = "hello";
let {length:len} = "hello";
//console.log(len);


//---------------------------------------------------object destructuring
var {fooObj, barObj} = {fooObj: "aaa1", barObj:"bbb1"};
var {bazObj} = {foo: "aaa2", bar:"bbb2"}; //undefined
//属性名不一样
var {foo2Obj:foo3Obj} = {foo2Obj: "aaa3", bar:"bbb3"};  //foo3Obj = aaa3

var objDestructuring = {
  p : [
    "hello",
    {y : "World"}
  ]
}
//p是模式
var {p:[xp, {y:yp}]} = objDestructuring;
//console.log(xp);
//console.log(yp);


//---------------------------------------------------other destructuring
//若等号右边不是对象 先转换成对象
let {toString:s} = 123;
//console.log(s);
//console.log(s === Number.prototype.toString); //true
let {toString:s11} = true;
//console.log(s11);
//console.log(s11 === Number.prototype.toString); //false
//let {prop : xundefined} = undefined; //error
//let {prop : xnull} = null; //error


//-----------------------------------------------functionArgs destructuring
function add([x,y]){
  return x + y;
}
//console.log(add([1,2]));

//console.log([[1,2],[3,4]].map(([a,b]) => a+b));

function move1({x = 0, y = 0} = {}) {
  return [x,y];
}
move1({x: 3, y: 8}) //[3, 8]
move1({x: 3}) //[3, 0]
move1({}) //[0, 0]
move1() //[0,0]

//为函数的move参数指定默认值  不是x和y默认值
function move2({x, y} = { x:0, y:0}) {
  return [x,y];
}
move2({x: 3, y: 8}) //[3, 8]
move2({x: 3}) //[3, undefined]
move2({}) //[undefined, undefined]
move2() //[0,0]

//[1, undefined, 3].map((x = 'yes') => x); // [1,'yes',3]


//---------------------------------------------------destructuring with default value
var [foodefault = true] = [];
var [xdefault,ydefault='b'] = ['a'];
var [x1default,y1default='b'] = ['a',undefined];  //a b
var [x2default = 1] = [null];   //null
var [x3default = y3default, y3default = 1] = []; // undefined   1
var {xxyy = 3} = {};
var {barzzzz} = {barccc:'baz'}; //undefined



//---------------------------------------------------notice
//声明语句中 不能带圆括号
//error
//var [(a)] = [1];
//var {x: (c)} = {};
//var {o: ({p:p}) = {o: {p:2}}};

//函数参数中不能带
/*
function f([(z)]) {
  return z;
}
*/

//不能将整个模式或嵌套模式中的一层放圆括号
//({p:a}) = {p:42};
//([a]) = [5]
//[({p:a}),{x:c}] = [{},{}]

//赋值语句的非模式部分可以使用
//[(b)] = [3];
//({p:(d)} = {});
//[(parseInt.prop) = [3]];
