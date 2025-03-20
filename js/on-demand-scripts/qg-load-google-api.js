(function( qg, $ ) {
    'use strict';
    // lazy load a script
    function lazyScript( url ) {
        $( 'head' ).append( '<script type="text/javascript" src="' + url + '"></script>' );
    }

	const createScripts = (scripts, i, mainResolve) => {
		if (i > scripts.length - 1) {
			mainResolve();
			return;
		}
		const { type, async, src, href, rel } = scripts[i];
		if (
			!document.querySelector(`${type}[src='${src}']`) &&
			!document.querySelector(`${type}[href='${href}']`)
		) {
			const promise = new Promise((resolve) => {
				const elem = document.createElement(type);
				if (async !== undefined) elem.setAttribute("async", async);
				if (src !== undefined) elem.setAttribute("src", src);
				if (href !== undefined) elem.setAttribute("href", href);
				if (rel !== undefined) elem.setAttribute("rel", rel);
				document.head.appendChild(elem);
				elem.onload = resolve;
			});
			promise.then(() => {
				createScripts(scripts, i + 1, mainResolve);
			});
		} else {
			createScripts(scripts, i + 1, mainResolve);
		}
	};

    //load Google APi
	qg.loadGoogle = function (callback) {
		// Squiz Matrix ID 95448 is to the Git Bridge for this repository
		let scripts = [
			{ type: "link", href: "/__data/assets/git_bridge/0030/95448/js/vendor/leaflet/1.9.4/leaflet.css", rel: "stylesheet" },
			{ type: "script", src: "/__data/assets/git_bridge/0030/95448/js/vendor/leaflet/1.9.4/leaflet.js", async: false },
			{ type: "link", href: "/__data/assets/git_bridge/0030/95448/js/vendor/leaflet.markerclusterer/1.4.1/MarkerCluster.css", rel: "stylesheet" },
			{ type: "link", href: "/__data/assets/git_bridge/0030/95448/js/vendor/leaflet.markerclusterer/1.4.1/MarkerCluster.Default.css", rel: "stylesheet" },
			{ type: "script", src: "/__data/assets/git_bridge/0030/95448/js/vendor/leaflet.markerclusterer/1.4.1/leaflet.markercluster.js", async: false },
			{ type: "script", src: "/__data/assets/git_bridge/0030/95448/js/vendor/esri-leaflet/3.0.10/esri-leaflet.js", async: false },
			{ type: "script", src: "/__data/assets/git_bridge/0030/95448/js/vendor/esri-leaflet-vector/4.1.0/esri-leaflet-vector.js", async: false },
			{ type: "script", src: "/__data/assets/git_bridge/0030/95448/js/vendor/leaflet.tilelayer.fallback/1.0.4/leaflet.tilelayer.fallback.js", async: false },
		];

		createScripts(scripts, 0, () => {
			if(document.readyState === 'loading') {
				document.onreadystatechange= function () {
					if (this.readyState === 'complete') {
						lazyScript(callback);
					}
				};
			} else {
				lazyScript(callback);
			}
		});
	}
}( qg, jQuery ));
