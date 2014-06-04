/* 
 *	This is our sound object
 */
function Sound(source, level) {
	if (!window.audioContext) {
		audioContext = new AudioContext();
	}
	// test to see how many hardware channels we can output to
	// if it's 6 or larger, we can play a 5.1 audio stream!
	if (audioContext.destination.maxChannelCount >= 6) {
		audioContext.destination.channelCount = 6;
	}
	// otherwise, let's down-mix to 2.0
	else {
		audioContext.destination.channelCount = 2;
	}
	audioContext.destination.channelCountMode = "explicit";
	audioContext.destination.channelInterpretation = "discrete";

	var that = this;
	that.source = source;
	that.buffer = null;
	that.isLoaded = false;
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
		playSound.connect(this.volume);
		playSound.playbackRate.value = playbackRate;
		this.volume.connect(audioContext.destination);
		playSound.start(0);
	}

	// return the context so we can work with it later!
	return playSound;
}

Sound.prototype.setVolume = function (level) {
	this.volume.gain.value = level;
}

// pass the returned playSound context 
// (from Sound.prototype.play) in order to stop sound playback
Sound.prototype.killSound = function (context) {
	context.stop(0);
}
