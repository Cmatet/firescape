ig.module(
	'game.entities.trigger_mauvais_chemin'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityTrigger_mauvais_chemin = ig.Entity.extend({
            
        name : "trigger_danger_start",
        //Unit : EntityFire,
	_wmDrawBox: true,
	_wmScalable: true,
	_wmBoxColor: 'rgba(255,255,0,0.5)',
	type : 1,
	active : true,
	init: function( x, y, settings )
	{
		//obligatoire
		this.parent(x,y,settings);
	},
 
        update: function()
	{
		 if(ig.game.getEntityByName("Tom") != undefined && this.touches(ig.game.getEntityByName("Tom")) && this.active)
		 {
		    var Tom = ig.game.getEntitiesByType(EntityTom);
                    ig.game.mauvaiseAction.chemin++;
                    this.active = false;
		    for (var i=0;i<=20;i++){
			ig.game.spawnEntity(RedSparks,Tom[0].pos.x,Tom[0].pos.y - 15);
		     }
		 }
				
	}
 
});
});