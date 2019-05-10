//Array------------------------
//会改变自身的方法：copyWithin、fill、pop、push、reverse、shift、sort、splice、unshift
//不会改变自身的方法：concat、includes、join、slice、toString、indexOf、lastIndexOf
//遍历方法：forEach、map、every、some、filter、find、findIndex、reduce、reduceRight、keys、entries、values

//创建过去七天的数组，如果将代码中的减号换成加号，你将得到未来7天的数组集合
//[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days))

//本地时间
//<body onload="setInterval(()=>document.body.innerHTML=new Date().toLocaleString().slice(10,19))"></body>

//创建特定大小的数组
//[...Array(3).keys()]

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


    let test = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i+1; j < arr.length; j++) {
                if (arr[i] === arr[j]) {
                    arr.splice(j, 1)
                    //in case like [2,2]
                    j--
                }
            }
        }
        return arr
    }
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
async function test() {
    console.log("Hello")
    await sleep(1000)
    console.log("World")
}
//test()


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
let isType = type => obj => {
  return Object.prototype.toString.call( obj ) === '[object ' + type + ']';
};
//isType('String')('123')
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


/*
    undefined 代表定义但未赋值
    null 定义且赋值了,只是值为null

    初始赋值表明是一个对象 赋值为null
    结束前设置变量为null便于垃圾回收
*/


//打开数组
let arrTest = [1,[2,[3]],4,[5]];
JSON.parse(`[${arrTest.toString()}]`)
JSON.parse(`[${arrTest.join()}]`)
arrTest.join().split(',')


//clone array
arrTest.concat();
arrTest.slice(0);


//find max in an array
//1.自己实现一个冒泡算法，实现就不多说了
//2.利用Math的max方法
//Math.max.apply(null, arrTest);
//3.利用Array的sort方法先排序再取值
//list.sort((a, b) => {return a-b;})


//输出什么
// if (!(b in window)) {
//     var b = 1;
// }
// console.log(b)

//知道预解析规则
// var c = 1
// function c(c) {
//     console.log(c)
//     var c = 3
// }
// c(2)

//作用域是静态的，上下文是动态的
// var x = 10;
// function fn() {
//   console.log(x);
// }
// function show(f) {
//   var x = 20;
//   f();
// }
// show(fn);


//作用域
// let fn = () => {
//     console.log(fn);
// }
// fn()
// let obj = {
//     fn2() {
//         console.log(fn2);
//     }
// }
// obj.fn2()



//写出一些前端性能优化的方式
// 1.减少dom操作
// 2.部署前，图片压缩，代码压缩
// 3.优化js代码结构，减少冗余代码
// 4.减少http请求，合理设置http缓存
// 5.使用内容分发cdn加速
// 6.静态资源缓存
// 7.图片延迟加载


//cookie、sessionStorage和localStorage的区别
// 1 存储时效来说：
// cookie可以手动设置失效期，默认为会话级
// sessionStorage的存储时长是会话级
// localStorage的存储时长是永久，除非用户手动利用浏览器的工具删除
// 2 访问的局限性：
// cookie可以设置路径path，所有他要比另外两个多了一层访问限制
// localStorage和sessionStorage的访问限制是文档源级别，即协议、主机名和端口
// 还要注意的是，cookie可以通过设置domain属性值，可以不同二级域名下共享cookie，而Storage不可以
// 比如http://image.baidu.com的cookie http://map.baidu.com是可以访问的，前提是Cookie的domain设置为".http://baidu.com"，而Storage是不可以的（这个很容易实验，就不细说了）
// 3 存储大小限制：
// cookie适合存储少量数据，他的大小限制是个数进行限制，每个浏览器的限制数量不同
// Storage的可以存储数据的量较大，此外他是通过占用空间大小来做限制的，每个浏览器的实现也是不同的
// 4 操作方法：
// cookie是作为document的属性存在，并没有提供标准的方法来直接操作cookie
// Storage提供了setItem()和getItem()还有removeItem()方法，操作方便不易出错
// 5 其他：
// cookie在发送http请求时，会将本地的cookie作为http头部信息传递给服务器
// cookie可以由服务器通过http来设定


//get vs post
// 因为GET方法请求的参数都是放在请求的url上的，所以它与POST有以下明显的区别：
// GET请求可以被添加到书签中，也可保存在浏览器历史记录中，POST不能
// GET请求可以被浏览器缓存，POST不能
// GET请求收到URL长度限制，所以数据长度也受限制，POST不会
// GET请求只能传输ASCII字符，而POST不受此限制，还可以传输二进制数据
// 在语义上两个方法也有区别：
// GET 代表获取指定服务器上资源
// POST 代表向指定的资源提交要被处理的数据


//http状态码
// 1xx ：1开头的状态码表示临时的响应
// 2xx ：请求成功
// 3xx ：请求被重定向
// 4xx ：请求错误，表明客户端发送的请求有问题
// 5xx ：服务器错误，表明服务端在处理请求时发生了错误

// 301 ： Moved Permanently 客户端请求的文档在其他地方，新的URL在location头中给出
// 304 ： Not Modified 客户端有缓存的文档并发出了一个条件性的请求（一般是提供If-Modified-Since头表示客户端只想到指定日期后再更新文档）。服务器告诉客户，原来缓存的文档还可以继续使用。
// 400 ： Bad Request 请求出现语法错误
// 401 ： Unauthorized 访问被拒绝，客户端试图胃镜授权访问受密码保护的页面
// 403 ： Forbidden 资源不可用。服务器理解客户的请求，但拒绝处理它。通常由于服务器文件或目录的权限设置导致。
// 404 ： Not Found 无法找到指定位置的资源。
// 405 ： Method Not Allowed 请求方法（GET、POST、PUT等）对指定的资源不适用，用来访问本资源的HTTP方法不被允许。
// 500 ： Internal Server Error 服务器遇到了意料之外的情况，不能完成客户端的请求。
// 502 ： Bad Gateway 服务器作为网管或者代理时收到了无效的响应。
// 503 ： Service Unavailable 服务不可用，服务器由于维护或者负载过中未能应答。
// 504 ： Gateway Timeout 网关超时， 作为代理或网关的服务器不能及时的应答。


//iframe有那些缺点
// 1 iframe会阻塞主页面的Onload事件；
// 2 搜索引擎的检索程序无法解读这种页面，不利于SEO;
// 3 iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
// 4 使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题

//Etag和Last-Modified???
//Etag和Last-Modified???
//Etag和Last-Modified???



//回流(Layout) 前面我们通过构造渲染树，我们将可见DOM节点以及它对应的样式结合起来，可是我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流。
//为了弄清每个对象在网站上的确切大小和位置，浏览器从渲染树的根节点开始遍历,而在回流这个阶段，我们就需要根据视口具体的宽度，将其转为实际的像素值


//重绘(Painting) 通过回流(Layout)阶段，我们知道了所有的可见节点的样式和具体的几何信息(位置、大小)，
//那么我们就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘节点。


//何时发生回流重绘 回流阶段是计算节点的几何信息和位置，那么当页面布局或者几何信息发生改变时，就需要回流。
//添加或者删除可见的DOM元素
//元素的位置、尺寸发生变化
//页面开始渲染的时候(这肯定避免不了)
//浏览器的视口尺寸大小发生改变(因为回流是根据浏览器视口的大小来计算元素的位置和尺寸大小)
//注意：回流一定会触发重绘，而重绘(非几何信息的样式发生改变)不一定会回流, reflow回流的成本开销要高于repaint重绘，一个节点的回流往往回导致子节点以及同级节点的回流；


//CSS 与 JS 是这样阻塞 DOM 解析和渲染的
//通过<script>与<link>引入外部资源，当解析到该标签的时候，会进行下载
//CSS脚本的加载不会阻塞 DOM 解析过程，但是会阻塞渲染过程(painting)
//JS脚本的加载会阻塞 DOM 解析过程
//JS脚本的加载中，如果你确定没必要阻塞 DOM 解析的话，不妨按需要加上 defer 或者 async 属性，此时脚本下载的过程中是不会阻塞 DOM 解析的。
//浏览器遇到 <script>且没有 defer 或 async 属性的标签时，为了为<script>标签内部的js提供最新的信息，会触发页面的回流、重绘过程。因而如果前面 CSS 资源尚未加载完毕时，浏览器会等待它加载完毕之后再执行脚本。
//所以<script>最好放底部(防止阻塞DOM解析)。<link>最好放头部(为渲染过程提供样式)。如果头部同时有<script>与<link>的情况下，最好将<script>放在<link>上面(为了防止CSS脚本加载时间过长，使js等待时间也很长)


//三栏布局  居中  圣杯  双飞翼
//粘帖布局

// 什么是attribute？
// 	html的预定义和自定义属性
// 什么是property？
// 	js对象身上的直接属性
// 什么是布尔值属性，什么是非布尔值属性？
// 	property所对应的属性值是否布尔类型
// attribute和property的同步关系
// 	非布尔值属性
// 		实时同步
// 	布尔值属性
// 		没有动过property
// 			attribute会同步property
// 			property不会同步attribute
// 		动过property
// 			attribute不会同步property
// 			property不会同步attribute