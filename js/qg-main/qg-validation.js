$.extend($.validator.messages, {
    required: 'Must be completed',
});

$(document).ready(function () {
    $('.qg-validate-form').each(function () {
        var self = this;
        $(this).validate({
            errorClass: 'qg-error',
            errorElement: 'span',
            messages: {},
            errorPlacement: function errorPlacement (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error);
                } else {
                    error.insertBefore(element);
                }
            },
            showErrors: function showErrors (errorMap, errorList) {
                // summary of number of errors on form
                var msg = '<div class="qg-status qg-warn">\n' + '                    <div class="inner">\n' + '                        <h2>Please check your answers</h2>\n' + '                        <ol></ol>\n' + '                    </div>\n' + '                </div>';

                if (!$(self).find('.qg-status').length) {
                    $(self).prepend(msg);
                    $.each(errorMap, function (key, value) {
                        var getLabel;
                        var escapeKey = key.replace(':', '\\:');
                        var getId = $('[name=' + escapeKey + ']').attr('id');
                        if ( $("#"+getId).is(":radio") ){
                            getLabel = $("input[id="+getId+"]").parents('fieldset').find('> label').clone().children().remove().end().text().trim();
                        } else {
                            getLabel = $("label[for='" + getId + "']").clone().children().remove().end().text().trim(); //get the text of element;
                        }
                        $(self).find($('.qg-status ol')).append("<li><a href='#" + getId + "'>" + getLabel + ': ' + value + '</a></li>');
                    });
                }

                this.defaultShowErrors();

                // toggle the error summary box
                if (this.numberOfInvalids() > 0) {
                    $(self).find('.qg-status').show();
                } else {
                    $(self).find('.qg-status').hide();
                }
            } });
    });
});
