////Here this is the EnemyCreep's function and the EnemyCreep is called creepe1 and has its own 
//width and height
game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 32, 64)).toPolygon();
                }
            }]);
        //The creep has health
        this.health = game.data.enemyCreepHealth;
        this.alwaysUpdate = true;
        //this.attacking lets us know if the player is attacking
        this.attacking = false;
        this.body.setVelocity(3, 20);
        //keeps track of when our creep attacks anything
        this.lastAttacking = new Date().getTime();
        //kepps track of the last time our creep hit anything
        this.lastHit = new Date().getTime();
        this.type = "EnemyCreep";
        
        //Here it adds and sets the Animations for the creep
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    //Here when damage is taken to the creep its loses health
    loseHealth: function(damage){
      this.health = this.health - damage;  
    },
    //If the creep is at 0 health then it dies
    update: function(delta) {
        if(this.health <= 0 ){
            me.game.world.removeChild(this);
        }
        
        this.now = new Date().getTime();

var xdif = this.pos.x;
        //creep jump
        if(xdif === 631 &&this.body.vel.x == 0 && !this.body.jumping && !this.body.falling){
            this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        //Its checks the collision
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerBase') {
            this.attacking = true;
            //Checks when it last attacked an object or thing
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            //keeps moving the creep to the right to maintain its position
            this.pos.x = this.pos.x + 1;
            //checks that it has been at least 1 second since te creep hit a base 
            if ((this.now - this.lastHit >= 1000)) {
                //Updates the laasthit timer
                this.lastHit = this.now;
                //makes the player base call its loseHealth function and passes it
                //a damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        } else if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;
            //Its says it can attack
            this.attacking = true;
            //Checks when it last attacked an object or thing
            this.lastAttacking = this.now;

            if (xdif > 0) {
                //keeps moving the creep to the right to maintain its position
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;
            }
            //checks that it has been at least 1 second since te creep hit a base 
            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                //Updates the laasthit timer
                this.lastHit = this.now;
                //makes the player call its loseHealth function and passes it
                //a damage of 1
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }
    }

});
