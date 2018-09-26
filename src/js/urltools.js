/**
 * @description   url convert to object
 * @param  {string} url
 * @return {json}
 */
function parseQueryString(url) {
    var url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {};
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * @description   url convert to object
 * @param  {string} url
 * @return {object}
 */
function queryURLParamater(url) {
    var obj = {};
    if (url.lastIndexOf('?') == -1) {
        return obj;
    }

    var arr = url.split('?')[1].split('&');
    for (let i = 0; i < arr.length; i++) {
        var temp = arr[i].split('=')
        obj[temp[0]] = temp[1]
    }
    return obj;
}

/**
 * @description   url convert to object
 * @param  {string} url
 * @return {object}
 */
function queryURLParamaterByRegex(url) {
    let obj = {}
    let reg = /([^?=&]+)=([^?=&]+)/g;
    url.replace(reg, (...arg) => {
        obj[arg[1]] = arg[2];
    })
    return obj;
}

/**
 *
 * @description  serialize object
 * @param  {object} obj
 * @return {string}
 */
function stringfyQueryString(obj) {
    if (!obj) return '';
    var pairs = [];

    for (var key in obj) {
        var value = obj[key];
        if (value instanceof Array) {
            for (var i = 0; i < value.length; ++i) {
                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
            }
            continue;
        }
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return pairs.join('&');
}

/**
 * @param {string} the url which want to be added
 * @param {string} the parameter name
 * @param {string} the parameter value
 * @description add param to the end of url
 * @returns url with new param
 */
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}