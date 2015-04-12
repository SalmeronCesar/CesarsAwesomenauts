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