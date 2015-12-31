export default class{
    constructor(x, y, h, l){
        this.x = x;
        this.y = y;
        this.height = h;
        this.length = l;
        this.speed = 0;
        this.up = false;
    }
    
    moveUp(speed){
        this.speed = speed; 
        this.up = true;
    }
    
    moveDown(speed){
        this.speed = speed; 
        this.up = false;
    }
    
    move(){
        if(this.speed > 0 ){
            this.y =  this.up ? this.y + this.speed/2 : this.y - this.speed/2;
            this.speed--;
        }  
    }
    
    draw(ctx){
        ctx.context.beginPath();
		ctx.context.rect(this.x, this.y, this.height, this.length);
        ctx.context.fillStyle = 'white';
        ctx.context.fill(); 
    }
}