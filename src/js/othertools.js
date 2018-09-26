/**
 * @description  RGB convert to HEX
 *               (1 << 24) means ensure the result is six figuressix digits
 * @param  {number} r
 * @param  {number} g
 * @param  {number} b
 * @returns {string} HEX color
 */
function rgb2hex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .substr(1);
}

/**
 * @description  generate HEX Color
 * @returns {string} HEX color
 */
function generateHEXColor() {
    return '#' + (Math.random() * 0x1000000 << 0).toString(16).slice(-6);
}


/**
 * @description  get random Color
 * @returns {string} HEX color
 */
function getRandomColor() {
    const rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}


/**
 * 自定义封装jsonp方法
 * @param options
 */
let jsonp = function (options) {
    options = options || {};
    if (!options.url || !options.callback) {
        throw new Error("参数不合法");
    }
    //创建 script 标签并加入到页面中
    let callbackName = ('jsonp_' + Math.random()).replace(".", "");
    let oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;
    let params = formatParams(options.data);
    let oS = document.createElement('script');
    oHead.appendChild(oS);
    //创建jsonp回调函数
    window[callbackName] = function (json) {
        oHead.removeChild(oS);
        clearTimeout(oS.timer);
        window[callbackName] = null;
        options.success && options.success(json);
    };
    //发送请求
    oS.src = options.url + '?' + params;
    //超时处理
    if (options.time) {
        oS.timer = setTimeout(function () {
            window[callbackName] = null;
            oHead.removeChild(oS);
            options.fail && options.fail({
                 message: "超时"
            });
        },
        time);
    }
}


/**
 * 格式化参数
 * @param data
 * @returns {string}
 */
formatParams = function (data) {
    let arr = [];
    for (let name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
}