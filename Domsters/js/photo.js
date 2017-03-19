// 点击<a>时在占位img处显示图片 
function showPic(pic){
	var path = pic.getAttribute("href"); // 获取图片地址
	var text = pic.title ? pic.title : "",
		holder = document.getElementById("placeHolder"), // 获取占位符
		p = document.getElementById("description");
	if(!holder || !path) return false;

	holder.setAttribute("src", path);
	holder.alt = text;
	if(p){
		p.firstChild.nodeValue = text; // 设置p#description的文本节点的值
	}

	return true;
}

// 准备图片库
function prepareGallery(){
	if(!document.getElementById || !document.getElementsByTagName) return false;

	var gallery = document.getElementById("gallery");
	if(!gallery) return false;

	var links = gallery.getElementsByTagName("a");
	// 遍历，给链接添加onclick事件
	for(var i=0; i<links.length; i++){
		links[i].onclick = function(){
			return !showPic(this);
		};
		// 由于onclick事件支持键盘访问，以下代码不要用
		// links[i].onkeypress = links[i].onclick;
	}
	// “return false”禁用链接的默认行为
}

// 添加占位img和图片描述p
function addPlaceHolder(){
	var img = document.createElement("img"),
		p = document.createElement("p"),
		text = document.createTextNode("Choose an image.");

	// 设置元素的属性和文本
	img.setAttribute("id", "placeHolder");
	img.setAttribute("src", "images/placeholder.gif");
	img.setAttribute("alt", "placeHolder");
	p.setAttribute("id", "description");
	p.appendChild(text);
	
	// 添加到ul#gallery的后面
	var gallery = document.getElementById("gallery");
	insertAfter(p, img);
	insertAfter(img, gallery);
}

addLoadEvent(addPlaceHolder);
addLoadEvent(prepareGallery);