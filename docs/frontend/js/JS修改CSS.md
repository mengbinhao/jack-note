1. 改变class

```javascript
element.className = 'blue'
element.className += 'blue fb'
```

2. style

```javascript
element.style.height = '100px'
element.style['textAlign'] = '100px'
element.style['text-align'] = '100px'
```

3. setAttribute

```javascript
element.setAttribute('height', 100)
element.setAttribute('height', '100px')
element.setAttribute('style', 'height: 100px !important')
```

4. setProperty(如果要设置!important，推荐用这种方法设置第三个参数)

```javascript
element.style.setProperty('height', '300px', 'important')
```

5. classList

```javascript
div.classList.remove("foo")
div.classList.add("anotherclass")
div.classList.toggle("visible")
div.classList.toggle("visible", i < 10)
console.log(div.classList.contains("foo"))
div.classList.add("foo","bar")
div.classList.remove("foo", "bar")
```

6. 引入新的css样式文件

```javascript
function addNewStyle(newStyle) {
	let styleElement = document.getElementById('styles_js')
	if (!styleElement) {
		styleElement = document.createElement('style')
		styleElement.type = 'text/css'
		styleElement.id = 'styles_js'
		document.getElementsByTagName('head')[0].appendChild(styleElement)
	}
	styleElement.appendChild(document.createTextNode(newStyle))
}
```

7. document.styleSheets[0].insertRule

