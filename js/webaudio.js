/* 
 *	This is our sound object
 */
function Sound(source, level) {
	if (!window.audioContext) {
		audioContext = new AudioContext();
	}
	var that = this;
	that.source = source;
	that.buffer = null;
	that.isLoaded = false;
	that.panner = audioContext.createStereoPanner();
	that.volume = audioContext.createGain();
	if (!level) {
		that.volume.gain.value = 1;
	}
	else {
		that.volume.gain.value = level;
	}

	var getSound = Base64Binary.decodeArrayBuffer(that.source);
	audioContext.decodeAudioData(getSound, function(buffer) {
			that.buffer = buffer;
			that.isLoaded = true;
		}
	);
}

// our play function
// playbackRate allows for changing the speed of playback, mainly for SFX
Sound.prototype.play = function (playbackRate) {
	if (!playbackRate) {
		playbackRate = 1;
	}
	// if the sound is loaded
	if (this.isLoaded === true) {
		var playSound = audioContext.createBufferSource();
		playSound.buffer = this.buffer;
		playSound.connect(this.panner);
		playSound.playbackRate.value = playbackRate;
		this.panner.connect(this.volume);
		this.volume.connect(audioContext.destination);
		playSound.start(0);
	}

	// return the context so we can work with it later!
	return playSound;
}

Sound.prototype.setVolume = function (level) {
	this.volume.gain.value = level;
}

Sound.prototype.setPan = function (xValue, yValue, zValue) {
	this.panner.setPosition(xValue,yValue,zValue);
}

// pass the returned playSound context 
// (from Sound.prototype.play) in order to stop sound playback
Sound.prototype.killSound = function (context) {
	context.stop(0);
}
