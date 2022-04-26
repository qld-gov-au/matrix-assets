$(document).ready(function () {
  var $thanksModal = $('#thanksModal');
  if (window.location.href.indexOf('#thank-you') != -1) {
    $thanksModal.modal('show');
  }

  $thanksModal.on('hidden.bs.modal', function (e) {
    location.hash = '';
  })

  $('#featureCarousel').carousel({
    interval: 5000,
    pause: true
  });

  $('.carousel-control-pause').on('click', function () {
    $('#featureCarousel').carousel('pause');
    $(this).fadeOut();
  });
});
