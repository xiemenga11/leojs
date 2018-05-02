//require leo.js
(function(w){
	var Game = function(canvas){
		this.el = l.id(canvas);
		
		// this.canvas = this.el.dom.getContext('2d');
		var canvas = this.el.dom.getContext('2d');
		this.canvasWid = this.el.attr('width');
		this.canvasHei = this.el.attr('height');
		this.delayTime = 0;
		this.time = 0;

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
				screenH:l.scr.AH,
				innerW:l.scr.innerW,
				innerH:l.scr.innerH
			},//需要打印的信息
			

			//style
			FONT:"12px Arial",
			COLOR:"green"
		}
		this.loop = false;//游戏主循环 

		this.prop('canvas',{
			get:function(){
				return canvas;
			}
		})
	}

	Game.prototype = {
		//所有游戏逻辑在此循环内执行
		startLoop:function(callback){
			var that = this;

			function _loop(t){
				that.canvas.clearRect(0,0,that.canvasWid,that.canvasHei);
				that.loop = l.aniFrm(_loop);
				that.delayTime = t - that.monitorConfig.FPSTime;
				that.time = t;
				callback.call(that,t);
				
			}
			this.loop = l.aniFrm(_loop);
		},
		stopLoop:function(){
			l.cancelAniFrm(this.loop);
			this.loop = false;
		},
		infoMonitor:function(t){
			this.viewFPS(t);
			this.printKeyCode();
			this.printMsg();
		},
		setMsg:function(msg){
			this.monitorConfig.msgObj.extend(msg);
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
			this.text('FPS:' + this.delayTime.toFixed(2) + 'ms',[10,10]);
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


	Game.Interval = function(gameObject,interval,callback){
		this.root = gameObject;
		this.time = gameObject.time;
		this.interval = interval;
		this.callback = callback || function(){};
		this.stop = false;
	}
	Game.Interval.prototype = {
		run:function(){
			if(this.stop) return;
			if(this.root.time - this.time >= this.interval){
				this.time = this.root.time;
				this.callback();
			}
		},
		clear:function(){
			this.stop = true;
		},
		toggle:function(){
			this.stop = !this.stop;
		},
		begin:function(){
			this.stop = false;
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
	/**
	 * 拖动尾部
	 * @param {obj} data {
	 *                   root:gameObject
	 *                   tailLength:尾巴长度
	 *                   px:X轴偏移量
	 *                   py:Y轴偏移量
	 *                   owner:new Game.Object实例对象
	 * }
	 */
	Game.DragTail = function(data){
		this.root = data.root;
		this.tailLength = data.tailLength;
		this.body = [];
		this.px = data.px || 0;//X轴偏移量
		this.py = data.py || 0;//y轴偏移量
		this.owner = data.owner;
		this.init(this.owner);//data.owner  是  new Game.Object实例对象
	}
	Game.DragTail.prototype = {
		init:function(GameObject){
			var that = this;
			l.times(this.tailLength,function(){
				that.body.push(new Game.Object({
					game:that.root,
					wid:10,
					hei:10,
					posx:GameObject.posx,
					posy:GameObject.posy
				}))
			})
		},
		run:function(){
			var bodyLen = this.body.length;
			this.follow()
			this.root.canvas.beginPath()
			this.root.canvas.moveTo(this.body[bodyLen - 1].posx + this.px,this.body[bodyLen - 1].posy + this.py)
			for(var i = bodyLen - 1; i > 0 ; i--){
				this.body[i].posx = this.body[i-1].posx;
				this.body[i].posy = this.body[i-1].posy;
				this.root.canvas.lineTo(this.body[i-1].posx + this.px,this.body[i-1].posy + this.py)

				// this.body[i].run();
			}
			this.root.canvas.stroke()
			this.root.canvas.closePath()
		},
		follow:function(){
			this.body[0].posx = this.owner.posx;
			this.body[0].posy = this.owner.posy;
		}
	}
	
	Game.ImgAnimation = function(data){
		this.root = data.root;//gameObject
		this.imgs = [];
		this.size = data.size;//Arr
		this.index = data.index || 0;
		data.imgArr && this.loadImg(data.imgArr);
		this.stopIndex = data.stopIndex || 0;
		this.owner = data.owner;//GameObject
		this.speed = data.speed || 1;
		this.finished = true;
		this.px = data.px || 0;
		this.py = data.py || 0;
	}

	Game.ImgAnimation.prototype = {
		loadImg:function(imgArr){
			for(var i = 0,len = imgArr.length; i < len; i++){
				var img = new Image();
				img.src = imgArr[i];
				this.imgs.push(img);
			}
		},
		draw:function(drawImageArgsArr){
			this.root.canvas.drawImage.apply(this.root.canvas,drawImageArgsArr);
		},
		run:function(){
			if(this.finished) return;
			if(this.index < this.imgs.length-1){
				this.index += this.speed;
			}else{
				this.index = 0;
				this.finished = true;
			}
			this.draw([this.imgs[parseInt(this.index)],this.owner.posx + this.px,this.owner.posy + this.py,this.size[0],this.size[1]]);
		}
	}



	//static method
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