/**
 * @param {string} the location of AJAX request
 * @param {function} callback
 * @description load script sync
 */
function asyncLoadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    //have to bind event first, then assign script.url, in case readyState complete immediately
    //IE
    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                callback();
            }
        }
    //not IE
    }else {
        script.onload = function() {
            callback();
        }
    }
    script.src = url; //after this statement, begin loading
    document.head.appendChild(script); //begin execute async js
}

//asyncLoadScript("xxxx,js", test);   error,  test is not defined
//method2: pass a string, execute eval in asyncLoadScript
//method3: pass a string, obj[string](), string is a obj's method attribute

// asyncLoadScript("xxxx.js", function() {
//     test();
// });

/**
 * @param {string} get or post
 * @param {string} the location of AJAX request
 * @description create CROS request
 * @returns XMLHttpRequest or XDomainRequest or null
 */
function createCROSRequest(method,url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method,url,true);
	}else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method,url);
	}else {
		xhr = null;
	}
	return xhr;
}

/**
 * @description create XMLHttpRequest
 * @returns XMLHttpRequest or ActiveXObject
 * @throws error when can not create XMLHttpRequest
 */
function createXHR() {
	if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	//IE < 7.0
	}else if (typeof ActiveXObject != "undefined"){
        var activeStr = arguments.callee.activeXString;
		if (typeof activeStr != "string") {
            var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                len = versions.length,
			    i;
			for (i = 0, len; i < len; i++) {
				try {
					new ActiveXObject(versions[i]);
					activeStr = versions[i];
				}catch(ex) {
					//ignore
				}
			}
		}
		return new ActiveXObject(activeStr);
	}else {
		throw new Error("No available XHR obj");
	}
}
var xhr = createXHR();
//have to define before open() for compatibility
//onload只能监听到xhr.readyState==4
//onreadystatechange监听到2,3,4
xhr.onreadystatechange = function() {
	//0 not init, 1 launch,2 send,3 accept,4 done
    if (xhr.readyState == 4) {
        console.log(xhr.getAllResponseHeaders());
    	console.log(xhr.getResponseHeader("resMyHeader"));
    	//responseText
        //responseXML  (text/xml or application/xml)
        //status   http status
        //statusText
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            console.log(xhr.responseText);
        }else {
            console.log("fail:" + xhr.status);
        }
    }
}

xhr.timeout = 1000;
xhr.ontimeout = function() {
	console.log("ontimeout");
};
/*xhr.onload = function() {
	if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
		console.log(xhr.responseText);
	}else {
		console.log("fail: " + xhr.status);
	}
};*/
xhr.onerror = function() {
	console.log("onerror");
};
xhr.onprogress = function(event) {
	var progress = document.getElementById("progress");
	if (event.lengthComputable) {
		progress.innerHTML = "Receive " + event.loaded + " of " + event.total + " bytes";
	}
};

//first param: get / post
//second param: url (path is relative to current page, can use absolute path, only send request to same domain, same port, same protocol)
//third param: defualt is true, means sync
xhr.open("get", "example.txt", true);

//have to between open() and send()
//do not override default browser header
xhr.setRequestHeader("MyHeader", "MyValue");
//form submit format
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//var form = document.getElementByIs("xxx");
//xhr.send(new FormData(form));
//xhr.overrideMimeType("text/xml");
//if no send data, null required
xhr.send(null);
