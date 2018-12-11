var canvasDiv,width,height,canvas;
var bg = 50;
const snowman = new Snowman(100,1,1);
const snowmanAI = new Snowman(1,-1);
var snowBallArray = [];
var frames = 0;

function setup() {
    //Canvas properties
    canvasDiv=document.getElementById('sketch_holder');
    canvas=createCanvas(width,height);
    canvas.parent('sketch_holder');
    windowResized();
    background(bg);
    frameRate(60);
}

function draw() {
    background(50);
    snowman.draw();
    if(snowBallArray.length>0){
        snowBallArray.forEach(function(snowball){
            snowball.draw();
        });
    }
    if(keyIsDown(UP_ARROW)){
        snowman.move("up");
    } else if(keyIsDown(DOWN_ARROW)){
        snowman.move("down");
    } else if(keyIsDown(32)){
        if(frames >= 15){
            snowBallArray[snowBallArray.length] = new Snowball(snowman.bodyY,snowman.x);
            frames=0;
        }
    }
    frames+=1;
}

function windowResized(){
    canvasDiv = document.getElementById('sketch_holder');
    width = canvasDiv.offsetWidth;
    height = canvasDiv.offsetHeight;
    resizeCanvas(width, height);
    snowman.resize(1,1);
    if(snowBallArray.length>0){
        snowBallArray.forEach(function(snowball){
            snowball.resize();
        });
    }
}

var pressed = false;

function keyPressed() {
    if (keyCode == 81 && !pressed) {
      noLoop();
      pressed = true;
    } else if(keyCode == 81 && pressed){
        loop();
        pressed = false;
    }
  }