(function( qg, $ ) {
    'use strict';
    // lazy load a script
	var keys = {
		"defGoogle" : {
			"uat" : "AIzaSyCKuaFIFo7YYZXHZ5zaiEZdJx0UBoyfuAE",
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
			"apiKey": "AIzaSyCKuaFIFo7YYZXHZ5zaiEZdJx0UBoyfuAE"
		},{
			"name": "youth",
			"apiKey": "AIzaSyCe7FYHy28So2Uio_OEQje0o0Pr23s7gt0"
		}]
	};

	var googleApiKey;
	window.qg.googleKey = window.location.hostname.search(/\bdev\b|\btest\b|\blocalhost\b|\buat\b/) !== -1 ? keys.defGoogle.uat : keys.defGoogle.prod;
	window.qg.googleRecaptchaApiKey = window.location.hostname.search(/\bdev\b|\btest\b|\blocalhost\b|\buat\b/) !== -1 ? keys.defGoogleRecaptcha.uat : keys.defGoogleRecaptcha.prod;
	var findFranchiseName = function () {
		var path = window.location.pathname.replace(/\/$/, '');
		var pathArr = path.split('/').filter(function (e) {
			return e;
		});
		return pathArr[0].toLowerCase();
	};
	var franchise = findFranchiseName();
	if (franchise) {
		keys.franchises.forEach(function (e) {
			if (franchise === e.name) {
				window.qg.franchise = {
					name: e.name,
					apiKey: e.apiKey,
				};
				console.log(window.qg.franchise);
			}
		});
	}
	googleApiKey = window.qg.franchise && window.qg.franchise.apiKey ? window.qg.franchise.apiKey : window.qg.googleKey;
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
