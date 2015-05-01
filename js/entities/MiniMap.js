//Its the Minimap's function and it has its width and height 
//The minimap has the image of the map I made in Tiled
ame.MiniMap = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width: 809,
                height: 208,
                spritewidth: "809",
                spriteheight: "208",
                getShape: function(){
                    return (new me.Rect(0, 0, 809, 208)).toPolygon();
                }
            }]);
        
    this.floating = true;
    
    }
});