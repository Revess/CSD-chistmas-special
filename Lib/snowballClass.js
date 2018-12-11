class Snowball {
    constructor(yPosition,xPosition){
        this.screenpercentage=window.innerWidth/100;
        this.size = this.screenpercentage*4
        this.y=yPosition;
        this.x=xPosition;

        //hitBox
        this.hitRight = this.x+(this.size/2);
        this.hitLeft = this.x-(this.size/2);
        this.hitBottom = this.y-(this.size/2);
        this.hitTop = this.y+(this.size/2);
    }

    draw(){
        stroke(color("black"));
        fill(color("white"));
        ellipse(this.x,this.y,this.screenpercentage);
        this.x+=15;
        this.hitRight = this.x+(this.size/2);
        this.hitLeft = this.x-(this.size/2);
        this.hitBottom = this.y-(this.size/2);
        this.hitTop = this.y+(this.size/2);
    }

    resize(){
        this.screenpercentage=window.innerWidth/100;
        this.size = this.screenpercentage*4
        this.y=yPosition;
        this.x=xPosition;  
        this.hitRight = this.x+(this.size/2);
        this.hitLeft = this.x-(this.size/2);
        this.hitBottom = this.y-(this.size/2);
        this.hitTop = this.y+(this.size/2);
    }
}