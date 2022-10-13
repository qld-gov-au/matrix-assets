$(document).ready(function() {
        if(Cookies.get('disclaimerPopup') == undefined){  
           setInterval($('#disclaimer').addClass('show'), 1000)
       }    

        $('#close').on('keypress click', function(){
            $('#disclaimer').removeClass('show');
            Cookies.set('disclaimerPopup', 'hidden', { expires:1});
        })
        
        
        $('.slick-carousel').slick({
    		dots: true,
    		infinite: false,
    		autoplay: false,
    		pauseOnHover: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            adaptiveHeight: false,
            responsive: [
                {
                breakpoint: 1000,
                settings: {
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
                },
                {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }
            ]
          });
        $('#featureCarousel').slick({
            dots: true,
    		infinite: false,
    		autoplay: false,
    		pauseOnHover: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: false,
            /*prevArrow:"<button type='button' class='slick-prev pull-left'><svg class='btn-prev' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0z' fill='none'/><path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/></svg></button>",
            nextArrow:"<button type='button' class='slick-next pull-right'><svg class='btn-next' xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'/></svg></button>"*/
        });
        $('.prev-recipients-carousel').slick({
            dots: true,
    		infinite: false,
    		autoplay: false,
    		pauseOnHover: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: false,
            responsive: [
                {
                breakpoint: 992,
                settings: {
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
                },
                {
                breakpoint: 400,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
                }
            ]
        });
	});
