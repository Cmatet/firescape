dev : null,
	sampler : null,
	osc : null,
	Mustring : null,
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	tempo : 120,
	notesPerBeat : 4,
	tickCounter : 1,
	tick : 0,

	
	audioCallback : function(buffer, channelCount){		
		sampler.append(buffer, channelCount);
		delay.append(buffer);
	},	
	
	
	
	init: function() {
		var mySample = atob(musique1String);
		dev = audioLib.AudioDevice(this.audioCallback /* callback for the buffer fills */, 2 /* channelCount */);
		delay = audioLib.Delay.createBufferBased(2 /* channelCount */, dev.sampleRate, 400 /* delay time (in ms) */);
		// Create an instance  of the Sampler class
		sampler = audioLib.Sampler(dev.sampleRate);
		// Load the sample to the sampler
		sampler.loadWav(mySample, true);
		sampler.noteOn(440);
		// The addPreProcessing() method is called before .generate()
		/*sampler.addPreProcessing(function(){
		    // Make tickCounter approach 1, and trigger sample when reached
		    this.tickCounter = this.tickCounter + 1 / dev.sampleRate * this.tempo / 60;
	    
		    if (this.tickCounter >= 1){
			this.tickCounter = 0;
			// Trigger the sample at e if first note, otherwise at a
			this.noteOn(tick ? 440 : 660);
			this.tick = (tick + 1) % notesPerBeat;
		    }
		});*/
		
		ig.input.bind(ig.KEY.SPACE,'action');
		ig.input.bind(ig.KEY.LEFT_ARROW,'gauche');
		ig.input.bind(ig.KEY.RIGHT_ARROW,'droite');
		ig.input.bind(ig.KEY.UP_ARROW,'sauter');
		ig.input.bind(ig.KEY.DOWN_ARROW,'bas');
		ig.input.bind(ig.KEY.ENTER,'entrée');
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		
		//this.loadLevel(LevelLevel1);
		//this.gravity = 150;
	},
	