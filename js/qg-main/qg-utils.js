
// equal height columns
'use strict';

(function ($) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = [];

    function setConformingHeight (el, newHeight) {
        // set the height to something new, but remember the original height in case things change
        el.data('originalHeight', (el.data('originalHeight') === undefined) ? (el.height()) : (el.data('originalHeight')));
        el.height(newHeight);
    }

    function getOriginalHeight (el) {
        // if the height has changed, send the originalHeight
        return (el.data('originalHeight') === undefined) ? (el.height()) : (el.data('originalHeight'));
    }

    function columnConform () {
        // find the tallest LI in the row, and set the heights of all of the LIs to match it.
        $('.qg-index-item').each(function () {
            // "caching"
            var $el = $(this);

            var topPosition = $el.position().top;

            if (currentRowStart !== topPosition) {
                // we just came to a new row.  Set all the heights on the completed row
                for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) setConformingHeight(rowDivs[currentDiv], currentTallest);

                // set the variables for the new row
                rowDivs.length = 0; // empty the array
                currentRowStart = topPosition;
                currentTallest = getOriginalHeight($el);
                rowDivs.push($el);
            } else {
                // another div on the current row.  Add it to the list and check if it's taller
                rowDivs.push($el);
                currentTallest = (currentTallest < getOriginalHeight($el)) ? (getOriginalHeight($el)) : (currentTallest);
            }
            // do the last row
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) setConformingHeight(rowDivs[currentDiv], currentTallest);
        });
    }

    function carouselNormalization() {
        var items = $('#aside-carousel .item'), //grab all slides
            heights = [], //create empty array to store height values
            tallest; //create variable to make note of the tallest slide
        if (items.length) {
            function normalizeHeights() {
                items.each(function() { //add heights to array
                    heights.push($(this).height());
                });
                tallest = Math.max.apply(null, heights); //cache largest value
                items.each(function() {
                    $(this).css('min-height',tallest + 'px');
                });
            };
            normalizeHeights();

            $(window).on('resize orientationchange', function () {
                tallest = 0, heights.length = 0; //reset vars
                items.each(function() {
                    $(this).css('min-height','0'); //reset min-height
                });
                normalizeHeights(); //run it again
            });
        }
    }

    function tablesFix() {
        var $contentTable = $("#qg-primary-content table");
        if ($contentTable.width() >= $("#qg-primary-content").width()) {
            $contentTable.wrap(
                '<div class="scrollable"><div class="inner"></div></div>'
            );
        }
    }

    carouselNormalization();
    columnConform();
    tablesFix();

    $(window).resize(function () {
        columnConform();
    });
})(jQuery);
