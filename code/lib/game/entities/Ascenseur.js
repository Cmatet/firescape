ig.module( 
	'game.entities.Ascenseur'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityAscenseur = ig.Entity.extend({


    collides: ig.Entity.COLLIDES.NEVER,
    size: {x: 64, y: 100},
    _wmBoxColor: 'rgba(0,0,255,0.5)',
    checkAgainst : ig.Entity.TYPE.BOTH,
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/ascenseur.png', 64, 100),
    zIndex : 1,
    active: false,
    
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	this.animSheet = new ig.AnimationSheet( 'media/ascenseur.png', 64, 100 );
	this.addAnim( 'idle', 1, [0]);
        this.parent( x, y, settings );
	
    },
    
    update: function() {
        var Tom = ig.game.getEntitiesByType(EntityTom);

    // Check that at least one door exists.
    if (Tom) {
        for (var i = 0; i < Tom.length; i++) {
            // Check if the tile is located at the faced tile.
            var distanceToAlarm = this.distanceTo(Tom[i]);
            if (distanceToAlarm <= this.size.x &&  ig.input.pressed("action")) {
		Tom[i].mort = 2;
		Tom[i].kill();
            }
        }
    }
        this.parent(); 
    },
});
});