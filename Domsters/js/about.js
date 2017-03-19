// 显示Section
function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for(var i=0; i<sections.length; i++) {
		if(sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

// 设置Section
function prepareSection() {
	if(!document.getElementsByTagName || !document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	// 取得内部导航链接
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var links = navs[0].getElementsByTagName("a");
	for(var i=0; i<links.length; i++) {
		var secId = links[i].href.split("#")[1],
			sec = document.getElementById(secId);
		if(!sec) continue; // 不存在指定section元素，则开始下一次循环
		sec.style.display = "none"; // 隐藏section元素
		// 鼠标点击链接时显示相应的section元素
		links[i].secId = secId;
		links[i].onclick = function() {
			showSection(this.secId);
			return false;
		}
	}
}

addLoadEvent(prepareSection);