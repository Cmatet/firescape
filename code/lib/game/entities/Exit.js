ig.module( 
	'game.entities.Exit'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityExit = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NEVER,
    size: {x: 100, y: 30},
    /*_wmBoxColor: 'rgba(0,0,255,0.5)',
    checkAgainst : ig.Entity.TYPE.BOTH,*/
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/exit.png', 100, 30 ),
    zIndex : 1,
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	this.animSheet = new ig.AnimationSheet( 'media/exit.png', 100, 30 );
	this.addAnim( 'idle', 1, [0]);
	this.currentAnim = this.anims.idle;
	
        this.parent( x, y, settings );
	
    },
    

    
    update: function() {

    this.parent(); 
    },
});
});