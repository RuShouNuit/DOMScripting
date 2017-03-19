// 根据指定间隔时间移动指定元素到指定位置
function moveElement(eleId, finalX, finalY, interval) {
	var ele = document.getElementById(eleId);
	if(ele.timer) clearTimeout(ele.timer);
	if(!ele.style.left) ele.style.left = "0px";
	if(!ele.style.top) ele.style.top = "0px";

	var x = parseInt(ele.style.left),
		y = parseInt(ele.style.top),
		step;
	// 已移动到指定位置
	if(x == finalX && y == finalY) return true;
	// 开始逐步移动
	if(x < finalX) {
		step = Math.ceil((finalX - x) / 10);
		x += step;
	}
	if(x > finalX) {
		step = Math.ceil((x - finalX) / 10);
		x -= step;
	}
	if(y < finalY) {
		step = Math.ceil((finalY - y) / 10);
		y += step;
	}
	if(y > finalY) {
		step = Math.ceil((y - finalY) / 10);
		y -= step;
	}
	// 记录当前位置
	ele.style.left = x + "px";
	ele.style.top = y + "px";
	// 重复以上步骤
	var repeat = "moveElement('" + eleId + "'," + finalX + "," + finalY + "," + interval + ")";
	ele.timer = setTimeout(repeat, interval);
}

// 布置幻灯片
function prepareSlide() {
	if(!document.getElementsByTagName || !document.getElementById) return false;
	var p = document.getElementById("intro");
	if(!p) return false;
	// 创建幻灯容器
	var slide = document.createElement("div");	
	slide.className = "m-slide";
	// 创建图片小窗口
	var frame = document.createElement("img");
	frame.src = "images/frame.gif";
	frame.id = "frame";
	slide.appendChild(frame);
	// 添加图片
	var img = document.createElement("img");
	img.id = "preview";
	img.src = "images/slideshow.gif";
	img.alt = "a glimpse of what awaits you";
	slide.appendChild(img);
	insertAfter(slide, p);
	// 根据鼠标悬停的链接来移动img
	// var links = p.getElementsByTagName("a");
	var links = document.getElementsByTagName("a");
	var dest;
	for(var i=0; i<links.length; i++) {
		links[i].onmouseover = function() {
			dest = this.href;
			if(dest.indexOf("home.html") != -1) {
				moveElement("preview", 0, 0, 5);
			} else if(dest.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 5);
			} else if(dest.indexOf("photo.html") != -1) {
				moveElement("preview", -300, 0, 5);
			} else if(dest.indexOf("live.html") != -1) {
				moveElement("preview", -450, 0, 5);
			} else if(dest.indexOf("contact.html") != -1) {
				moveElement("preview", -600, 0, 5);
			}
		}
	}
}

addLoadEvent(prepareSlide);