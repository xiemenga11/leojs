var Ammo = function(plane){
	this.posX = plane.posX + plane.size[0] / 2;
	this.posY = plane.posY;
	this.size = 5;
	this.speed = 3;
	this.isDie = false;
}
Ammo.prototype = {
	drawBody:function(){
		main.save();
		main.drawImage(ammoImg,this.posX,this.posY,this.size,this.size);
		// main.beginPath();
		// main.fillStyle = 'red';
		// main.arc(this.posX,this.posY,this.size,0,2 * Math.PI);
		// main.fill();
		// main.closePath();
		main.restore();
	},
	run:function(i){
		this.posY -= this.speed;
		this.drawBody();
		this.isDie = this.posY <= -this.size
		// return this.posY <= -this.size;
	}
}