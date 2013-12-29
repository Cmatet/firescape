ig.module( 
	'game.entities.FallingFloor'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityFallingFloor = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.FIXED,
    checkAgainst : ig.Entity.TYPE.BOTH,
    size: {x: 120, y: 20},
    /*_wmBoxColor: 'rgba(0,0,255,0.5)',
    checkAgainst : ig.Entity.TYPE.BOTH,*/
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/FallingFloor.png', 120, 20 ),
    zIndex : 1,
    falling  : false,
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	this.animSheet = new ig.AnimationSheet( 'media/FallingFloor.png', 120, 20 );
	this.addAnim( 'idle', 1, [0]);
	this.currentAnim = this.anims.idle;
	
        this.parent( x, y, settings );
	
    },
    

    
    update: function() {
        if(ig.game.getEntityByName("Tom") != undefined && this.touches(ig.game.getEntityByName("Tom")))
        {
            this.falling= true;
			ig.game.bruitages.ecroulement.play();

        }
        if (this.falling==true)
        {
         this.pos.y=this.pos.y+10;
        }

    this.parent(); 
    },
});
});