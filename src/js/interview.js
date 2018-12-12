//Array------------------------
// 空数组遍历不到
// undefined可以遍历
let arrayEmpty = [, , ,];
let arrayUndefined = [undefined,undefined,undefined];
// 不产生任何输出
arrayEmpty.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出
for (let i in arrayEmpty) {
  console.log(i);
}
Object.keys(arrayEmpty);


// 1 不能区分'4'和4
// 2 对象一律得到的是[object Object]
let arrayMergeAndRemoveRepetition =  () => {
    //ES6
    let arr = [].concat.apply([], arguments);
    //Array.from(new Set(arr))
    return [...new Set(arr)];

    //ES5
    // let len = arguments.length,
    //     arr = [];
    // concat
    // for (let index = 0; index < len; index++) {
    //     arr = arr.concat(arguments[index]);
    // }
    // remove repetition
    // let result = [],
    //     obj = {};
    // for (let index = 0; index < arr.length; index++) {
    //     if (!obj[arr[index]]) {
    //         obj[arr[index]] = true;
    //         result.push(arr[index]);
    //     }
    // }
    // return result;
}


let arr1 = "john".split('');
let arr2 = arr1.reverse();
let arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));


let randonReplacementArray =  (array) => {
    let len = array.length;
    let temp = [];
    while (len--) {
        let ran = Math.floor(Math.random() * len);
        temp.push((array.splice(ran, 1))[0]);
    }
    return temp;
}
randonReplacementArray([1, 5, 9, 6, 2, 6]);


//Function------------------------
let splat = (fn) => {
    return function (array) {
        return fn.apply(null, array);
    };
}
let addArrayElements = splat(function (x, y) {
    return x + y;
});
addArrayElements([1,2]);


//safe constrctor
function Person(name, age, job) {
    //ES6
    //new.target === Person
    if (this instanceof Person) {
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name, age, job);
    }
}


// 1 指定this
// 2 返回函数
// 3 可以传入参数
// 4 柯里化
Function.prototype.simulateBind = function (context) {
    if (typeof this !== 'function') throw new Error('Function.prototype.bind')
    let fn = this;
    let args = [].slice.call(arguments, 1);
    return function () {
        return fn.apply(context, args.concat([].slice.call(arguments, 0)));
    }
}

Function.prototype.simulateBindAdvance = function (context) {
    if (typeof this !== 'function') throw new Error('need function invoke')
    let fn = this
    let args = [].slice.call(arguments, 1)

    let F = function () {}

    //judge this
    //if invoke by new, this is bar
    //if function invoke, this is context
    let fBound = function () {
        let bindArgs = [].slice.call(arguments)
        return fn.apply(this instanceof fBound ? this : context, args.concat(bindArgs))
    }
    //fBound.prototype = Object.create(this.prototype);
    F.prototype = this.prototype
    fBound.prototype = new F()
    return fBound
}


function simulateNew(constructor, params) {
    let obj = Object.create(constructor.prototype);
    let result = constructor.call(obj, params);
    //in case constructor return a simple type
    return (typeof result === 'object' && result != null) ? result : obj;
}

let curry = function (fn) {
    let args = [].slice.call(arguments, 1);
    let that = this;
    return function () {
        return fn.apply(that, args.concat([].slice.call(arguments)));
    }
}

let curryFormalParameter = function (fn, args) {
    let length = fn.length,
        _args = args || [];
    that = this;
    return function () {
        let innerArgs = _args.concat([].slice.call(arguments));
        if (innerArgs.length < length) {
            return curryFormalParameter.call(that, fn, innerArgs)
        } else {
            return fn.apply(that, innerArgs);
        }
    }
}

Function.prototype.simulateCall = function (context) {
    var context = context || window;
    context.fn = this;
    let args = [].slice.call(arguments, 1);
    let result = eval("context.fn(" + args + ")");
    //delete temporary attribute
    delete context.fn;
    return result;
}

Function.prototype.simulateApply = function (context, arr) {
    var context = context || window;
    context.fn = this;
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        let args = [].slice.call(arguments, 0);
        result = eval("context.fn(" + args + ")");
    }
    delete context.fn;
    return result;
}
// let name = "jack";
// function test() {
//     console.log(this.name);
// }
//test.simulateCall({name : 123});


//RegExp------------------------
// $1第一个括号匹配的内容
const strRegTest1 = "the-first-name";
const regTest1 = /-(\w)/g;
strRegTest1.replace(regTest1, function($,$1) {
    return $1.toUpperCase();
});


const strRegTest2 = "aaaabbbbcccc";
//反向引用
const regTest2 = /(\w)\1*/g;
// console.log(strRegTest2.replace(regTest2, "$1"));


const strRegTest3 = "1000000000";
// //从后面往前查,最前面是空,正向匹配非单词边界的那么多个数字
const regTest3 = /(?=(\B)(\d{3})+$)/g;
// console.log(strRegTest3.replace(regTest3, "."));


let toCamelStyleRegexp = (str) => {
    return str.replace(/-([a-z])/ig, ($0, $1) => $1.toUpperCase());
}


//Event------------------------
let liCol = document.getElementsByTagName("li");
for (let i = 0; i < liCol.length; i++) {
    (function(j){
        liCol[i].addEventListener("click", function() {
            console.log(j)
        }, false);
    }(i));
}


let addListener = (ele, type, handle) => {
    if (ele.addEventListener) {
        ele.addEventListener(type, handle, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, () => handle.call(ele));
    } else {
        ele["on" + type] = handle;
    }
}



let bindEvent = (ele, type, selector, handler) => {
    //addEvent(ele, type, fn)
    //addEvent(ele, type, proxydom, fn)
    if (handler == null) {
        handler = selector
        selector = null
    }

    ele.addEventListener(type, function (e) {
        let target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                handler.call(target, e)
            }
        } else {
            handler.call(ele, e)
        }
    })
}
// bindEvent(document.querySelector('div'), 'click', 'li', function (e) {
//     console.log(this)
// })

// bindEvent(document.querySelector('div'), 'click', function (e) {
//     console.log(this)
// })


//distinguish click or mousedown
let firstTime = 0;
let sencondTime = 0;
let flag = false;
document.onclick = function() {
    if (flag) {
        console.log("onclick");
        flag = false;
    }
}
document.onmousedown = function() {
    firstTime = new Date().getTime();
}
document.onmouseup = function() {
    secondTime = new Date().getTime();
    if (sencondTime - firstTime < 300) {
        flag = true;
    }
}


//DOM------------------------
let div = document.createElement("div");
let p = document.createElement("p");
div.setAttribute("class", "xxx");
p.setAttribute("class", "yyy");
let text = document.createTextNode("Jack");
p.appendChild(text);
div.appendChild(p);
document.body.appendChild(div);


function Traverse(p_element, p_callback) {
    p_callback(p_element);
    let list = p_element.children;
    for (let i = 0; i < list.length; i++) {
        Traverse(list[i], p_callback);
    }
}


Element.prototype.insertAfter = function (targerNode, afterNode) {
    let beforeNode = afterNode.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(targerNode);
    } else {
        this.insertBefore(targerNode, beforeNode);
    }
}


//分批次添加DOM
let rescursionByCount = () => {
    let container = document.querySelector('.list');
    if (!container) return;

    const total = 10000;
    batchSize = 4; // 每批插入的节点次数，越大越卡
    batchCount = total / batchSize; // 需要批量处理多少次
    let batchDone = 0,
        i;

    function appendItems() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < batchSize; i++) {
            const li = document.createElement('li');
            li.innerText = (batchDone * batchSize) + i + 1;
            fragment.appendChild(li);
        }

        container.appendChild(fragment);

        batchDone += 1;
        doBatchAppend();
    }

    function doBatchAppend() {
        if (batchDone < batchCount) {
            window.requestAnimationFrame(appendItems);
        }
    }

    // kickoff
    doBatchAppend();

    //采用事件委托
    //addEventlisener处理函数中this指的是实际的dom
    //也可以通过外层let定义循环变量
    //addEventListener与onclick
    //   1 允许注册多个事件
    //   2 可以控制事件捕获还是冒泡
    //   3 对任何DOM元素都有效
    container.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'li') {
            console.log(target.innerText);
        }
    });
};


//arithmetic------------------------
let sortStrByCount = (str) => {
    if (!(typeof str === "string")) return str;
    return str.split("").sort().join("").match(/(.)\1*/g)
        .sort((a, b) => {
            return a.length - b.length;
        }).join("");
}
sortStrByCount("dddbbbiiiiiicccca");


//素数
let isPrimeNumber = (num) => {
    if (num <= 1 || num % 1 !== 0) {
        return false;
    }
    let n = 2;
    while (n < num) {
        if (num % n++ === 0) {
            return false;
        }
    }
    return true;
}
//console.log(isPrimeNumber(997));


let isOdd = (num) => Math.abs(num % 2) === 1;


let getByteLength = (str) => {
    let len = str.length,
        count = len,
        i;
    for (i = 0; i < len; i++) {
        // in case has chinese
        if (str.charCodeAt(i) > 255) {
            count++;
        }
    }
    return count;
}


//2的n次幂
let caculatePower = (n) => {
    let result = 1;
    while (n > 0) {
        result *= 2;
        n--;
    }
    return result;
}


//n的阶乘
let caculatefactorial = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * caculatefactorial(n - 1);
}


let caculateFibonacci = (n) => {
    if (!(typeof n === "number") || n % 1 !== 0) return;
    if (n === 0 || n === 1) {
        return 1;
    }
    return caculateFibonacci(n - 1) + caculateFibonacci(n - 2);
}


function memorize(fn) {
    let cache = {};
    return function () {
        key = arguments.length + [].join.call(arguments);
        if (cache[key]) {
            return cache[key];
        } else {
            cache[key] = fn.apply(this, arguments);
            return cache[key];
        }
    }
}
let newFactorial = memorize(caculatefactorial);
// console.time("first");
// console.log(newFactorial(10));
// console.timeEnd("first");
// console.time("second");
// console.log(newFactorial(10));
// console.timeEnd("second");
// console.time("third");
// console.log(newFactorial(10));
// console.timeEnd("third");


//handle \W character and and case sensitive
let isPalindrome = (str) => {
    if (!(typeof str === "string")) return false;
    let temp = str.replace(/\W/g, "").toLowerCase();
    return temp == temp.split("").reverse().join("");
}
// console.log(isPalindrome("level"))
// console.log(isPalindrome("levels"));
// console.log(isPalindrome("A car, a man, a maraca"));


//arguments
function sum(x, y) {
    if (y !== undefined) {
        return x + y;
    } else {
        return function (y) {
            return x + y;
        }
    }
}
// console.log(sum(2)(3));
// console.log(sum(2, 3));



//Object------------------------
let JackGlobal = {
    namespace: function (ns) {
        let parts = ns.split("."),
            object = this,
            len = parts.length,
            i;
        for (i = 0; i < len; i++) {
            if (!object[parts[i]]) {
                object[parts[i]] = {};
            }
            object = object[parts[i]];
        }
        return object;
    }
};
//JackGlobal.namespace("caofei.wife");


let utils = (function ($) {
    function m1() {};

    function m2() {};

    function m3() {
        this.m1();
        this.m2()
    };

    return {
        m1: m1,
        m2: m2,
        m3: m3
    };
})(JQuery='$' || {});


let MYAPP = {};
MYAPP.dom = {};
MYAPP.dom.Text = function (url) {
    this.url = url;
    this.insert = function (where) {
        let txt = document.createTextNode(this.url);
        where.appendChild(txt);
        MYAPP.dom.LineBreak();
    };
};

MYAPP.dom.Link = function (url) {
    this.url = url;
    this.insert = function (where) {
        let link = document.createElement('a');
        link.href = this.url;
        link.appendChild(document.createTextNode(this.url));
        where.appendChild(link);
        MYAPP.dom.LineBreak();
    };
};

MYAPP.dom.LineBreak = function () {
    let br = document.createElement('br');
    document.body.appendChild(br);
};

MYAPP.dom.factory = function (type, url) {
    return new MYAPP.dom[type](url);
};
// let url = 'http://www.jack.com';
// let o = new MYAPP.dom.Text(url);
// o.insert(document.body);
// let o = new MYAPP.dom.Link(url);
// o.insert(document.body);
// let o = new MYAPP.dom.factory('Link',url);
// o.insert(document.body);


//CSS------------------------
//body默认margin=8px;
//上下左右居中
// div {
//     //position:fixed 相对于可视区
//     position:absolute; //相对于文档
//     top:50%;
//     left:50%;
//     height:100px;
//     width:100px;
//     margin-left:-50px;
//     margin-top:-50px;
//     background-color:red;
// }


//real question------------------------
function Foo() {
    //global variable
    getName = function () {
        console.log("1")
    };
    return this;
}
Foo.getName = function () {
    console.log("2")
}
Foo.prototype.getName = function () {
    console.log("3")
}
var getName = function () {
    console.log("4")
}
//hoist
function getName() {
    console.log("5")
}
//console.log(Foo.getName()); //2
//console.log(getName()); //4
//console.log(Foo().getName()); //1
//console.log(getName()); //1
// . > new > ()  ==> (new (Foo.getName))()
//function() {console.log("2") use as constructor
//console.log(new Foo.getName());
//console.log(new Foo().getName());  //(new Foo()).getName()
//console.log(new new Foo().getName()); //new ((new Foo()).getName)()


//promise 简单说就是一个容器,里面保存着某个未来才会结束的事件的结果
//promise也是一个对象 从它可以获取异步操作的信息
//promise提供统一的API 各种操作都可以用同样的方法处理
//开发者不需要再关注其底层的时序和结果
//promise状态具有不可逆和不受外界影响


let queryURLParamaterByRegex = (url) => {
    let obj = {}
    let reg = /([^?=&]+)=([^?=&]+)/g;
    url.replace(reg, (...arg) => {
        obj[arg[1]] = arg[2];
    })
    return obj;
}


let addURLParam = (url, name, value) => {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}


function getBuitlInType(obj) {
    let str = Object.prototype.toString.call(obj);
    return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}


//key is length
let arrLike = {
    "2" : "a",
    "3" : "b",
    length : 2,
    push : Array.prototype.push
}
arrLike.push("c");
arrLike.push("d");
arrLike

let sendAjax = () => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.state === 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.open('GET', '/api', false)
    xhr.send(null)
}


//async implement-----------------------------------------------------
//promise
let getNewsPromise = (url) => {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // if(xhr.readyState === 4 && xhr.status === 200) not correct
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    let news = xhr.response;
                    resolve(news);
                }else{
                    reject('请求失败了。。。');
                }
            }
        };
        xhr.responseType = 'json';
        xhr.open("GET", url);
        xhr.send();
    })
    return promise;
}

getNewsPromise('http://localhost:3000/news?id=2')
    .then((news) => {
        return getNewsPromise('http://localhost:3000' + news.commentsUrl);
    }, (error) => {
        console.log(error);
    })
    .then((comments) => {
        console.log(comments);
    }, (error) => {
        console.log(error);
    })


//generator
function* sendXmlGenerator() {
  // url为next传参进来的数据
  let url = yield getNewsGenerator('http://localhost:3000/news?newsId=2');
  yield getNews(url);
}
function getNewsGenerator(url) {
//   $.get(url, function (data) {
//     console.log(data);
//     let commentsUrl = data.commentsUrl;
//     let url = 'http://localhost:3000' + commentsUrl;
//     sx.next(url);
//   })
}

let sx = sendXmlGenerator();
// 发送请求获取新闻内容
sx.next();


//async
async function sendXmlAsync(url) {
  return new Promise((resolve, reject) => {
    // $.ajax({
    //   url,
    //   type: 'GET',
    //   success: data =>  resolve(data),
    //   //if request fail
    //   //error: error => resolve(false)
    //   error: error => reject(error)
    // })
  })
}

async function getNewsAsync(url) {
  let result = await sendXmlAsync(url);
  if (!result) {
      console.log('xxxx')
      return
  }
  let result2 = await sendXmlAsync(url);
  console.log(result, result2);
}
getNewsAsync('http://localhost:3000/news?id=2')