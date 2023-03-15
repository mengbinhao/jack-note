### 选取元素
#### 选择器查询
- `document.querySelector` 返回第一个匹配的 Element
- `document.querySelectorAll` 返回所有匹配的 Element 组成的 NodeList

**jQuery**  `let $ele = $("selector")`
**Native**  `let ele = document.querySelectorAll("selector")`

#### 选择器模式

| 选择器             | 示例               | 实例说明                                   |
| ------------------ | ------------------ | ------------------------------------------ |
| .class             | .intro             | 选择所有class="intro"的元素                |
| #id                | #firstName         | 选择所有id="firstName"的元素               |
| *                  | *                  | 选择所有元素                               |
| element            | p                  | 选择所有<p>元素                            |
| element1,element2  | div,p              | 选择所有<div>元素和<p>元素                 |
| element element    | div p              | 选择<div>元素内的所有<p>元素               |
| element>element    | div>p              | 选择所有父级是<div>元素的 <p>元素          |
| element+element    | div+p              | 选择所有紧接着<div>元素之后的<p>元素       |
| [attribute=value]  | a[target=_blank]   | 选择所有使用target="_blank"的<a>元素       |
| [attribute^=value] | a[src^="http"]     | 选择每一个src属性的值以"http"开头的<a>元素 |
| [attribute$=value] | a[src$=".jpg"]     | 选择每一个src属性的值以".jpg"结尾的<a>元素 |
| :first-child       | ul li:first-child  | 选择<ul>元素下的首个<li>元素               |
| :nth-child(n)      | ul li:nth-child(3) | 选择<ul>元素下的第三个<li>元素             |
| :last-child        | ul li:last-child   | 选择<ul>元素下的最后一个<li>元素           |

#### DOM树查询

| jQuery            | Native                       | 方法说明             |
| ----------------- | ---------------------------- | -------------------- |
| `$ele.parent()`   | `ele.parentNode`             | 元素的直接父元素     |
| `$ele.children()` | `ele.childNodes`             | 元素的所有直接子元素 |
| `$ele.find("a")`  | `ele.querySelectorAll("a")`  | 元素的后代元素       |
| `$ele.prev()`     | `ele.previousElementSibling` | 元素的上一个同胞元素 |
| `$ele.next()`     | `ele.nextElementSibling`     | 元素的下一个同胞元素 |

### DOM操作
#### 内容和属性

| jQuery                         | Native                                | 方法说明               |
| ------------------------------ | ------------------------------------- | ---------------------- |
| `var text = $ele.text()`       | `let text = ele.innerText`            | 获取所选元素的文本内容 |
| `$ele.text("text")`            | `ele.innerText = "text"`              | 设置所选元素的文本内容 |
| `var html = $ele.html()`       | `let html = ele.innerHTML`            | 获取所选元素的HTML内容 |
| `$ele.html("<div>html</div>")` | `ele.innerHTML = "<div>html</div>"`   | 设置所选元素的HTML内容 |
| `var input = $ele.val()`       | `let input = ele.value`               | 获取表单字段的值       |
| `$ele.val("input")`            | `ele.value = "input"`                 | 设置表单字段的值       |
| `var href = $ele.attr("href")` | `let href = ele.getAttribute("href")` | 获取元素的属性值       |
| `$ele.attr("href", "/")`       | `ele.setAttribute("href", "/")`       | 设置元素的属性值       |

#### 修改 DOM 树

| jQuery                  | Native                                        | 方法说明                 |
| ----------------------- | --------------------------------------------- | ------------------------ |
| `$parent.append($ele)`  | `parent.appendChild(ele)`                     | 在被选元素的结尾插入内容 |
| `$parent.prepend($ele)` | `parent.insertBefore(ele, parent.firstChild)` | 在被选元素的开头插入内容 |
| `$ele.after(html)`      | `ele.insertAdjacentHTML("afterEnd", html)`    | 在被选元素之后插入内容   |
| `$ele.before(html)`     | `ele.insertAdjacentHTML("beforeBegin", html)` | 在被选元素之前插入内容   |
| `$ele.remove()`         | `ele.parentNode.removeChild(ele)`             | 删除被选元素及其子元素   |
| `$ele.empty()`          | `ele.innerHTML = null`                        | 从被选元素中删除子元素   |
| `$ele.clone()`          | `ele.cloneNode(true)`                         | 拷贝被选元素             |
| `ele.replaceWith(html)` | `ele.outerHTML = html`                        | 指定HTML替换被选元素     |

### CSS 样式

#### 设置 Style

- ele.setAttribute 直接修改 DOM style 属性改变样式
- ele.style.cssText 通过 cssText 修改 Style 属性
- ele.style.property 通过 style 对象读写行内 CSS 样式

**jQuery**

```javascript
var size = $ele.css("font-size") // 返回第一个匹配元素的 CSS 属性值
$ele.css("font-size", "2rem") // 为所有元素设置指定的 CSS 属性值
```

**Native**

```javascript
let size = getComputedStyle(ele)["font-size"] // 获取当前元素计算后的 CSS 属性值
ele.style.setProperty("font-size", "2rem") // 设置当前元素的某个内联样式
ele.style.removeProperty("font-size")  // 移除当前元素的某个内联样式
```

#### 设置 Class

| jQuery                        | Native                              | 方法说明                     |
| ----------------------------- | ----------------------------------- | ---------------------------- |
| `$ele.hasClass(className)`    | `ele.classList.contains(className)` | 检查元素是否包含指定的类名   |
| `$ele.addClass(className)`    | `ele.classList.add(className)`      | 向元素增加一个或多个类名     |
| `$ele.removeClass(className)` | `ele.classList.remove(className)`   | 从元素中移除一个或多个类     |
| `$ele.toggleClass(className)` | `ele.classList.toggle(className)`   | 对元素的一个或多个类进行切换 |

### 事件方法
#### 绑定事件

**jQuery**

```javascript
$ele.on("click", function (evt) {
    console.log(evt.target)
})
```

**Native**

```javascript
ele.addEventListener("click", evt => {
    console.log(evt.target)
})
```

#### 解除绑定

**jQuery **

```javascript
$ele.off("click")
```

**Native**

```javascript
ele.removeEventListener("click", func)
```

#### 模拟触发

**jQuery **

```javascript
$ele.trigger("click")
```

**Native**

```javascript
let event = document.createEvent("MouseEvents")
event.initMouseEvent("click")
ele.dispatchEvent(event)
```

### Ajax

#### jQuery

```javascript
$.ajax({
  url: "http://apis.juhe.cn/ip/ip2addr",
  type: "GET",
  data: {
    "key": "80701ec21437ca36ca466af27bb8e8d3",
    "ip": "220.181.57.216"
  },
  //响应体
  dataType: "json",
  success: function (data) {
    console.log(data)
  },
  error: funtion(e) {
		console.log(e)
  },
  headers: {
    c:300,
    d:400
  }
})
$ele.trigger("click")
```

#### XHR 封装

```javascript
window.ajax = async function (params, callback) {
  let url = params.url;
  let method = params.method;
  let data = params.data;
  let body = new FormData();
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      body.append(key, data[key]);
    }
  }
  let xhr = new XMLHttpRequest();
  xhr.timeout = 3000;
  xhr.open(method, url, true);
  xhr.addEventListener("readystatechange", evt => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.response);
      } else {
        throw xhr.statusText;
      }
    }
  });
  xhr.send(body);
};

ajax({
  url: "http://apis.juhe.cn/ip/ip2addr",
  method: "GET",
  data: {
    "key": "80701ec21437ca36ca466af27bb8e8d3",
    "ip": "220.181.57.216"
  }
  },function (resp) {
    var json = JSON.parse(resp);
    console.log(json);
  }
)
```

#### Fetch API

```javascript
/* 构造请求对象 */
let request = new Request(
  "http://apis.juhe.cn/ip/ip2addr",
  {
    method: "GET",
    body: {
      "key": "80701ec21437ca36ca466af27bb8e8d3",
      "ip": "220.181.57.216"
    },
    headers: new Headers()
  }
);
/* 处理响应对象 */
fetch(request)
  .then(response => response.json())
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 工具
#### Array

| jQuery                                | Native                           | 方法说明               |
| ------------------------------------- | -------------------------------- | ---------------------- |
| `$.isArray(array)`                    | `Array.isArray(array)`           | 判断参数是否为一个数组 |
| `$.inArray(item, array)`              | `array.includes(item)`           | 判断值是否在指定数组中 |
| `$.makeArray(objList)`                | `Array.from(objList)`            | 将类数组对象转换为数组 |
| `$.merge(array1, array2)`             | `array1.concat(array2)`          | 合并两个数组（有区别） |
| `$.each(array, function (i, item) {}` | `array.forEach((item, i) => {})` | 遍历指定的对象和数组   |

> 合并数组时，merge 会改变原数组的内容，而 concat 不会修改原数组，只会返回合并后的数组

#### Method

| jQuery                                | Native                       | 方法说明                   |
| ------------------------------------- | ---------------------------- | -------------------------- |
| `$.now()`                             | `Date.now()`                 | 返回当前时间戳             |
| `$.trim(context)`                     | `context.trim()`             | 移除字符串头尾空白         |
| `$.type(parameter)`                   | `typeof parameter`           | 检测参数的内部类型         |
| `$.parseJSON(jsonStr)`                | `JSON.parse(jsonStr)`        | 将JSON转换为JS对象         |
| `$ele.data("key", "value")`           | `ele.dataset.key = "value"`  | 在指定的元素上存储数据     |
| `$.map(array, function (item, i) {})` | `array.map((item, i) => {})` | 将数组转化为处理后的新数组 |

