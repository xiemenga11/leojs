var Boom = function(plane){
	this.body = boomImg;
	this.size = 30;
	this.posX = plane.posX;
	this.posY = plane.posY;
	this.i = 0;
	this.isDie = false;
}
Boom.prototype = {
	bang:function(){
		if(this.i < 6) this.i += 0.25 ;
		this.drawBody();
		if(this.i >= 6) this.isDie = true;
	},
	drawBody:function(){
		main.drawImage(this.body,parseInt(this.i) * 80,0,80,120,this.posX,this.posY,this.size,this.size);
	}
}