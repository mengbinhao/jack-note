function circle(x, y, r) {
	var html = [],
		radio,
		xx,
		yy
	html.push(
		"<div style='left:" + (x - 2) + 'px; top:' + y + "px; width:5px;'></div>"
	)
	html.push(
		"<div style='left:" + x + 'px; top:' + (y - 2) + "px; height:5px;'></div>"
	)
	for (var i = 0.0; i < 360; i += 0.5) {
		radio = (i * Math.PI) / 180
		xx = r * Math.cos(radio) + x
		yy = r * Math.sin(radio) + y
		html.push("<div style='left:" + xx + 'px; top:' + yy + "px;'></div>")
	}
	return html.join('')
}

function Point(x, y) {
	this.x = x || 0
	this.y = y || 0
}

function getOffset(obj) {
	var x = 0,
		y = 0
	do {
		x += obj.offsetLeft
		y += obj.offsetTop
		obj = obj.offsetParent
	} while (obj)
	return new Point(x, y)
}

window.onload = function () {
	var canvas = document.getElementById('canvas'),
		origin,
		pt,
		offset,
		isClick = false,
		r,
		newOrigin

	offset = getOffset(canvas)

	canvas.onmousedown = function (oEvent) {
		oEvent = oEvent || event
		origin = new Point(oEvent.clientX - offset.x, oEvent.clientY - offset.y)
		isClick = true
	}

	document.onmousemove = function (oEvent) {
		if (!isClick) return
		oEvent = oEvent || event
		pt = new Point(oEvent.clientX - offset.x, oEvent.clientY - offset.y)
		newOrigin = new Point(
			(origin.x + (oEvent.clientX - offset.x)) / 2,
			(origin.y + (oEvent.clientY - offset.y)) / 2
		)
		r = Math.sqrt(
			(pt.x - newOrigin.x) * (pt.x - newOrigin.x) +
				(pt.y - newOrigin.y) * (pt.y - newOrigin.y)
		)
		canvas.innerHTML = circle(newOrigin.x, newOrigin.y, r)
	}
	canvas.onmouseup = function () {
		isClick = false
	}
}
