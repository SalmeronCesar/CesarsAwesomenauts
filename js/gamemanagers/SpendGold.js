//This is the SpendGold function 
game.SpendGold = Object.extend({
    init: function(x, y, settings){
        //Gets the time
        this.now = new Date().getTime();
        //Checks when he last bought something 
        this.lastBuy = new Date().getTime();
        //Paused is not true
        this.paused = false;
        //Always updates
        this.alwaysUpdate = true;
        //Updates when paused
        this.updateWhenPaused = true;
        this.buying.false;
    },
    //Updates when the buy key is pressed and allows  you to buy and cancel the buying
    update: function(){
        this.now = new Date().getTime();
        
        if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
            this.lastBuy = this.now;
            if(!this.buying){
                this.startBuying();
            }else{
                this.stopBuying();
            }
            
        }
        this.checkBuyKeys();
        
        return true;
    },
    //You can start buying and then the buyscreen will show up
    startBuying: function(){
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        //Here when buyscreen is on game is paused
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
        //These are all keys that all have a certain function to them
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F1, "F2", true);
        me.input.bindKey(me.input.KEY.F1, "F3", true);
        me.input.bindKey(me.input.KEY.F1, "F4", true);
        me.input.bindKey(me.input.KEY.F1, "F5", true);
        me.input.bindKey(me.input.KEY.F1, "F6", true);
        this.setBuyText();
    },
    //This is the buytext 
    setBuyText: function(){
         game.data.buytext = new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                //when updated the game is then paused
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            //this is the text that appears on the spendgold screen
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT . Current Gold: ", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.ability1 + "  Cost: " +((game.data.ability1+1)*10), this.pos.x, this.pos.y + 40);
                this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.ability2 + "  Cost: " +((game.data.ability2+1)*10), this.pos.x, this.pos.y + 80);
                this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.ability3 + "  Cost: " +((game.data.ability3+1)*10), this.pos.x, this.pos.y + 120);
                this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.skill4 + "  Cost: " +((game.data.skill1+1)*10), this.pos.x, this.pos.y + 160);
                this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health: " + game.data.skill5 + "  Cost: " +((game.data.skill2+1)*10), this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "E Ability: Throe Your Spear: " + game.data.skill6 + "  Cost: " +((game.data.skill3+1)*10), this.pos.x, this.pos.y + 240);
            },
            update: function(dt) {
                return true;
            }
        }));
        me.game.world.addChild(game.data.buytext, 35);
    },
    //Allows you to stop buying
    stopBuying: function(){
        this.buying = false;
        me.state.resume(me.state.PLAY);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.game.world.removeChild(game.data.buyscreen);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F1, "F2", true);
        me.input.unbindKey(me.input.KEY.F1, "F3", true);
        me.input.unbindKey(me.input.KEY.F1, "F4", true);
        me.input.unbindKey(me.input.KEY.F1, "F5", true);
        me.input.unbindKey(me.input.KEY.F1, "F6", true);
        me.game.world.removeChild(game.data.buytext);
    },
    //Checks if the BuyKeys were pressed
    checkBuyKeys: function(){
        if(me.input.isKeyPressed("F1")){
            if(this.checkCost(1)){
                this.makePurchase(1);
            }
        }else if(me.input.isKeyPressed("F2")){
            if(this.checkCost(2)){
                this.makePurchase(2);
            }
        }else if(me.input.isKeyPressed("F3")){
            if(this.checkCost(3)){
                this.makePurchase(3);
            }
        }else if(me.input.isKeyPressed("F4")){
            if(this.checkCost(4)){
                this.makePurchase(4);
            }
        }else if(me.input.isKeyPressed("F5")){
            if(this.checkCost(5)){
                this.makePurchase(5);
            }
        }else if(me.input.isKeyPressed("F6")){
            if(this.checkCost(6)){
                this.makePurchase(6);
            }
        }
    },
    //Checks the cost of the skills 
    checkCost: function(skill){
        if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
            return true;
        }else if(skill===2 && (game.data.gold >= ((game.data.skill2+1)*10))){
            return true;
        }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
            return true5;
        }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
            return true;
        }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
            return true;
        }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
            return true;
        }else{
            return false;
        }
    },
    //function to make purchases
    makePurchase: function(skill){
        if(skill === 1){
        game.data.gold -= ((game.data.skill1 +1)* 10);
        game.data.skill1 += 1;
        game.data.player.Attack += 1;
    }else if(skill ===2){
        game.data.gold -= ((game.data.skill2 +1)* 10);
        game.data.skill2 += 1;
    }else if(skill ===3){
        game.data.gold -= ((game.data.skill3 +1)* 10);
        game.data.skill3 += 1;
    }else if(skill ===4){
        game.data.gold -= ((game.data.ability1+1)* 10);
        game.data.ability1 += 1;
    }else if(skill ===5){
        game.data.gold -= ((game.data.ability2 +1)* 10);
        game.data.ability2 += 1;
    }else if(skill ===6){
        game.data.gold -= ((game.data.ability3 +1)* 10);
        game.data.ability3 += 1;
    }
 }
});