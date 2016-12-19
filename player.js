/**
 * GifPlayer Example.
 *
 * Here is a definition of the jquery gif player methods that
 * provides interaction and loading mechanisms.
 *
 * This file is a part of a project from http://zompi.pl/[title]
 * (c) 2015 Damian Nowakowski
 */

function gifPlayer(cont) {
	//Set the first state
	var state = 'freeze';
	
	//Get pointers to all needed blocks
	var still		= cont.find('.still');
	var animated 	= cont.find('.animated');
	var spinner 	= cont.find('.spinner');
	var play 		= cont.find('.play');
	
	//Get urls of still and animated graphics
	var stillsrc = still.attr('src');
	var animatedsrc = stillsrc.replace('.png', '_anim.gif');
	
	//Hide animated gif and spinner first
	animated.addClass('hidden');
	spinner.addClass('hidden');
	
	//Define function that runs when loading has finished
	//Hide still, and spinner, show animated
	var onFinishedLoading = function() {
		still.addClass('hidden');
		animated.removeClass('hidden');
		spinner.addClass('hidden');
		
		state = 'playing';
	}
	
	//Define function that runs when loading has started
	//Set animated src show spinner and hide play button
	var onStartLoading = function() {
		animated.attr('src', animatedsrc);
		spinner.removeClass('hidden');
		play.addClass('hidden');
		
		state = 'loading';
	}
	
	//Define function that runs when gif has been stopped
	//Show still, hide gif and remove src attribute, show play button
	var onStop = function() {
		still.removeClass('hidden');
		animated.removeAttr('src').addClass('hidden');
		play.removeClass('hidden');
		
		state = 'stopped';
	}
	
	//When still image finished downloading 
	//allow to download gif image (unfreeze state)
	//Also show play button and set size of container
	still.load(function() {
		state = 'unloaded';
		play.removeClass('hidden');
		cont.width(this.width).height(this.height);
	});
	
	//Play play_button animation when hoving over the div
	cont.hover(function() {
		play.addClass('hover');
	}, function() {
		play.removeClass('hover');
	});
	
	//When user click the container:
	cont.click(function() {
		switch (state) {
			case 'unloaded':
				//When it's unloaded load gif and set
				//delegate on loading finish
				onStartLoading();
				animated.load(function() {
					onFinishedLoading();
				});
				break;
				
			case 'playing':
				//When gif is playing stop it
				onStop();
				break;
				
			case 'stopped':
				//When gif is stopped reload gif
				onStartLoading();
				break;
			// In case of any other state just do nothing.
		}
		
		return false;
	});
}
