game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
                //levelDirector loads our level
		game.data.score = 0;
                me.levelDirector.loadLevel("level01");
                
//We are pulling the player out of the pool.
                var player = me.pool.pull("player", 0, 420, {});
                me.game.world.addChild(player, 5);
                //When you press the right, left, space, and a. The player goes
                // right,left, jumps and attacks
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.SPACE, "jump");
                me.input.bindKey(me.input.KEY.A, "attack");
                
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
