//Manages the game in which it spawns the creeps.
game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck(this.now);
        this.creepTimerCheck();

        return true;
    },
    //check thetimer for the gold you get when playing the game
    goldTimerCheck: function(){
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += (game.data.exp1+1);
        }
    },
    //checks the creeps time
    creepTimerCheck: function(){
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }
});