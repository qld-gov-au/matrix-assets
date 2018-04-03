
$.validator.setDefaults({
  /*submitHandler: function () {
    alert('submitted!');
  },*/
});

$(document).ready(function () {
  $('#form_email_596').validate({
    rules: {
      'q596:q4': {
        required: true
      },
    },
    messages: {},
    errorPlacement: function (error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error);
      } else {
        error.insertBefore(element);
        $(element).addClass('error-container');
      }
    },
  });
});

