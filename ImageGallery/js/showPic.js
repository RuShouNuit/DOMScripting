// 函数绑定window.onload事件
function addLoadEvent(func){
    var load = window.onload;
    if(typeof load != "function"){ // 没有函数时直接绑定
        window.onload = func;
    } else{
        window.onload = function(){ // 有函数时追加新函数到末尾
            load();
            func();
        };
    }
}

// 将a.onclick事件分离出来，平稳退化 
function prepareGallery(){
    // 检查浏览器是否支持相关功能
    if(!document.getElementById || !document.getElementsByTagName){
        return false;
    }

    var gallery = document.getElementById("imageGallery");
    if(!gallery) return false; // 检查是否存在id为imageGallery的元素

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

// 将节点插入指定节点后 
function insertAfter(childNode, targetNode){
    var parent = targetNode.parentNode;
    if(parent.lastChild == targetNode){
        parent.appendChild(childNode);
    } else{
        parent.insertBefore(childNode, targetNode.nextSibling);
    }
}

// 添加占位图片img和图片描述p 
function addPlaceHolder(){
    var img = document.createElement("img");
    var p = document.createElement("p");
    var text = document.createTextNode("Choose an image.");

    // 设置元素的属性和文本
    img.setAttribute("id", "placeHolder");
    img.setAttribute("src", "images/placeholder.gif");
    img.setAttribute("alt", "placeHolder");
    p.setAttribute("id", "description");
    p.appendChild(text);

    // 向文档中添加元素
    // 添加到body元素的最后
    /* document.body.appendChild(img);
    document.body.appendChild(p); */
    // 添加到ul元素的前面
    /* var gallery = document.getElementById("imageGallery");
    gallery.parentNode.insertBefore(img, gallery);
    gallery.parentNode.insertBefore(p, gallery); */
    // 添加到ul元素的后面
    var gallery = document.getElementById("imageGallery");
    insertAfter(img, gallery);
    insertAfter(p, img);
}

// 获取body元素的子元素
function getBodyChildren(){
    if(!document.getElementsByTagName) return false;

    var body = document.getElementsByTagName("body")[0];  
    var childs = body.childNodes; // 获取body的子节点  
    alert(childs.length); // body的子节点的个数  
    alert(body.nodeType); // body的节点类型：1
}

// 点击<a>时在占位<img>处显示图片
function showPic(pic){
    var path = pic.getAttribute("href"); // 获取图片地址
    var text = pic.title ? pic.title : ""; // HTML-DOM方式
    var holder = document.getElementById("placeHolder"); // 获取占位符
    var p = document.getElementById("description");

    if(!holder || !path) return false;  
    holder.setAttribute("src", path); // 设置img.src
    holder.alt = text; // 设置img.alt

    if(p){
        // p.innerHTML = text; //设置<p>的html内容
        // p.childNodes[0].nodeValue = text; // 设置<p>的文本节点的值
        p.firstChild.nodeValue = text; // 同上
    }

    return true;
}

addLoadEvent(prepareGallery);
addLoadEvent(addPlaceHolder);