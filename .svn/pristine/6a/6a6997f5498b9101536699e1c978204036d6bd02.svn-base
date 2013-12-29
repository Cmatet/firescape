ig.module( 
	'game.entities.PanneauAscenseur'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityPanneauAscenseur = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NEVER,
    size: {x: 50, y: 50},
    /*_wmBoxColor: 'rgba(0,0,255,0.5)',
    checkAgainst : ig.Entity.TYPE.BOTH,*/
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/panneau_ascenseur.png', 50, 50 ),
    zIndex : 1,
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	this.animSheet = new ig.AnimationSheet( 'media/panneau_ascenseur.png', 50, 50 );
	this.addAnim( 'idle', 1, [0]);
	this.currentAnim = this.anims.idle;
	
        this.parent( x, y, settings );
	
    },
    

    
    update: function() {

    this.parent(); 
    },
});
});