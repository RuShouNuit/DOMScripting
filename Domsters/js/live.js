// 设置表格行样式
function stripeTables() {
	if(!document.getElementsByTagName) return false;
	var tbls = document.getElementsByTagName("table");
	for(var i=0; i<tbls.length; i++) {
		var odd = false,
			rows = tbls[i].getElementsByTagName("tr");
		for(var j=0; j<rows.length; j++) {
			// 设置表格奇偶行样式
			if(odd) {
				addClass(rows[j], "z-odd");
				odd = false;
			} else {
				odd = true;
			}
			// 鼠标经过时高亮行，移开时恢复
			rows[j].oldClsName = rows[j].className;
			rows[j].onmouseover = function() {
				addClass(this, "z-highlight");
			};
			rows[j].onmouseout = function() {
				this.className = this.oldClsName;
			};
		}
	}
}

// 创建并显示缩略语列表
function displayAbbrs() {
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var abbrs = document.getElementsByTagName("abbr"); // 取得所有<abbr>元素
	if(abbrs.length < 1) return false;
	var dl = document.createElement("dl");
	// 遍历abbrs
	for(var i=0; i<abbrs.length; i++) {
		var curAbbr = abbrs[i];
		if(curAbbr.childNodes.length < 1) continue; // 兼容IE6-
		// 获取<abbr>的title属性和文本
		var def = curAbbr.getAttribute("title"),
			key = curAbbr.firstChild.nodeValue;
		// 创建定义列表
		var dt = document.createElement("dt"),
			dtTxt = document.createTextNode(key),
			dd = document.createElement("dd"),
			ddTxt = document.createTextNode(def);
		dt.appendChild(dtTxt);
		dd.appendChild(ddTxt);
		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	if(dl.childNodes.length < 1) return false; // 兼容IE6-

	// 显示列表
	var h3 = document.createElement("h3"),
		h3Txt = document.createTextNode("Abbreviations");
	h3.appendChild(h3Txt);
	var article = document.getElementsByTagName("article")[0];
	article.appendChild(h3);
	article.appendChild(dl);
}

addLoadEvent(stripeTables);
addLoadEvent(displayAbbrs);