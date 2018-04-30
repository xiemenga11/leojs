var ani;//mainloop
var hited = false;//is palene hited
var main = l.id('main').dom.getContext('2d');//canvas
var canvasWid = l.id('main').attr('width');
var canvasHei = l.id('main').attr('height');
//img source
var planeImg = new Image();
planeImg.src = 'img/plane.png';
var enemyImg = new Image();
enemyImg.src = 'img/enemy.png';
var ammoImg = new Image();
ammoImg.src = 'img/ammo.png';
var boomImg = new Image();
boomImg.src = 'img/boom.png';

var shotMsc = l.create({
	tag:'audio'
}).dom;
shotMsc.src = 'audio/daodan.wav';
var boomMsc = l.create({
	tag:'audio'
}).dom;
boomMsc.src = 'audio/baozha.mp3';


var plane = new Plane(planeImg);
plane.speed = 3;
var enemys = [];
var booms = [];
l.times(10,function(){
	enemys.push(new Enemy(enemyImg,Math.random() * 970,-(Math.random() * 500 + 500 ),Math.random() * 2));
})



//dev config
