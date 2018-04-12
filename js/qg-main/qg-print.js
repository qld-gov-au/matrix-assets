'use strict';

(function ($) {
    var printContentLinks = function () {
        var $elPrintLink = $('.print-content-link');
        if($elPrintLink.length > 0) {
            $elPrintLink.on('click', function (e) {
                e.preventDefault();
                window.print();
            })
        }
    };

    printContentLinks();
})(jQuery);
