class Snowman {
    constructor(xRelative,size,direction){
        //Gerenals
        this.xRelative = xRelative;

        //Relative screen properties
        this.screenpercentage=window.innerWidth/100;
        this.size = size*(this.screenpercentage*4);
        this.sizePercentage = this.size/100;

        //Movement
        this.speed = 10;
        this.acceleration = 0;
        this.slidingTime = 250;

        //Body properties
        this.bodySize = this.size*1.25;
        this.x = this.bodySize+(this.screenpercentage*this.xRelative);
        this.y = window.innerHeight/2;
        this.bodyY = this.y+this.size/1.5;

        //Carrot properties
        this.carrotX = this.x+((this.sizePercentage*25)*direction);
        this.carrotTipX = this.x+this.size*direction;

        //Eye properties
        this.eyeSize = this.sizePercentage*15;
        this.eyeX = this.x+(this.sizePercentage*5)*direction;
        this.eyeY = this.y-(this.sizePercentage*10);

        //button properties
        this.buttonX = this.x+((this.sizePercentage*50)*direction);
        this.buttonY = this.bodyY;
        this.buttonOuterX = this.buttonX-(this.sizePercentage*8)*direction;

        //SnowBall properties
        this.snowBallArray = [];

        //hitBox
        this.hitRight = this.x+(this.bodySize/2);
        this.hitLeft = this.x-(this.bodySize/2);
        this.hitTop = this.bodyY+(this.bodySize/2)+this.size;
        this.hitBottom = this.bodyY-(this.bodySize/2);
    }

    draw() {
        noStroke();
        fill(255);
        //Head
        ellipse(this.x,this.y,this.size);

        //Body
        ellipse(this.x,this.bodyY,this.bodySize);

        //Carrot Nose
        fill(color("orange"));
        triangle(this.carrotX,this.y+(this.size*0.1),this.carrotX,this.y-(this.size*0.1),this.carrotTipX,this.y);
        
        //Eye
        fill(color("black"));
        ellipse(this.eyeX,this.eyeY,this.eyeSize);

        //Buttons
        ellipse(this.buttonX, this.buttonY,this.eyeSize); //Middle button
        ellipse(this.buttonOuterX, this.buttonY-(this.sizePercentage*25),this.eyeSize); //Lowest button
        ellipse(this.buttonOuterX, this.buttonY+(this.sizePercentage*25),this.eyeSize); //Top button
    }

    resize(size,direction) {
        this.screenpercentage=window.innerWidth/100;
        this.size = size*(this.screenpercentage*4);
        this.sizePercentage = this.size/100;

        //Body properties
        this.bodySize = this.size*1.25;
        this.x = this.bodySize+(this.screenpercentage*this.xRelative);
        this.y = window.innerHeight/2;
        this.bodyY = this.y+this.size/1.5;

        //Carrot properties
        this.carrotX = this.x+((this.sizePercentage*25)*direction);
        this.carrotTipX = this.x+this.size*direction;

        //Eye properties
        this.eyeSize = this.sizePercentage*15;
        this.eyeX = this.x+(this.sizePercentage*5)*direction;
        this.eyeY = this.y-(this.sizePercentage*10);

        //button properties
        this.buttonX = this.x+((this.sizePercentage*50)*direction);
        this.buttonY = this.bodyY;
        this.buttonOuterX = this.buttonX-(this.sizePercentage*8)*direction;

        //hitBox
        this.hitRight = this.x+(this.bodySize/2);
        this.hitLeft = this.x-(this.bodySize/2);
        this.hitTop = this.bodyY+(this.bodySize/2)+this.size;
        this.hitBottom = this.bodyY-(this.bodySize/2);
    }

    move(direction){
        if(direction == "up" && this.y-(this.size/2)-this.speed > 0){
            this.y-=this.speed;
            this.bodyY-=this.speed;
            this.eyeY-=this.speed;
            this.buttonY-=this.speed;
        } else if(direction == "down" && this.bodyY+(this.bodySize/2)+this.speed < height){
            this.y+=this.speed;
            this.bodyY+=this.speed;
            this.eyeY+=this.speed;
            this.buttonY+=this.speed;
        }
        this.hitRight = this.x+(this.bodySize/2);
        this.hitLeft = this.x-(this.bodySize/2);
        this.hitTop = this.bodyY+(this.bodySize/2)+this.size;
        this.hitBottom = this.bodyY-(this.bodySize/2);
    }
}