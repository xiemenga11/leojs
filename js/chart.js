(function(w,c,d){

	/**
	 * [Chart description]
	 * @param {obj} config [description]
	 * config = {
	 * 		el:dom || ldom
	 * }
	 */
	var Chart = function(config){
		this.el = config.el;
		this.el.css('overflow','scroll');
		this.canvas = l.create({
			tag:'canvas',
			parent:this.el
		})
		this.con = this.canvas.dom.getContext('2d');
	}
	Chart.prototype = {
		setData:function(data){
			var max = data.data.max();
			var step = data.step;
			var canvasHei = 500;

			var count = Math.ceil(max/step);
			c.log(count)

			this.con.beginPath();
			this.con.moveTo(30,0);
			this.con.lineTo(30,canvasHei);
			this.con.stroke();
			this.con.closePath();
		}
	}
	w.Chart = Chart;
}(window,console,document))