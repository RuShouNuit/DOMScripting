// 将事件添加到window.onload上的通用方法
function addLoadEvent(func){
    var load = window.onload;
    if(typeof load != "function"){
        window.onload = func;
    } else{
        window.onload = function(){
            load();
            func();
        }
    }
}

// 给元素追加class名
function addClass(element, value){
    var cls = element.className;
    if(!cls){ // 如果没有class属性，则直接添加
        cls = value;
    } else{ // 否则追加新class名
        cls += " " + value;
    }
    element.className = cls;
}

// 设置表格行样式
function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for(var i=0; i<tables.length; i++){
        rows = tables[i].getElementsByTagName("tr");
        // 设置表格奇偶行样式
        odd = false;
        for(var j=0; j<rows.length; j++){
            if(odd){ // 奇数行
                rows[j].style.backgroundColor = "#ffc";
            } else{ // 偶数行
                addClass(rows[j], "even");
            }
            odd = !odd;
            // 鼠标经过th时，文本加粗；移开时恢复
            var ths = rows[i].getElementsByTagName("th");
            if(ths.length > 0){
                for(var k=0; k<ths.length; k++){
                    // 鼠标经过
                    ths[k].onmouseover = function(){
                        this.style.fontWeight = "bold";
                    };
                    // 鼠标移开
                    ths[k].onmouseout = function(){
                        this.style.fontWeight = "normal";
                    };
                }
            }
        }
    }
}

// 创建并显示缩略语列表
function displayAbbreviation(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var abbrs = document.getElementsByTagName("abbr"); // 取得所有<abbr>元素
    if(abbrs.length < 1) return false;
    var dl = document.createElement("dl");

    // 遍历abbrs
    for(var i=0; i<abbrs.length; i++){
        var curAbbr = abbrs[i];
        if(curAbbr.childNodes.length < 1) continue; // 兼容IE6-
        // 获取<abbr>的title属性和文本
        var def = curAbbr.getAttribute("title");
        var key = curAbbr.firstChild.nodeValue;
        // 创建定义列表
        var dt = document.createElement("dt");
        var dtTxt = document.createTextNode(key);
        var dd = document.createElement("dd");
        var ddTxt = document.createTextNode(def);
        dt.appendChild(dtTxt);
        dd.appendChild(ddTxt);
        dl.appendChild(dt);
        dl.appendChild(dd);
    }
    if(dl.childNodes.length < 1) return false; // 兼容IE6-

    // 显示列表
    var h2 = document.createElement("h2");
    var h2Txt = document.createTextNode("Abbreviations");
    h2.appendChild(h2Txt);
    document.body.appendChild(h2);
    document.body.appendChild(dl);
}

addLoadEvent(stripeTables);
addLoadEvent(displayAbbreviation);