ig.module( 
	'game.entities.electricFire'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityElectricFire = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NEVER,
    
    size: {x: 17, y: 24},
    offset: {x: 1, y: 9},
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/feu_elec.png', 22, 35 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0,1,2,3,4] );
        
        // Call the parent constructor
        this.parent( x, y, settings );
    },
    
    update: function() {
      
	var Mousses = ig.game.getEntitiesByType(EntityMousse);
	if (Mousses != undefined) {
	    for(var i = 0; i< Mousses.length;i++)
	    {
		if (this.touches(Mousses[i]) && ig.game.getEntityByName("Tom").invincible <= 0 ) {
		   ig.game.getEntityByName("Tom").receiveDamage(10,this);
		     ig.game.getEntityByName("Tom").invincible = 60;
		     ig.game.mauvaiseAction.chemin++;
		      for (var i=0;i<=20;i++){
			ig.game.spawnEntity(RedSparks,Tom[0].pos.x,Tom[0].pos.y - 15);
		     }
		      ig.game.danger += 5;
		    ig.game.getEntityByName("Mousse").kill();
		}	
		
	    }
	}
	
	
        if(ig.game.getEntityByName("Tom") != undefined && this.touches(ig.game.getEntityByName("Tom")) && ig.game.getEntityByName("Tom").invincible <= 0 ) {

            ig.game.getEntityByName("Tom").receiveDamage(30,this);
	    ig.game.getEntityByName("Tom").invincible = 60;
	    
        }
        
	
	
	
	
	
        var Tom = ig.game.getEntitiesByType(EntityTom);

    // Check that at least one door exists.
    
    if (Tom) {
        for (var i = 0; i < Tom.length; i++) {
            // Check if the tile is located at the faced tile.
            var distanceToAlarm = this.distanceTo(Tom[i]);
         
                
            
            if (distanceToAlarm <= this.size.x * 8 &&  ig.input.pressed("action")) {
		var Serviette = ig.game.getEntitiesByType(EntityServiette);
                for(var j = 0; j < Serviette.length;j++)
                {
                    var distanceToExt = this.distanceTo(Serviette[j]);
                    if (distanceToExt <= this.size.x * 2) {
			ig.game.danger -=5;
                    Serviette[j].kill();
		   this.kill();
                    }
                }
		
            }
        }
    }

	
	
	
	
	
	
	
	
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    },
});
});
