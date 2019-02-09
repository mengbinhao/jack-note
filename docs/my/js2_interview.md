### BOM
- navigator
- screen
- location
- history
### DOM
HTML 是一个有既定标签标准的 XML 格式,标签的名字、层级关系和属性,都被标准化（否则浏览器无法解析）,它是一棵树。但是浏览器要把这个文档中的 HTML 按照标准渲染成一个页面,此时浏览器就需要将这堆代码处理成自己能理解的东西,也得处理成 JS 能理解的东西,因为还得允许 JS 修改页面内容呢。

基于以上需求,浏览器就需要把 HTML 转变成 DOM,可以认为 DOM 就是 JS 能识别的 HTML 结构,一个普通的 JS 对象或者数组。
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div>
        <p>this is p</p>
    </div>
</body>
</html>
```

#### 获取 DOM 节点
#### DOM 树操作  父/子等...

### event bind
```javascript
var btn = document.getElementById('btn1')
btn.addEventListener('click', function (event) {
    // event.preventDefault() // 阻止默认行为
    // event.stopPropagation() // 阻止冒泡
    console.log('clicked')
})
```

### 事件代理
```html
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
<button>点击增加一个 a 标签</button>

<script>
function bindEvent(elem, type, selector, fn) {
    // 这样处理,可接收两种调用方式 bindEvent(div1, 'click', 'a', function () {...}) 和 bindEvent(div1, 'click', function () {...}) 这两种
    if (fn == null) {
        fn = selector
        selector = null
    }

    elem.addEventListener(type, function (e) {
        var target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}

// 使用代理,bindEvent 多一个 'a' 参数
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function (e) {
    console.log(this.innerHTML)
})

// 不使用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function (e) {
    console.log(a.innerHTML)
})
</script>
```

### Ajax
#### XMLHttpRequest

```javascript
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            alert(xhr.responseText)
        }
    }
}
xhr.open("GET", "/api", false)
xhr.send(null)
```

- 0 -代理被创建,但尚未调用 open() 方法。
- 1 -open() 方法已经被调用。
- 2 -send() 方法已经被调用,并且头部和状态已经可获得。
- 3 -下载中, responseText 属性已经包含部分数据。
- 4 -下载操作已完成

xhr.status即 HTTP 状态码,有 `2xx 3xx 4xx 5xx` 这几种,比较常用的有以下几种：
- 2xx
  - 200 正常,表示从客户端发来的请求在服务器端被正确处理
  - 204 No content,表示请求成功,但响应报文不含实体的主体部分
  - 205 Reset Content,表示请求成功,但响应报文不含实体的主体部分,但是与204响应不同在于要求请求方重置内容
  - 206 Partial Content,进行范围请求
- 3xx
    - 301 永久重定向。如http://xxx.com这个 GET 请求（最后没有/）,就会被301到http://xxx.com/（最后是/）
    - 302 临时重定向。临时的,不是永久的
    - 303 see other,表示资源存在着另一个 URL,应使用 GET 方法获取资源
    - 304 资源找到但是不符合请求条件,不会返回任何主体。如发送 GET 请求时,head 中有If-Modified-Since: xxx（要求返回更新时间是xxx时间之后的资源）,如果此时服务器 端资源未更新,则会返回304,即不符合要求
    - 307 temporary redirect,临时重定向,和302含义类似,但是期望客户端保持请求方法不变向新的地址发出请求
- 404 找不到资源
  - 400 bad request,请求报文存在语法错误
  - 401 unauthorized,表示发送的请求需要有通过 HTTP 认证的认证信息
  - 403 forbidden,表示对请求资源的访问被服务器拒绝
  - 404 not found,表示在服务器上没有找到请求的资源
- 5xx 服务器端出错了
  - 500 internal sever error,表示服务器端在执行请求时发生了错误
  - 501 Not Implemented,表示服务器不支持当前请求所需要的某个功能
  - 503 service unavailable,表明服务器暂时处于超负载或正在停机维护,无法处理请求

#### Fetch API

#### 跨域
- 协议
- 域名
- 端口
但是 HTML 中几个标签能逃避过同源策略——`<script src="xxx">、<img src="xxxx"/>、<link href="xxxx">`,这三个标签的src/href可以加载其他域的资源,不受同源策略限制。

因此,这使得这三个标签可以做一些特殊的事情。

- `<img>`可以做打点统计,因为统计方并不一定是同域的,在讲解 JS 基础知识异步的时候有过代码示例。除了能跨域之外,`<img>`几乎没有浏览器兼容问题,它是一个非常古老的标签。
- `<script>`和`<link>`可以使用 CDN,CDN 基本都是其他域的链接。
- 另外`<script>`还可以实现 JSONP,能获取其他域接口的信息

##### JSONP
##### 服务器端设置 http header
```
response.setHeader("Access-Control-Allow-Origin", "http://m.juejin.com/");  // 第二个参数填写允许跨域的域名称,不建议直接写 "*"
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

// 接收跨域的cookie
response.setHeader("Access-Control-Allow-Credentials", "true");
```
### 存储

#### cookie `document.cookie = ....`
- 存储量太小,只有 4KB
- 所有 HTTP 请求都带着,会影响获取资源的效率
- API 简单,需要封装才能用

### localStorage 和 sessionStorage

- 存储量增大到 5MB
- 不会带到 HTTP 请求中
- API 适用于数据存储 localStorage.setItem(key, value) localStorage.getItem(key)

sessionStorage的区别就在于它是根据 session 过去时间而实现,而localStorage会永久有效,应用场景不同。例如,一些需要及时失效的重要信息放在sessionStorage中,一些不重要但是不经常设置的信息,放在localStorage中。

另外告诉大家一个小技巧,针对localStorage.setItem,使用时尽量加入到try-catch中,某些浏览器是禁用这个 API 的,要注意

### Post 和 Get 的区别
先引入副作用和幂等的概念。

副作用指对服务器上的资源做改变，搜索是无副作用的，注册是副作用的。

幂等指发送 M 和 N 次请求（两者不相同且都大于 1），服务器上资源的状态一致，比如注册 10 个和 11 个帐号是不幂等的，对文章进行更改 10 次和 11 次是幂等的。

在规范的应用场景上说，Get 多用于无副作用，幂等的场景，例如搜索关键字。Post 多用于副作用，不幂等的场景，例如注册。

在技术上说：
- Get 请求能缓存，Post 不能
- Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里，且会被浏览器保存历史纪录，Post 不会，但是在抓包的情况下都是一样的。
- Post 可以通过 request body来传输比 Get 更多的数据，Get 没有这个技术
- URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
- Post 支持更多的编码类型且不对数据类型限制