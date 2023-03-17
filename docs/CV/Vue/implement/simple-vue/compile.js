class Compile {
	constructor(vm, el) {
		this.vm = vm
		this.el = document.querySelector(el)
		if (this.el) {
			let fragment = this.node2Fragment(this.el)
			this.compile(fragment, vm)
			this.el.appendChild(fragment)
		}
	}
	node2Fragment(el) {
		let fragment = document.createDocumentFragment()
		let firstChild
		while ((firstChild = el.firstChild)) {
			fragment.appendChild(firstChild)
		}
		return fragment
	}
	compile(fragment, vm) {
		let childNodes = fragment.childNodes
		Array.from(childNodes).forEach((node) => {
			if (node.nodeType === 1) {
				this.compileElement(node, vm)
				this.compile(node, vm)
			} else if (node.nodeType === 3) {
				this.compileText(node, vm)
			}
		})
	}
	compileElement(node, vm) {
		let attributes = node.attributes
		Array.from(attributes).forEach((attr) => {
			if (attr.name === 'v-model') {
				let expr = attr.nodeValue
				node.value = vm[expr]
				node.removeAttribute('v-model')
				node.addEventListener('input', (e) => {
					vm[expr] = e.target.value
				})
				new Watcher(vm, expr, (val) => (node.value = val))
			}
		})
	}
	compileText(node, vm) {
		let reg = /\{\{(.+)\}\}/g
		//let reg = /\{\{\s*(\S+)\s*\}\}/g
		//let reg = /(\{\{.*?\}\})+/g
		if (reg.test(node.nodeValue)) {
			//node.nodeValue.match(reg) {{ name }} {{ age}}
			let expr = RegExp.$1
			expr = expr.trim()
			node.nodeValue = vm[expr]
			new Watcher(vm, expr, (newVal, oldValue) => (node.nodeValue = newVal))
		}
	}
}
