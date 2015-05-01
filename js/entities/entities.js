//The image we are using is called "player"
//The height and width are 64 for the screen.
//spriteheight and sprite width are 64 for the height and width of the "player"
//With getShape this returns a shape and creates a Rectangle and the 0s are the
// corners and the 64s are the height and the width.
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        //Moving 5 units 
        this.type = "PlayerEntity";
        this.setFlags();
        //Here we follow our player whenever it goes on both x and y axis.
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimation();

        this.renderable.setCurrentAnimation("idle");
    },
    //Is the setSper's function and has its own  height and width and the image is 
    //the orc aka the player
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    //Here is sets the players timers and it tells you when last spear, last hit and 
    //last attack was
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAtttack = new Date().getTime();
    },
    //Here it Attributes the health, Velocity aand the attacks
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags: function() {
        //Keeps track of which direction your character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    //Adds the animations of standing aka idle, walking and attacking.
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },
    //Here it updates the animations, the abilitykeys, keypresses and the dead function
    update: function(delta) {
        console.log("update");
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesandMove();
        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //Here it checks if the player is dead
    checkIfDead: function() {
        if (this.health <= 0) {
            return true;
        }
        return false;
    },
    //Here it checks the right and left keys to see if they were pressed
    checkKeyPressesandMove: function() {
        if (me.input.isKeyPressed("right")) {
            this.MoveRight();
        } else if (me.input.isKeyPressed("left")) {
            this.MoveLeft();
        } else {
            this.body.vel.x = 0;
        }
        //If space a certain key is pressed then it will make the person/character jump
        if (me.input.isKeyPressed("jump")) {
            this.jump();
        }
        //Checks if the attack key was pressed
        this.attacking = me.input.isKeyPressed("attack");
    },
    MoveRight: function() {
        //adds to the position of my x by the velocity defined above in 
        //setVelocity() and multiplying it byme.tick.
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(true);
        //if key is pressed it will be left  
    },
    //This is the left key function 
    MoveLeft: function() {
        this.facing = "left";
        this.flipX(true);
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
    },
    //Is the jump function
    jump: function() {
        if (!this.body.jumping && !this.body.falling) {
            this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
            this.body.jumping = true;
        }
    },
    //Here it checks for the AbilityKeys, to see if they were pressed
    checkAbilityKeys: function(){
        if(me.input.isKeyPressed("skill1")){
            //this.speedBurst();
        }else if(me.input.isKeyPressed("skill2")){
            //this.eatCreep();
        }else if(me.input.isKeyPressed("skill3")){
           this.throwSpear();
        }
    },
   //This the throwSpear function
   throwSpear: function(){
       if((this.now-lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 >= 0){
       this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }  
   },
   //Is the setAnimation function
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //Sets the current animation to attack and once that is over goes 
                //back to the idle animation.
                this.renderable.setCurrentAnimation("attack", "idle");
                //Makes it so that the next time we start this sequence we begin
                //from the first animation, not whenever we left when we switched 
                //to another animation
                this.renderable.setAnimationFrame();
            }
        }
        //checks if the animations work for attack, idle and walk
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    //Is the loseHealth function. So if you take in damage you lose health.
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    //Is the collideHandler and lets the player collide with the EnemyBase and EnemyCreep
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            this.collideWithEnemyBase(response);
        } else if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemyCreep(response);
        }
    },
    //Lets you collide with the enemy base
    collideWithEnemyBase: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;

        if (ydif < -40 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        //Lets you collide on the right side
        if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
            this.pos.x = this.pos.x - 1;
            //Lets you collide on the left side
        } else if (xdif < 0 && this.facing === 'left' && xdif > 0) {
            this.body.vel.x = 0;
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    //Lets you collide with the enemy creep
    collideWithEnemyCreep: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;
        
        this.stopMovement(xdif);
        
       if(this.checkAttack(xdif, ydif)){
            this.hitCreep(response);
       };
    },
     //Lets you stop your movement
      stopMovement: function(xdif){
          if (xdif > 0) {
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
      },
      //Here it checks if you attack on the right or left side
      checkAttack: function(xdif, ydif){
          if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
           
                return true;
            }
                return false;
        },
      //Is the response for hitting the creep
      hitCreep: function(response){
          if (response.b.health <= this.attack){
                //If the creep health is less than our attack then excute code in your statement
                game.data.gold += 1;
          }
                response.b.loseHealth(game.data.playerAttack);
      }
});
