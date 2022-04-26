$("#write-msg").on('click', function () {
  var position = $("#online-form").offset().top;
  $("HTML, BODY").animate({
    scrollTop: position
  }, 1000);
});

$(document).ready(function () {
  $('.slick-carousel').slick({
    dots: true,
    infinite: false,
    autoplay: false,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  $('[data-fancybox]').fancybox({
    buttons: [
      'slideShow',
      'zoom',
      'fullScreen',
      'close'
    ],
    thumbs: {
      autoStart: true
    }
  });

});
