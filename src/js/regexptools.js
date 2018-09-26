/**
 * @description   check if str is a correct url
 * @param  {string} str
 * @returns {boolean} true or false
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

/**
 * @description check if str is a correct email
 * @param  {string}  str
 * @returns {boolean} true or false
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 * @description  check if str is a correct ID number
 * @param  {number} str
 * @returns {boolean} true or false
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

/**
 * @description   check if str is a correct phone number
 * @param  {number} str
 * @returns {boolean} true or false
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

/**
 * @description   转换千分位分隔符
 * @param  {number} total
 * @returns result
 */
function getTotal(total) {
    return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
}

/**
 * @description   转义特殊字符
 * @param  {string} str
 * @returns result
 */
function htmlspecialchars(str) {
    return str.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, '&quot;');
}

/**
 * @description   统计字符
 * @param  {string} data
 * @returns count
 */
function wordCount(data) {
    let pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
    let m = data.match(pattern);
    let count = 0;
    if (m === null) return count;
    for (let i = 0; i < m.length; i++) {
        if (m[i].charCodeAt(0) >= 0x4E00) {
            count += m[i].length;
        } else {
            count += 1;
        }
    }
    return count;
}