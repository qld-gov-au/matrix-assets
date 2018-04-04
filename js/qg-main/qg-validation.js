
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
      showErrors: function (errorMap, errorList) {

          // summary of number of errors on form
          var msg = "<div class=\"status warn\">\n" +
              "                    <div class=\"inner\">\n" +
              "                        <h2>Please check your answers</h2>\n" +
              "                        <ol></ol>\n" +
              "                    </div>\n" +
              "                </div>";

          if(!$('.status').length){
              $("#form_email_596").prepend(msg);
              var getList = $('.status ol');
              $.each(errorMap, function(key, value) {
                  console.log(errorMap);
                  console.log(value);
                  var escapeKey = key.replace(':', '\\:');
                  var getId = $('[name='+escapeKey+']').attr('id');
                  var getLabel = $("label[for='"+getId+"']").text();
                  getList.append("<li><a href='#"+getId+"'>"+getLabel + value+"</a></li>");

              });
          }







          // place error text inside box


          // also show default labels from errorPlacement callback
          this.defaultShowErrors();

          // toggle the error summary box
          if (this.numberOfInvalids() > 0) {
              $(".status").show();
          } else {
              $(".status").hide();
          }

      } // end showErrors callback
  });
});

