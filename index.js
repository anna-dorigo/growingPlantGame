
// setting up global variables
const canvas = document.querySelector('#game-screen');
const ctx = canvas.getContext('2d');
const restartGameBtn = document.getElementById("restart-game-button");
const currentDayTitle = document.getElementById("current-day-title");
const weatherOptionsFileNames = ["./images/rainnyDay.png","./images/sunnyDay.png"];
const weatherOptions = ["rainny", "sunny"];
const flowerImagePath = "./images/flower.png";
const growingRate = 12;
var currentDay = 1;
var currentWeather = "";
var yPosition = 525; // Y coordinate of the top of the plant
var counter = 5; // amount of times animation will run
var weatherXPosition = 0;
var weatherSpeed = 1;
var weatherAnimationId = null;


// draw grass 
(function(){
	ctx.beginPath();
	ctx.moveTo(200, 550);
	ctx.bezierCurveTo(250, 500, 350, 500, 400, 550);
	ctx.fillStyle = "#BED674";
	ctx.fill();
}());


function initialSetUp(){
    alert("Welcome to the plant growing game! \n"+
     "The idea is to find the right amount of water, "+
     "light, and vitamins to give the plant to grow healthy for 5 days.\n\n"+
     "Note: Pay attention to the current weather to make the best decision.\n"+
     "Click ok to start!");

    updateWeather();
}

function feedPlant(){
    let lightValue = document.getElementById("light").value;
    let waterValue = document.getElementById("water").value;
    let vitaminsValue = document.getElementById("vitamins").value;

    console.log(currentWeather);
    if(currentWeather === "rainny"){
        if(waterValue <= 2 && lightValue >= 2 && vitaminsValue >= 5 ){
        	grow();
        }else{
            die();
        }
    }else if(currentWeather === "sunny"){
        if(waterValue > 2 && lightValue < 2 && vitaminsValue < 5 ){
        	grow();
        }else{
            die();
        }
    }

    //reset inputs
    document.getElementById("light").value = 0;
    document.getElementById("water").value = 0;
    document.getElementById("vitamins").value = 0;

}

function updateCurrentDayTitle(){
	let newTitle = "Day " + currentDay;
	currentDayTitle.innerText = newTitle;
}

function grow(){
	if(currentDay === 5){
		addFlower();
	}
	else{
		counter = 5;
    	requestAnimationFrame(plantGrowingAmination);
    	currentDay = currentDay + 1;
    	updateCurrentDayTitle();
    	if (currentDay === 4){
    		drawLeaf();
    	}
    	updateWeather();
	}
	
}

var weatherImgObj = new Image();

function updateWeather(){

	let todayWeather = Math.floor(Math.random() * 2);
    let weatherImagePath = weatherOptionsFileNames[todayWeather];
    weatherImgObj.src = weatherImagePath;
    currentWeather = weatherOptions[todayWeather];

    weatherImgObj.onload = function(){
    
        //Draw the image onto the canvas.
        ctx.clearRect(0, 0, 200, 200);
        ctx.drawImage(weatherImgObj, 0, 0, 200, 200);
        animateWeather();
    }

}


function animateWeather(){
    ctx.clearRect(0, 0, canvas.width, 200);
    ctx.drawImage(weatherImgObj, weatherXPosition, 0, 200, 200);
    weatherXPosition = weatherXPosition + weatherSpeed;
    if(weatherXPosition >= canvas.width){
        cancelAnimationFrame(animateWeather);
        weatherXPosition = 0;
        feedPlant();
    }
    else{
        weatherAnimationId = requestAnimationFrame(animateWeather);
    }
    
}



function addFlower(){
	let flowerImgObj = new Image();
    flowerImgObj.src = flowerImagePath;
    ctx.clearRect(0, 0, 200, 200);

    flowerImgObj.onload = function(){
    
        //Draw the image onto the canvas.
        ctx.drawImage(flowerImgObj, 198, 110, 200, 200);
        
    }
    showWinningMessage();
}

function showWinningMessage(){
	let newTitle = "Mission accomplished, you won!";
	currentDayTitle.innerText = newTitle;
	
}

function plantGrowingAmination(){
        
    if(counter > 0){

    	console.log("growing");
	    ctx.beginPath();
	    ctx.moveTo(300, yPosition);
	    ctx.lineTo(300, yPosition - growingRate);
	    ctx.lineWidth = 10;
	    ctx.lineCap = "round";
	    ctx.strokeStyle = "#BED674";
	    ctx.stroke();
	    ctx.closePath();
	    yPosition = yPosition - growingRate;
	    requestAnimationFrame(plantGrowingAmination);
	    counter = counter - 1;
    }
}

function drawLeaf(){

    ctx.beginPath();
	ctx.arc(307,350,50,0,0.5*Math.PI);
    ctx.arc(357,400,50,Math.PI, 1.5*Math.PI);
    ctx.strokeStyle = "#BED674";
    ctx.fillStyle=("#BED674");
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.closePath(); 
}

function showLoosingMessage(){
	let newTitle = "I'm sorry your plant just died";
	currentDayTitle.innerText = newTitle;
}


function die(){
	displayDeadPlant();
	showLoosingMessage();
}

function displayDeadPlant(){
	console.log("display dead plant");
	ctx.clearRect(200, 200, 200, 312);
	ctx.beginPath();
	ctx.moveTo(300, 525);
	ctx.lineTo(300, 400);
	ctx.lineWidth = 10;
	ctx.lineCap = "round";
	ctx.strokeStyle = "#904A25";
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(350,400,50, Math.PI, 0);
    ctx.strokeStyle = "#904A25";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath(); 

    ctx.beginPath();
	ctx.arc(350,400,50,0,0.5*Math.PI);
    ctx.arc(400,450,50,Math.PI, 1.5*Math.PI);
    ctx.strokeStyle = "#904A25";
    ctx.fillStyle=("#904A25");
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.closePath(); 



}


restartGameBtn.addEventListener("click", function(){location.reload();});
document.body.addEventListener("load",initialSetUp());
