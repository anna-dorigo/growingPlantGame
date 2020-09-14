
// setting up global variables
let canvas = document.getElementById("game-screen");
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
     "light, and vitamins to give the plant to grow healthy for 10 days.\n\n"+
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

document.body.addEventListener("load",initialSetUp());

let feedPlantBtn = document.getElementById("feed-plant-button");
feedPlantBtn.addEventListener("click", feedPlant);