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
            game.data.gold += 1;
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
//Here it manages the heroes death
game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
        this.gameOver = false;
    },
    
    update: function(){
        //Resets the player
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0);
        }
        
        return true;
    }
});

game.ExperienceManager  = Object.extend({
    init: function(){
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    
    update: function(){
        if(game.data.win === true && !this.gameover){
            this.gameOver(true);
        }else if(game.data.win === false && !this.gameover){
            this.gameOver(false);

        } 
        return true;
    },
    
    gameOver: function(win){
        if(win){
            game.data.exp += 10;
        }else{
            game.data.exp += 1;
        }
        
        this.gameover = true;
        me.save.exp = game.data.exp;
        me.save.exp2 = 4;
    }
    
});
