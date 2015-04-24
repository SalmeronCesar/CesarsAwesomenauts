game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings){
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
        this.attack = game.data.ability3*3;
        this.type = "spear"; 
    },
    
    update: function(delta){

        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBase') {
            response.b.loseHealth(this.attack);
            }   if (response.b.type === 'EnemyBase') {
            response.b.loseHealth(this.attack);
            }
         });