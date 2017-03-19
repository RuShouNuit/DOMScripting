// 为不支持label默认行为的浏览器添加该行为
function focusLabel() {
	if(!document.getElementsByTagName) return false;
	var lbls = document.getElementsByTagName("label");
	for(var i=0; i<lbls.length; i++) {
		// 跳过不存在for属性的label
		if(!lbls[i].htmlFor) continue;
		// 点击label时，关联表单控件获得焦点
		lbls.onclick = function() {
			var ele = document.getElementById(this.htmlFor);
			if(!ele) return false;
			ele.focus();
		};
	}
}

// 为不支持placeholder属性的浏览器呈现类似效果
function resetFields(frm) {
	if(eleSupportsAttr("input", "placeholder")) return;
	for(var i=0; i<frm.elements.length; i++) {
		var ele = frm.elements[i];
		if(ele.type == "submit") continue;
		// var chk = ele.placeholder || ele.getAttribute("placeholder");
		// if(!chk) continue;
		// 表单元素获得焦点时，删除placeholder文本
		ele.onfocus = function() {
			var txt = this.placeholder || this.getAttribute("placeholder");
			if(this.value == txt) {
				this.className = "";
				this.value = "";
			}
		};
		// 表单元素失去焦点时，添加placeholder文本
		ele.onblur = function() {
			if(this.value == "") {
				this.className = "z-holder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		};
		// 初始添加placeholder文本
		ele.onblur();
	}
}

// 验证文本框是否填充
function isFilled(field) {
	// 如果去掉空白符后的文本为空，则返回false
	if(field.value.replace(/\s/, "").length == 0) return false;
	// 判断文本是否与placeholder相同，是则返回false
	var holder = field.placeholder || field.getAttribute("placeholder");
	return (field.value != holder);
}

// 验证邮箱地址
function isEmail(field) {
	return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

// 验证表单
function validateForm(frm) {
	for(var i=0; i<frm.elements.length; i++) {
		var ele = frm.elements[i];
		// 验证必填项
		if(ele.required == "required") {
			if(!isFilled(ele)) {
				alert("Please fill in the " + ele.name + " field.");
				return false;
			}
		}
		// 验证电子邮件地址
		if(ele.type == "email") {
			if(!isEmail(ele)) {
				alert("The " + ele.name + " field must be a valid email address.");
				return false;
			}
		}
		return true;
	}
}

// 提交表单
function submitFormWithAjax(frm, target) {
	var request = getHttpObject();
	if(!request) return false;
	// 显示等待画面
	LoadingAjax(target);

	// 参数序列化
	var data = [], ele, d;
	for(var i=0; i<frm.elements.length; i++) {
		ele = frm.elements[i];
		data[i] = ele.name + "=" + encodeURIComponent(ele.value);
	}
	d = data.join("&");
	// 发送请求
	request.open("POST", frm.action, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200 || request.status == 0) {
				// 读取submit.html中article的内容并显示
				var text = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(text.length > 0) {
					target.innerHTML = text[1];
				} else {
					target.innerHTML = "<p>Oops. there was an error. Sorry.</p>";
				}
			} else {
				target.innerHTML = "<p>" + request.statusText + "</p>";
			}
		}
	};
	request.send(d);

	return true;
}

// 初始化表单
function prepareForm() {
	var frms = document.forms;
	for(var i=0; i<frms.length; i++) {
		resetFields(frms[i]);
		// 表单提交
		frms[i].onsubmit = function() {
			if(!validateForm(this)) return false;
			var article = document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this, article)) return false;
			return true;
		};
	}
	frms = null;
}

addLoadEvent(focusLabel);
addLoadEvent(prepareForm);