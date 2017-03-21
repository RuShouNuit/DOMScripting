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

// 创建并显示文献来源列表Citation
function displayCitation(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var quotes = document.getElementsByTagName("blockquote"); // 取得所有<blockquote>元素
    if(quotes.length < 1) return false;

    // 遍历quotes
    for(var i=0; i<quotes.length; i++){
        // 获取<blockquote>的Cite属性
        var q = quotes[i];
        var url = q.getAttribute("cite");
        if(!url) continue; // 如果没有cite属性，跳过

        // 创建文献来源列表
        var link = document.createElement("a"); // 创建超链接
        var linkTxt = document.createTextNode("source");
        link.appendChild(linkTxt);
        link.setAttribute("href", url); // 添加href属性
        var sup = document.createElement("sup"); // 创建sup元素
        sup.appendChild(link);
        /* 非IE浏览器会将空白符当做文本节点来处理，
         * 因此不用lastChild来获取<blockquote>的最后一个子元素节点 */
        var quoteEles = q.getElementsByTagName("*"); // 获取<blockquote>的所有子元素
        if(quoteEles.length < 1) continue; // 如果没有子元素，跳过
        var e = quoteEles[quoteEles.length - 1]; // 取得最后一个子元素
        e.appendChild(sup);
    }
}

// 创建并显示缩略语列表Abbreviation
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

// 创建并显示快捷键清单AccessKey
function displayAccessKey(){
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var links = document.getElementsByTagName("a"); // 取得所有<a>元素
    if(links.length < 1) return false;
    var ul = document.createElement("ul");

    //遍历links
    for(var i=0; i<links.length; i++){
        // 取得超链接的accesskey属性和文本
        var a = links[i];
        var key = a.getAttribute("accesskey");
        if(!key) continue; // 如果没有accesskey属性，跳过
        var text = a.lastChild.nodeValue; // 取得链接的文本
        // 创建快捷键列表
        var str = key + ": " + text;
        var li = document.createElement("li");
        var liTxt = document.createTextNode(str);
        li.appendChild(liTxt);
        ul.appendChild(li);
    }

    // 显示列表
    var h2 = document.createElement("h2");
    var h2Txt = document.createTextNode("AccessKeys");
    h2.appendChild(h2Txt);
    document.body.appendChild(h2);
    document.body.appendChild(ul);
}

addLoadEvent(displayCitation);
addLoadEvent(displayAbbreviation);
addLoadEvent(displayAccessKey);