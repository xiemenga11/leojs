(function(w,d){
	var ClassList = function(obj){
		this.obj = obj
		this.cls = this.obj.className.split(" ")
	}
	ClassList.prototype = {
		contains:function(cls){
			return this.cls.indexOf(cls) == -1 ? false : true
		},
		item:function(index){
			return this.cls[index]
		},
		remove:function(cls){
			for(var i = 0; i < arguments.length; i++){
				var _index = this.cls.indexOf(arguments[i])
				if(_index === -1) continue;
				else delete this.cls[_index];
			}
			this.obj.className = this.cls.join(" ")
		},
		add:function(cls){
			for(var i = 0; i < arguments.length; i++){
				if(this.contains(arguments[i])) continue;
				else this.cls.push(arguments[i]);
			}
			this.obj.className = this.cls.join(" ")
		},
		toggle:function(cls,condition){
			var con = condition && true;
			if(this.contains(cls) && con){
				this.add(cls)
			}else{
				this.remove(cls)
			}
		}
	}



	var _l = function(dom){
		this.dom = dom || document;
	}

	_l.prototype = {
		data:function(){
			if(arguments.length == 1 && l.isObject(arguments[0])){
				for(var i in arguments[0]){
					this.dom.dataset[i] = arguments[0][i];
				}
			}else if(arguments.length > 1){
				this.dom.dataset[arguments[0]] = arguments[1];
			}else if(arguments.length == 1 && l.isString(arguments[0])){
				return this.dom.dataset[arguments[0]];
			}
			return this;
		},
		cls:function(){
			return this.dom.classList ? this.dom.classList : new ClassList(this.dom);
		},
		append:function(dom,i){
			var dom = (dom instanceof _l) ? dom.dom : dom;
			if(i || i === 0){
				var brother = l.isNumber(i) ? this.dom.children[i] : (i instanceof _l) ? i.dom : i;
				// var brother = l.isNumber(i) ? this.dom.children[i] : i;
				this.dom.insertBefore(dom,brother);
			}else{
				this.dom.appendChild(dom);
			}
			return this;
		},
		html:function(content){
			if(arguments.length > 0){
				this.dom.innerHTML = content;
				return this;
			}else{
				return this.dom.innerHTML;
			}
		},
		on:function(event,callback){
			if(this.dom.addEventListener){
				this.dom.addEventListener(event,callback);
			}else{
				this.dom.attachEvent("on"+event, callback);
			}
			return this;
		},
		click:function(callback){
			this.on('click',callback)
			return this;
		},
		hover:function(callback){
			this.on('mouseover',callback);
			return this;
		},
		out:function(callback){
			this.on('mouseout',callback);
			return this;
		},
		off:function(event,callback){
			if(this.dom.removeEventListener){
				this.dom.removeEventListener(event,callback);
			}else{
				this.dom.detachEvent("on"+event, callback);
			}
			return this;
		},
		offset:function(attr){
			return this.dom["offset"+attr.capital()];
		},
		css:function(css){
			var ret;
			var that = this;
			if(css){
				if(arguments.length == 1 && l.isObject(css)){
					that.dom.style.extend(css)
				}else if(arguments.length == 2 && l.isString(arguments[0]) && (l.isString(arguments[1]) || l.isNumber(arguments[1]))){
					that.dom.style[arguments[0]] = arguments[1];
				}else{
					ret = window.getComputedStyle ? window.getComputedStyle(this.dom,null)[css] : this.dom .currentStyle[css];
					return ret;
				}
				return this;
			}
		},
		val:function(value){
			if(value || value == 0){
				this.dom.value = value;
			}else{
				return this.dom.value;
			}
		},
		remove:function(){
			this.dom.parentNode.removeChild(this.dom)
		},
		clone:function(deep){
			var deep = deep || false;
			return l(this.dom.cloneNode(deep))
		},
		attr:function(attr){
			if(arguments.length == 1){
				if(l.isString(arguments[0])){
					return this.dom[arguments[0]];
				}else if(l.isObject(arguments[0])){
					this.dom.extend(arguments[0])
				}
			}else if(arguments.length == 2 && l.isString(arguments[0]) && (l.isString(arguments[1]) || l.isNumber(arguments[1]))){
				this.dom[arguments[0]] = arguments[1];
			}
			return this;
		}
	}
	
	w.l = l = function(dom){
		return (dom instanceof _l) ? dom : new _l(dom);
	}

	
	// l.aniFrm = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	l.info = {
		version:'1.0.0',
		author:'Leo Xie',
		email:'xiemenga11@126.com'
	}

	// l.diag = {
	// 	mask:l.create({
	// 		tag:'div',
	// 		style:{
	// 			width:window.innerWidth + "px",
	// 			height:window.innerHeight + "px",
	// 			backgroundColor:'rgba(0,0,0,0.3)',
				
	// 		}
	// 	}),
	// 	alert:function(str){

	// 	}
	// }	

	l.id = function(id){
		return new _l(document.getElementById(id));
	}
	l._class = function(cls,parent){
		var reg = /\[\d+\]/;
		var index = 0;
		var p = parent || document;
		if(reg.test(cls)){
			index = parseInt(cls.match(reg)[0]);
		}
		return new _l(p.getElementsByClassName(cls)[index]);
	}
	l.tag = function(tag,parent){
		var reg = /\[\d+\]/;
		var index = 0;
		var p = parent || document;
		if(reg.test(tag)){
			index = parseInt(cls.match(reg)[0]);
		}
		return new _l(p.getElementsByTagName(tag)[index]);
	}
	l._classAll = function(cls,parent){
		var p = parent || document;
		return p.getElementsByClassName(cls);
	}
	l.tagAll = function(tag,parent){
		var p = parent || document;
		return p.getElementsByTagName(tag);
	}
	/**
	 * 创建元素
	 * @param  {obj} data 配置属性
	 * data = {
	 * 	data:(obj) dataset属性
	 * 	tag:(str)元素名称,
	 * 	attr:(obj)元素属性,比如href,src等等,
	 * 	_class:(str)样式名称,
	 * 	style:(obj)行内样式,
	 * 	content:(str)内容,
	 * 	parent:(dom | ldom)父元素
	 * }
	 * @return {dom}      创建的元素
	 */
	l.create = function(data){
		if(!data.tag) return;
		var _dom = document.createElement(data.tag);
		if(data.attr){
			for(var i in data.attr){
				_dom[i] = data.attr[i];
			}
		}
		if(data.data){
			for(var i in data.data){
				_dom.dataset[i] = data.data[i];
			}
		}
		if(data._class){
			_dom.className = data._class;
		}
		if(data.style){
			for(var i in data.style){
				_dom.style[i] = data.style[i];
			}
		}
		if(data.content){
			if(l.isString(data.content)){
				_dom.innerHTML = data.content;
			}else{
				var content = (data.content instanceof _l) ? data.content.dom : data.content;
				l(_dom).append(content);
			}
		}
		if(data.parent){
			l(data.parent).append(_dom);
		}
		return new _l(_dom);
	}
	l.require = function(src,callback){
		var _req = l.create({
			tag:'script',
			property:{   
				src:src
			}
		})
		l(document.body).append(_req);
		if(callback){
			l(_req).on('load',callback);
		}
		return _req;
	}
	l.times = function (times,callback){
		for(var i = 0; i < times; i++){
			var ret = callback.call(i);
			if(ret == "continue"){
				continue;
			} 
			if(ret == "break"){
				break;
			}
		}
	}
	/**
	 * 获取用户选取的内容
	 * @return {rangeObjec} 选取的内容；rangeObject
	 */
	l.getSelectContent = function(){
		var selection = window.getSelection ? window.getSelection() : window.selection.createRange()
		return selection.getRangeAt ? selection.getRangeAt(0) :selection;
	}
	l.each = function (obj,callback){
		for(var i in obj){
			var con = callback.call(obj[i],i);
			
			if(con == "continue"){
				continue;
			}
			if(con == "break"){
				break;
			}

		}
	}
	/**
	 * 生成文件路径
	 * @param  {object} file input['file'].files[0]的文件流
	 * @return {str}      生成的文件路径
	 */
	l.getFileUrl = function (file) {
	    var url = null;
	    if (window.createObjectURL != undefined) {

	        url = window.createObjectURL(file)

	    }

	    else if (window.URL != undefined) {

	        url = window.URL.createObjectURL(file)

	    }

	    else if (window.webkitURL != undefined) {

	        url = window.webkitURL.createObjectURL(file)
	    }
	    
	    return url

	};

	/**
	 * 压缩图片
	 * @param  {obj} data 配置
	 * data:{
	 * 	file:dom.files[0] 要压缩的文件
	 * 	preview:imgDom 预览的imgDom
	 * 	maxWidth:int 最大宽度
	 * 	maxHeight:int 最大高度
	 * 	width:int 宽度，设置了宽度或高度maxWid和maxHei将失效
	 * 	height:int 高度，设置了宽度或高度maxWid和maxHei将失效
	 * 	type: str 要返回文件的格式 ,默认为图片本身的格式
	 * 	quality:0-1 图片的质量 仅type为jpeg时有效
	 * 	callback:压缩完成时的回调函数 ，this 指向压缩后的文件 blob
	 * }
	 * @return {[type]}      [description]
	 */
	l.zipImg = function(data){
		var can = l.create({
			tag:'canvas'
		});
		var imgWid,imgHei,imgSize,imgName,imgType;
		var context = can.dom.getContext('2d');
		var img = new Image();
		if(!/image/.test(data.file.type)){
			throw ('只允许图片');
			return;
		}

		imgName = data.file.name;
		imgSize = data.file.size;
		imgType = data.file.type.split('/')[1];
		img.src = l.getFileUrl(data.file);

		img.onload = function(){
			var scale = 1;
			if(data.maxWidth && this.width * scale > data.maxWidth){
				scale = data.maxWidth / this.width;
			}
			if(data.maxHeight && this.height * scale > data.maxHeight){
				scale = data.maxHeight / this.height;
			}
			imgWid = scale * this.width;
			imgHei = scale * this.height;

			if(data.width){
				imgWid = data.width;
				imgHei = this.height * data.width / this.width;
			}
			if(data.height){
				imgHei = data.height;
				imgWid = this.width * data.height / this.height;
			}
			if(data.height && data.width){
				imgWid = data.width;
				imgHei = data.height;
			}

			can.dom.width = imgWid;
			can.dom.height = imgHei;

			
			context.drawImage(img,0,0,imgWid,imgHei)
			
			//预览
			if(data.preview){
				// alert(data.preview.tagName.toLowerCase())
				if(data.preview.tagName.toLowerCase() == 'img'){
					data.preview.src = can.dom.toDataURL();
					// console.log('img')
				}else{
					var size;
					if(imgHei < imgWid){
						size = '100% auto';
					}else if(imgHei > imgWid){
						size = 'auto 100%';
					}else{
						size = '100% 100%';
					}
					l(data.preview).css({
						backgroundSize:size,
						backgroundPosition:'center',
						backgroundRepeat:'no-repeat'
					})
					data.preview.style.backgroundImage = 'url('+can.dom.toDataURL()+')';
				}
			}
			//上传
			if(data.callback){
				var type = data.type || imgType;
				if(type == 'jpg') type = 'jpeg';
				can.dom.toBlob(function(blob){
					data.callback.call(blob);
				},'image/'+type,data.quality || 0.8)
			}
		}
	}
	//localstorage
	l.store = {
		add:function(key,value){
			localStorage[key] = value;
		},
		get:function(key){
			return localStorage[key];
		},
		rm:function(key){
			localStorage.removeItem(key);
		},
		rmAll:function(){
			localStorage.clear();
		}
	}
	//表单验证
	l.check = {
		mail:function(str){
			return /^[^_][A-z0-9_]+@[A-z0-9]+\.[A-z]{2,}$/.test(str);
		},
		phoneNumber:function(str){
			return /^1(3[0-9]|5[1235689]|8[056789])[0-9]{8}$/.test(str);
		},
		numberOnly:function(str){
			return !(/[^0-9]/g.test(str));
		}
	}
	// screen
	l.scr = {
		AH:screen.availHeight,
		AW:screen.availWidth,
		H:screen.height,
		W:screen.width
	}
	
	//requestAnimationFrame
	l.aniFrm = function(func){
		var _r = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(func){
			setTimeout(func,30);
		}
		return _r(func);
	}
	/**
	 * 取消anifrm
	 * @param  {obje} aniFrm l.aniFrm返回的handle
	 * @return {[type]}        [description]
	 */
	l.cancelAniFrm = function(aniFrm){
		cancelAnimationFrame(aniFrm);
	}

	// ajax
	// data = {
	// 		method:get|post,
	// 		url:地址,
	// 		callback:回调函数,
	// 		data:{key:value},
	// 		file:{key:input.files[0] || input.files}    input.files 是数组
	// }
	l.ajax = function (data){
		var _formdata = data.form ? data.form : null;
		var form = new FormData(_formdata);
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		
		if(data.data){
			for(var i in data.data){
				form.append(i,data.data[i]);
			}
		}
		if(data.file){
			for(var j in data.file){
				if(data.file[j].length){
					for(var k = 0; k < data.file[j].length; k++){
						//form.append中的第一个参数就是php$_POST或$_FILES的键名
						form.append(j+"[]",data.file[j][k]);
					}
				}else{
					form.append(j,data.file[j]);
				}
			}
		}
		
		xhr.open(data.method,data.url,true);
		xhr.onload=function(){
			data.callback.call(xhr.responseText);
		}
		xhr.send(form);
	}

	//判断类型
	l.isString = function(data){
		return (typeof data === "string");
	}
	l.isObject = function(data){
		return ((data instanceof Object) && !(data instanceof Array) && !l.isArray(data));
	}
	l.isArray = function(data){
		return ((data instanceof Object) && (data instanceof Array) && !!data.length && data.constructor == Array);
	}
	l.isFunction = function(data){
		return (typeof data === "function");
	}
	l.isDom = function(data){
		return ((typeof data === "object") && (data instanceof Object) && ("tagName" in data))
	}
	l.isNumber = function(data){
		return (typeof data === "number");
	}
	l.isBool = function(data){
		return (typeof data === "boolean");
	}
	l.getType = function(data){
		return l.isArray(data) ? "array" : (typeof data);
	}

	l.strToJson = function (str){
		if(window.JSON){
			return JSON.parse(str);
		}else{
			return (new Function("return"+str))()
		}
	}
	l.jsonToStr = function (json){

		return JSON.stringify(json)
	}
	l.getScrollTop = function(){
		return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	}
	l.random = function(min,max){
		var min = min || 0;
		var max = max || 1;
		return Math.random() * max + min;
	}
	/**
	 * 添加插件
	 * @param {obj} method 添加方法对象
	 */
	l.PLUS = function(method){
		_l.prototype.extend(method);	
	}
	Object.prototype.each = function(callback){
		if(this.length){
			for(var i = 0,len = this.length; i < len; i++){
				var ret = callback.call(this[i],i);
				if(ret == "continue") continue;
				if(ret == "break") break;
			}
		}else{
			l.each(this,function(i){
				callback.call(this,i);
			})
		}
	}
	Object.prototype.extend = function(plus){
		if(l.isObject(plus) || l.isArray(plus)){
			for(var i in plus){
				this[i] = plus[i]
			}
		}
		return this;
	}
	
	Function.prototype.extend = function(parent,method){
		this.prototype = new parent();
		if(method){
			var that = this;
			method.each(function(i){
				that.prototype[i] = this;
			})
		}
	}

	// Array.prototype.times = function(callback){
	// 	for(var i = 0,len = this.length; i < len; i++){
	// 		var ret = callback.call(this[i],i);
	// 		if(ret == "continue") continue;
	// 		if(ret == "break") break;
	// 	}
	// }

	if (!Array.prototype.shuffle) {
	    Array.prototype.shuffle = function() {
	        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
	        return this;
	    };
	}
	Array.prototype.min = function(){
		if(this.length === 0) return false;
		var m = this[0];
		for(var i = 0, len = this.length; i < len ;i++){
			m = m < Number(this[i]) ? m : this[i];
		}
		return m;
	}
	Array.prototype.max = function(){
		if(this.length === 0) return false;
		var m = this[0];
		for(var i = 0, len = this.length; i < len ;i++){
			m = m < this[i] ? this[i] : m;
		}
		return m;
	}
	String.prototype.toJson = function(){
		return l.strToJson(this);
	}
	String.prototype.upper = function(){
		return this.toUpperCase()
	}
	String.prototype.lower = function(){
		return this.toLowerCase();
	}
	String.prototype.capital = function(){
		return this.replace(this.charAt(0),this.charAt(0).toUpperCase());
	}
	/**
	 * 在字符串指定位置插值
	 * @param  {int} index 位置
	 * @param  {str} str 要插入的字符串
	 * @return {str}       插值后的字符串
	 */
	String.prototype.insert = function(index,str){
		return this.substring(0,index) + str + this.substring(index,this.length);
	}
	//浏览器不支持canvas.toBlob时的代替方法
	if (!HTMLCanvasElement.prototype.toBlob) {
	  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
	    value: function (callback, type, quality) {
	      var canvas = this;
	      setTimeout(function() {

	        var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
	            len = binStr.length,
	            arr = new Uint8Array(len);

	        for (var i = 0; i < len; i++ ) {
	          arr[i] = binStr.charCodeAt(i);
	        }

	        callback( new Blob( [arr], {type: type || 'image/png'} ) );

	      });
	    }
	  });
	}

	Object.defineProperty(Object.prototype,'each',{enumerable:false})
	Object.defineProperty(Object.prototype,'extend',{enumerable:false})
	Object.defineProperty(Array.prototype,'shuffle',{enumerable:false})
	Object.defineProperty(Array.prototype,'min',{enumerable:false})
	Object.defineProperty(Array.prototype,'max',{enumerable:false})
}(window,document))