/**
 * @description get cookie from local
 * @param {string} name Cookie name
 * @returns {string} cookie value if found
 */
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, "").split(';');
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return '';
}

/**
* @description  set Cookie
* @param {string} name
* @param {string} value
* @param {number} days
*/
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}

/**
* @description delete Cookie by name
* @param  {string} cookie name
*/
function removeCookie(name) {
    setCookie(name, '1', -1);
}
