ig.module( 
	'game.entities.Mousse'
)
.requires(
   
    'impact.entity'
)

.defines(function(){

// Create your own entity, subclassed from ig.Enitity
EntityMousse = ig.Entity.extend({


    collides: ig.Entity.COLLIDES.LITE,
    size: {x: 18, y: 18},
    _wmBoxColor: 'rgba(0,0,255,0.5)',
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    // Load an animation sheet
    animSheet : new ig.AnimationSheet( 'media/mousse2.png', 18, 18),
    zIndex : 1,
    active: false,
    name : "Mousse",
    init: function( x, y, settings ) {
        // Add animations for the animation sheet        
        // Call the parent constructor
	this.animSheet = new ig.AnimationSheet( 'media/mousse2.png', 18, 18 );
	this.addAnim( 'idle', 1, [0]);
        this.currentAnim = this.anims.idle;
        this.maxVel.x = 1000;
        this.maxVel.y = 100;
        this.parent( x, y, settings );
	
    },
    
    update: function() {
        if (this.direction == "droite") {
            this.vel.x = 200;
            this.vel.y = 75;
        }
        else
        {
            this.vel.x = -200;
            this.vel.y = 75;
        }
        
        this.parent();
    },
    
    handleMovementTrace: function ( res ){
        if( res.collision.x || res.collision.y ) {
        // This entity collided on either the x or y axis, 
        // the collision pos is res.pos.x, res.pos.y.
        // Do whatever you want here.
            this.kill();
        }
        else {
            // No collision. Just move normally.
            this.parent( res );
        }
    },
});
});