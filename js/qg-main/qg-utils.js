// equal height columns
"use strict";

(function($) {
    function equalHeightCol(selector) {
        $.each(selector, function(i, val) {
            console.log(val);
            var items = val, //grab all slides
                heights = [], //create empty array to store height values
                tallest; //create variable to make note of the tallest slide
            if (items.length) {
                var normalizeHeights = function() {
                    items.each(function() {
                        //add heights to array
                        heights.push($(this).height());
                    });
                    tallest = Math.max.apply(null, heights); //cache largest value
                    items.each(function() {
                        $(this).css("min-height", tallest + "px");
                    });
                };
                normalizeHeights();

                $(window).on("resize orientationchange", function() {
                    var tallest = 0;
                    heights.length = 0;
                    items.each(function() {
                        $(this).css("min-height", "0"); //reset min-height
                    });
                    normalizeHeights(); //run it again
                });
            }
        });
    }

    function tablesFix() {
        $("#qg-primary-content table").wrap(
            '<div class="scrollable"><div class="inner"></div></div>'
        );
    }

    equalHeightCol([$("#aside-carousel .item"), $(".qg-index-item")]);
    tablesFix();
})(jQuery);
