ig.module(
	'game.entities.flammable'
)
.requires(
	'impact.entity',
	'game.entities.fire'
)
.defines(function(){
	EntityFlammable = ig.Entity.extend({
            
        name : "Flammable",
        Unit : EntityFire,
	_wmDrawBox: true,
	_wmScalable: true,
	_wmBoxColor: 'rgba(255,0,0,0.5)',
	countFlammes : 0,
	size: {x: 8, y: 8},
	init: function( x, y, settings )
	{
		//obligatoire
		this.parent(x,y,settings);
	},
 
        update: function()
	{
		if (Math.random()* 100 < ig.game.danger / 100 && this.countFlammes < (this.size.x /16) * (this.size.y / 16)) {
			var settings = {danger: Math.random()*ig.game.danger};
			this.countFlammes++;
			ig.game.spawnEntity(EntityFire ,this.pos.x + Math.random() * this.size.x - 15 , this.pos.y + Math.random() * this.size.y - 23, settings);
		}
      
	}
 
});
});
