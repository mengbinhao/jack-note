### DOM
#### 节点及其类型

1. 元素节点
2. 属性节点: 元素的属性, 可以直接通过属性的方式来操作
3. 文本节点: 是元素节点的子节点, 其内容为文本，无子节点
4. document

#### 在 html 什么位置写 js 

1. 直接在 html 页面中书写代码
```html
<button id="button" onclick="alert('hello world');">Click Me!</button>
```
缺点:

- js 和 html 强耦合, 不利于代码的维护

- 若 click 相应函数是比较复杂的, 则需要先定义一个函数, 然后再在 onclick 属性中完成对函数的引用, 比较麻烦

```html
<!-- 一般不能在 body 节点之前来直接获取 body 内的节点, 因为此时 html 文档树还没有加载完成,获取不到指定的节点-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Untitled Document</title>
	<script type="text/javascript">
		var cityNode = document.getElementById("city")
		//null
		console.log(cityNode)
	</script>
</head>
<body>
```
2. **在整个 html 文档的最后编写类似代码**

3. 在 body 节点之前编写 js 代码, 需用 window.onload 事件,该事件在当前文档完全加载之后被触发, 所以其中的代码可以获取到当前文档的任何节点

   ```html
   <script type="text/javascript">
     window.onload = function(){
       var cityNode = document.getElementById("city")
       console.log(cityNode)
     }
   </script>
   ```

#### 获取元素节点

1. document.getElementById: 根据 id 属性获取对应的单个节点
2. document.getElementsByTagName
3. document.getElementsByName() (不通用)
4. document.getElementsByClassName()(不通用)
5. document.getElementsByTagNameNS()(不通用)
6. document.querySelector("#id")

#### 获取属性节点

1. 可以直接通过 Node.id 这样的方式来获取和设置属性节点的值
2. 可以直接通过getAttribute/setAttribute/removeAttribute这样的方式来获取和设置属性节点的值
3. 通过元素节点的 getAttributeNode 方法来获取属性节点，然后在通过 nodeValue 来读写属性值

#### 获取元素节点的子节点(**只有元素节点才有子节点**)

1. childNodes不实用,会取到文本节点, 但该方法不实用. 因为如果要获取指定的节点
的指定子节点的集合, 可以直接调用元素节点的getElementsByTagName()方法来获取一组相同tagName的子节点
2. children 实用,会剔除文本节点
3. firstChild 会受到文本子节点的影响,我们通常可以使用firstChild的nodeValue属性来获取文本值(当子节点只有文本节点时)
4. lastchild 会受到文本子节点的影响

#### 获取文本节点

1. 步骤: 元素节点 --> 获取元素节点的子节点
2. 若元素节点只有文本节点一个子节点,若元素节点只有文本节点一个子节点, 可以先获取到指定的元素节点 eleNode, 然后利用 eleNode.firstChild.nodeValue 的方法来读写其文本节点的值

#### 节点的属性

1. nodeName: 代表当前节点的名字. 只读属性.
2. nodeType：返回一个整数, 这个数值代表着给定节点的类型. (1 -- 元素节点, 2 -- 属性节点, 3 -- 文本节点)
3. nodeValue返回给定节点的当前值(字符串). 可读写的属性
   - 元素节点, 返回值是 null
   - 属性节点: 返回值是这个属性的值
   - 文本节点: 返回值是这个文本节点的内容

#### API

- createElement
- createTextNode
- appendChild

#### 节点的替换

1. replaceChild(): 把一个给定父元素里的一个子节点替换为另外一个子节点
	`let reference = element.replaceChild(newChild,oldChild)`
2. 该节点除了替换功能以外还有移动的功能
3. 该方法只能完成单向替换, 若需要使用双向替换, 需要自定义函数
```javascript
function replaceEach(aNode, bNode){
	if(aNode == bNode) return
	let aParentNode = aNode.parentNode;
	//若 aNode 有父节点
	if(aParentNode){
		let bParentNode = bNode.parentNode
		//若 bNode 有父节点
		if(bParentNode){
			let tempNode = aNode.cloneNode(true)
			bParentNode.replaceChild(tempNode, bNode)
			aParentNode.replaceChild(bNode, aNode)
		}
	}
}
```

#### 插入节点

1. insertBefore(): 把一个给定节点插入到一个给定元素节点的给定子节点的前面

```javascript
//节点 newNode 将被插入到元素节点 element 中并出现在节点 targetNode 的前面. 节点 targetNode 必须是 element 元素的一个子节点
let reference =  element.insertBefore(newNode,targetNode)
```
2. 自定义 insertAfter()

   ```javascript
   function insertAfter(newChild, refChild){
   	var refParentNode = refChild.parentNode
   	if(refParentNode){
   		//判断 refChild 节点是否为其父节点的最后一个子节点
   		if(refChild == refParentNode.lastChild){
   			refParentNode.appendChild(newChild)
   		}else{
   			refParentNode.insertBefore(newChild, refChild.nextSibling)
   		}
   	}
   }
   ```

#### 删除节点(removeChild()) `let reference = element.removeChild(node)`

#### innerHTML属性(浏览器几乎都支持该属性)

#### 其它属性,参看 API:nsextSibling,previousSibling等