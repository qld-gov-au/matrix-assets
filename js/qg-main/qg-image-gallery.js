$(document).ready(function() {
    if ($(".image-gallery").length > 0) {
        var gallery = $(".image-gallery a");
        $(gallery).attr('data-fancybox','images');

        $(gallery).each(function() {
            $(this).attr('data-caption', $(this).attr("title"));
        });

        $("head").append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.3.5/jquery.fancybox.css" integrity="sha384-/smJmPQWlo7vGG6keMQ+H73fKIHPe9MMeBrJhm2g2Xv6+GzR7YrDL0Z84IHaf4Sr" crossorigin="anonymous">');
        $("body").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.3.5/jquery.fancybox.min.js" integrity="sha384-9P6MXH8lfxrzYEF6RdCaepmJsgsERWZGoUT0A7GtFJnA3drRC/UFhapoG1ETT/G/" crossorigin="anonymous"></script>');
    }

});