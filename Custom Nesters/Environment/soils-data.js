$(document).ready(function() {
    var path = window.location.pathname;
    var $link = $('#soil-survey-link');
    var href = $link.attr('href');
    $link.attr('href', href + '?page=' + path);
});