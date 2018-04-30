(function(w,d){
	w.tool = {
		//const
		PRINT_MSG:true,
		FPS_VIEW:true,
		SHOW_KEY_CODE:true,
		

		//attr
		FPSTime:0,
		msgObj:{},
		//method
		/**
		 * 观察延迟	
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @param  {time} time   anifrm函数里的回调参数
		 * @return {[type]}        [description]
		 */
		viewFPS:function(canvas,time){
			if(!this.FPS_VIEW) return;
			this.text(canvas,'FPS:' + (time - this.FPSTime).toFixed(2) + 'ms',[10,10]);
			this.FPSTime = time;
		},
		/**
		 * 显示上一个键值
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @return {[type]}        [description]
		 */
		printKeyCode:function(canvas){
			if(!this.SHOW_KEY_CODE) return;
			var that = this;
			l().on('keydown',function(e){
				var ev = e || event;
				that.SHOW_KEY_CODE = ev.keyCode;
			})
			that.text(canvas,'lastKeyCode:' + this.SHOW_KEY_CODE,[10,30]);
		},
		/**
		 * 将msgObj里的信息以键值对的形式显示出来
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @return {[type]}        [description]
		 */
		printMsg:function(canvas){
			if(!this.PRINT_MSG) return;
			var marginTop = 0;
			for(var i in this.msgObj){
				marginTop++;
				this.text(canvas,i + ":" +this.msgObj[i],[10,30 + marginTop * 20])
			}
		},
		/**
		 * 在画布上显示信息
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @param  {str} text   要显示的文字
		 * @param  {arr} posArr 坐标
		 * @return {[type]}        [description]
		 */
		text:function(canvas,text,posArr){
			canvas.save();
			canvas.fillStyle = 'red';
			canvas.font = '12px Arial';
			canvas.fillText(text,posArr[0],posArr[1]);
			canvas.restore();
		}
	}
}(window,document))