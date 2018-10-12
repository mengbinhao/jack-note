- 在HTML5 Web Storage还没出来之前,本地存储使用的是 cookie. 但是Web 存储需要更加的安全与快速,这些数据不会被保存在服务器上,但是这些数据只用于用户请求网站数据上.它也可以存储大量的数据，而不影响网站的性能.
- HTML5 定义了本地存储规范 Web Storage ， 提供了两种存储类型 API： `sessionStorage`和 `localStorage`
- 使用Web Storage时，最好先检测浏览器对其的支持性
```javascript
 if (window.localStorage) {
         // 浏览器支持 localStorage
   }else{
        // 不支持
    }
    if (window.sessionStorage) {
         // 浏览器支持 sessionStorage
    }else{
        // 不支持
   }
```

### localStorage
1. 生命周期
持久化的本地存储，除非主动手动删除数据，否则数据一直不会过期

2. localStorage受同源策略的限制

> 同源策略（same-origin policy）是浏览器执行的一种安全措施，目的是为了保证用户信息的安全，防止恶意的网站窃取数据.同域要求两个站点同协议,同域名,同端口.

> 针对http://www.foo.com是否同源的判断规则：

> https://www.foo.com(不同域,协议不同)

> http://xeyeteam.foo.com(不同域,xeyeteam子域与www子域不同)

> http://foo.com(不同域,域名不同,顶级域与www子域不是一个概念)

> http://www.foo.com:8080(不同域,8080和默认端口不一定相同)

> http://www.foo.com/a/(同域,满足同协议同域名同端口,只是这里多了一个目录而已)

同源情况下,localStorage能跨标签和跨页进行数据传输,而在不同源情况下就不能共享localStorage的数据,但网上也提供了很多方法实现了localStorage的跨域存储功能.如:
https://www.jianshu.com/p/e86d92aeae69

加深理解同源策略:
http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html

3. 存储方式
使用键值对的方式存储字符串，存取的数据只能是字符串

4. 储存地址
C:\Users\18011\AppData\Local\Google\Chrome\User Data\Default\LocalStorage（不同电脑不一样，需要打开隐藏文件显示，但是在C盘搜索localStorage就能搜出这个文件夹。）

5. 不建议存储敏感信息,可存储普通缓存信息
https://dev.to/rdegges/please-stop-using-local-storage-1i04?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more


6. API
```javascript
localStorage.setItem("name","chieminchan");
localStorage.age = "18";

var data = localStorage.getItem("name");

localStorage.removeItem("name");
console.log(localStorage.getItem("name"));//null

localStorage.clear();
console.log(localStorage.getItem("name")); //null

```

### sessionStorage

1. 生命周期：
用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。
也就是说只要这个浏览器窗口（当下浏览器的当前标签页）没有关闭，即使在同一标签页刷新页面或进入同源另一页面,数据仍然存在.关闭页面后,sessionStorage即被销毁,即在新窗口新页面打开同源的另一个页面,sessionStorage也是没有的.

2. sessionStorage除了协议,主机名,端口外,还要求在同一窗口（也就是浏览器的标签页）下才能共享数据.
3. sessionStorage能在单个标签页中进行同源页面跨页面访问,用sessionStorage实现页面之间的数据传输,不用向服务器发送请求,不会泄露在用户使用的浏览器中,一定程度上保证了数据的安全性.
4. API
```javascript
    if (sessionStorage.sessionCount) {
	sessionStorage.sessionCount = Number(sessionStorage.sessionCount)+1;
    }else{
	sessionStorage.sessionCount = 1;
    }
    console.log("sessionStorage.sessionCount："+sessionStorage.sessionCount);
	
    //localStorage
    if (localStorage.localCount) {
        localStorage.localCount = Number(localStorage.localCount)+1;
    }else{
        localStorage.localCount = 1;
    }
    console.log("localStorage.localCount："+localStorage.localCount);
```

### Web	Storage事件监测
1. 在HTML5中，可以通过window对象的storage事件进行监听.
**当存储的storage数据发生变化时都会触发它,也就是说当前页面的storage改变的时候,触发这个事件也会触发调用所有同域下其他窗口的storage事件**.
但要注意：**该事件不会在导致数据变化的当前页面触发**.

即触发storage事件的条件：

①同一浏览器打开了两个同源页面

②其中一个页面修改了localStorage

③另一个网页注册了这个事件

```javascript
window.addEventListener('storage',function(){
    //当sessionStorage或localStorage中的值发生变动时所要执行的处理
},false);
```
加深理解地址： https://blog.csdn.net/ruangong1203/article/details/52841135

2. 在事件处理函数中，触发事件的事件对象（event参数值）有以下属性：
    ①event.key
    属性值为在sessionStorage或localStorage中被修改的数据键值;

    ②event.oldValue
    属性值为在sessionStorage或localStorage中被修改前的值;

    ③event.newValue
    属性值为在sessionStorage或localStorage中被修改后的值；

    ④event.url
    属性值为在sessionStorage或localStorage中值的页面URL地址;

    ⑤event.storageArea
    属性值为变动的sessionStorage对象或localStorage对象;

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>test1</title>
</head>
<body>
	<script type="text/javascript">
		function storageChange(event) {
			document.write("发生变化的键名："+event.key+"\n");
			document.write("发生变化前它的值："+event.oldValue+"\n");
			document.write("发生变化后它的值："+event.newValue+"\n");
		}
		window.addEventListener("storage",storageChange,false)//对Storage添加事件监听
	</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>B</title>
</head>
<body>
        //对localStorage的数据进行修改
	<label for>输入更改localStorage中属性test对应的数据值：
		<input type="text" id="changeData">
	</label>
	<button onclick="changeLocalStorage()">更改</button>
	<script type="text/javascript">
		function changeLocalStorage(){
			localStorage.test = document.getElementById("changeData").value;
		}
	</script>
</body>
</html>
```
在同源情况下,test2中对localStorage中的数据进行了修改,test1就触发storageChange事件,输出被更改的数据情况.

### Web Storage的应用

1. 设计网页皮肤

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>设计网页皮肤</title>
</head>
<body>
    <section>
        <button id="pink-btn">粉色</button>
        <button id="green-btn">绿色</button>
        <button id="brown-btn">卡其</button>
    </section>
    <div id="colorDiv" style="width: 500px;height: 500px;border: 1px solid #ccc;background-color: white;"></div>

    <!-- javascript部分 -->
    <script type="text/javascript">
    //首先检测浏览器是否支持
    if (window.localStorage) {
        console.log("浏览器支持localStorage");
    }else{
    	console.log("浏览器不支持localStorage");
    }

    //事件监听
    var EventUtil = {
    	addEvent :function(event,type,handler){
    		if (event.addEventListener) {
    			event.addEventListener(type,handler,false);
    		}else if(event.attachEvent){
    			event.attachEvent('on'+type,handler);
    		}else{
    			event['on'+type] = handler;
    		}
    	}
    }

    //设置选择样式和保存至localStorage
    var colorVal = "white";
    var colorDiv = document.getElementById("colorDiv");
    var bgColor = {
    	setColor :function() {
    	    colorDiv.style.backgroundColor =window.localStorage.bg;
    	},

    	pinkSet :function() {
    	    colorVal = "#FFDAB9";
    	    window.localStorage.setItem("bg",colorVal);
    	    bgColor.setColor();
    	},

    	greenSet:function(){
    	    colorVal ="#9BCD9B";
    	    window.localStorage.setItem("bg",colorVal);
    	    bgColor.setColor();
    	},

    	brownSet:function(){
    	    colorVal ="#CDC9A5";
    	    window.localStorage.setItem("bg",colorVal);
    	    bgColor.setColor();
    	}
    }

    window.onload = function(){
        bgColor.setColor();
        var btnList = document.getElementsByTagName("button");
        EventUtil.addEvent(btnList[0],'click',bgColor.pinkSet);
        EventUtil.addEvent(btnList[1],'click',bgColor.greenSet);
        EventUtil.addEvent(btnList[2],'click',bgColor.brownSet);
    }
    </script>
</body>
</html>
```
### 很全很全的前端本地存储讲解
https://segmentfault.com/a/1190000012578794