(function(w,d){
	var _l = function(){}

	w.l = l = function(){
		return new _l();
	}
	// l.aniFrm = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	l.info = {
		version:'1.0.0',
		author:'Leo Xie',
		email:'xiemenga11@126.com'
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