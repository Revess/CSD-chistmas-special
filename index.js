var canvasDiv,width,height,canvas;
var bg = 255;
const snowman = new Snowman(15,1,1);
const snowmanP2 = new Snowman(75,1,-1);
var snowBallArray = [];
var snowBallArrayP2 = [];
var frames = 0;
var framesAI = 0;
var randomDirection;
var randomShoot;

//Functions
function hitRegistration(){
    //Check hits of P1
    snowBallArrayP2.forEach(function(snowball){
        //Check if snowball is out of bounds
        if(snowball.hitRight <= 0 || snowball.hitLeft >= width){
            snowBallArrayP2.splice(snowBallArrayP2.indexOf(snowball),1);
        //Check if snowball is in body region
        }else if(snowball.hitLeft <= snowman.hitRight && snowball.hitLeft >= snowman.hitLeft){  
            //Check if snowball is in snowman top or bottom
            if(snowball.hitTop <= snowman.hitBottom && snowball.hitTop >= snowman.hitTop || snowball.hitBottom <= snowman.hitBottom && snowball.hitBottom >= snowman.hitTop){
                snowman.hit();
                snowmanP2.score+=1;
                snowBallArrayP2.splice(snowBallArrayP2.indexOf(snowball),1);
            }
        }
    });

    //Check hits fo P2
    snowBallArray.forEach(function(snowball){
        //Check if snowball is out of bounds
        if(snowball.hitRight <= 0 || snowball.hitLeft >= width){
            snowBallArray.splice(snowBallArray.indexOf(snowball),1);
        //Check if snowball is in body region
        }else if(snowball.hitRight <= snowmanP2.hitRight && snowball.hitRight >= snowmanP2.hitLeft){  
            //Check if snowball is in snowman top or bottom
            if(snowball.hitTop <= snowmanP2.hitBottom && snowball.hitTop >= snowmanP2.hitTop || snowball.hitBottom <= snowmanP2.hitBottom && snowball.hitBottom >= snowmanP2.hitTop){
                snowmanP2.hit();
                snowman.score+=1;
                snowBallArray.splice(snowBallArray.indexOf(snowball),1);
            }
        }
    });
}

//Setup
function setup() {
    //Canvas properties
    canvasDiv=document.getElementById('sketch_holder');
    canvas=createCanvas(width,height);
    canvas.parent('sketch_holder');
    windowResized();
    background(bg);
    frameRate(60);
}

//Draw
function draw() {
    background(bg);
    fill(100);
    noStroke();
    rect((width/100)*15,0,(width/100)*10,height);
    rect((width/100)*75,0,(width/100)*10,height);

    textSize(36);
    text(snowman.score, 50, 50);
    text(snowmanP2.score, width-50, 50);

    snowman.draw();
    snowmanP2.draw();

    //Check if array is empty, otherwise draw snowball P1
    if(snowBallArray.length>0){
        snowBallArray.forEach(function(snowball){
            snowball.draw();
        });
    }

    //Check if array is empty, otherwise draw snowball P2
    if(snowBallArrayP2.length>0){
        snowBallArrayP2.forEach(function(snowball){
            snowball.draw();
        });
    }

    //Checking if pressing up
    if(keyIsDown(UP_ARROW)){
        snowman.move("up",10);
    
    //Check if moving down, cannot do this while pressing up
    } else if(keyIsDown(DOWN_ARROW)){
        snowman.move("down",10);
    }

    //Register the Spacebar
    if(keyIsDown(32)){
        if(frames >= 15){
            snowBallArray[snowBallArray.length] = new Snowball(snowman.bodyY,snowman.x,1);
            frames=0;
        }
    }

    //Code for snowman AI
    if(frameCount%30 == 0){
        randomDirection = random();
    }
    if(randomDirection > 0.5 && snowmanP2.hitTop > snowman.hitTop-(height/5)){
        snowmanP2.move("up",10);
    } else if(randomDirection < 0.5 && snowmanP2.hitBottom < snowman.hitBottom+(height/5)){
        snowmanP2.move("down",10);
    }
        randomShoot = random(); 
    if(randomShoot > 0.95 && snowmanP2.hitTop > snowman.hitTop-(height/15) || randomShoot > 0.95 && snowmanP2.hitTop > snowman.hitBottom-(height/15) ){
        if(framesAI >= 15){
            snowBallArrayP2[snowBallArrayP2.length] = new Snowball(snowmanP2.bodyY,snowmanP2.x,-1);
            framesAI = 0;
        }
    }
    framesAI+=1;
    frames+=1;
    hitRegistration();
}

//What happens when the window resizes
function windowResized(){
    canvasDiv = document.getElementById('sketch_holder');
    width = canvasDiv.offsetWidth;
    height = canvasDiv.offsetHeight;
    resizeCanvas(width, height);

    fill(100);
    noStroke();
    rect((width/100)*15,0,(width/100)*10,height);
    rect((width/100)*75,0,(width/100)*10,height);

    snowman.resize(1,1);
    snowmanP2.resize(1,-1);
    if(snowBallArray.length>0){
        snowBallArray.forEach(function(snowball){
            snowball.resize();
        });
    }
    if(snowBallArrayP2.length>0){
        snowBallArrayP2.forEach(function(snowball){
            snowball.resize();
        });
    }
}

//To pause the game with q
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