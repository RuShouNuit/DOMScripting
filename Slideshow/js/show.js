// 将指定元素根据指定间隔逐步移动至指定坐标
function moveElement(eleID, x, y, interval){
    if(!document.getElementById) return false;
    var ele = document.getElementById(eleID);
    if(!ele) return false;
    // 如果有timer，复位，以防移动混乱
    if(ele.timer){
        clearTimeout(ele.timer);
    }  
    // 如果没有top和left样式，设置默认值
    if(!ele.style.left){
        ele.style.left = "0px";
    }
    if(!ele.style.top){
        ele.style.top = "0px";
    }
    // 元素的当前坐标
    var curX = parseInt(ele.style.left),
    curY = parseInt(ele.style.top);
    // 每次移动的像素值
    var step = 0;  
    // 已在指定位置
    if(curX == x && curY == y) return true;
    // 开始移动
    if(curX < x){
        step = Math.ceil((x - curX) / 10);
        curX += step;
    }
    if(curX > x){
        step = Math.ceil((curX - x) / 10);
        curX -= step;
    }
    if(curY < y){
        step = Math.ceil((y - curY) / 10);
        curY += step;
    }
    if(curY > y){
        step = Math.ceil((curY - y) / 10);
        curY -= step;
    }  
    // 移动后更新当前坐标
    ele.style.left = curX + "px";
    ele.style.top = curY + "px";
    // 回调
    var repeat = "moveElement('" + eleID + "'," + x + "," + y + "," + interval + ")";
    ele.timer = setTimeout(repeat, interval);
}

// 移动元素
function move(){
    if(!document.getElementById) return false;
    var p1 = document.getElementById("p1");
    if(!p1) return false;
    // p1.style.position = "absolute";
    p1.style.left = "50px";
    p1.style.top = "20px";
    moveElement(p1, 100, 50, 100);
}

// 预览图片
function prepareSlideshow(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    var ul = document.getElementById("list");
    var a = ul.getElementsByTagName("a");
    // var img = document.getElementById("preview");

    // 新建图片容器
    var showDiv = document.createElement("div"),
        img = document.createElement("img");
    showDiv.id = "showImg";
    img.id = "preview";
    img.src = "images/topics.gif";
    showDiv.appendChild(img);
    ul.parentNode.appendChild(showDiv);

    // 给链接添加mouseover事件
    a[0].onmouseover = function(){ moveElement("preview", -100, 0, 10); };
    a[1].onmouseover = function(){ moveElement("preview", -200, 0, 10); };
    a[2].onmouseover = function(){ moveElement("preview", -300, 0, 10); };
}

window.onload = prepareSlideshow;