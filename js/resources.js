game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
        //Tiles, images, weapons, minmap, and screens are put in here to load
        {name: "background-tiles", type: "image", src: "data/img/background-tiles.png"},
        {name: "meta-tiles", type: "image", src: "data/img/meta-tiles.png"},
        {name: "player", type: "image", src: "data/img/orcSpear.png"},
        {name: "tower", type: "image", src: "data/img/tower_round.svg.png"},
        {name: "creep1", type: "image", src: "data/img/brainmonster.png"},
        {name: "title-screen", type: "image", src: "data/img/title.png"},
        {name: "planet", type: "image", src: "data/img/planet.jpg"},
        {name: "exp-screen", type: "image", src: "data/img/loadpic.png"},
        {name: "gold-screen", type: "image", src: "data/img/spend.png"},
        {name: "load-screen", type: "image", src: "data/img/loadpic.png"},
        {name: "new-screen", type: "image", src: "data/img/newpic.png"},
        {name: "spear", type: "image", src: "data/img/spear.png"},
        {name: "minimap", type: "image", src: "data/img/minimap.png"},
        
    /* Atlases 
     * @example
     * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
     */

    /* Maps. 
     * @example
     * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
     * {name: "example01", type: "tmx", src: "data/map/example01.json"},
     */
    //This is the tiled map in wwhich I've created 
    {name: "level01", type: "tmx", src: "data/map/test.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
        //This is the song I've put into my title screen
    {name: "theme", type: "audio", src: "data/bgm/"}
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
