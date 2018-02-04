(function(w,d){
	var LeoParser = function(wrap){
		this.wrap = wrap;
		this.render();
	}

	LeoParser.prototype = {
		render:function(){
			var con = this.wrap.innerHTML;
			for(var i = 0,len = this.keyWord.length; i < len ; i ++){
				con = con.replace(new RegExp(this.keyWord[i],'g'),'<span style="color:#007aff;">' + this.keyWord[i] + '</span>')
			}
			this.wrap.innerHTML = con;
		},
		keyWord:[
			'var',
			'function',
			'if',
			'else',
			'while',
			'for',
			'continue',
			'break',
			'case',
			'console'
		]
	}
	// window.LeoParser = LeoParser;
	new LeoParser(document.getElementById('test'));
}(window,document))