//require leojs/js/leo.js
//css require leojs/css/main.css

(function(){
	var Editor = function(dom){
		this.dom = dom;
		this.init()
	}
	Editor.prototype = {
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
				parent:this.dom
			})
			var con = l.getSelectContent;
			this.mkBtn('添加图片',pan).click(function(){
				con().startContainer.data = con().startContainer.data.insert(con().startOffset,'[[img src="http://image.zhangxinxu.com/image/blog/201711/Canvas_drawimage.jpg"]]');
			})
			this.mkBtn('添加链接',pan)
			this.mkBtn('加粗',pan).click(function(){
				
			})
		},
		textArea:function(){
			this.textArea = l.create({
				tag:'div',
				_class:'bor pad mar-t',
				style:{
					width:"100%",
					minHeight:this.dom.offset('height') + "px"
				},
				attr:{
					contentEditable:true
				},
				parent:this.dom
			})
		},
		getContent:function(){
			return this.textArea.html().replace(/\[\[/g,"<").replace(/\]\]/g,'>');
		},
		mkBtn:function(content,parent){
			return l.create({
				tag:'button',
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
	}
	window.l.editor = function(dom){
		return new Editor(dom)
	}
}())