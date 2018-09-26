/**
 * Figures
 * 
 * Show/hide credits for figures
 * 
 * @requires jQuery
 */
$(function() {
	'use strict';
	var figureElement = 'figure, .figure, .cut-in, .cut-in-alt';

	// find figures with credits
	$( '.figure-credits', figureElement ).each(function() {

		$( this )
			// add a toggle before the credits
			.before( '<button class="figure-credits-toggle" title="View credits"><img src="https://static.qgov.net.au/assets/v2/images/skin/icon-image-credit.png" alt"View credits" /></button>' )
			// hide the credits
			.hide()
		;
	});
	
	// toggle show/hide credits
	$( '#qg-content' ).on('click', '.figure-credits-toggle', function() {
        console.log(this);
		$( this )
			// show credits
			.closest( figureElement )
				.find( '.figure-credits' )
					.slideDown(500)
					// focus on caption
					.focus()
					.end()
				.end()
			// remove the toggle
			.fadeOut( 1337 );
	});
});
