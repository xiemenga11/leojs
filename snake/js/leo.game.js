//require leo.js
(function(w){
	var Game = function(canvas){
		this.el = l.id(canvas);
		this.canvas = this.el.dom.getContext('2d');
		this.canvasWid = this.el.attr('width');
		this.canvasHei = this.el.attr('height');


		this.monitorConfig = {
			//const
			PRINT_MSG:true,//是否打印指定信息
			FPS_VIEW:true,//是否打印FPS
			SHOW_KEY_CODE:true,//是否打印keyCode
			
			//attr
			FPSTime:0,
			msgObj:{
				author:'leoxie',
				version:'1.0',
				name:'leo.game.js',
				screenW:l.scr.AW,
				screenH:l.scr.AH
			},//需要打印的信息
			

			//style
			FONT:"12px Arial",
			COLOR:"green"
		}
		this.loop = false;//游戏主循环 
	}

	Game.prototype = {
		//所有游戏逻辑在此循环内执行
		startLoop:function(callback){
			var that = this;

			function _loop(t){
				that.canvas.clearRect(0,0,that.canvasWid,that.canvasHei);
				that.loop = l.aniFrm(_loop);
				callback.call(that);

				//monitor
				that.viewFPS(t);
				that.printKeyCode();
				that.printMsg();
			}
			this.loop = l.aniFrm(_loop);
		},
		stopLoop:function(){
			l.cancelAniFrm(this.loop);
			this.loop = false;
		},
		//数据监测相关
		/**
		 * 观察延迟	
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @param  {time} time   anifrm函数里的回调参数
		 * @return {[type]}        [description]
		 */
		viewFPS:function(time){
			if(!this.monitorConfig.FPS_VIEW) return;
			this.text('FPS:' + (time - this.monitorConfig.FPSTime).toFixed(2) + 'ms',[10,10]);
			this.monitorConfig.FPSTime = time;
		},
		/**
		 * 显示上一个键值
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @return {[type]}        [description]
		 */
		printKeyCode:function(){
			if(!this.monitorConfig.SHOW_KEY_CODE) return;
			var that = this;
			l().on('keydown',function(e){
				var ev = e || event;
				that.monitorConfig.SHOW_KEY_CODE = ev.keyCode;
			})
			this.text('lastKeyCode:' + this.monitorConfig.SHOW_KEY_CODE,[10,30]);
		},
		/**
		 * 将msgObj里的信息以键值对的形式显示出来
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @return {[type]}        [description]
		 */
		printMsg:function(canvas){
			if(!this.monitorConfig.PRINT_MSG) return;
			var marginTop = 0;
			for(var i in this.monitorConfig.msgObj){
				marginTop++;
				this.text(i + ":" +this.monitorConfig.msgObj[i],[10,30 + marginTop * 20])
			}
		},
		/**
		 * 在画布上显示信息
		 * @param  {canvasObj} canvas 用于显示的画布
		 * @param  {str} text   要显示的文字
		 * @param  {arr} posArr 坐标
		 * @return {[type]}        [description]
		 */
		text:function(text,posArr){
			this.canvas.save();
			this.canvas.fillStyle = this.monitorConfig.COLOR;
			this.canvas.font = this.monitorConfig.FONT;
			this.canvas.fillText(text,posArr[0],posArr[1]);
			this.canvas.restore();
		}
	}

	/**
	 * 创建最基本的物体
	 * @param {obj} data {
	 *                   game:Game object
	 *                   posx:x坐标
	 *                   posy:y坐标
	 *                   wid:宽
	 *                   hei:高
	 *                   }
	 */
	Game.Object = function(data){
		this.root = data.game;//Game object
		this.posx = data.posx;
		this.posy = data.posy;
		this.wid = data.wid;
		this.hei = data.hei;
	}
	Game.Object.prototype = {
		drawBody:function(){
			this.root.canvas.fillRect(this.posx,this.posy,this.wid,this.hei);
		},
		run:function(){
			this.drawBody();
		},
		init:function(){},
		die:function(){alert('i am die')},
		/**
		 * 碰撞检测
		 * @param  {GameObjec}   GameObject Game.Object创建的物体
		 * @param  {Function} callback   碰撞后的回调函数
		 * @return {bool}              碰撞返回true
		 */
		punch:function(GameObject,callback){
			var x1 = this.posx;
			var y1 = this.posy;
			var x2 = this.posx + this.wid;
			var y2 = this.posy + this.hei;

			if(x1 < GameObject.posx + GameObject.wid 
				&& x2 > GameObject.posx
				&& y1 < GameObject.posy + GameObject.hei
				&& y2 > GameObject.posy){
				if(callback){
					callback.call(this,GameObject);
				}
				return true;
			}
		}
	}

	
	Game.loadAudio = function(src){
		var audio =  l.create({
			tag:'audio'
		}).dom
		if(src) audio.src = src;
		return audio;
	}
	Game.loadImg = function(src){
		var img = new Image();
		if(src) img.src = src;
		return img;
	}
	w.Game = Game;
}(window))