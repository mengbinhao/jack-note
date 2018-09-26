//$(window).height()   --> 可视区
//$(document).height() --> 整个页面

/**
 * @description  find direct children under ele
 * @param {dom node} ele
 * @returns {arr} children
 */
function findElementDirectChildren(ele) {
    // obj = {length:0, push:Array.prototype.push,splice:Array.prototype.splice}
    var arr = [],
        child = ele.childNodes,
        len = child.length,
        i;
    for (i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            //obj.push((child[i]));
            arr.push((child[i]));
        }
    }
    //return obj
    return arr;
}

/**
* @description  find ancestral element accodring to n
                if ele do not have n level parent, return the farest parent that can ne found
                do not consider compatibility
* @param {dom node} ele
* @param {number} the level number
* @returns {dom node} parent ele if found
*/
function findParent(ele, n) {
    while (ele && n) {
        ele = ele.parentElement;
        n--;
    }
    return ele;
}

/**
* @description  find siblings element of ele
                if ele do not have n level siblings, return the farest sibling that can ne found
                if n > 0, find nextElementSibling
                if n < 0, find previousElementSibling
                if n = 0, return itself
* @param {dom node} ele
* @param {number} the level number
* @returns {dom node} Siblings ele if found
*/
function findSiblings(ele, n) {
    while (ele && n) {
        if (n > 0) {
            if (ele.nextElementSibling) {
                ele = ele.nextElementSibling;
            } else {
                for (ele = ele.nextSibling; ele && ele.nodeType !== 1; ele = ele.nextSibling);
            }
            n--;
        } else {
            if (ele.previousElementSibling) {
                ele = ele.nextElementSibling;
            } else {
                for (ele = ele.previousSibling; ele && ele.nodeType !== 1; ele = ele.previousSibling);
            }
            n++;
        }
    }
    return ele;
}

/**
 * @description  simulete insertAfter
 * @param {dom node} targerNode
 * @param {dom node} afterNode
 */
Element.prototype.insertAfter = function (targerNode, afterNode) {
    var beforeNode = afterNode.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(targerNode);
    } else {
        this.insertBefore(targerNode, beforeNode);
    }
}

/**
 * @description  reverse tag sequence
 * @returns itself
 */
Element.prototype.reverseChild = function () {
    var child = this.children,
        len = child.length,
        i;
    for (i = len - 2; i >= 0; i--) {
        this.appendChild(child[i]);
    }
    return this;
}

/**
 * @description  get scroll width and height
 * @returns the width and height about scroll
 */
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentELement.scrollLeft,
            y: document.body.scrollTop + document.documentELement.scrollTop
        }
    }
}

/**
 * @description  get view width and height
 * @returns the width and height about view port
 */
function getViewPortOffset() {
    if (window.innerWidth) {
        return {
            x: window.innerWidth,
            y: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                x: document.body.clientWidth,
                y: document.body.clientHeight
            }
        } else {
            return {
                x: document.documentElement.clientWidth,
                y: document.documentElement.clientHeight
            }
        }
    }
}

/**
 * @description  get window width and height
 * @returns the width and height about window position
 */
function getWindowPosition() {
    var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;
    var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
    return {
        left: leftPos,
        top: topPos
    }
}

/**
 * @description  set scroll distance to browser top
 */
function setScrollTop(value) {
    window.scrollTo(0, value);
}

/**
 * @description  get requestAnimFrame handle compatibility
 * @returns requestAnimFrame obj
 */
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 *
 * @description  scroll to location within duration
 * @param {number} the location want to be
 * @param {number} duration
 */
function scrollTo(to, duration) {
    if (duration < 0) {
        setScrollTop(to);
        return;
    }
    var diff = to - getElementPosition();
    if (diff === 0) return;
    var step = diff / duration * 10;
    requestAnimationFrame(
        function () {
            if (Math.abs(step) > Math.abs(diff)) {
                setScrollTop(getElementPosition() + diff);
                return;
            }
            setScrollTop(getElementPosition() + step);
            if (diff > 0 && getElementPosition() >= to || diff < 0 && getElementPosition() <= to) {
                return;
            }
            scrollTo(to, duration - 16);
        });
}

/**
 * @description  get the coordinate relative to document
 * @param {dom ele} ele
 * @returns position object
 */
function getElementPosition(ele) {
    var actualLeft = ele.offsetLeft,
        actualTop = ele.offsetTop,
        current = ele.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return {
        left: actualLeft,
        top: actualTop
    };
}

/**
 * @description  get property value
 * @param {dom ele} ele
 * @param {dom ele} prop
 * @returns property value
 */
function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        //the second param is ::after element
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.currentStyle[prop];
    }
}

/**
 * @description  get all nextSibling ele and all childnodes
 *               recursion invoke
 * @param {dom ele} tatget
 */
function walkDOM(tatget) {
    do {
        //console.log(tatget);
        if (tatget.hasChildNodes()) {
            walkDOM(tatget.firstChild);
        }
    } while (tatget = tatget.nextSibling)
}
//walkDOM(document.documentElement);
//walkDOM(document.body);

/**
 * @description  remove all son element
 * @param {dom ele} tatget
 */
function removeAllUndertarget(target) {
    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }
}
//removeAll(document.body);

/**
 * @description  match selector
 * @param {dom ele} ele
 * @param {string} selector
 * @returns the match element
 */
function matchesSelector(ele, selector) {
    var p = Element.prototype;
    var f = p.matches ||
        p.webkitMatchesSelector ||
        p.mozMatchesSelector ||
        p.msMatchesSelector ||
        function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
    return f.call(ele, selector);
}
/*
matchesSelector(
    document.getElementById('myDiv'),'div.someSelector[some-attribute=true]'
)
*/

/**
 * @description  html escape
 * @param {string} text
 * @returns {string} text that have been escaped
 */
function htmlEscape(text) {
    return text.replace(/[<>"&]/g, function (match, pos, originalText) {
        switch (match) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "\"":
                return "&quot;";
            case "&":
                return "&amp;";
        }
    });
}
//console.log(htmlEscape("<p class=\"add\">Hello!</p>"));

/**
 * @description  load dyn script
 * @param {string} code
 *              eg : <script type="java/sctipt" src="client.js"></script>
 */
function loadDynScript(code) {
    var script = document.createElement("script");
    script.type = "java/script";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex) {
        script.text = code;
    }
    document.body.appendChild(script);
}

/**
 * @description  load dyn css
 * @param {string} css
 *              eg : <style ref="stylesheet" type="text/css" href="style.css">
 */
function loadDynCss(css) {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
        style.appendChild(document.createTextNode(css));
    } catch (ex) {
        style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}

/**
 * @description  get element inner text
 * @param {dom node} element
 * @returns {string} inner text of that element
 */
function getInnerText(element) {
    return (typeof element.textContent == "string") ? element.textContent : element.innerText;
}

/**
 * @description  get select option
 * @param {dom node} selectbox
 * @returns {arr} the selected value
 */
function getSelectOption(selectbox) {
    var result = new Array();
    for (var i = 0; i < selectbox.options.lenth; i++) {
        if (selectbox[i].selected) {
            result.push();
        }
    }
    return result;
}

/**
 * @description  serialize form value
 * @param {dom node} form
 * @returns {string} the serialize form value
 */
function serialize(form) {
    var parts = [],
        field = null,
        i, len, j, optLen, option, optValue;
    for (i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = option.hasAttribute("value") ? option.value : option.text;
                            } else {
                                optValue = option.attribute["value"].specified ? option.value : option.text;
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}

/**
 * @description  check ele if has target class
 * @param {dom node} ele
 * @param {string} class name
 * @returns {boolean} true or false
 */
function hasClass(ele, cls) {
    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(ele.className);
}

/**
 * @description  add class for target element
 * @param {dom node} ele
 * @param {string} class name
 */
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += " " + cls;
    }
}

/**
 * @description  remove class for target element
 * @param {dom node} ele
 * @param {string} class name
 */
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
    }
}

/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}


var rem = {
    baseRem: 40,
    // 基准字号，按照iphone6应该为20，此处扩大2倍，便于计算
    baseWidth: 750,
    // 基准尺寸宽，此处是按照ihpone6的尺寸
    rootEle: document.getElementsByTagName("html")[0],
    initHandle: function () {
        this.setRemHandle();
        this.resizeHandle();
    },
    setRemHandle: function () {
        var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        this.rootEle.style.fontSize = clientWidth * this.baseRem / this.baseWidth + "px";
    },
    resizeHandle: function () {
        var that = this;
        window.addEventListener("resize",
            function () {
                setTimeout(function () {
                        that.setRemHandle();
                    },
                    300);
            });
    }
};
//rem.initHandle();

function parseUA() {
    var u = navigator.userAgent;
    var u2 = navigator.userAgent.toLowerCase();
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        //IE内核
        presto: u.indexOf('Presto') > -1,
        //opera内核
        webKit: u.indexOf('AppleWebKit') > -1,
        //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1,
        //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,
        //是否iPad
        webApp: u.indexOf('Safari') == -1,
        //是否web应该程序，没有头部与底部
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) == "micromessenger",
        ali: u.indexOf('AliApp') > -1,
    };
}
var ua = parseUA();
if (!ua.mobile) {
    location.href = './pc.html';
}
