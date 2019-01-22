'use strict';

(function ($) {
    // SWE2 transformed table code fix
    function tablesFix() {
        var $contentTable = $("#qg-primary-content table");
        if ($contentTable.width() > $("#qg-primary-content").width()) {
            $contentTable.wrap(
                '<div class="scrollable"><div class="inner"></div></div>'
            );
        }
    }

    // Workaround to push columns - some pages on Matrix have a 3 col layout but there is no third columns
    // example - https://www.qld.gov.au/about/events-awards-honours/awards/reconciliation-awards/2015-award-winners
    function colPush(){
        let $qg = $('#qg-three-col');
        if ($qg.find('#qg-section-nav').length <= 0) {
            $qg.addClass('no-secondary-nav');
        }
    }
    tablesFix();
    colPush();
})(jQuery);
