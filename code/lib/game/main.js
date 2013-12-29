ig.module( 
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	
	'game.entities.FallingFloor',
	'game.entities.Exit',
	'game.entities.Exit2',
	'game.entities.health',
	'game.entities.danger',
	'game.entities.tom',
	'game.levels.level1',
	'game.levels.level1_1',
	'game.levels.level2_1',
	'game.levels.level3_1',
	'game.levels.level4_1',
	'game.entities.fire',
	'game.levels.MenuChoix',
	'game.Button',
	'game.entities.Door',
	'game.entities.DoorClosed',
	'game.entities.flammable',
	'game.entities.Alarm',
	'game.entities.bulletxt',
	'game.entities.zoneTextDebut',
	'game.entities.zoneTextFin',
	'game.entities.Ascenseur',
	'game.entities.PanneauAscenseur',
	'game.entities.PanneauEscalier',
	'game.entities.Extincteur',
	'game.entities.Escalier',
	'game.entities.fumee',
	'game.entities.fumable',
	'game.entities.Mousse',
	'game.entities.Particle',
	'game.entities.Trigger_danger_start',
	'game.entities.serviette',
	'game.entities.trigger_mauvais_chemin',
	'game.entities.Evier',
	'game.entities.electricFire'
	
	
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/font1.png' ),
	dangeractif : false,
	background1 : new ig.Image( 'media/ecranTitre.png' ),
	background2: new ig.Image( 'media/fond_choixniveau.png'),
	numlevel : 0,
	tailleXglobal : 840,
	tailleYglobal : 480,
	choixniveau : 1,
	danger : 10,
	endroitCinematique: -1,
	dev : null,
	distorsion : null,
	sampler : null,
	osc : null,
	Mustring : null,
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	tempo : 120,
	notesPerBeat : 4,
	tickCounter : 1,
	tick : 0,
	state : {},
	fps : 60,
	victoire : false,
	bruitages : {},
	samplers : [],
	tempsSon : [],
	bonnesAction : {},
	mauvaiseAction : {},
	numMusique : null,
	sampler1 : null,
	sampler2 : null,
	sampler3 : null,
	sampler4 : null,
	sampler5 : null,
	sampler6 : null,
	sampler7 : null,
	sampler8 : null,
	sampler9 : null,
	voices : [],
	test : null,
	musique : null,
	musiquee : null,
	
	audioCallback : function(buffer, channelCount){
		if (ig.game.victoire == false && !ig.game.state.gameover) {
				if (ig.game.danger < 25) {
					sampler8.append(buffer, channelCount);
				sampler1.append(buffer, channelCount);
				sampler2.append(buffer, channelCount);
				sampler3.append(buffer, channelCount);
				//delay.append(buffer);
				//distorsion.append(buffer);
				sampler4.append(buffer, channelCount);
				sampler5.append(buffer, channelCount);
				sampler6.append(buffer, channelCount);
				}
				if (ig.game.danger > 25) {
					sampler.append(buffer, channelCount);
				sampler1.append(buffer, channelCount);
				sampler2.append(buffer, channelCount);
				sampler3.append(buffer, channelCount);
				//delay.append(buffer);
				//distorsion.append(buffer);
				sampler4.append(buffer, channelCount);
				sampler5.append(buffer, channelCount);
				sampler6.append(buffer, channelCount);
				}
				
			
			sampler7.append(buffer, channelCount);

			//delay.append(buffer);

			/*this.buffer = buffer;
			var o = this;
			this.viderbuffer = function(){ o.buffer = null;}*/
		}
	},	

	init: function() {
		//numMusique = 10;
		musique = atob(ambiance_musique);
		musiquee = atob(ambiance_musiquee);
		var feu = atob(feumusique);
		var coeur = atob(ambiance_coeur);
		var tambour = atob(ambiance_tambour);
		var metal = atob(ambiance_metal);
		var bong = atob(ambiance_bong1);
		var violon = atob(ambiance_violon);
		var clap = atob(ambiance_clap);
		dev = audioLib.AudioDevice(this.audioCallback /* callback for the buffer fills */, 2 /* channelCount */);
		//delay = audioLib.Delay.createBufferBased(2 /* channelCount */, dev.sampleRate, 400 /* delay time (in ms) */);
		//distorsion = audioLib.Compressor.createBufferBased(2,dev.sampleRate,0.6);
		// Create an instance  of the Sampler class
		sampler = audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler.loadWav(musique, false);
		this.samplers[0] = sampler;
		this.tempsSon[0] = 1;
		sampler3 = audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler3.loadWav(coeur, false);
		this.samplers[3] =  sampler3;
		this.tempsSon[3] = 1;
		sampler2= audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler2.loadWav(bong, false);
		this.samplers[2] =  sampler2;
		this.tempsSon[2] = 1;
		sampler1= audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler1.loadWav(clap, false);
		this.samplers[1] =  sampler1;
		this.tempsSon[1] = 1;
		sampler4= audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler4.loadWav(tambour, false);
		this.samplers[4] =  sampler4;
		this.tempsSon[4] = 1;
		sampler5= audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler5.loadWav(violon, false);
		this.samplers[5] =  sampler5;
		this.tempsSon[5] = 1;
		
		sampler6= audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler6.loadWav(metal, false);
		this.samplers[6] =  sampler6;
		this.tempsSon[6] = 1;
		
		sampler7= audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler7.loadWav(feu, false);
		this.samplers[7] =  sampler7;
		this.tempsSon[7] = 1;
		sampler8= audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler8.loadWav(musiquee, false);
		this.samplers[8] =  sampler8;
		this.tempsSon[8] = 1;
		this.tempsSon[9] = 0;
		this.tempsSon[10] = 1;
		//sampler.noteOn(440);
		ig.input.bind(ig.KEY.SPACE,'action');
		ig.input.bind(ig.KEY.LEFT_ARROW,'gauche');
		ig.input.bind(ig.KEY.Q,'gauche');
		ig.input.bind(ig.KEY.RIGHT_ARROW,'droite');
		ig.input.bind(ig.KEY.D,'droite');
		ig.input.bind(ig.KEY.UP_ARROW,'sauter');
		ig.input.bind(ig.KEY.Z,'sauter');
		ig.input.bind(ig.KEY.DOWN_ARROW,'bas');
		ig.input.bind(ig.KEY.S,'bas');
		ig.input.bind(ig.KEY.ENTER,'entr�e');
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		ig.input.bind( ig.KEY.C, 'mousse' );
		this.state.gameover = 0;
		this.chargerActions();
		this.chargerBruitages();
		ig.music.play("intro");
		ig.music.tracks[0].loop=true;
		this.test = 10;
	},
	
	gameOver: function(i)
	{
		//ig.music.fadeOut(1);
		
	        this.state.gameover = i;

		ig.music.tracks[1].loop = true;
		ig.music.next();
		
	       // ig.music.play("gameover");
		// ig.music.play("intro");
	
	},
	
	
		victoireux: function()
	{
		//ig.music.fadeOut(1);

	        this.victoire = true;
		ig.music.tracks[2].loop = true;
		ig.music.next();
		ig.music.next();
		
	       // ig.music.play("gameover");
		// ig.music.play("intro");
	
	},
	//ici on chargera les bruitages
	
	chargerBruitages : function()
	{
		this.bruitages.alarme = new ig.Sound('sons/alarme1.ogg');
		this.bruitages.alarme.volume = 0.1;
		this.bruitages.ecroulement = new ig.Sound('sons/ecroulement.ogg');
		this.bruitages.extincteur = new ig.Sound('sons/exctincteur.ogg');
		this.bruitages.degat1 = new ig.Sound('sons/degat1.ogg');
		this.bruitages.degat1.volume = 0.4;
		this.bruitages.degat2 = new ig.Sound('sons/degat2.ogg');
		this.bruitages.degat2.volume = 0.7;
		this.bruitages.degat3 = new ig.Sound('sons/degat3.ogg');
		this.bruitages.degat3.volume = 0.2;
		this.bruitages.degat4 = new ig.Sound('sons/degat4.ogg');
		this.bruitages.degat4.volume = 0.2;
		this.bruitages.saut1 = new ig.Sound('sons/saut1.ogg');
		this.bruitages.saut1.volume = 0.3;
		this.bruitages.saut2 = new ig.Sound('sons/saut2.ogg');
		this.bruitages.saut2.volume = 0.3;
		this.bruitages.saut3 = new ig.Sound('sons/saut3.ogg');
		this.bruitages.saut3.volume = 0.2;
		this.bruitages.saut4 = new ig.Sound('sons/saut4.ogg');
		this.bruitages.saut4.volume = 0.2;
		this.bruitages.porteouvre = new ig.Sound('sons/porteouvre2.ogg');
		this.bruitages.porteouvre.volume = 0.1;
		this.bruitages.porteferme = new ig.Sound('sons/porteferme1.ogg');
		this.bruitages.porteferme.volume = 0.1;
		ig.music.add('sons/intro.ogg',"intro");
		ig.music.tracks[0].volume = 0.1;
		ig.music.add('sons/gameover.ogg',"gameover");
		ig.music.tracks[1].volume = 0.1;
		ig.music.add('sons/victoire-vrai.ogg',"victoire");
		ig.music.tracks[2].volume = 0.6;
	},
	
	
	chargerActions : function()
	{
		this.bonnesAction.porte = 0;
		this.bonnesAction.alarme = 0;
		this.mauvaiseAction.chemin = 0;
	},
	
	
	lancerlevel: function(num) {
		ig.music.tracks[0].volume = 0.1;
		ig.music.fadeOut( 1.2 )
		ig.music.tracks[0].volume = 0.1;
		switch(num)
		{
		case 1 :    this.numlevel = 1;
					this.bonnesAction.porte=0;
			this.bonnesAction.alarme=0;
			this.mauvaiseAction.chemin=0;
			this.dangeractif=false;
			this.loadLevel(LevelMenuChoix);
			this.endroitCinematique = 0;
			break;
		case 2 :
			this.numlevel = 2;
			this.bonnesAction.porte=0;
			this.bonnesAction.alarme=0;
			this.mauvaiseAction.chemin=0;
			this.dangeractif=false;
			this.loadLevel(LevelLevel2_1);
			this.endroitCinematique = 0;
			break;
		case 3 :
			this.numlevel = 3;
			this.bonnesAction.porte=0;
			this.bonnesAction.alarme=0;
			this.mauvaiseAction.chemin=0;
			this.dangeractif=false;
			this.loadLevel(LevelLevel3_1);
			this.endroitCinematique = 0;
			break;
			
		case 4 :
			this.numlevel = 4;
			this.bonnesAction.porte=0;
			this.bonnesAction.alarme=0;
			this.mauvaiseAction.chemin=0;
			this.dangeractif=false;
			this.loadLevel(LevelLevel4_1);
			this.endroitCinematique = 0;
			break;
		
		}
		
		
		},
	
	
	
	update: function() {
	//console.log(this.numlevel);
		if(this.numlevel>0 && this.victoire == false && !this.state.gameover){
			if (this.danger < 25 && this.numMusique != 0 ) {
				//sampler = audioLib.Sampler(dev.sampleRate);
				this.samplers[0] = sampler8;
				this.tempsSon[9] = this.tempsSon[0];
				this.tempsSon[0] = this.tempsSon[10];
				this.numMusique = 0;
				
			}
			if (this.danger > 26 && this.danger < 80 && this.numMusique != 8) {
				//sampler = audioLib.Sampler(dev.sampleRate);
				// Load the sample to the sampler

				this.samplers[0] = sampler;
				this.tempsSon[10] = this.tempsSon[0];
				this.tempsSon[0] = this.tempsSon[9];
				this.numMusique = 8;
			}

			  for(var i = 1; i < this.samplers.length - 1;i++)
				{
					if (i <= 2 && this.tempsSon[1] >= 1 && this.danger > 26 ) {
						
						this.voices[i] = this.samplers[i].noteOn(440*this.tempsSon[0],0.1 * this.danger / 10);
						
						
						this.tempsSon[1] = 0;
					}
					if (i == 3 && this.tempsSon[1] >= 1 && this.danger > 30) {
						
						this.voices[i] = this.samplers[i].noteOn(440*this.tempsSon[0],0.1 * (this.danger - 20) / 8);
						
						
						this.tempsSon[1] = 0;
					}
					if (i == 4 && this.tempsSon[1] >= 1 && this.danger > 50) {
						
						this.voices[1] = this.samplers[i].noteOn(440*this.tempsSon[0],0.1 * (this.danger - 40) / 6);
						
						
						this.tempsSon[1] = 0;
					}
					if (i == 5 && this.tempsSon[1] >= 1 && this.danger > 70) {
						
						this.voices[i] = this.samplers[i].noteOn(440*this.tempsSon[0],0.1 * (this.danger - 60) / 4);
						
						
						this.tempsSon[1] = 0;
					}
					if (i == 6 && this.tempsSon[1] >= 1 && this.danger > 90) {

						this.voices[i] = this.samplers[i].noteOn(440*this.tempsSon[0],0.1 * (this.danger - 80) / 2);
						
						
						this.tempsSon[1] = 0;
					}
					//this.tempsSon[i] += 1 / (dev.sampleRate / this.tempo * 5);
					this.tempsSon[1] = this.tempsSon[0] ;
				}
			if (this.tempsSon[0] >= 1 )
			{
				//console.log(this.samplers[0]);
				this.voices[0] = this.samplers[0].noteOn(440*this.tempsSon[0],0.2 * (100 - this.danger) / 100);
				
				this.tempsSon[0] = 0;
			}
			else
			{

				this.tempsSon[0] += 1 / (32.5 * 30 ) ;

			}
			
			
			if (this.tempsSon[7] >= 1)
			{
				this.voices[7] = this.samplers[7].noteOn(440*this.tempsSon[7],0.01 * ig.game.danger / 10);
						
						
				this.tempsSon[7] = 0;
			}
			this.tempsSon[7]  += 1 / (32.5) ;
		}

		
		if (this.victoire == true) {
			
			for(var i = 0; i < this.samplers.length;i++)
			{
				if (this.voices && this.voices[i]) {
					this.voices[i].noteIndex = -1;
					this.voices[i].length = -1;
					this.voices[i].active = false;
				}
				
			}
			if (ig.input.pressed('action'))
			{
				ig.music.tracks[2].volume = 0.3;
				ig.music.fadeOut(1.2);
				this.victoire = false;
				this.state.gameover = false;
				this.bonnesAction.porte=0;
				this.bonnesAction.alarme=0;
				this.mauvaiseAction.chemin=0;
				this.dangeractif=false;
				this.numlevel++;
				ig.game.danger = 10;
				switch(this.numlevel){
					case 2 : this.loadLevel(LevelLevel2_1);break;
					case 3 : this.loadLevel(LevelLevel3_1);break;
					case 4 : this.loadLevel(LevelLevel4_1);break;
					
				}
				
				//ig.music.play("intro");
				ig.music.tracks[0].loop=true;
				ig.music.next();
				
			}
		}
		else{
		if (this.state.gameover) {
			if (ig.input.pressed('action'))
			{
				ig.music.tracks[1].volume = 0.2;
				ig.music.fadeOut(1);
				this.state.gameover = false;
				this.bonnesAction.porte=0;
				this.bonnesAction.alarme=0;
				this.mauvaiseAction.chemin=0;
				this.dangeractif=false;
				ig.game.danger = 10;
				switch(this.numlevel){
					case 1 : this.loadLevel(LevelLevel1_1);break;
					case 2 : this.loadLevel(LevelLevel2_1);break;
					case 3 : this.loadLevel(LevelLevel3_1);break;
					case 4 : this.loadLevel(LevelLevel4_1);break;
					
				}
				
				
				//ig.music.play("intro");
				ig.music.tracks[0].loop=true;
				ig.music.next();
				ig.music.next();
			}
		}
		else
		{
			if (this.danger < 100 && this.dangeractif==true) {
				this.danger += 0.04;
			}
			// Update all entities and backgroundMaps
			this.parent();
			
			
				if (ig.input.pressed('entr�e') || ig.input.pressed('click')) {
					
					
						
					
					if (this.numlevel == 0) { // on est � l'�cran titre
						
						this.numlevel = -1;
						
					this.loadLevel(LevelMenuChoix);
					this.initMenu();
						
						
					}
					else
					if (this.numlevel == 1 && this.endroitCinematique != -1) {
						
						if(this.endroitCinematique<2)this.endroitCinematique++;
						else{	
						this.endroitCinematique = -1;
						this.loadLevel(LevelLevel1_1);
						ig.music.tracks[0].volume = 0.1;
						ig.music.fadeOut(1);
						
						this.danger = 30;
						}
					}
				
				
							
						
				
				
				
			
				}
		
			
			if (this.getEntityByName("Tom") != undefined ) {
				if (this.getEntityByName("HealthBar") == undefined) {
				this.spawnEntity(EntityHealth, this.screen.x + ig.system.width - 126,this.screen.y + 10,{ Unit: this.getEntityByName("Tom") });
				}
				if (this.getEntityByName("Danger") == undefined) {
				this.spawnEntity(EntityDanger, this.screen.x + ig.system.width - 126,this.screen.y + 10,{ Unit: this});
				}
				
				if (this.getEntityByName("Tom").pos.x < this.screen.x + ig.system.width * 0.45) {
					this.screen.x = this.getEntityByName("Tom").pos.x - ig.system.width * 0.45;
				}
				if (this.getEntityByName("Tom").pos.x > this.screen.x + ig.system.width * 0.55) {
					this.screen.x = this.getEntityByName("Tom").pos.x - ig.system.width * 0.55 ;
				}
				
				if (this.getEntityByName("Tom").pos.y < this.screen.y + ig.system.height * 0.33) {
					this.screen.y = this.getEntityByName("Tom").pos.y - ig.system.height * 0.33;
				}
				if (this.getEntityByName("Tom").pos.y > this.screen.y + ig.system.height * 0.66) {
					this.screen.y = this.getEntityByName("Tom").pos.y - ig.system.height * 0.66 ;
				}
				
			}
		
		}
		}
		
			
		
		// Add your own, additional update code here
	},
	
	
	
	
	
	
	
	
	
	initMenu: function() {
		 
		font1 = new ig.Font( 'media/font1.png' );
		
	
			
	
	
		ig.game.spawnEntity( Button, 100, 100, {
		  font: font1,
		  text: [ 'Niveau 1' ],
		  textPos: { x: 55, y: 15 },
		  size: { x: 775/3, y: 79 },
		  animSheet: new ig.AnimationSheet( 'media/button.png', 775/3, 79 ),
			
		  pressedDown: function() {
		   // console.log( 'pressedDown' );
		  },
		  pressed: function() {
			 ig.game.lancerlevel(1);
		  },
		  pressedUp: function() {
		//    console.log( 'pressedUp' );
		  }
		});
		
		
		
			ig.game.spawnEntity( Button, 500, 100, {
		 	  font: font1,
		  text: [ 'Niveau 2' ],
		  textPos: { x: 55, y: 15 },
		 size: { x: 775/3, y: 79 },
		  animSheet: new ig.AnimationSheet( 'media/button.png', 775/3, 79 ),
			
		  pressedDown: function() {
		   // console.log( 'pressedDown' );
		  },
		  pressed: function() {
			 ig.game.lancerlevel(2);
		  },
		  pressedUp: function() {
		//    console.log( 'pressedUp' );
		  }
		});
			
			
			
			
				ig.game.spawnEntity( Button, 100, 350, {
			  font: font1,
		  text: [ 'Niveau 3' ],
		  textPos: { x: 55, y: 15 },
		  
		size: { x: 775/3, y: 79 },
		animSheet: new ig.AnimationSheet( 'media/button.png', 775/3, 79 ),
			
		  pressedDown: function() {
		   // console.log( 'pressedDown' );
		  },
		  pressed: function() {
			 ig.game.lancerlevel(3);
		  },
		  pressedUp: function() {
		//    console.log( 'pressedUp' );
		  }
		});
				
				
				
				
					ig.game.spawnEntity( Button, 500, 350, {
		    font: font1,
			  font: font1,
		  text: [ 'Niveau 4' ],
		  textPos: { x: 55, y: 15 },
		size: { x: 775/3, y: 79 },
		  animSheet: new ig.AnimationSheet( 'media/button.png', 775/3, 79 ),
			
		  pressedDown: function() {
		   // console.log( 'pressedDown' );
		  },
		  pressed: function() {
			 ig.game.lancerlevel(4);
		  },
		  pressedUp: function() {
		//    console.log( 'pressedUp' );
		  }
		});
		
		
		
		
		
	
		
		
		
	},
	
	
	
	
	
	
	
		
	
	
	
	
	draw: function() {
		
		
		
		
		if (this.victoire == true) {
		
			var img = new ig.Image( 'media/victoire.png' );
				img.draw( 0, 0 );
				
			this.font = new ig.Font( 'media/font4.png' );
			this.font.draw( "Victoire avec danger a " + parseInt(this.danger) + " .", 295, 45);
			this.font = new ig.Font( 'media/font2.png' );
			this.font.draw( "Tu as ferme " + this.bonnesAction.porte + " portes", 65, 350);
			this.font.draw( "Tu as active " + this.bonnesAction.alarme + " alarmes", 65, 375);
			this.font = new ig.Font( 'media/font3.png' );
			this.font.draw( "Tu as pris " + this.mauvaiseAction.chemin + " mauvais chemin", 560, 380);
		}
		else
		if (this.state.gameover != 0)
		{
			if (this.state.gameover == 1) {
				var img = new ig.Image( 'media/game_over.png' );
				img.draw( 0, 0 );
				
			}
			if (this.state.gameover == 2) {
				var img = new ig.Image( 'media/game_over_ascenseur.png' );
				img.draw( 0, 0 );
				
			}
			this.font = new ig.Font( 'media/font4.png' );
			this.font.draw( "Tu es mort avec le danger a " + parseInt(this.danger) + " .", 270, 65);
			this.font = new ig.Font( 'media/font2.png' );
			this.font.draw( "Tu as ferme " + this.bonnesAction.porte + " portes", 85, 380);
			this.font.draw( "Tu as active " + this.bonnesAction.alarme + " alarmes", 85, 410);
			this.font = new ig.Font( 'media/font3.png' );
			this.font.draw( "Tu as pris " + this.mauvaiseAction.chemin + " mauvais chemin", 560, 380);
			//this.danger = 30;
			

		}
		else
		{
			
			switch (this.numlevel) {
				case 0 :  this.parent(); this.background1.draw( 0, 0 ); break;
				case -1 : this.background2.draw(0,0);
				
				
				 for( var i = 0; i < this.entities.length; i++ ) {
						this.entities[i].draw();
					  }
				
				
				
				
				
				
				break;
				case 1 :this.parent();
				
	   
				
							switch(this.endroitCinematique){
								case -1 : break;
				case 0 :
					
					
					
				var img = new ig.Image( 'media/cinematique1.png' );
				img.draw( 0, 0 );
				
				this.font.draw( "Tom etait tranquilement en train de", 30, 30);
					this.font.draw( "jouer dans son appartement.", 30, 60);
					this.font.draw( "Ses parents sont partis faire des courses.", 30, 95);
					
				
				
				
				break;
				case 1 :var img = new ig.Image( 'media/cinematique2.png' );
				img.draw( 0, 0 );
				
				this.font.draw( "Soudain, un incendie se declare !", 30,30);
				
				break;
				case 2 :
				var img = new ig.Image( 'media/cinematique3.png' );
				img.draw( 0, 0 );
				this.font.draw( "Tom doit s'echapper et prevenir les pompiers.", 30, 30); 
							this.font.draw("Heureusement, il se souvient des conseils", 30, 60);
							this.font.draw("de ses parents.", 30, 95);
							
							break;
							
							}
							break;
			
			
			default: this.parent();break;
			}
		}
		
		
		
	}
});
















// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 30, 840, 480, 1 );

});
