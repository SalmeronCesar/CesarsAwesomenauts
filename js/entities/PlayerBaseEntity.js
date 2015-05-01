//Width, height and spriteheight and width are 100.
game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return(new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        //Here this.broken is false saying that my tower cannot break.
        //Here this.health equals ten is the health of the tower.
        //Here in this.alwaysUpdate the games keeps updating even if we arent loooking at the screen.
        //Here this.body.onCollision makes you collide with the tower.
        this.broken = false;
        this.health = game.data.playerBaseHealth;
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
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            //If the  enemies destroy the my base I lose
            game.data.win = false;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //If taken damage you lose health
    loseHealth: function(damage) {
        this.health = this.health - damage;
    },
    //This is the onCollision's function
    onCollision: function() {

    }

});