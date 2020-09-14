
// setting up global variables
var canvas = document.getElementById("game-screen");
var ctx = canvas.getContext('2d');
const weatherOptionsFileNames = ["./images/rainnyDay.png","./images/sunnyDay.png"];
const weatherOptions = ["rainny", "sunny"];
var currentDay = 1
var currentWeather = ""


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
            plantGrow();
            console.log("grow!! rainny");
        }else{
            //plantDie();
            console.log("die!! rainny");
        }
    }

    if(currentWeather === "sunny"){
        if(waterValue > 4 && lightValue < 2 && vitaminsValue < 5 ){
            plantGrow();
            console.log("grow!! sunny");
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

function plantGrow(){
        
    console.log("growing")
    ctx.beginPath();
    ctx.moveTo(300, 525);
    ctx.lineTo(300, 450);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#BED674";
    ctx.stroke();

}

document.body.addEventListener("load",initialSetUp());
let feedPlantBtn = document.getElementById("feed-plant-button");
feedPlantBtn.addEventListener("click", feedPlant);