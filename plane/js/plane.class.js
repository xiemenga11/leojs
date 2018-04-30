var Plane = function(img,posX,posY,speed){
	this.size = [30,30];
	this.posX = posX || (800-this.size[0])/2;
	this.posY = posY || (500-this.size[1]);
	this.speed = speed || 1;
	this.ammoAmount = 3;
	this.ammo = [];
	this.l = false;
	this.r = false;
	this.t = false;
	this.b = false;
	this.body = img;
}
Plane.prototype = {
	drawBody:function(){
		main.drawImage(this.body,this.posX,this.posY,this.size[0],this.size[1]);
		// main.fillRect(this.posX,this.posY,this.size[0],this.size[1]);
	},
	run:function(enemyArr){
			if(this.l){
				this.posX - this.speed > 0
				? this.posX -= this.speed
				: this.posX = 0;
			}
				
			if(this.r){
				this.posX + this.speed < canvasWid - this.size[0]
				? this.posX += this.speed
				: this.posX = canvasWid - this.size[0];
			}
				
			if(this.t){
				this.posY - this.speed > 0
				? this.posY -= this.speed
				: this.posY = 0;
			}
				
			if(this.b){
				this.posY + this.speed < canvasHei - this.size[1]
				? this.posY += this.speed
				: this.posY = canvasHei - this.size[1];
			}
		if(this.ammo.length){
			for(var i = 0,len = this.ammo.length; i < len; i++){	
				// (this.ammo[i] && !this.ammo[i].run()) || this.ammo.splice(i,1)
				this.ammo[i] && this.ammo[i].isDie && this.ammo.splice(i,1);
				this.ammo[i] && this.ammo[i].run();

				for(var j = 0,len = enemyArr.length; j < len; j++){
					if(
						this.ammo[i]
						&& this.ammo[i].posY <= enemyArr[j].posY + enemyArr[j].size[1]
						&& this.ammo[i].posX + this.ammo[i].size - 1 > enemyArr[j].posX
						&& this.ammo[i].posX < enemyArr[j].posX + enemyArr[j].size[1] - 1
						){
						booms.push(new Boom(enemyArr[j]));
						this.ammo[i].isDie = true;
						// enemyArr[j].posY = -enemyArr[j].size[1];
						// boomMsc.load(); 
						// boomMsc.play();
						hited = true;
						enemyArr[j].die();
					}
				}
			}		
		}

		this.drawBody();
	},
	shot:function(){
		this.ammo.push(new Ammo(this));
	}
}

var Enemy = function(img,posX,posY,speed){
	Plane.call(this,img,posX,posY,speed);
}
Enemy.extend(Plane);
Enemy.prototype.extend({
	drawBody:function(){
		main.save();
		main.translate(this.posX + this.size[0], this.posY + this.size[1]);
		main.rotate(Math.PI);
		main.drawImage(this.body,0,0,this.size[0],this.size[1]);
		main.restore();
	},
	run:function(){
		if(this.posY < 500){
			this.posY +=this.speed;
		}else{
			this.die();
		}
		this.drawBody();
	},
	die:function(){
		this.posY = -this.size[1];
		this.speed = Math.random() * 2;
		this.posX = Math.random() * (1000 - this.size[0])
	}
})