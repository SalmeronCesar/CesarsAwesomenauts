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
    //Keeps track of which direction your character is going
    this.facing = "right";
    this.now = new Date().getTime();
    this.lastHit = this.now;
    this.lastAtttack = new Date().getTime();
    //Here we follow our player whenever it goes on both x and y axis.
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72], 80);

        this.renderable.setCurrentAnimation("idle");
    },
    
    update: function(delta){
        console.log("update");
        this.now = new Date().getTime();
        if(me.input.isKeyPressed("right")){
            //adds to the position of my x by the velocity defined above in 
            //setVelocity() and multiplying it byme.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
        } //if key is pressed it will be left
        else if(me.input.isKeyPressed("left")){
            this.facing = "left";
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
        
        if(me.input.isKeyPressed("attack")){
            if(!this.renderable.isCurrentAnimation("attack")){
                //Sets the current animation to attack and once that is over goes 
                //back to the idle animation.
                this.renderable.setCurrentAnimation("attack", "idle");
                //Makes it so that the next time we start this sequence we begin
                //from the first animation, not whenever we left when we switched 
                //to another animation
                this.renderable.setAnimationFrame();
            }
        }
        
        
       else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
        if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
        }
    }else if(!this.renderable.isCurrentAnimation("attack")){
        this.renderable.setCurrentAnimation("idle");
    }
    
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;
            
            if(ydif<-40 && xdif<70 && xdif>-35){
                this.body.falling = false;
                this.body.vel.y = -1;
            }
            
            if(xdif>-35 && this.facing==='right' && (xdif<0)){
                this.body.vel.x = 0;
                this.pos.x = this.pos.x -1;
            }else if(xdif<0 && this.facing==='left' && xdif>0){
                this.body.vel.x = 0;
                this.pos.x = this.pos.x +1;
            }
            if(this.renderable.isCurrentAnimation("attack")&& this.now-this.lastHit >= 1000){
                this.lastHit = this.now;
                response.b.loseHealth();
            }
        }
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
                    return(new me.Rect(0, 0, 100, 70 )).toPolygon();
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
        this.type = "PlayerBase";
        //Here we add a animation that the tower is broken and set the current
        //animation to standing which is idle.
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    onCollision: function(){
        
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
        //this.attacking lets us know if the enemy is currently attacking 
        this.attacking = false;
        //
        this.lastAttacking = new Date().getTime;
        this.now = new Date().getTime();
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        
        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    },
    
    loseHealth: function(){
        this.health--;
    }
    
});

game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function(){
                    return(new me.Rect(0, 0, 32, 64)).toPolygon();
                }
        }]);
    this.health = 10;
    this.alwaysUpdate = true;
    //this.attacking lets us know if the player is attacking
    this.attacking = false;
    this.body.setVelocity(3, 20);
    //keeps track of when our creep attacks anything
    this.lastAttacking = new Date().getTime();
    //kepps track of the last time our creep hit anything
    this.lastHit = new Date().getTime();
    this.type = "EnemyCreep";
    
    this.renderable.addAnimation("walk", [3, 4, 5], 80);
    this.renderable.setCurrentAnimation("walk");
    },
    
    update: function(delta){
        this.now = new Date().getTime();
        
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true; 
   },
   
   collideHandler: function(response){
     if(response.b.type==='PlayerBase'){
         this.attacking=true;
         this.lastAttacking=this.now;
         this.body.vel.x = 0;
         //keeps moving the creep to the right to maintain its position
         this.pos.x = this.pos.x +1;
         //checks that it has been at least 1 second since te creep hit a base 
         if((this.now-this.lastHit >= 1000)){
             //Updates the laasthit timer
             this.lastHit = this.now;
             //makes the player base call its loseHealth function and passes it
             //a damage of 1
             response.b.loseHealth(1);
         }
     }  
   }
   
});
//Manages the game in which it spawns the creeps.
game.GameManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        
        this.alwaysUpdate = true;
    },
    
    update: function(){
        this.now = new Date().getTime();
        
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
        
        return true;
    }
});