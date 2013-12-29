ig.module( 
	'game.entities.bulletxt'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityBulletxt = ig.Entity.extend({

    
    size: {x: 145, y: 145},
    name : "bulleTxt",
    
    
    // Load an animation sheet
    animSheet: null,
    
    init: function( x, y, settings ) {
        // Call the parent constructor
	
	zIndex = 9999;
	this.zIndex = 9999;
	    // Re-sort Entities
	    ig.game.sortEntitiesDeferred();

        this.parent( x, y, settings );
    },
    
    setImg: function (image){
	this.animSheet = image;
	this.addAnim( 'idle', 1, [0]);
	this.currentAnim = this.anims.idle;
    },
    
    
    update: function() {
        if(ig.game.getEntityByName("Tom") != undefined ){
	this.pos.x = ig.game.getEntityByName("Tom").pos.x;
	this.pos.y = ig.game.getEntityByName("Tom").pos.y- 145;
	}
	//console.log("dehors");
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    },
});
});