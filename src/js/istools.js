// var und=undefined;
// var nul=null;
// var boo=true;
// var num=1;
// var str='xys'
// var obj=new Object();
// var arr=[1,2,3];
// var fun=function(){}
// var date=new Date();
// var reg = /a/g;
// var err=new Error()
// var arg;
// (function getArg(){
//     arg=arguments;
// })();

// console.log(typeof und);  // undefined
// console.log(typeof nul);  // object
// console.log(typeof boo);  // boolean
// console.log(typeof num);  // number
// console.log(typeof str);  // string
// console.log(typeof obj);  // object
// console.log(typeof arr);  // object
// console.log(typeof fun);  // function
// console.log(typeof date);  // object
// console.log(typeof reg);  // object
// console.log(typeof err);  // object
// console.log(typeof arg);  // object

// let toString=Object.prototype.toString;

// console.log(toString.call(und));  // [object Undefined]
// console.log(toString.call(nul));  // [object Null]
// console.log(toString.call(boo));  // [object Boolean]
// console.log(toString.call(num));  // [object Number]
// console.log(toString.call(str));  // [object String]
// console.log(toString.call(obj));  // [object Object]
// console.log(toString.call(arr));  // [object Array]
// console.log(toString.call(fun));  // [object Function]
// console.log(toString.call(date));  // [object Date]
// console.log(toString.call(reg));  // [object RegExp]
// console.log(toString.call(err));  // [object Error]
// console.log(toString.call(arg));  // [object Arguments]

/**
 * @desc 数据类型检测
 * @param obj 待检测的数据
 * @return {String} 类型字符串
 */
function type(obj) {
    let toString = Object.prototype.toString;
    let toType = {};
    let typeArr = ['Undefined', 'Null', 'Boolean', 'Number', 'String', 'Object', 'Array', 'Function', 'Date', 'RegExp', 'Error', 'Arguments']
    typeArr.map(function (item, index) {
        toType["[object " + item + "]"] = item.toLowerCase();
    })
    return typeof obj !== "object" ? typeof obj : toType[toString.call(obj)];
}

/**
 * @desc 是否是 Undefined 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isUndefined(obj) {
    return obj === void 0;
}

/**
 * @desc 是否是 Null 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isNull(obj) {
    return obj === null;
}

/**
 * @desc 是否是 Boolean 类型检测
 * @param obj 待检测的数据
 * @return {Boolean} 布尔值
 */
function isBoolean(obj) {
    return typeof(obj) === 'boolean';
}

/**
 * @description   check if obj is window
 * @param  {function} func
 * @return {boolean} true or false
 */
function isWindow(obj) {
    return obj != null && obj === obj.window;
}

/**
 * @description   check if func is a function or not
 * @param  {function} func
 * @return {boolean} true or false
 */
function isFunction(func) {
    //below is not cross-browser
    //return typeof func === "function" || false;
    //func.toString() maybe is overrided, so use Object.otStinr()
    return Object.prototype.toString.call(fn) == '[object Function]';
}

/**
 * @param {arrLike} arr want to be searched
 * @description simulate Array.isArray
 * @returns {boolean} true or false
 */
function simulateIsArray(target) {
    if (Array.isArray) {
        return Array.isArray(target);
    } else {
        return Object.prototype.toString.call(target) === "[object Array]";
    }
}

/**
 * @param {arrLike} the collection want to be converted
 * @description judge if collection is an arrLike
 * @returns {boolean} true or false
 */
var isArrayLike = function (arrLike) {
    function getLength(arrLike) {
        return arrLike == null ? void 0 : arrLike["length"];
    }
    var length = getLength(arrLike);
    return typeof length == 'number' && length >= 0 && length <= Math.pow(2, 53) - 1;
};

/**
 * @description check if num is NegZero
 * @param {number} num
 * @returns {boolean} true or false
 */
function isNegZero(num) {
    var num = Number(num);
    return (num === 0) && (1 / num === -Infinity);
}

/**
 * @description check if num is a number
 * @param {number} num
 * @returns {boolean} true or false
 */
function isNumeric(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

/**
 * @description check if num is a integer
 * @param {number} num
 * @returns {boolean} true or false
 */
function isInteger(num) {
    if (Number.isInteger) {
        return Number.isInteger(num);
    } else {
        //return Math.round(x) === x
        return (typeof num === "number") && num % 1 === 0;
    }
}

/**
 * @description simulate isNaN
 * @param {number} need to be compared
 * @returns {boolean} true or false
 */
function MyIsNaN(value) {
    // return typeof value === 'number' && isNaN(value);
    // return Object.is(value, NaN);
    return value !== value;
}

/**
 * @description  judge if support __proto__
 * @returns {boolean} true or false
 */
function isSupportProto() {
    return Object.getPrototypeOf({
        __proto__: null
    }) === null;
}

/**
 * @description  is JSON
 * @param  {JSON} value
 * @returns {boolean} true or false
 */
function isJSON(value) {
    return window.JSON && Object.prototype.toString.call(value) == "[object JSON]";
}

/**
 * @description  is Object
 *               Object() return original object if it is an object
 *               if it is a primitive type return it is wapper object
 * @param  {object} obj
 * @returns {boolean} true or false
 */
function isObject(obj) {
    //return Object.prototype.toString.call(obj) === '[object Object]';
    return obj === Object(obj);
}
//console.log(isObject(new Number(123)));
//console.log(isObject(123));


/**
 * @description   if obj is a empty object
 * @param  {object} obj
 * @return {boolean} true or false
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false;
    //for (var name in obj) {
    //    return false;
    //}
    //    return true;

    //Object.getOwnPropertyNames(obj).length === 0
    return !Object.keys(obj).length;
}

//json format
function isPlainObject(obj) {
    function type(obj) {
        if (obj == null) {
            return String(obj);
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[Object.prototype.toString.call(obj)] || "object" :
            typeof obj;
    }

    if (type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
        return false;
    }

    try {
        if (obj.constructor &&
            !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * @description  check if specific prop supported by browser
 * @param {string} prop
 * @returns {boolean} true or false
 */
function isPropertySupported(prop) {
    if (prop in document.body.style) return true;
    var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
    var prefProperty = prop.charAt(0).toUpperCase() + prop.substr(1);

    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + prefProperty) in document.body.style) return true;
    }
    return false;
}
//isPropertySupported('background-clip')

/**
 * @description judge if browser support webP
 * @return {boolean} true or false
 */
function isSupportWebP() {
    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}
