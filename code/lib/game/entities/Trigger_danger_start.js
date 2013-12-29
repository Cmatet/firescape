ig.module(
	'game.entities.Trigger_danger_start'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityTrigger_danger_start = ig.Entity.extend({
            
        name : "trigger_danger_start",
        //Unit : EntityFire,
	_wmDrawBox: true,
	_wmScalable: true,
	_wmBoxColor: 'rgba(255,0,0,0.5)',
	type : 1,
		
	init: function( x, y, settings )
	{
		//obligatoire
		this.parent(x,y,settings);
	},
 
        update: function()
	{
		 if(ig.game.getEntityByName("Tom") != undefined && this.touches(ig.game.getEntityByName("Tom")))
		 {
		ig.game.dangeractif=true;
		 }
				
	}
 
});
});