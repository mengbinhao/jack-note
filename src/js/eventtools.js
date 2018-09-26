/**
 * @description  add event for dom element
 * @param {dom node} ele
 * @param {string} type
 * @param {function} callback
 */
const addListener = (ele, type, callback) => {
    if (typeof ele.addEventListener !== "undefined") {
        ele.addEventListener(type, callback, false);
    } else if (typeof ele.attachEvent !== "undefiend") {
        ele.attachEvent("on" + type, () => callback.call(ele));
    } else {
        ele["on" + type] = callback;
    }
}

/**
 * @description  remove event for dom element
 * @param {dom node} ele
 * @param {string} type
 * @param {function} handle
 */
function removeEvent(ele, type, handle) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, handle, false);
    }else if (detachEvent) {
        ele.detachEvent("on" + type, handle);
    }else {
        ele["on" + type] = null;
    }
}

/**
 * @description  stop bubble
 * @param {event} event
 */
function stopBubble(event) {
    //W3C
    if (event.stopPropagation) {
        event.stopPropagation();
    //IE
    }else {
        event.cancelBubble = true;
    }
}

/**
 * @description  disabled defaultEvent
 * @param {event} event
 */
function disabledDefaultEvent(event) {
    //W3C
    if (event.preventDefault) {
        event.preventDefault();
    //IE
    }else{
        event.returnValue = false;
    }
}

/**
 * @description  drag
 * @param {event} ele
 */
function drag(ele) {
    var disX,
        disY;
    addEvent(ele, "onmousedown", function(e) {
        var e = e || window.event;
        disX = e.clientX - parseInt(getStyle(ele,"left"));
        disY = e.clientY - parseInt(getStyle(ele, "top"));
        //in case mouse move too fast
        addEvent(document, "mousemove", mouseMove);
        addEvent(document, "mouseup", mouseUp);
        stopBubble(e);
        disabledDefaultEvent(e);
    });

    function mouseMove(e) {
        var e = e || window.event;
        ele.style.left = e.clientX - disX + "px";
        ele.style.top = e.clientY - disY + "px";
    }

    function mouseUp(e) {
        var e = e || window.event;
        removeEvent(document, "mousemove", mouseMove);
        removeEvent(document, "mouseup", mouseUp);
    }
}

/**
 * @description  define a event utils
 */
var EventUtil = {
    getEvent : function(event) {
        return event ? event : window.event;
    },

    getTarget : function(event) {
        return event.target || event.srcElement;
    },

    preventDefault : function(event) {
        if (event.preventDefault){
            event.preventDefault();
        }else {
            window.event.returnValue = false;
        }
    },

    stopPropagation : function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }else {
            window.event.cancelBubble = true;
        }
    },

    //mouseout    mouseover
    getRelatedTarget : function(event) {
        if (event.relatedTarget){
            return event.relatedTarget;
        }else if (event.toElement) {
            return event.toElement;
        }else if (event.fromElement) {
            return event.fromElement;
        }else {
            return null;
        }
    },

    //mousedown mouseup
    getButton : function(event) {
        if(document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        }else {
            switch(event.button) {
                case 0:
                case 1:
                case 3:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },

    //mousewheel
    getWheelDelta : function(event) {
        if (event.wheelDelta){
            return (client.engin.opera && client.engin.opera < 9.5) ?
                    -event.wheelDelta : event.wheelDelta;
        }else {
            return -event.detail * 40;
        }
    },

    //keypress
    getCharCode : function(event) {
        if (typeof event.charCode == "number"){
            return event.charCode;
        }else {
            return event.keyCode;
        }
    },

    getClipboardText : function(event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    setClipboardText : function(event) {
        if(event.clipboardData){
            return event.clipboardData.setData("text/plain", value);
        }else if (window.clipboardData) {
            window.clipboardData.setData("text", value);
        }
    },

    addHandler : function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }else {
            element["on" + type] = handler;
        }
    },

    removeHandler : function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        }else {
            element["on" + type] = null;
        }
    }
};
// EventUtil.addHandler(window, "load", function(event) {
// 	console.log("onloaded");
// });

// EventUtil.addHandler(window, "load", function() {
// 	var script = document.createElement("script");
// 	EventUtil.addHandler(script,"load",function(event) {
// 		console.log("script loaded");
// 	});
// 	script.src = "../script/null.js";
// 	document.body.appendChild(script);
// });

// EventUtil.addHandler(window, "load", function() {
// 	var link = document.createElement("link");
// 	link.type = "text/css";
// 	link.rel = "stylesheet";
// 	EventUtil.addHandler(link,"load",function(event) {
// 		console.log("css loaded");
// 	});
// 	link.href = "../css/test.css";
// 	document.getElementsByTagName("head")[0].appendChild(link);
// });

var keyCodeMap = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause',
    20: 'Caps Lock',
    27: 'Escape',
    32: 'Space',
    33: 'Page Up',
    34: 'Page Down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    42: 'Print Screen',
    45: 'Insert',
    46: 'Delete',

    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',

    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',

    91: 'Windows',
    93: 'Right Click',

    96: 'Numpad 0',
    97: 'Numpad 1',
    98: 'Numpad 2',
    99: 'Numpad 3',
    100: 'Numpad 4',
    101: 'Numpad 5',
    102: 'Numpad 6',
    103: 'Numpad 7',
    104: 'Numpad 8',
    105: 'Numpad 9',
    106: 'Numpad *',
    107: 'Numpad +',
    109: 'Numpad -',
    110: 'Numpad .',
    111: 'Numpad /',

    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',

    144: 'Num Lock',
    145: 'Scroll Lock',
    182: 'My Computer',
    183: 'My Calculator',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
};

/**
 * @desc get keyboard name according to keycode
 * @param  {number} keycode
 * @return {string} key name
 */
function getKeyName(keycode) {
    if (keyCodeMap[keycode]) {
        return keyCodeMap[keycode];
    } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
    }
};
