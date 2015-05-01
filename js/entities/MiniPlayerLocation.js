
game.MiniPlayerLocation = me.Entity.extend({
    init: function(x, y, settings) {
        this.settings = settings;
        this.r = 5;
        this.diameter = (this.r+2)*2;
        this.anchorPoint = new me.Vector2d(0, 0);
        this.loc = x, y;
        //Here its sets the settings to width of the diameter of the image 
        //Here its sets the settings to height of the diameter of the image
        this.settings.width = this.diameter;
        this.settings.height = this.diameter;
        //Here its sets the settings to spritewidth of the diameter of the image
        this.settings.spritewidth = this.diameter;
        //The settings is equal to the diameter
        this.settings = this.diameter;
        this.floating = true;
        //Its sets the settings to have a width and height for the image
        this.image = me.video.createCanvas(this.settings.width, this.settings.height);
        var ctx = me.video.renderer.getContext2d(this.image);
        //Here it adds color
        ctx.fillStyle = "rgba(0, 192, 32, 0.75)";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        
        ctx.arc(this.r + 2, this.r +2, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        
        //This var my function has its own height and width setting up
        var my = this;
        this._super(me.Entity, "init", [x, y, {
               width: 14,
               height: 14,
               spriteheight: 14,
               spritewidth: 14,
               getShape: function(){
                   return(new me.Rect(0, 0, 14, 14)).toPolygon();
               }
        }]);
    },
    //Here it draws the image and draws its width and height
    draw: function(renderer){
        this._super(me.Entity, "draw", [renderer]);
        this.floating = true;
        renderer.drawImage(
                this.image,
                0, 0, this.width, this.height,
                this.pos.x, this.pos.y, this.width, this.height
                );
    },
    //Here this updates the position of x and y of the minimap 
    update: function(){
        this.pos.x = (10 + (game.data.player.pos.x * 0.062));
        this.pos.y = (10 + (game.data.player.pos.y * 0.06));
        return true;
    }
    
});