ig.module( 
	'game.entities.Evier'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityEvier = ig.Entity.extend({

    size: {x: 22, y: 24},
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(0,255,255,0.5)',
    checkAgainst : ig.Entity.TYPE.BOTH,
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/evier2.png',22 , 24),
    zIndex : 15,
    active: false,
    
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	this.animSheet =  new ig.AnimationSheet( 'media/evier2.png',22 , 24);
        this.addAnim( 'serviette', 0.1, [0]);
	this.currentAnim = this.anims.serviette;
        this.parent( x, y, settings );
	
    },
    
    

    
    update: function() {
        var Tom = ig.game.getEntitiesByType(EntityTom);

    // Check that at least one door exists.
    
    if (Tom) {
        for (var i = 0; i < Tom.length; i++) {
            // Check if the tile is located at the faced tile.
            var distanceToAlarm = this.distanceTo(Tom[i]);
         
                
            
            if (distanceToAlarm <= this.size.x * 2 &&  ig.input.pressed("action")&& this.active == false) {
		var Serviette = ig.game.getEntitiesByType(EntityServiette);
                for(var j = 0; j < Serviette.length;j++)
                {
                    var distanceToExt = this.distanceTo(Serviette[j]);
                    if (distanceToExt <= this.size.x * 2) {
                    Serviette[j].kill();
		    Tom[i].health += 20;
		    if (Tom[i].health >100) {
			Tom[i].health = 100;
		    }
                    }
                }
		this.active = true;
            }
        }
    }
        this.parent();     },
});
});