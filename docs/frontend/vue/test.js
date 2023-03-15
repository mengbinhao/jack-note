document.styleSheets[0].insertRule('.box {height: 100px}', 0)

// 或者插入新样式时操作
var styleEl = document.createElement('style'),
	styleSheet = styleEl.sheet

styleSheet.insertRule('.box {height: 100px}', 0)
styleSheet.document.head.appendChild(styleEl)
