var hasXPath = document.implementation.hasFeature("XPath","3.0");
console.log(hasXPath);

function selectSingleNode(context, expression, namespaces){
	var doc = context.nodeType != 9 ? context.ownerDocument : context;
	if (typeof doc.evaluate != "undefined") {
		var nsresolver = null;
		if (namespaces instanceof Object) {
			nsresolver = function(prefix) {
				return namespaces[prefix];
			};
		}
		var result = doc.evaluate(expression, context, nsresolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		return result != null ? result.singleNodeValue : null;
	} else if (typeof context.selectSingleNode != "undefined") {
		if (namespaces instanceof Object) {
			var ns = "";
			for (var prefix in namespaces) {
				if (namespaces.hasOwnProperty(prefix)) {
					ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "'";
				}	
			}
			doc.setProperty("SelectionNamespaces", ns);
		}
		return context.selectSingleNode(expression);
	}else {
		throw new Error("No XPath engine found");
	}
}

//var result = selectSingleNode(xmldom.documentElement, "wrox:book/wrox:author", {wrox:"http://www.wrox.com/"});

function selectSingleNodes(context, expression, namespaces){
	var doc = context.nodeType != 9 ? context.ownerDocument : context;
	if (typeof doc.evaluate != "undefined") {
		var nsresolver = null;
		if (namespaces instanceof Object) {
			nsresolver = function(prefix) {
				return namespaces[prefix];
			};
		}
		var result = doc.evaluate(expression, context, nsresolver,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var nodes = new Array();
		if (result != null) {
			for (var i = 0,len = result.length; i < len; i++) {
				nodes.push(result.snapshotItem(i));
			}
		}
		return nodes;
	} else if (typeof context.selectSingleNode != "undefined") {
		if (namespaces instanceof Object) {
			var ns = "";
			for (var prefix in namespaces) {
				if (namespaces.hasOwnProperty(prefix)) {
					ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "'";
				}	
			}
			doc.setProperty("SelectionNamespaces", ns);
		}
		var result = context.selectNodes(expression);
		var nodes = new Array();
		for (var i = 0,len = result.length; i < len; i++) {
			nodes.push(result[i]);
		}
		return nodes;
	}else {
		throw new Error("No XPath engine found");
	}
}
