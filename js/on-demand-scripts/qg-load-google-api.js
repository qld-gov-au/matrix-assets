(function( qg, $ ) {
    'use strict';
    // lazy load a script
	var keys = {
		"defGoogle" : {
            "test" : "AIzaSyCKuaFIFo7YYZXHZ5zaiEZdJx0UBoyfuAE",
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
        return window.location.hostname.search(/dev|test|localhost|github|\buat\b/) === -1;
    };
    // check if the hostname contains a specific word and assign the key accordingly
    if (window.location.hostname.search(/\bgithub\b/) !== -1) {
        googleApiKey = keys.defGoogle.docs;
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
    function lazyScript( url ) {
        $( 'head' ).append( '<script type="text/javascript" src="' + url + '"></script>' );
    }
    //load Google APi
	qg.loadGoogle = function (callback) {
		if($('script[src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"]').length <= 0) {
			async function loadApi(url, isCss) {
				let node = document.createElement(isCss ? "link" : "script");
				if (isCss) {
					node.rel = "stylesheet";
					node.href = url;
				} else {
					node.src = url;
				}
				node.type = isCss ? "text/css" : "text/javascript";
				node.crossorigin = "";

				return new Promise((resolve, reject) => {
					node.addEventListener('load', resolve);
					node.addEventListener('error', reject);

					document.head.appendChild(node);
				});
			}

			$.when(
				loadApi("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", true),
				loadApi("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", false),
			).done(() => {
				$.when(
					loadApi("https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css", true),
					loadApi("https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css", true),
					loadApi("https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js", false),
				).done(() => {
					lazyScript(callback);
				});
			});
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
