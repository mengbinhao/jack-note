function transform(context, xslt){
	if (typeof XSLTProcesser != "undefined") {
		var processor = new XSLTProcesser();
		processor.importStylesheet(xslt);
		var result = processor.transformToDocument(context);
		return (new XMLSerializer()).serializeToString(result);
	} else if (typeof context.transformNode != "undefined") {
		return context.transformNode(xslt);
	}else {
		throw new Error("No xstl process available");
	}
}









