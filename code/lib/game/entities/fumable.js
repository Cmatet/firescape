ig.module(
	'game.entities.fumable'
)
.requires(
	'impact.entity',
	'game.entities.fumee'
)
.defines(function(){
	EntityFumable = ig.Entity.extend({
            
        name : "Fumable",
        Unit : EntityFumee,
	_wmDrawBox: true,
	_wmScalable: true,
	_wmBoxColor: 'rgba(255,0,0,0.5)',
	countFumee : 0,
	size: {x: 64, y: 64},
	init: function( x, y, settings )
	{
		//obligatoire
		this.parent(x,y,settings);
	},
 
        update: function()
	{
		if (Math.random()* 100 < ig.game.danger / 100 && this.countFumee < this.size.x * this.size.y / 16*16) {
			var settings = {danger: Math.random()*ig.game.danger};
			this.countFumee++;
			ig.game.spawnEntity(EntityFumee ,this.pos.x + Math.random() * this.size.x - 15 , this.pos.y + Math.random() * this.size.y - 23, settings);
		}
      
	}
 
});
});
