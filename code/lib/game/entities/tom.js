ig.module( 
	'game.entities.tom'
)
.requires(
   
    'impact.entity',
    'game.entities.Door'
)

.defines(function(){

//déclaration de la classe
EntityTom = ig.Entity.extend({
    
    
    
  size: {x: 32, y: 48},
    collides : ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    maxHealth : 100,
    health:100,
    direction : "droite",
    gravityFactor : 10000,
    animSheet: new ig.AnimationSheet('media/heroTom.png',36.5,53),
    jump : 0,
    invincible : 0,
    zIndex : 10,
    timer : new ig.Timer(),
     baisseAvant : false,
    mort : 1,
    
    init : function(x,y,settings){
	
	this.name = "Tom";
	this.addAnim('sauterDroite',0.1,[9]);
        this.addAnim('sauterGauche',0.1,[5]);
	this.addAnim('idle',0.1,[3]);
        this.addAnim('marcherDroite',0.1,[8,9,10,11]);
        this.addAnim('marcherGauche',0.1,[4,5,6,7]);
	
	this.addAnim('killsauterDroite',0.1,[9,25]);
        this.addAnim('killsauterGauche',0.1,[5,25]);
	this.addAnim('killidle',0.1,[3,25]);
        this.addAnim('killmarcherDroite',0.1,[8,25,9,25,10,25,11,25]);
        this.addAnim('killmarcherGauche',0.1,[4,25,5,25,6,25,7,25]);
	
	
	this.addAnim('killaccroupiIdle',0.1,[16,25]);
	this.addAnim('accroupiIdle',0.1,[16]);
	
	this.addAnim('accroupiDroite',0.1,[16,17,18,19]);
	this.addAnim('accroupiGauche',0.1,[20,21,22,23]);
	
	this.addAnim('killaccroupiDroite',0.1,[16,25,17,25,18,25,19]);
	this.addAnim('killaccroupiGauche',0.1,[20,25,21,25,22,25,23]);
	
	
	
	//this.friction.x = 10;
	//this.friction.y = 10;
	//this.accel.y = 1200;
	this.vel.y = 150;
	this.maxVel.y = 300;
	this.maxVel.x = 30000;
	this.parent(x,y,settings);
	this.direction = "droite";
	this.invincible = 0;
	//buzz.defaults.loop = true;
	//var mySound = new buzz.sound( 'media/musique1.ogg' );
        jump = 0;
	timer = new ig.Timer();
	//buzz.all().play();
	
    },
    
    
        update : function(){
	    
	   

	if (this.invincible > 0) {
	   this.invincible--;
	   
	   
	   
	   
	
	    if (this.vel.y == 0 && this.vel.x == 0) {
		 if (ig.input.state('bas')) {
		  
		      this.size.y = 24;if(this.baisseAvant==false)this.offset.y = 25; this.baisseAvant = true;
			    this.currentAnim = this.anims.killaccroupiIdle;
			     }else{
		this.currentAnim = this.anims.killidle; 
		if(this.baisseAvant){this.pos.y -= 25;this.baisseAvant = false;this.offset.y = 0;}   this.size.y = 48;    }
	    }
	    if ( this.vel.y == 0) {
	       this.gravityFactor = 10000;
	    }
	    
	    this.vel.x = 0;
	    if (ig.input.state('gauche')) {
		this.vel.x = -300;
		if (this.vel.y == 0) {
		       if (ig.input.state('bas')) {
			     this.size.y = 24;if(this.baisseAvant==false)this.offset.y = 25; this.baisseAvant = true;
			    this.currentAnim = this.anims.killaccroupiGauche;
			     }else{
		    this.currentAnim = this.anims.killmarcherGauche;if(this.baisseAvant){this.pos.y -= 25;this.baisseAvant = false;this.offset.y = 0;}   this.size.y = 48;}
		}
		this.direction = "gauche"
	    }
	    
	    
	    
	    if (ig.input.state('droite')) {
		this.vel.x = 300;
		if (this.vel.y == 0) {
		    
		     if (ig.input.state('bas')) {
			   this.size.y = 24;if(this.baisseAvant==false)this.offset.y = 25; this.baisseAvant = true;
			    this.currentAnim = this.anims.killaccroupiDroite;
			     }else{
		    this.currentAnim = this.anims.killmarcherDroite;if(this.baisseAvant){this.pos.y -= 25;this.baisseAvant = false;this.offset.y = 0;}   this.size.y = 48;}
		}
		this.direction = "droite"
	    }  
	    
	    
		if(ig.input.pressed('sauter') && this.vel.y == 0) //You can also use space or any other key you want
		{
		    timer.set( 0.2 );
			if(Math.random()<0.3)
			ig.game.bruitages.saut1.play();
			else ig.game.bruitages.saut2.play();
		}
		
		if (timer.delta() < 0)
		{
		    if (this.direction == "gauche") {
		       this.currentAnim = this.anims.killsauterGauche;
		    }
		    else{
			this.currentAnim = this.anims.killsauterDroite;
		    }
		    this.vel.y = -500; //This is the minimum speed of the jump
			
		} else
		{
		    this.accel.y = 1200;  //Make the character fall after the jump button is released
		}      	   
	   
	}
	else
	{
	    if ( this.vel.y == 0) {
	       this.gravityFactor = 10000;
	    }
	     if (this.vel.y == 0 && this.vel.x == 0) {
		 if (ig.input.state('bas')) {
		    // this.offset.y = 500;
		    
		    this.size.y = 24;if(this.baisseAvant==false)this.offset.y = 25; this.baisseAvant = true;
			    this.currentAnim = this.anims.accroupiIdle;
			     }else{
		this.currentAnim = this.anims.idle; if(this.baisseAvant){this.pos.y -= 25;this.baisseAvant = false;this.offset.y = 0;}   this.size.y = 48; }
	    }
	    this.vel.x = 0;
	    if (ig.input.state('gauche')) {
		this.vel.x = -300;
		if (this.vel.y == 0) {
		      if (ig.input.state('bas')) {
			 this.size.y = 24;if(this.baisseAvant==false)this.offset.y = 25; this.baisseAvant = true;
			    this.currentAnim = this.anims.accroupiGauche;
			     }else{
		    this.currentAnim = this.anims.marcherGauche; if(this.baisseAvant){this.pos.y -= 25;this.baisseAvant = false;this.offset.y = 0;}   this.size.y = 48; }
		}
		this.direction = "gauche"
	    }
	    
	    if (ig.input.state('droite')) {
		this.vel.x = 300;
		if (this.vel.y == 0) {
		     if (ig.input.state('bas')) {
			    this.currentAnim = this.anims.accroupiDroite; this.size.y = 24;if(this.baisseAvant==false)this.offset.y = 25; this.baisseAvant = true;
			     }else{
		    this.currentAnim = this.anims.marcherDroite; if(this.baisseAvant){this.pos.y -= 25;this.baisseAvant = false;this.offset.y = 0;}   this.size.y = 48; }
		}
		this.direction = "droite"
	    }
		if(ig.input.pressed('sauter') && this.vel.y == 0) //You can also use space or any other key you want
		{
		    timer.set( 0.2 );
			var rand = Math.random();
			if(rand<0.25)
			{
			    ig.game.bruitages.saut1.play();  
			}
			if(rand>= 0.25 && rand < 0.5)
			{
			    ig.game.bruitages.saut2.play();  
			}
			if(rand>= 0.5 && rand < 0.75)
			{
			    ig.game.bruitages.saut3.play();  
			}
			if(rand>= 0.75)
			{
			    ig.game.bruitages.saut4.play();  
			}
		}
		if (timer.delta() < 0)
		{
		    if (this.direction == "gauche") {
		       this.currentAnim = this.anims.sauterGauche;
		    }
		    else{
			this.currentAnim = this.anims.sauterDroite;
		    }
		    this.vel.y = -500; //This is the minimum speed of the jump
		} else
		{
		    this.accel.y = 1200;  //Make the character fall after the jump button is released
		}      
	}
	this.parent();
    },
    kill: function()
    {
	this.parent();
	ig.game.gameOver(this.mort);
    },
    
    receiveDamage:function(amount, from){
		this.parent(amount,from);
		var rand = Math.random();
		if(rand<0.25)
		{
		    ig.game.bruitages.degat1.play();  
		}
		if(rand>= 0.25 && rand < 0.5)
		{
		    ig.game.bruitages.degat2.play();  
		}
		if(rand>= 0.5 && rand < 0.75)
		{
		    ig.game.bruitages.degat3.play();  
		}
		if(rand>= 0.75)
		{
		    ig.game.bruitages.degat4.play();  
		}
	
	}
    
    
    
    
    
    
});
});