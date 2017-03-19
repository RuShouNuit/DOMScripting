// 添加页面加载函数
function addLoadEvent(func) {
	var load = window.onload;
	if(typeof load != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			load();
			func();
		};
	}
}

// 添加事件句柄
function addEvent(ele, type, listener, isCapture) {
	if(document.addEventListener) {
		ele.addEventListener(type, listener, isCapture);
	} else { // 兼容IE8-和FF7-
		ele.attachEvent("on" + type, listener);
	}
}

// 移除事件句柄
function removeEvent(ele, type, listener, isCapture) {
	if(document.addEventListener) {
		ele.removeEventListener(type, listener, isCapture);		
	} else { // 兼容IE8-和FF7-
		ele.detachEvent("on" + type, listener);
	}
}

// 向元素后插入一个元素
function insertAfter(newEle, targetEle) {
	var parent = targetEle.parentNode,
		lastChild = parent.lastElementChild || parent.lastChild;
	if(lastChild == targetEle) {
		parent.appendChild(newEle);
	} else {
		parent.insertBefore(newEle, targetEle.nextSibling);
	}
}

//向元素添加类名
function addClass(ele, val) {
	if(!ele.className) {
		ele.className = val;
	} else {
		ele.className += " " + val;
	}
}

// 根据类名获取元素
function getElementsByClassName(node, clsName) {
	if(node.getElementsByClassName) { // 特性侦测
		return node.getElementsByClassName(clsName);
	} else {
		var results = new Array();
		var eles = node.getElementsByTagName("*"); // 获取所有后代元素
		for(var i=0; i<eles.length; i++) {
			if(eles[i].className.indexOf(clsName) != -1) {
				results.push(eles[i]);
			}
		}
	}
	return results;
}

// 获取最终样式
function getStyle(ele, attr) {
	return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, false)[attr];
}

// 检测浏览器是否支持input的指定type类型
function inputSupportsType(type) {
	if(!document.createElement) return false;
	var input = document.createElement("input");
	input.setAttribute("type", type);
	if(input.type == "text" && type != "text") {
		return false;
	} else {
		return true;
	}
}

// 检测浏览器是否支持指定元素的指定属性
function eleSupportsAttr(eleName, attr) {
	if(!document.createElement) return false;
	var ele = document.createElement(eleName);
	return (attr in ele);
}

// 获取元素的dataset属性值
function getDataset(ele) {
	if(!ele.dataset) {
		var ds = {};
		//去掉属性值上的引号，并获得data-*属性
		var set = ele.outerHTML.replace(/"/g,"").match(/data-[^>\s]*/g);
		for(var i=0; i<set.length; i++){
			var a = set[i].split("=");
			//去掉data-前缀，并采用驼峰命名法（data-aa-bb变成aaBb）
			a[0] = a[0].substring(5).replace(/-([a-z])/g, function($,$1) {
				return $1.toUpperCase();
			});
			ds[a[0]] = a[1];
		}
		return ds;
	}
}

// 高亮当前页的导航链接
function highlightPage() {
	if(!document.getElementsByTagName || !document.getElementById) return false;
	var headers = document.getElementsByTagName("header");
	if(headers.length == 0) return false;
	var navs = document.getElementsByTagName("nav");
	if(navs.length == 0) return false;

	var links = navs[0].getElementsByTagName("a"),
		url, urlTxt,
		curUrl = location.href;
	for(var i=0; i<links.length; i++) {
		url = links[i].href;
		if(curUrl.indexOf(url) != -1) { // 导航链接是当前页面
			links[i].className = "here";
			urlTxt = links[i].lastChild.nodeValue.toLowerCase();
			document.body.id = urlTxt; // 给body元素添加id
		}
	}
}

// XHR对象兼容方法
function getHttpObject() {
	var xhr = null;
	if(!window.XMLHttpRequest) {
		xhr = function() {
			// 较新的IE版本创建Msxml12.XMLHTTP对象
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e){}
			// 较老的IE版本创建Microsoft.XMLHTTP对象
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e){}
		};
	} else { // 适用于IE7+和非IE浏览器
		xhr = new XMLHttpRequest();
	}
}

// XHR请求参数序列化
function serialize(data) {
	if(!data) return "";
	var d = [], key, value;
	for(key in data){
		if(!data.hasOwnProperty(key) || (typeof data[key] === "function")) continue;
		value = data[key].toString();
		key = encodeURIComponent(key);
		value = encodeURIComponent(value);
		d.push(key + "=" + value);
	}
	return d.join("&");
}

// Ajax加载等待
function LoadingAjax(ele) {
	while(ele.hasChildNodes) {
		ele.removeChild(ele.lastChild);
	}
	var content = document.createElement("img");
	content.src = "images/loading.gif";
	content.alt = "loading...";
	ele.appendChild(content);
}

addLoadEvent(highlightPage);