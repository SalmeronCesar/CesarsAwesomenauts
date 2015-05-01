//game.Lmonster = me.Entity.extend({
//    init: function(x, y, settings) {
//        this._super(me.Entity, 'init', [x, y, {
//                image: "Lmonster",
//                width: 32,
//                height: 64,
//                spritewidth: "32",
//                spriteheight: "64",
//                getShape: function() {
//                    return(new me.Rect(0, 0, 32, 64)).toPolygon();
//                }
//            }]);
//         //The creep has health
//        this.health = game.data.enemyCreepHealth;
//        this.alwaysUpdate = true;
//        //this.attacking lets us know if the player is attacking
//        this.attacking = false;
//        this.body.setVelocity(3, 20);
//        //keeps track of when our creep attacks anything
//        this.lastAttacking = new Date().getTime();
//        //kepps track of the last time our creep hit anything
//        this.lastHit = new Date().getTime();
//        this.type = "Lmonster";
//        
//        //Here it adds and sets the Animations for the creep
//        this.renderable.addAnimation("walk", [3, 4, 5], 80);
//        this.renderable.setCurrentAnimation("walk");
//    },
//     //Here when damage is taken to the creep its loses health
//    loseHealth: function(damage){
//      this.health = this.health - damage;  
//    },
//    //If the creep is at 0 health then it dies
//    update: function(delta) {
//        if(this.health <= 0 ){
//            me.game.world.removeChild(this);
//        }
//        
//        this.now = new Date().getTime();
//        var xdif = this.pos.x;
//        //creep jump
//        if(xdif === 631 &&this.body.vel.x == 0 && !this.body.jumping && !this.body.falling){
//            this.body.jumping = true;
//            this.body.vel.y -= this.body.accel.y * me.timer.tick;
//        }
//        
//        this.body.vel.x -= this.body.accel.x * me.timer.tick;
//        //Its checks the collision
//        me.collision.check(this, true, this.collideHandler.bind(this), true);
//
//        this.body.update(delta);
//
//        this._super(me.Entity, "update", [delta]);
//        return true;
//    },
//     collideHandler: function(response) {
//        if (response.b.type === 'Lmonster'  || response.b.type==='EnemyBase') {