// aside carousel play and pause feature
'use strict';

(function($){
    var paused = 0;
    $('.toggleCarousel').click(function () {
        var state = (paused) ? 'cycle' : 'pause';
        paused = (paused) ? 0 : 1;

        $('#aside-carousel').carousel(state);
        $(this).find('i').toggleClass('fa-sync fa-pause');
    });
})(jQuery);



