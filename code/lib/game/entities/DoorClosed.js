ig.module( 
	'game.entities.DoorClosed'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityDoorClosed = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.FIXED,
    
    size: {x: 17, y: 75},
    _wmBoxColor: 'rgba(0,0,255,0.5)',
    etat : "ferme",
    checkAgainst : ig.Entity.TYPE.BOTH,
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/porte-fermee.png', 17, 75 ),
    fermee : null,
    zIndex : 1,
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	
        this.addAnim( 'fermee', 0.1, [0]);
	this.animSheet = new ig.AnimationSheet( 'media/porte.png', 36, 75 );
	this.addAnim('ouvert',0.1,[0]);
        this.parent( x, y, settings );
	
    },
    
    changerEtat: function(Tom){
        if(this.etat == "ouvert")
        {ig.game.bruitages.porteferme.play();
	    if (!this.active) {
		ig.game.danger -= 5;
		this.active = true;
		for (var i=0;i<=40;i++){
		    ig.game.spawnEntity(GrenSparks,Tom.pos.x,Tom.pos.y - 15);
                }
		ig.game.bonnesAction.porte++;
	    }
            this.etat = "ferme";
	    this.currentAnim = this.anims.fermee;
            this.size = {x: 17, y:75};
            this.collides = ig.Entity.COLLIDES.FIXED;
        }
        else
        {ig.game.bruitages.porteouvre.play();
            this.etat = "ouvert";
            this.currentAnim = this.anims.ouvert;
            this.size = {x: 36, y:75};
            this.collides = ig.Entity.COLLIDES.NEVER;
        }
    },
    
    update: function() {
        var Tom = ig.game.getEntitiesByType(EntityTom);

    // Check that at least one door exists.
    if (Tom) {
        for (var i = 0; i < Tom.length; i++) {
            // Check if the tile is located at the faced tile.
            var distanceToDoor = this.distanceTo(Tom[i]);
            if (distanceToDoor <= this.size.x * 2 && ig.input.pressed("action")) {
                this.changerEtat(Tom[i]);
            }
        }
    }
        this.parent(); 
    },
});
});