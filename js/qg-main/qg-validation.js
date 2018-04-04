
/*$.validator.setDefaults({
  /!*submitHandler: function () {
    alert('submitted!');
  },*!/
});*/

jQuery.extend(jQuery.validator.messages, {
    required: "Must be completed",
});

$(document).ready(function () {
    $('.qg-validate-form').each(function () {
        var self = this;
        $(this).validate({
            errorClass: "qg-error",
            errorElement: "span",
            messages: {},
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertBefore(element);
                }
            },
            showErrors: function (errorMap, errorList) {

                // summary of number of errors on form
                var msg = "<div class=\"qg-status qg-warn\">\n" +
                    "                    <div class=\"inner\">\n" +
                    "                        <h2>Please check your answers</h2>\n" +
                    "                        <ol></ol>\n" +
                    "                    </div>\n" +
                    "                </div>";

                if(!($(self).find('.qg-status').length)){
                    $(self).prepend(msg);
                    var getList = $('.qg-status ol');
                    $.each(errorMap, function(key, value) {
                        var escapeKey = key.replace(':', '\\:');
                        var getId = $('[name='+escapeKey+']').attr('id');
                        var getLabel = $("label[for='"+getId+"']").clone().children().remove().end().text().trim();    //get the text of element;
                        getList.append("<li><a href='#"+getId+"'>"+getLabel+": "+ value+"</a></li>");

                    });
                }

                this.defaultShowErrors();

                // toggle the error summary box
                if (this.numberOfInvalids() > 0) {
                    $(self).find('.qg-status').show();
                } else {
                    $(self).find('.qg-status').hide();
                }

            } // end showErrors callback
        });
    });




});

