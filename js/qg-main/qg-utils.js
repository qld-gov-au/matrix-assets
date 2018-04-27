
// equal height columns
'use strict';

(function ($) {
    function eqHeight(selectors) {
        $.each(selectors, function(index, selector) {
            if ($(selector).length) {
                var item = $(selector),
                    heights = [],
                    tallest;

                var normalizeHeights = function() {
                    for (let i = 0; i < item.length; i++) {
                        let currentPostion = item.eq(i).position().top;
                        heights.length = 0;

                        $.each(item, function(index, item) {
                            if (currentPostion === $(item).position().top) {
                                heights.push($(item).height());
                            }
                        });

                        tallest = Math.max.apply(null, heights);

                        $.each(item, function(index, item) {
                            if (currentPostion === $(item).position().top) {
                                $(item).css("min-height", tallest + "px");
                            }
                        });
                    }
                };
                normalizeHeights(selector);

                $(window).on("resize orientationchange", function() {
                    (tallest = 0), (heights.length = 0); //reset vars
                    item.each(function() {
                        $(this).css("min-height", "0"); //reset min-height
                    });
                    normalizeHeights(selector); //run it again
                });
            }
        });
    }
    function tablesFix() {
        var $contentTable = $("#qg-primary-content table");
        if ($contentTable.width() > $("#qg-primary-content").width()) {
            $contentTable.wrap(
                '<div class="scrollable"><div class="inner"></div></div>'
            );
        }
    }
    eqHeight([".qg-index-item", ".carousel-inner .item"]);
    tablesFix();
})(jQuery);
