// 画一个圆角小黑盒子
function drawRadiusBox(){
    if(!document.getElementById) return false;
    var cvs = document.getElementById("draw-in");
    if(cvs && cvs.getContext){
        var ctx = cvs.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(120.0, 32.0);
        ctx.bezierCurveTo(120.0, 36.4, 116.4, 40.0, 112.0, 40.0);
        ctx.lineTo(8.0, 40.0);
        ctx.bezierCurveTo(3.6, 40.0, 0.0, 36.4, 0.0, 32.0);
        ctx.lineTo(0.0, 8.0);
        ctx.bezierCurveTo(0.0, 3.6, 3.6, 0.0, 8.0, 0.0);
        ctx.lineTo(112.0, 0.0);
        ctx.bezierCurveTo(116.4, 0.0, 120.0, 3.6, 120.0, 8.0);
        ctx.lineTo(120.0, 32.0);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 2.0;
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();
    }
}

// 创建灰度板
function createGSCanvas(img){
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // getImageData只能操作与脚本位于同一个域中的图片
    var c = ctx.getImageData(0, 0, img.width, img.height);
    for(var i=0; i<c.height; i++){
        for(var j=0; j<c.width; j++){
            var x = (i*4) * c.height + (j*4);
            var r = c.data[x],
            g = c.data[x+1],
            b = c.data[x+2];
            c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b) / 3;
        }
    }
    ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height);
    return canvas.toDataURL();
}

// 设置灰度板
function convertToGS(img){
    // 存储原始的彩色板
    img.color = img.src;
    // 创建灰度板
    img.grayscale = createGSCanvas(img);
    // 添加鼠标移入移出事件
    img.onmouseover = function(){ this.src = this.color; };
    img.onmouseout = function(){ this.src = this.grayscale; };
    // 运行鼠标移出事件
    img.onmouseout();
}

function draw(){
    drawRadiusBox();
    convertToGS(document.getElementById("avatar"));
}
window.onload = draw;