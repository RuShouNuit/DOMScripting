//添加事件
function addEvent(ele, type, listener, isCapture){
    if(document.addEventListener){
        return ele.addEventListener(type, listener, isCapture);
    } else if(ele.attachEvent){
        return ele.attachEvent("on" + type, listener);
    } else{
        return ele["on"+type] = listener;
    }
}

// 设置video
function createVideoControls(){
    if(!document.getElementsByTagName) return false;
    var vids = document.getElementsByTagName("video");
    for(var i=0; i<vids.length; i++){
        addControls(vids[i]);
    }
}

// 添加控件
function addControls(vid){
    // 去掉内置控件
    vid.removeAttribute("controls");
    // 设置video和其容器的宽高
    vid.height = vid.videoHeight;
    vid.width = vid.videoWidth;
    vid.parentNode.style.height = vid.videoHeight + "px";
    vid.parentNode.style.width = vid.videoWidth + "px";
    // 创建div控件
    var ctrl = document.createElement("div");
    ctrl.setAttribute("class", "ctrls");
    // 创建播放按钮
    var btn = document.createElement("button");
    btn.setAttribute("title", "play");
    btn.innerHTML = "&#x25BA";
    // 添加播放控件
    ctrl.appendChild(btn);
    vid.parentNode.insertBefore(ctrl, vid);
    //给播放按钮添加点击事件
    btn.onclick = function(){
    // 如果已播放完
    if(vid.ended){ vid.currentTime = 0; }
    // 如果已暂停，就播放，否则暂停
    if(vid.paused){ vid.play(); }
    else{ vid.pause(); }
    };
    // 给video添加播放事件
    addEvent(vid, "play", function(){
        btn.innerHTML = "&#x2590;&#x2590;";
        btn.setAttribute("paused", true);
    }, false);
    // 给video添加暂停事件
    addEvent(vid, "pause", function(){
        btn.removeAttribute("paused");
        btn.innerHTML = "&#x25BA;";
    }, false);
    // 给video添加结束事件
    addEvent(vid, "ended", function(){
        vid.pause();
    }, false);
}

window.onload = createVideoControls;