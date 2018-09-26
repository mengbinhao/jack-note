/*
var slice = Function.prototype.call.bind(Array.prototype.slice);
console.log(slice([1, 2, 3], 0, 1)) // [1]

function f() {
    console.log(this.v);
}

var o = { v: 123 };
var bind = Function.prototype.call.bind(Function.prototype.bind);
bind(f, o)() // 123     f.bind(o)
*/

/**
 * @param {array} arr want to be cleared
 * @description clear an array, no any item in it.
 * @returns {array} arr that have been cleared
 */
function clearArray(arr) {
    return simulateIsArray(arr) ? (arr.length = 0) : arr
}

/**
 * @param {array} arr want to be changed length
 * @param {number} newLength new length if an array
 * @description change the length of an array (add / minus)
 * @returns {array} arr that have been changed or do nothing
 */
function cutOutArray(arr, newLength) {
    if (!simulateIsArray(arr) || !isInteger(newLength) || (newLength < 0)) {
        return arr
    }
    arr.length = newLength
}

/**
 * @param {array} arrLike want to be converted
 * @description convert arrLike to real array
 * @returns {array} arr that have been converted
 */
function convertToRealArray(arrLike) {
    if (Array.from) {
        //return [...arrLike];
        return Array.from(arrLike);
    } else {
        return [].slice.call(arrLike);
    }
}

/**
 * @param {array} arr1 want to be compared
 * @param {array} arr2 want to be compared
 * @description judge if two array are equal
 * @returns {boolean} true or false
 */
function isArrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (var i = 1; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 * @param {array} arr1 want to be union
 * @param {array} arr2 want to be union
 * @description union array
 * @returns {array} arr that have been unioned
 */
function unionArray(arr1, arr2) {
    let tempArray = [];
    for (let i = 0; i < arguments.length; i++) {
        tempArray.push(...new Set(arguments[i]))
    }
    return [...new Set(tempArray)]
}

/**
 * @param {array} arr1 want to be intersect
 * @param {array} arr2 want to be intersect
 * @description intersect two array
 * @returns {array} arr that have been intersect
 */
function intersectTwoArray(arr1, arr2) {
    let set1 = new Set(a),
        set2 = new Set(b);
    return [...new Set([...set1].filter(x => set2.has(x)))];
}

/**
 * @param {array} arr1 want to be difference
 * @param {array} arr2 want to be difference
 * @description difference two array
 * @returns {array} arr that have been differenced
 */
function differenceTwoArray(arr1, arr2) {
    let set1 = new Set(a),
        set2 = new Set(b);
    return [...new Set([...set1].filter(x => !set2.has(x))), ...new Set([...set2].filter(x => !set1.has(x)))];
}

function unionArrayInclude(a, b) {
    let tempArr = a.slice();
    b.forEach(v => {
        !tempArr.includes(v) && tempArr.push(v)
    })
    return tempArr
}

function intersectArrayInclude(a, b) {
    a.filter(v => b.includes(v))
}

function differenceArrayInclude(a, b) {
    a.concat(b).filter(v => !a.includes(v) || !b.includes(v))
}

function es5style(arr) {
    return arr.filter(function (elem, index, Array) {
        return index === Array.indexOf(elem);
    })
}

//并集
//不考虑NAN
var union = a.concat(b.filter(function (v) {
    return a.indexOf(v) === -1
}))

//考虑可以这么写
var aHasNaN = a.some(function (v) {
    return isNaN(v)
})
var bHasNaN = b.some(function (v) {
    return isNaN(v)
})

var union = a.concat(b.filter(function (v) {
    return a.indexOf(v) === -1 && !isNaN(v)
})).concat(!aHasNaN & bHasNaN ? [NaN] : [])

//交集
a.filter(v => b.indexOf(v) != -1)

var aHasNaN = a.some(function (v) {
    return isNaN(v)
})
var bHasNaN = b.some(function (v) {
    return isNaN(v)
})
a.filter(function (v) {
    return b.indexOf(v) > -1
}).concat(aHasNaN & bHasNaN ? [NaN] : [])

//差集
a.concat(b).filter(v => a.indexOf(v) == -1 || b.indexOf(v) == -1)

var aHasNaN = a.some(function (v) {
    return isNaN(v)
})
var bHasNaN = b.some(function (v) {
    return isNaN(v)
})
var difference = a.filter(function (v) {
    return b.indexOf(v) === -1 && !isNaN(v)
}).concat(b.filter(function (v) {
    return a.indexOf(v) === -1 && !isNaN(v)
})).concat(aHasNaN ^ bHasNaN ? [NaN] : [])


//below is compatibility IE9 and older
function array_remove_repeat(a) { // 去重
    var r = [];
    for (var i = 0; i < a.length; i++) {
        var flag = true;
        var temp = a[i];
        for (var j = 0; j < r.length; j++) {
            if (temp === r[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            r.push(temp);
        }
    }
    return r;
}

function array_intersection(a, b) { // 交集
    var result = [];
    for (var i = 0; i < b.length; i++) {
        var temp = b[i];
        for (var j = 0; j < a.length; j++) {
            if (temp === a[j]) {
                result.push(temp);
                break;
            }
        }
    }
    return array_remove_repeat(result);
}

function array_union(a, b) { // 并集
    return array_remove_repeat(a.concat(b));
}

function array_difference(a, b) { // 差集 a - b
    //clone = a
    var clone = a.slice(0);
    for (var i = 0; i < b.length; i++) {
        var temp = b[i];
        for (var j = 0; j < clone.length; j++) {
            if (temp === clone[j]) {
                //remove clone[j]
                clone.splice(j, 1);
            }
        }
    }
    return array_remove_repeat(clone);
}


/**
 * @param {array} arr want to be changed
 * @description merge arr and remoce repetition
 *              new Set only satisfy that removing basic type element in one array
 * @returns {array} arr that have been changed
 */
function arrMergeAndRemoveRepetition(arr) {
    return Array.from(new Set([].concat.apply([], arguments)));
}

/**
 * @param {array} arr want to be searched
 * @description get max item in array
 * @returns {number} the max item in array
 */
function getMaxArrayElement(arr) {
    //retnrn Math.max(...arr);
    return Math.max.apply(Math, arr);
}

//convert empty element to undefined
//forEach will jump empty element but undefined
/**
 * @param {array} arr want to be changed
 * @description convert empty element to undefined
 *       forEach will jump empty element but undefined
 * @returns {array} arr that have been changed
 */
function convertEmptyElementInArrayToUndefined(target) {
    return Array.apply(null, target);
}

/**
 * @description get arguments type of each item
 * @returns {array} arr makes up by item type
 */
function getArgumentsType() {
    return Array.from(arguments, (arg) => typeof arg);
}

/**
 * @description simulate Array.push
 * @returns {number} new arr lenth
 */
Array.prototype.simulatePush = function () {
    let len = arguments.length,
        i;
    for (i = 0; i < len; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}

/**
 * @param {array} arr want to be pushed
 * @description push each item in one array
 * @returns {array} new arr
 */
Array.prototype.pushArray = function (arr) {
    this.push(...arr);
    return this;
}

/**
 * @description simulate Array.unshift
 *              splice also can implement
 * @returns {array} new arr
 */
Array.prototype.simulateUnshift = function () {
    var arr = [];
    for (var i = 0; i < arguments.length; i++) {
        arr.push(arguments[i]);
    }
    return arr.concat(this);
}

/**
 * @param {string} one str need to be counted
 * @description count the symbols of one string
 * @returns {number} the count
 */
function countSymbols(str) {
    return Array.from(str).length;
}

/**
 * @description find unique item in one array
 *           principle : use value of each item in array to be the key of object
 * @returns {array} arr have been filterd
 */
Array.prototype.unique = function () {
    var temp = {},
        arr = [],
        len = this.length,
        i;
    for (i = 0; i < len; i++) {
        if (!temp[this[i]]) {
            //maybe this[i] value is zero, lead to if condition is true, so use 'abc'
            temp[this[i]] = "abc";
            arr.push(this[i]);
        }
    }
    return arr;
}

/**
 * @description find unique item in one array
 *           principle : use Set and Array.from to implement
 * @returns {array} arr have been filterd
 */
Array.prototype.uniqueUseSetAndArrayFrom = function () {
    return Array.from(new Set(this));
}

/**
 * @description find unique item in one array
 *           principle : use spread operator
 * @returns {array} arr have been filterd
 */
Array.prototype.uniqueSpread = function () {
    return [...new Set(this)];
}

/**
 * @description find longest item in array
 * @returns {arrLike} longest item in array
 */
Array.prototype.findLongestElementInArray = function () {
    return this.reduce(function (prev, cur) {
        return cur.length > prev.length ? cur : prev;
    });
}

/**
 * @description simulate accumulator
 * @returns {number} the result
 */
Array.prototype.simulateSum = function () {
    return this.reduce(function (prev, cur) {
        return prev + cur;
    });
};

/**
 * @description simulate accumulator
 * @returns {number} the result
 */
const myReduce = (f, acc, arr) => {
    if (arr.length === 0) return acc;
    const [head, ...tail] = arr;
    return reduce(f, f(head, acc), tail);
};

/**
 * @description flatten array
 * @returns {number} the result
 */
function flatten(arr) {
    var arr1 = (arr + '').split(',');
    // var arr2 = arr1.map(function (x) {
    //     return Number(x);
    // });
    return arr1;
}

Array.prototype.mydistinct = () => {
    let obj = {},
        len = this.length;
    for (let i = 0; i < len; i++) {
        var item = this[i];
        if (typeof obj[item] !== 'undefined') {
            this[i] = this[len - 1];
            this.length--;
            i--;
            continue;
        }
        obj[item] = item;
    }
    obj = null;
    return this;
}
