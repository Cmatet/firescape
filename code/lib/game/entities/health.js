ig.module(
	'game.entities.health'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityHealth = ig.Entity.extend({
            
                name : "HealthBar",
                Unit : null,
	    init: function( x, y, settings ) {

            this.Unit = settings.Unit;
    },
 
        update: function(){

    },
    
    draw : function()
	{
		ig.system.context.strokeStyle = "rgb(0,0,0)";
		ig.system.context.lineWidth = 3;
		ig.system.context.beginPath();
		ig.system.context.rect(10, 17 , 317, 17);
		ig.system.context.closePath();
		ig.system.context.stroke();        
			
		ig.system.context.fillStyle = "rgb(255,0,0)";
		ig.system.context.beginPath();
		ig.system.context.rect(10,  17 , this.Unit.health/100*317, 17);
		ig.system.context.closePath();
		ig.system.context.fill();
	}
 
});
});
