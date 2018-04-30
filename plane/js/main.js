
// tool.printKeyCode(true);//print keyCode

function control(e,tf){
	switch(e.keyCode){
		case 37:
			plane.l = tf;
			break;
		case 38:
			plane.t = tf;
			break;
		case 39:
			plane.r = tf;
			break;
		case 40:
			plane.b = tf;
			break;	
	}
}
l().on('keydown',function(e){
	var ev = e || event;
	control(ev,true);
}).on('keyup',function(e){
	var ev = e || event;
	control(ev,false);

	if(ev.keyCode == 32){
		plane.shot();
		shotMsc.load();
		shotMsc.play();
	}
})

function isHited(){
	if(hited){
		boomMsc.load(); 
		boomMsc.play();
	}
	hited = false;
}
function mainloop(t){
	main.clearRect(0,0,1000,500);
	//game code
	tool.msgObj.ammoAmount = plane.ammo.length;//tool show ammo amount
	tool.msgObj.extend({
		posX:plane.posX,
		posY:plane.posY,
		booms:booms.length
	})
	tool.viewFPS(main,t);
	tool.printKeyCode(main);
	tool.printMsg(main);
	
	plane.run(enemys);

	l.times(10,function(){
		enemys[this].run()
	})

	if(booms.length){
		for(var i = 0; i < booms.length; i++){
			booms[i].isDie && booms.splice(i,1);
			booms[i] && booms[i].bang();
		}
	}

	isHited();//when enemy is hited playing music
	//game code
	
	ani = l.aniFrm(mainloop);
}
ani = l.aniFrm(mainloop);