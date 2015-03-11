//The image we are using is called "player"
//The height and width are 64 for the screen.
//spriteheight and sprite width are 64 for the height and width of the "player"
//With getShape this returns a shape and creates a Rectangle and the 0s are the
// corners and the 64s are the height and the width.
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player", 
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function(){
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
        }]);
    //Moving 5 units 
    this.body.setVelocity(5, 20);
    
    this.renderable.addAnimation("idle", [78]);
    this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
    this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta){
        console.log("update");
        if(me.input.isKeyPressed("right")){
            //adds to the position of my x by the velocity defined above in 
            //setVelocity() and multiplying it byme.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);
        } //if key is pressed it will be left
        else if(me.input.isKeyPressed("left")){
            this.flipX(true);
            this.body.vel.x -=this.body.accel.x * me.timer.tick;
        }else{
            this.body.vel.x = 0;
        }
        

        //If space a certain key is pressed then it will make the person/character jump
          if(me.input.isKeyPressed("jump")){
              if(!this.body.jumping && !this.body.falling) {
              this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
            this.body.jumping = true;
        }
        }
        
        if(this.body.vel.x !== 0){
        if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
        }
    }else{
        this.renderable.setCurrentAnimation("idle");
    }
 
        
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    }
});

game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        
    },
    
    
})