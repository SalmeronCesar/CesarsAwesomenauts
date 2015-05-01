game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
        // play the audio track
        me.audio.playTrack("theme");
        
        game.data.option1 = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //Draws the text "Start a new game!"
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Start a new game!", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            },
            //action to start a new game
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.NEW);
            }
        }));

        me.game.world.addChild(game.data.option1);
        game.data.option2 = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Arial", 26, "white");
                me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
            },
            //Draws text for the title screen in which it says "Continue"
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Continue", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            },
            //EXP for the new game
            newGame: function() {
                game.data.exp = me.save.exp;
                game.data.exp1 = me.save.exp1;
                game.data.exp2 = me.save.exp2;
                game.data.exp3 = me.save.exp3;
                game.data.exp4 = me.save.exp4;
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.LOAD);
                //me.state.change(me.state.SPENDEXP);
            }


        }));
        me.game.world.addChild(game.data.option2);
    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    //Destroys the song
    onDestroyEvent: function() {
        me.audio.stopTrack("theme");

    }
});

