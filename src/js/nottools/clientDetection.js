// 1 能力检测
// 2 怪癖
// 3 客户端检测
if(document.getElementById){
	console.log("support getElementById");
}

//just detect if sort exists
function isSortable(object) {
	return typeof object.sort == "funcition";
}

let hasDOM1 = !!(document.getElementById && document.createElement && document.getElementByTagName);

let client = function(){
	let engine = {
			ie:0,
			gecko:0,
	        webkit:0,
	        wekhtml:0,
	        opera:0,
	        ver : null
	};

	let browser = {
			ie:0,
			firefox:0,
	        safari:0,
	        konq:0,
	        opera:0,

	        ver : null
	};

	let system = {
			win:false,
			mac:false,
			xll:false,

	        iphone:false,
	        ipad:false,
	        ipod:false,
	        ios:false,
	        android:false,
	        nokiaN:false,
	        winMobile:false,

	        will:false,
	        ps:false
	};

	let us = navigator.userAgent;
	if(window.opera) {
		engine.ver = browser.ver = window.opera.version();
		engine.opera = browser.opera = parseFloat(engine.ver);
	}else if(/AppleWebKit\/(\S+)/.test(ua)){
		engine.ver = RegExp["$1"];
		engine.webkit = parseFloat(engine.ver);

		if (/Chrome\/(\S+)/.test(us)){
			browser.ver = RegExp["$1"];
			browser.chrome = parseFloat(engine.ver);
	    }else if (/Version\/(\S+)/.test(us)) {
	    	browser.ver = RegExp["$1"];
	    	browser.safari = parseFloat(engine.ver);
	    }else {
	    	let safariVersion = 1;
	    	if (engine.webkit < 100) {
	    		safariVersion = 1;
	    	}else if (engine.webkit < 312) {
	    		safariVersion = 1.2;
	    	}else if (engine.webkit < 412) {
	    		safariVersion = 1.3;
	    	}else {
	    		safariVersion = 2;
	    	}
	    	browser.safari = browser.ver = safariVersion;
	    }
	}else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
		engine.ver = browser.ver = RegExp["$1"];
		engine.khtml = browser.konq = parseFloat(engine.ver);
	}else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
		engine.ver = RegExp["$1"];
		engine.gecko = parseFloat(engine.ver);

		if (/Firefox\/(\S+)/.test(ua)){
			browser.ver = RegExp["$1"];
	    	browser.firefox = parseFloat(engine.ver);
		}
	}else if (/MSIE ([^;]+)/.test(ua)){
		engine.ver = browser.ver = RegExp["$1"];
		engine.ie = browser.ie = parseFloat(engine.ver);
	}

	browser.ie = engine.ie;
	browser.opera = engine.opera;

	let p = navigator.platForm;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.xll = (p == "Xll") || (p.indexOf("Linux") == 0);

	if (system.win) {
		if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
			if(RegExp["$1"] == "NT") {
				switch(RegExp["$2"]){
					case 5.0:
						system.win = "2000";
						break;
					case 5.1:
						system.win = "XP";
						break;
					case 6.0:
						system.win = "Vista";
						break;
					case 6.1:
						system.win = "7";
						break;
					default:
						system.win = "NT";
						break;
				}
			}else if(RegExp["$1"] == "9x") {
				system.win = "ME";
			}else {
				system.win = RegExp["$1"];
			}
		}
	}

	system.iphone = ua.indexOf("iphone") > -1;
	system.ipod = ua.indexOf("iPod") > -1;
	system.ipad = ua.indexOf("iPad") > -1;
	system.nokiaN = ua.indexOf("NokiaN") > -1;

	if (system.win == "CE") {
		system.winMobile = system.win;
	} else if(system.win == "Ph") {
		if(/Windows Phone OS (\d+.\d+)/.test(ua)){
			system.win = "Phone";
			system.winMobile = parseFloat(RegExp["$1"]);
		}
	}

	if(system.mac && ua.indexOf("Mobile") > -1) {
		if(/CPU (?:iPhone )？OS (\d+_\d+)/.test(us)){
			system.ios = parseFloat(RegExp.$1.replace("_", "."));
		}else {
			system.ios = 2;
		}
	}

	if(/Android (\d+\.\d+)/.test(us)){
		system.android = parseFloat(RegExp.$1);
	}

	system.wii = ua.indexOf("Wii") > -1;
	system.ps = /playstation/i.test(ua);

	return {
		engine: engine,
		browser: browser,
		system: system
	};
}();

//用户代理检测
console.log(navigator.userAgent);
console.log(client.engine.webkit);






































