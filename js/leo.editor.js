//require leojs/js/leo.js
//css require leojs/css/main.css

(function(){
	function fac(dom){
		var Editor = function(){
			this.init()
		}
		Editor.prototype = dom;
		Editor.prototype.extend({
			init:function(){
				// this.dom.contentEditable = true;
				// this.cls().add('flex');
				this.pannel();
				this.textArea();
			},
			pannel:function(){
				var pan = l.create({
					tag:'div',
					css:{
						width:'100%'
					},
					_class:'flex',
					parent:this
				})
				var that = this;
				this.mkBtn('添加图片',pan)
				this.mkBtn('添加链接',pan)
				this.mkBtn('加粗',pan)
			},
			textArea:function(){
				this.textArea = l.create({
					tag:'div',
					_class:'bor pad mar-t',
					style:{
						width:"100%",
						minHeight:this.offset('height') + "px"
					},
					attr:{
						contentEditable:true
					},
					parent:this
				})
			},
			getContent:function(){
				return this.textArea.html()
			},
			mkBtn:function(content,parent){
				return l.create({
					tag:'div',
					content:content,
					_class:'bor pad-lr',
					style:{
						cursor:'default',
						fontSize:'12px',
						marginRight:'5px',
						backgroundColor:'white'
					},
					parent:parent
				}).hover(function(){
					l(this).css({
						backgroundColor:'#ddd'
					})
				}).out(function(){
					l(this).css({
						backgroundColor:'white'
					})
				})
			}
		})
		return new Editor();
	}
	l.PLUS({
		editor:function(){
			return fac(this);
		}
	})
}())