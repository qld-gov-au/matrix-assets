(function ($) {
    'use strict';
    var $pageContainer = $('#page-container');
    var $contentContainer = $('#content-container');
    var $content = $contentContainer.find('#content');
    var $asides =  $contentContainer.find('#asides');
    var $pageLinks = $('#toc.qg-print-guide ol li a');


    $('#printguide').click(function(event) {
        printWholeGuide(event);
    });

    function printWholeGuide(event) {
        event.preventDefault();

        var new_content = '';
        var current_content = '<div id="content">' + $content.html() + '</div>';
        if ($asides.length !== 0) {
            current_content += '<div id="asides">' + $asides.html() + '</div>';
        }

        // Extract the list of links for the guide pages
        var page_list = [];
        page_list = $pageLinks.map(function() {
            return this.href;
        }).get(); // make array

        // Using the list of links, fetch the content for each guide page
        function loadPages() {
            $.each(page_list, function (index, value) {
                $.ajax({
                    url: value,
                    data: {},
                    success: function (data) {
                        // Add the content and asides divs of each page to what will be printed
                        new_content += '<div id="content">' + $(data).find('#content-container #content').html() + '</div>';
                        if ($(data).find('#content-container #asides').length !== 0) {
                            new_content += '<div id="asides">' + $(data).find('#content-container #asides').html() + '</div>';
                        }
                        new_content += '<hr />';
                    },
                    dataType: 'html',
                    async: false
                });
            });
            // Add the consolidated guide content to the page, replacing the content that was there
            $('#content-container #content, #content-container #asides').remove();
            $contentContainer.prepend(new_content);

            // Clean up content that's been pulled in (remove duplicate headings, etc)
            // - remove all h1s except the first - the title of the guide
            $pageContainer.contents().find('#content-container h1').not(':first').remove();
            // - remove guide links
            $pageContainer.contents().find('.border h3:contains("In this guide")').parent().remove();
            // - remove next/prev links
            $pageContainer.contents().find('ul.pagination').remove();

            // Recalculate screen layout to accomodate extra content
            $('#article').trigger('x-height-change');

        }

        // Replace original content after printing
        var onReloadPage=function(){
            $('#content-container #content, #content-container #asides, hr').remove();
            $contentContainer.prepend(current_content);
            // Re-bind click event (lost in reload)
            $('#printguide').click(function(event) {
                printWholeGuide(event);
            });

        };

        // Call for printing the page then after printing is complete, reload the page
        function printPage(){
            window.focus();
            onReloadPage(window.print());
        }

        // Find images then reload them and test whether they have loaded before printing (a problem in Chrome)
        function loadImages(){
            var image_list = $('#content-container #content, #content-container #asides').find('img');
            var total_images = image_list.length;
            var num_images_loaded = 0;
            if (total_images === 0) {
                // No need to check for images to load
                printPage();
            } else {
                // Load images before printing
                image_list.map(function() {
                    var temp_src =  this.src;
                    this.onload = function () {
                        num_images_loaded++;
                        if (num_images_loaded >= total_images) {
                            printPage(); // if all images have loaded print the page
                        }
                    };
                    this.src = temp_src;
                });
            }
        }

        loadPages();
        loadImages();
    }
}(jQuery));
