ig.module( 
	'game.entities.fumee'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityFumee = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NEVER,
    
    size: {x: 32, y: 32},
    offset: {x: 16, y: 16},
    health: 50,
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/fumee2.png', 64, 64 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14] );
        
        // Call the parent constructor
        this.parent( x, y, settings );
    },
    
    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        if (this.danger > ig.game.danger) {
	    this.kill();
	}
	if (ig.game.getEntityByName("Mousse") != undefined && this.touches(ig.game.getEntityByName("Mousse"))) {
	    this.kill();
	    ig.game.getEntityByName("Mousse").kill();
	}
        if(ig.game.getEntityByName("Tom") != undefined && this.touches(ig.game.getEntityByName("Tom")) && ig.game.getEntityByName("Tom").invincible <= 0 ) {
           /* if (ig.game.getEntityByName("Tom").vel.x == 0) {
                if (ig.game.getEntityByName("Tom").direction == "gauche") {
                    ig.game.getEntityByName("Tom").pos.x -= 32;
                }
                else
                {
                    ig.game.getEntityByName("Tom").pos.x += 32;
                }
            }
            else
            {
                ig.game.getEntityByName("Tom").pos.x -= ig.game.getEntityByName("Tom").vel.x /10;
            }
            ig.game.getEntityByName("Tom").pos.y -= 32;*/
            ig.game.getEntityByName("Tom").receiveDamage(10,this);
	    ig.game.getEntityByName("Tom").invincible = 60;
	    
        }
        
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    },
});
});