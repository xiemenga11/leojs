var SnakeBody = function(data){
	Game.Object.call(this,data);
}
SnakeBody.extend(Game.Object)

var Snake = function(root){
	this.root = root;
	this.body = [];
}
Snake.prototype = {
	eat:function(){
		this.body.push(new SnakeBody({
			game:this.root,
			wid:10,
			hei:10,
			posx:this.body[this.body.length-1].posx,
			posy:this.body[this.body.length-1].posy
		}))
	},
	run:function(){
		this.body[0].run()
		for(var i = 1; i < this.body.length; i++){
			this.body[i].posx = this.body[i-1].posx+10;
			this.body[i].posy = this.body[i-1].posy+10;
			this.body[i].run();
		}
	}
}
