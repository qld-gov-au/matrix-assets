(function( qg, $ ) {
	console.log('inside load google api.js file');
    'use strict';
    // lazy load a script
	var keys = {
		"defGoogle" : {
            "test" : "AIzaSyA1uwIi2C0x9VbCqoVK4nxcID4CVqF3uhQ",
			"uat" : "AIzaSyCKuaFIFo7YYZXHZ5zaiEZdJx0UBoyfuAE",
            "docs" : "AIzaSyBE95_qL90MT9loY1roLnHJ3uaBYbleYeM",
			"prod" : "AIzaSyANZv-2WcXRzkBqtgEcLTZq7zVy-9eNWgw"
		},
		"defGoogleRecaptcha" : {
			"uat" : "6LeNGSwUAAAAAD6o-P5UTM0FNpKjYB71Kh70F-Ud",
			"prod" : "6LcoIywUAAAAAN-1rq22G-bP3yxl1bBq_5nHJ6s9"
		},
		"franchises": [{
			"name": "about",
			"apiKey": "AIzaSyBi-T3vrvcYwouFPqPI5IgLoQxl2hz6Ogs"
		}, {
			"name": "atsi",
			"apiKey": "AIzaSyB2mTTDd1CcLEYrLHJJHlzX60vQ68snyko"
		}, {
			"name": "community",
			"apiKey": "AIzaSyCJwNeGu0XT1lvhg-2cm7S27BQo9k7Jd9E"
		}, {
			"name": "disability",
			"apiKey": "AIzaSyC-KQFfBhoGle7kJJhY1Pf_GvR_qC5jzN4"
		},{
			"name": "education",
			"apiKey": "AIzaSyDeeYKKOyQCYkpVWXRLLxyNjfy2dhyWVls"
		}, {
			"name": "emergency",
			"apiKey": "AIzaSyD1xT_2Dh2EZ7Iy6SLodeH8CJzbXlp6vgE"
		}, {
			"name": "environment",
			"apiKey": "AIzaSyAZJjfwIKDPlQs-S3id-CGp8U_S4U7idFI"
		}, {
			"name": "families",
			"apiKey": "AIzaSyBucRn0YhJhQ-ELSS-MM7JvYb19-I1bqqI"
		}, {
			"name": "health",
			"apiKey": "AIzaSyD_Xzvr6nBm5PlpANw2UZ2df3-U5eeOlvY"
		}, {
			"name": "housing",
			"apiKey": "AIzaSyCgMKJlbP1SRIf3xCMFDbBImNkF_BCubvk"
		},{
			"name": "jobs",
			"apiKey": "AIzaSyBXmI1DZvPFVQ_h-E1TNsPNdlNuqDd7MVo"
		},{
			"name": "law",
			"apiKey": "AIzaSyBeij584IMIZqpftyhMCt_lZ_hBK_h8hMc"
		},{
			"name": "recreation",
			"apiKey": "AIzaSyDJmfdqYI3eyV8-ivwPWVIIHxBzqo5_v2I"
		},{
			"name": "seniors",
			"apiKey": "AIzaSyA3PDnd30Twv3Zr3JKqiAUYNO1983ZDBe0"
		},{
			"name": "transport",
			"apiKey": "AIzaSyARzyCPigCt9cW1F6ua0_U3NVLdRbxwLyg"
		},{
			"name": "youth",
			"apiKey": "AIzaSyCe7FYHy28So2Uio_OEQje0o0Pr23s7gt0"
		}]
	};

	var googleApiKey;
    var firstFolderPath = location.pathname.split('/')[1];
    var isProd = function () {
        return window.location.hostname.search(/dev|test|localhost|github/) === -1;
    };
    var isUat= function () {
        return window.location.hostname.search(/\buat\b/) === -1;
    };
    // check if the hostname contains a specific word and assign the key accordingly
    if (window.location.hostname.search(/\bgithub\b/) !== -1) {
        googleApiKey = keys.defGoogle.docs;
    } else if (isUat()) {
        googleApiKey = keys.defGoogle.uat;
    } else if (!isProd()) {
        googleApiKey = keys.defGoogle.test;
    } else {
        googleApiKey = keys.defGoogle.prod;
    }
    // check if first folder path exist and match to see if this is a valid franchise name or not
    if (firstFolderPath) {
        keys.franchises.forEach(function (e) {
            if (firstFolderPath === e.name) {
                googleApiKey = e.apiKey;
            }
        });
    }
	// static maps on the description page
	var $mapImg = $('.qg-static-map');
	function generateStaticMapImg (ele) {
		let lat = ele.attr('data-lat') || -27.4673;
		let lon = ele.attr('data-long') || 153.0233;
		let zoom = ele.attr('data-zoom') || 17;
		let height = ele.attr('data-height') || 189;
		return 'https://maps.googleapis.com/maps/api/staticmap?size=373x' + height + '&maptype=roadmap&markers=' + lat + '%2C' + lon + '&key=' + googleApiKey + '&sensor=false&zoom=' + zoom;
	}
    // append static image on the maps description page
	if ($mapImg.length > 0) {
		var htmlInsert = $('<div>');
		$mapImg.each(function () {
			let $this = $(this);
			$this.find('img').attr('src', generateStaticMapImg($this.find('img')));
			htmlInsert.append($this);
		});
		$('aside').prepend(htmlInsert);
		$('a.qg-static-map').wrap("<div class='qg-aside st-map-static'>");
		$('.st-map-static').eq(0).prepend("<h2><i class='fa fa-compass' aria-hidden='true'></i>Maps</h2>");
	}
    function lazyScript( url ) {
        $( 'head' ).append( '<script type="text/javascript" src="' + url + '"></script>' );
    }
    //load Google APi
	qg.loadGoogle = function (callback) {
		if($('#googleapi').length<=0) {
			var s = document.createElement('script'),
				u = 'https://maps.googleapis.com/maps/api/js?key='+ googleApiKey +'&region=AU&libraries=places';
			s.type = 'text/javascript';
			s.id = 'googleapi';
			s.src = u;
			document.getElementsByTagName( 'head' )[0].appendChild( s );
			s.onreadystatechange= function () { //trigger for IE
				if (this.readyState === 'complete') {
					lazyScript(callback);
				}
			};
			s.onload = function () {
				lazyScript(callback);
			};
		}
		else { //if script is already created but either loading or loaded
			if(document.readyState === 'loading') {
				document.onreadystatechange= function () {
					if (this.readyState === 'complete') {
						lazyScript(callback);
					}
				};
			}
			else {
				lazyScript(callback);
			}
		}

	}
}( qg, jQuery ));
