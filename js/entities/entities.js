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
    //Here we follow our player whever it goes on both x and y axis.
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    
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
//Width, height and spriteheight and width are 100.
game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return(new me.Rect(0, 0, 100, 100 )).toPolygon();
                }
        }]);
    //Here this.broken is false saying that my tower cannot break.
    //Here this.health equals ten is the health of the tower.
    //Here in this.alwaysUpdate the games keeps updating even if we arent loooking at the screen.
    //Here this.body.onCollision makes you collide with the tower.
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        //The type is PlayerBaseEntity.
        this.type = "PlayerBaseEntity";
        //Here we add a animation that the tower is broken and set the current
        //animation to standing which is idle.
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update:function(){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    }
    
});

game.EnemyBaseEntity = me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return(new me.Rect(0, 0, 100, 100 )).toPolygon();
                }
        }]);
    //Here this.broken is false saying that my tower cannot break.
    //Here this.health equals ten is the health of the tower.
    //Here in this.alwaysUpdate the games keeps updating even if we arent loooking at the screen.
    //Here this.body.onCollision makes you collide with the tower.
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update:function(){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    }
    
});