
// setting up global variables
var canvas = document.querySelector('#game-screen')
var ctx = canvas.getContext('2d');
const weatherOptionsFileNames = ["./images/rainnyDay.png","./images/sunnyDay.png"];
const weatherOptions = ["rainny", "sunny"];
const flowerImagePath = "./images/flower.png";
var currentDay = 1
var currentWeather = "";
var yPosition = 525;
var counter = 5;


// draw grass 
ctx.beginPath();
ctx.moveTo(200, 550);
ctx.bezierCurveTo(250, 500, 350, 500, 400, 550);
ctx.fillStyle = "#BED674";
ctx.fill();



function initialSetUp(){
    alert("Welcome to the plant growing game!! \n"+
     "The idea is to find the right amount of water,"+
     "light, and vitamins to give the plant to grow healthy for 5 days.\n\n"+
     "Click ok to start!");

    let todayWeather = Math.floor(Math.random() * 2);
    console.log(weatherOptions[todayWeather]);

    let weatherImagePath = weatherOptionsFileNames[todayWeather];
    let weatherImgObj = new Image();
    weatherImgObj.src = weatherImagePath;
    currentWeather = weatherOptions[todayWeather];

    weatherImgObj.onload = function(){
    
        //Draw the image onto the canvas.
        ctx.drawImage(weatherImgObj, 0, 0, 200, 200);
    }
}

function feedPlant(){
    let lightValue = document.getElementById("light").value;
    let waterValue = document.getElementById("water").value;
    let vitaminsValue = document.getElementById("vitamins").value;

    console.log("values "+ lightValue+"-"+waterValue+"-"+vitaminsValue);
    console.log(currentWeather)

    if(currentWeather === "rainny"){
        if(waterValue < 4 && lightValue > 2 && vitaminsValue > 5 ){
        	grow();
        }else{
            //plantDie();
            console.log("die!! rainny");
        }
    }

    if(currentWeather === "sunny"){
        if(waterValue > 4 && lightValue < 2 && vitaminsValue < 5 ){
        	grow();
        }else{
            //plantDie();
            console.log("die!!sunny");
        }
    }

    //reset inputs
    document.getElementById("light").value = 1;
    document.getElementById("water").value = 1;
    document.getElementById("vitamins").value = 1;

}

function updateCurrentDayTitle(){
	let currentDayTitle = document.getElementById("current-day-title");
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
    	if (currentDay === 3){
    		drawLeaf();
    	}
	}
	
}

function addFlower(){
	let flowerImgObj = new Image();
    flowerImgObj.src = flowerImagePath;

    flowerImgObj.onload = function(){
    
        //Draw the image onto the canvas.
        ctx.drawImage(flowerImgObj, 198, 110, 200, 200);
    }
}

function plantGrowingAmination(){
        
    if(counter > 0){

    	console.log("growing")
	    ctx.beginPath();
	    ctx.moveTo(300, yPosition);
	    ctx.lineTo(300, yPosition - 12);
	    ctx.lineWidth = 10;
	    ctx.strokeStyle = "#BED674";
	    ctx.stroke();
	    ctx.closePath();
	    yPosition = yPosition - 12;
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
    ctx.stroke()
    ctx.closePath(); 
}


function plantDie(){


}

document.body.addEventListener("load",initialSetUp());
let feedPlantBtn = document.getElementById("feed-plant-button");
feedPlantBtn.addEventListener("click", feedPlant);