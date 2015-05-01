//This is the Spearthrow's function and it has the width and height of it
game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings, facing) {
        this._super(me.Entity, 'init', [x, y, {
                image: "spear",
                width: 48,
                height: 48,
                spritewidth: "48",
                spriteheight: "48",
                getShape: function() {
                    return(new me.Rect(0, 0, 48, 64)).toPolygon();
                }
            }]);
        this.alwaysUpdate = true;
        //this.attacking lets us know if the player is attacking
        this.body.setVelocity(8, 0);
        this.attack = game.data.ability3 * 3;
        //The type of object is a spear
        this.type = "spear";
        this.facing = facing;
    },
    //Here it updates the velocity of positions x and y
    update: function(delta) {
        if (this.facing === "left") {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //Here the EnemyBase and EnemyCreep cannot collide with each other
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBase' || response.b.type === 'EnemyCreep') {
            response.b.loseHealth(this.attack);
            me.game.world.removeChild(this);
        }
    }
});