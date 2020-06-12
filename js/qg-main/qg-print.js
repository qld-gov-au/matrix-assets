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
    // print guide content guides
    var $pageLinks = $('#toc.qg-print-guide ol li a');
    var $contentContainer = $('#qg-content');
    var $content = $contentContainer.find('#qg-primary-content');
    var new_content="";
    var current_content="";
    $( "body" ).on( "click", "#printguide", function(event) {
        event.preventDefault();
        current_content = $content.html();
        // grab all the links in the guide page list
        var page_list = [];
        page_list = $pageLinks.map(function() {
            return this.href;
        }).get();
        // go and grab content using Ajax
        $.each(page_list, function (index, value) {
            $.ajax({
                url: value,
                data: {},
                success: function (data) {
                    // Add the content and asides divs of each page to what will be printed
                    new_content += '<div id="qg-primary-content" class="d-none d-print-block">' + $(data).find('#qg-primary-content').html() + '</div>';
                    new_content += '<hr />';
                },
                dataType: 'html',
                async: false
            });
        });
        // replace the content in the current content with the ajax fetched content
        $content.append(new_content);
        var image_list = $content.find('img');
        var total_images = image_list.length;
        var num_images_loaded = 0;
        $content.find('h1').not(':first').remove();
        $content.find('.qg-print-guide p:contains("In this guide")').parent().remove();
        $content.find('ul.pagination').remove();
        $content.find('.qg-content-footer').remove();
        if(total_images === 0){
            window.print();
            $content.empty().append(current_content);
        } else {
            image_list.map(function() {
                var temp_src =  this.src;
                this.onload = function () {
                    num_images_loaded++;
                    if (num_images_loaded >= total_images) {
                        window.print(); // if all images have loaded print the page
                        $content.empty().append(current_content);
                    }
                };
                this.src = temp_src;
            });
        }
    });

    printContentLinks();
})(jQuery);
