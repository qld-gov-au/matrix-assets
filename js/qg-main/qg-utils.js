'use strict';

(function ($) {
    // Workaround to push columns - some pages on Matrix have a 3 col layout but there is no third columns
    // example - https://www.qld.gov.au/about/events-awards-honours/awards/reconciliation-awards/2015-award-winners
    function colPush(){
        let $qg = $('#qg-three-col');
        if ($qg.find('#qg-section-nav').length <= 0) {
            $qg.addClass('no-secondary-nav');
        }
    }
    colPush();
    // This function equal height of cards in a group, if it finds a class '.qg-cards__equal-height and row classes i.e row-1 , row-2 etc'.
    var $container = $('.qg-cards__equal-height');
    var gridType = function (){
        let gridType;
        if ($container.find('.col-lg-4').length > 0){
            gridType = 3;
        } else if ($container.find('.col-lg-6').length > 0){
            gridType = 2;
        }
        return gridType;
    };
    var cardCount = function(){
        return $container.find('.qg-card').length;
    };
    function setHeight() {
        if ($container.length > 0) {
            var loopCount = Math.ceil(cardCount() / gridType());
            $('.qg-cards.qg-cards__equal-height').each(function () {
                // Cache the highest
                // Select and loop the elements you want to equalise
                for (let i = 0; i <= loopCount; i++){
                    var highestBox = 0;
                    $(this)
                        .find('.qg-cards__row-' + i + '')
                        .each(function () {
                            // If this box is higher than the cached highest then store it
                            if ($(this).height() > highestBox) {
                                highestBox = $(this).height();
                            }
                        });
                    // Set the height of all those children to whichever was highest
                    $(this).find('.qg-cards__row-' + i + '').height(highestBox);
                }
            });
        }
    }
    setHeight();
    $(window).on('resize', function () {
        var $windowSize = $(window).width();
        if ($windowSize < 767) {
            $container.find('.details').removeAttr('style');
        } else {
            setHeight();
        }
    });
})(jQuery);
