### BOM
- navigator
- screen
- location
- history
### DOM
HTML 是一个有既定标签标准的 XML 格式，标签的名字、层级关系和属性，都被标准化（否则浏览器无法解析）,它是一棵树。但是浏览器要把这个文档中的 HTML 按照标准渲染成一个页面，此时浏览器就需要将这堆代码处理成自己能理解的东西，也得处理成 JS 能理解的东西，因为还得允许 JS 修改页面内容呢。

基于以上需求，浏览器就需要把 HTML 转变成 DOM，可以认为 DOM 就是 JS 能识别的 HTML 结构，一个普通的 JS 对象或者数组。
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
    // 这样处理，可接收两种调用方式 bindEvent(div1, 'click', 'a', function () {...}) 和 bindEvent(div1, 'click', function () {...}) 这两种
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

// 使用代理，bindEvent 多一个 'a' 参数
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

- 0 -代理被创建，但尚未调用 open() 方法。
- 1 -open() 方法已经被调用。
- 2 -send() 方法已经被调用，并且头部和状态已经可获得。
- 3 -下载中， responseText 属性已经包含部分数据。
- 4 -下载操作已完成

xhr.status即 HTTP 状态码，有 `2xx 3xx 4xx 5xx` 这几种，比较常用的有以下几种：

- 200 正常
- 3xx
    - 301 永久重定向。如http://xxx.com这个 GET 请求（最后没有/），就会被301到http://xxx.com/（最后是/）
    - 302 临时重定向。临时的，不是永久的
    - 304 资源找到但是不符合请求条件，不会返回任何主体。如发送 GET 请求时，head 中有If-Modified-Since: xxx（要求返回更新时间是xxx时间之后的资源），如果此时服务器 端资源未更新，则会返回304，即不符合要求
- 404 找不到资源
- 5xx 服务器端出错了

#### Fetch API

#### 跨域
- 协议
- 域名
- 端口
但是 HTML 中几个标签能逃避过同源策略——`<script src="xxx">、<img src="xxxx"/>、<link href="xxxx">`，这三个标签的src/href可以加载其他域的资源，不受同源策略限制。

因此，这使得这三个标签可以做一些特殊的事情。

- `<img>`可以做打点统计，因为统计方并不一定是同域的，在讲解 JS 基础知识异步的时候有过代码示例。除了能跨域之外，`<img>`几乎没有浏览器兼容问题，它是一个非常古老的标签。
- `<script>`和`<link>`可以使用 CDN，CDN 基本都是其他域的链接。
- 另外`<script>`还可以实现 JSONP，能获取其他域接口的信息

##### JSONP
##### 服务器端设置 http header
```
response.setHeader("Access-Control-Allow-Origin", "http://m.juejin.com/");  // 第二个参数填写允许跨域的域名称，不建议直接写 "*"
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

// 接收跨域的cookie
response.setHeader("Access-Control-Allow-Credentials", "true");
```
### 存储

#### cookie `document.cookie = ....`
- 存储量太小，只有 4KB
- 所有 HTTP 请求都带着，会影响获取资源的效率
- API 简单，需要封装才能用

### localStorage 和 sessionStorage

- 存储量增大到 5MB
- 不会带到 HTTP 请求中
- API 适用于数据存储 localStorage.setItem(key, value) localStorage.getItem(key)

sessionStorage的区别就在于它是根据 session 过去时间而实现，而localStorage会永久有效，应用场景不同。例如，一些需要及时失效的重要信息放在sessionStorage中，一些不重要但是不经常设置的信息，放在localStorage中。

另外告诉大家一个小技巧，针对localStorage.setItem，使用时尽量加入到try-catch中，某些浏览器是禁用这个 API 的，要注意