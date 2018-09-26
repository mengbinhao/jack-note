/**
 * @description change number to Integer
 * @param {number} num
 * @returns {number} result
 */
function toInteger(num) {
    var val = Number(num);
    return val > 0 ? val.floor(val) : val.ceil(val);
}


/**
 * @description get random number
 *              do not include max
 * @param {number} min
 * @param {number} max
 * @returns {number} random number
 */
function getRandomNumber(min, max, isContainsMax) {
    return Math.floor(Math.random() * (max - min + (isContainsMax ? 1 : 0)) + min);
}
//console.log(getRandomNumber(1, 10, true))


/**
 * @description get fixed digits random number
 *              slice(nagitive means sorceString.length + nagitive)
 * @param {number} n how many digits
 * @returns {number} result number
 */
function getFixedDigitsRandomNumber(n) {
    if (!n || typeof n !== "number" || n < 0 || n > (Number.MAX_SAFE_INTEGER + "").length) return;
    //return Math.random().toFixed(6).slice(-6);
    //return '' + Math.floor(Math.random() * 999999);
    return Math.random().toString().slice(-n);
}