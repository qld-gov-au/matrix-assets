'use strict';

(function ($) {
    function carouselNormalization() {
        var items = $('#aside-carousel .item'),
            heights = [],
            tallest;
        if (items.length) {
            var normalizeHeights = function () {
                items.each(function() {
                    heights.push($(this).height());
                });
                tallest = Math.max.apply(null, heights);
                items.each(function() {
                    $(this).css('min-height',tallest + 'px');
                });
            };
            normalizeHeights();

            $(window).on('resize orientationchange', function () {
                tallest = 0, heights.length = 0;
                items.each(function() {
                    $(this).css('min-height','0');
                });
                normalizeHeights();
            });
        }
    }

    // SWE2 transformed table code fix
    function tablesFix() {
        var $contentTable = $("#qg-primary-content table");
        if ($contentTable.width() > $("#qg-primary-content").width()) {
            $contentTable.wrap(
                '<div class="scrollable"><div class="inner"></div></div>'
            );
        }
    }

    carouselNormalization();
    tablesFix();

})(jQuery);
