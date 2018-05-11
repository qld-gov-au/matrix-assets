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
    tablesFix();
})(jQuery);
