// start the playback and swap the visible buttons
function playTheSound(theSound) {
	myContext = theSound.play();

	thePlayButton.setAttribute("style","display:none;");
	theStopButton.removeAttribute("style");

	return myContext;
}

// kill the playback and swap the visible buttons
function killTheSound(myContext) {
	soundCounselor.killSound(myContext);

	theStopButton.setAttribute("style","display:none;");
	thePlayButton.removeAttribute("style");
}
