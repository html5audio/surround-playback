//-------------------------
// 
// Initialize our sounds
// 
//----------

//Counselor.ogg by Jeremy Mendonca - recorded & mixed at studio.jory.org
	soundCounselor = new Sound(Counselor);


//-------------------------
// 
// Declare and initialize our variables
// 
//----------

	var myContext;
	var isPlaying = false;

	var thePlayButton = document.getElementById("audioPlayer_play");
	var theStopButton = document.getElementById("audioPlayer_stop");


//-------------------------
// 
// Declare our listeners
// 
//----------


//
// listen for the user to click on the stop button
//
	thePlayButton.addEventListener('click', 
			function(){
				myContext = playTheSound(soundCounselor);
				isPlaying = true;

				// check the playbackState in order to set the play button 
				// back to its original state when the sound finishes playing
				var myPlayback = setInterval(function() {
					if (myContext.playbackState == 3) {
						killTheSound(myContext);
						isPlaying = false;
					}
				},100);
			}
		, false);

//
// listen for the user to click on the stop button
//
	theStopButton.addEventListener('click', 
			function(){
				killTheSound(myContext);
			}
		, false);



//
// listen for key presses
//
	window.addEventListener("keydown",onKeyDown);
	
	function onKeyDown(e) {
		switch (e.keyCode) {
			// spacebar
			case 32:
				if (!isPlaying) {
					myContext = playTheSound(soundCounselor);
					isPlaying = true;
	
					// check the playbackState in order to set the play button 
					// back to its original state when the sound finishes playing
					var myPlayback = setInterval(function() {
						if (myContext.playbackState == 3) {
							killTheSound(myContext);
							isPlaying = false;
						}
					},100);
				}
				else {
					killTheSound(myContext);
					isPlaying = false;
					
				}
				break;
		}
	}
