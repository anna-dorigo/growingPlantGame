
var canvas = document.getElementById("game-screen");
var ctx = canvas.getContext('2d');

(function(){
	// draw grass 
	ctx.beginPath();
	ctx.moveTo(200, 550);
	ctx.bezierCurveTo(250, 500, 350, 500, 400, 550);
	ctx.fillStyle = "#BED674";
	ctx.fill();

})();