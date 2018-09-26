//new DOMParser()
var hasXmlDom = document.implementation.hasFeature("XML","2.0");
console.log(hasXmlDom);
var parser = new DOMParser();
var xmldom = parser.parseFromString("<root><child/></root>","text/xml");
console.log(xmldom.documentElement.tagName);
console.log(xmldom.documentElement.firstChild.tagName);
var anotherChild = xmldom.createElement("child");
xmldom.documentElement.appendChild(anotherChild);
var children = xmldom.getElementsByTagName("child");
console.log(children.length);

//new XMLSerializer()
var serializer = new XMLSerializer();
var xmlStr = serializer.serializeToString(xmldom);
console.log(xmlStr);


function parseXML(xml) {
	var xmldom = null;
	if (typeof DOMParser != "undefined"){
		xmldom = (new DOMParser()).parseFromString(xml,"text/xml");
		var errors = xmldom.getElementsByTagName("parsererror");
		if (errors.length) {
			throw new Error("parse error:" + errors[0].textContent);
		}
	}else if (typeof ActiveObject != "undefined") {
		xmldom = createDocument();
		xmldom.load(xml);
		if (xmldom.parseError != 0){
			throw new Error("parse error:" + xmldom.parseError.reason);
		}
	}else {
		throw new Error("no xml parser available");
	}
	return xmldom;
}

function serializeXML(xmldom){
	if (typeof XMLSerializer != "undefined") {
		return (new XMLSerializer()).serializeToString(xmldom);
	}else if (typeof xmldom.xml != "undefined") {
		return xmldom.xml;
	}else {
		throw new Error("could not serialize xmldom");
	}
}





























