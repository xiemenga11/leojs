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
			if(this.contains(cls)){
				this.remove(cls)
			}else{
				this.add(cls)
			}
		}
	}


	var _l = function(dom){
		this.dom = dom;
	}

	_l.prototype = {
		cls:function(){
			return this.dom.classList ? this.dom.classList : new ClassList(this.dom);
		},
		append:function(dom,i){
			if(i){
				this.dom.insertBefore(dom,this.dom.children[i]);
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
		off:function(event,callback){
			if(this.dom.removeEventListener){
				this.dom.removeEventListener(event,callback);
			}else{
				this.dom.detachEvent("on"+event, callback);
			}
			return this;
		},
		offset:function(attr){
			return this.dom["offset"+attr.firstUpper()];
		}
	}
	w.l = l = function(dom){
		return new _l(dom);
	}
	// l.aniFrm = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	l.info = {
		version:'1.0.0',
		author:'Leo Xie',
		email:'xiemenga11@126.com'
	}

	l.id = function(id){
		return document.getElementById(id);
	}
	l._class = function(cls,parent){
		var p = parent || document;
		return p.getElementsByClassName(cls);
	}
	l.tag = function(tag,parent){
		var p = parent || document;
		return p.getElementsByTagNames(tag);
	}
	/**
	 * 创建元素
	 * @param  {obj} data 配置属性
	 * data = {
	 * 	tag:(str)元素名称,
	 * 	property:(obj)元素属性,比如href,src等等,
	 * 	_class:(str)样式名称,
	 * 	style:(obj)行内样式,
	 * 	content:(str)内容
	 * }
	 * @return {dom}      创建的元素
	 */
	l.create = function(data){
		if(!data.tag) return;
		var _dom = document.createElement(data.tag);
		if(data.property){
			for(var i in data.property){
				_dom[i] = data.property[i];
			}
		}
		if(data._class){
			_dom.className = data._class;
		}
		if(data.style){
			for(var i in data.style){
				_dom[i].style[i] = data.style[i];
			}
		}
		if(data.content){
			_dom.innerHTML = data.content;
		}
		return _dom;
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

	l.fileUrl = function (file) {
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

	l.aniFrm = function(func){
		var _r = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(func){
			setTimeout(func,30);
		}
		return _r(func);
	}
	l.cancelAniFrm = function(aniFrm){
		cancelAnimationFrame(aniFrm);
	}
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
						form.append(j,data.file[j][k]);
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
		return ((data instanceof Object) && !(data instanceof Array));
	}
	l.isArray = function(data){
		return ((data instanceof Object) && (data instanceof Array));
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
	Object.prototype.each = function(callback){
		l.each(this,function(i){
			callback.call(this,i);
		})
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
	Object.defineProperty(Object.prototype,'each',{enumerable:false})
}(window,document))