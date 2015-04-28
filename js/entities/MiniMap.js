game.MiniMap = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, (
                image: "minimap",
                width: 809,
                height: 208,
                spritewidth: "809",
                spriteheight: "208",
                getShape: function(){
                    return (new me.Rect(0, 0, 809,)).toPolygon();
                }
                )]);
    this.floating = true;
    
    }
});