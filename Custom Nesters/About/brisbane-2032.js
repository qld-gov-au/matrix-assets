$(".modal-video").click(function () {
      var theModal = $(this).data("target"),
      videoSRC = $(this).attr("data-video"),
      videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=1&showinfo=1&html5=1&autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal).on('click', function(){
        $(theModal + ' iframe').attr('src', videoSRC);
      });
    });

var $cbx_group = $("input:checkbox[id^='em_wfs_formfield_5918634_option_']"); // name is not always helpful ;)
var $other1 =  $("#collapseOther1");
var $other1Input =  $("#collapseOther1 input");
var $other2 =  $("#collapseOther2");
var $other2Input =  $("#collapseOther2 input");

function deRequire(){
    if($cbx_group.is(":checked")){
      $cbx_group.prop('required', false);
    }else {
        $("input:checkbox[id^='em_wfs_formfield_5918634_option_0']").prop('required', true);
    }
    if($("#em_wfs_formfield_5918634_option_3").is(":checked")){
        $other1.collapse("show");
        $other1Input.prop('required', true);
    }else {
        $other1.collapse('hide');
        $other1Input.prop('required', false);
    }
}

$('input[type=radio][name=em_wfs_formfield_5918660]').change(function() {
    if (this.value == 'Other, please specify') {
        $other2.collapse("show");
        $other2Input.prop('required', true);
    }
    else {
        $other2.collapse('hide');
        $other2Input.prop('required', false);
    }
});

$(document).ready(function() {
    var $thanksModal = $('#thanksModal');
    if(window.location.href.indexOf('#thank-you') != -1) {
        $thanksModal.modal('show');
    }

    $thanksModal.on('hidden.bs.modal', function () {
        location.hash = '';
    })

    var target = $('#form');
    $('#business-updates').on('click', function(){
        $('.nav a[href="#nav-business"]').tab('show');
        $('html, body').animate({ scrollTop: target.offset().top - (100)  }, 500);
    });
    $('#news-updates').on('click', function(){

        $('.nav a[href="#nav-news"]').tab('show');   
        $('html, body').animate({ scrollTop: target.offset().top - (100)  }, 500);
    });

});
