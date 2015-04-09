game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return(new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
        //Here this.broken is false saying that my tower cannot break.
        //Here this.health equals ten is the health of the tower.
        //Here in this.alwaysUpdate the games keeps updating even if we arent loooking at the screen.
        //Here this.body.onCollision makes you collide with the tower.
        this.broken = false;
        //If I destroy the enemies base I win
        game.data.win = true;
        this.health = game.data.enemyBaseHealth;
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
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    },
    loseHealth: function() {
        this.health--;
    }

});