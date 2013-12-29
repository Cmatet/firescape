ig.module(
	'game.entities.zoneTextFin'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityZoneTextFin = ig.Entity.extend({
            
        name : "ZoneTextFin",
        //Unit : EntityFire,
	_wmDrawBox: true,
	_wmScalable: true,
	_wmBoxColor: 'rgba(255,255,255,0.5)',
		
	init: function( x, y, settings )
	{
		//obligatoire
		this.parent(x,y,settings);
	},
 
        update: function()
	{
		 if(ig.game.getEntityByName("Tom") != undefined && this.touches(ig.game.getEntityByName("Tom"))) {
		if(ig.game.getEntityByName("bulleTxt") != null)
		ig.game.getEntityByName("bulleTxt").kill();
		 }
      
	}
 
});
});
