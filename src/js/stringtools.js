/**
 * 获取字符串字节长度
 * @param {String}
 * @returns {Boolean}
 */
function checkLength(v) {
    let realLength = 0;
    let len = v.length;
    for (let i = 0; i < len; i++) {
        let charCode = v.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        } else {
            realLength += 2;
        }
    }
    return realLength;
}


/**
 * @description  get random string
 * @param {number} the length you want
 * @returns {string} result string
 */
function getRandomStr(length = 8) {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    str += "abcdefghijklmnopqrstuvwxyz";
    str += "1234567890-_";
    let result = '';
    for (let i = 0; i < str.length; i++) {
        let random = Math.floor(Math.random() * str.length);
        result += str.substr(random, random + 1);
    }
    return result;
}

/**
 * @description  output muiti line string
 * @param {number} the length you want
 * @returns {string} result string
 */
function outputMuitiLineString(func) {
    let arr = func.toString().split('\n');
    return arr.slice(1, arr.length - 1).join("\n");
}
console.log(outputMuitiLineString(outputMuitiLineString));


/**
 * @description  get symbols
 * @param {string} str
 * @returns {string} result string
 */
function getSymbols(str) {
    let length = str.length;
    let index = -1;
    let output = [];
    let character;
    let charCode;
    while (++index < length) {
        character = str.charAt(index);
        charCode = character.charCodeAt(0);
        //those characters occupy two bytes
        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
            output.push(character + str.charAt(++index));
        } else {
            output.push(character);
        }
    }
    return output;
}
//let s = '\uD834\uDF06'
//console.log(s);
//console.log(getSymbols(s));

/**
 * @description  string reverse
 * @returns {string} reverse string
 */
String.prototype.reverse = function () {
    return Array.prototype.reverse.apply(this.split('')).join('');
};

/**
 * @description  simulateTrim
 * @returns {string} result string
 */
String.prototype.simulateTrim1 = function () {
    return this.replace(/^\s+|\s+$/g, '');
};

/**
 * @description  simulateTrim
 * @returns {string} result string
 */
String.prototype.simulateTrim2 = function () {
    return this == null ? "" : "".trim.call(this);
};

/**
 * @param {number} num want to be searched
 * @param {string} str want to be searched
 * @description repeat str num times
 * @returns {array} result array
 */
function repeatStr(num, str) {
    return new Array(num + 1).join(str);
}

/**
 *
 * @description   convert Arabic numerals to Chinese characters
 * @param  {number} n what you want to be converted
 * @return {string} result string
 */
function digitUppercase(n) {
    let fraction = ['角', '分'];
    let digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    let head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};


/**
 * 截取指定字节的字符串
 * @param str 要截取的字符穿
 * @param len 要截取的长度，根据字节计算
 * @param suffix 截取前len个后，其余的字符的替换字符，一般用“…”
 * @returns {*}
 */
function cutString(str, len, suffix) {
    if (!str) return "";
    if (len <= 0) return "";
    if (!suffix) suffix = "";
    let templen = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            templen += 2;
        } else {
            templen++;
        }
        if (templen == len) {
            return str.substring(0, i + 1) + suffix;
            //handle unicode character
        } else if (templen > len) {
            return str.substring(0, i) + suffix;
        }
    }
    return str;
}