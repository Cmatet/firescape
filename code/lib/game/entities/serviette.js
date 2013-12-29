ig.module( 
	'game.entities.serviette'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityServiette = ig.Entity.extend({


    
    size: {x: 20, y: 12},
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(0,255,255,0.5)',
    checkAgainst : ig.Entity.TYPE.BOTH,
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/serviette.png',20 , 12),
    zIndex : 15,
    active: false,
    
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	this.animSheet =  new ig.AnimationSheet( 'media/serviette.png',20 , 12);
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
            if (this.active)
            {
                if (Tom[i].direction == "droite") {
                    this.pos.x = Tom[i].pos.x + 30;
                }
                else
                {
                   this.pos.x = Tom[i].pos.x - 10;
                }
                
                this.pos.y = Tom[i].pos.y + 8;
                
            }
            if (distanceToAlarm <= this.size.x * 2 &&  ig.input.pressed("action")&& this.active == false) {
                var Extincteur = ig.game.getEntitiesByType(EntityExtincteur);
                for(var j = 0; j < Extincteur.length;j++)
                {
                    var distanceToExt = this.distanceTo(Extincteur[j]);
                    if (distanceToExt <= this.size.x * 2) {
                        Extincteur[j].active = false;
                    }
                }
		this.active = true;
            }
        }
    }
        this.parent(); 
    },
});
});