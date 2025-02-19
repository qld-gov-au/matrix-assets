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
		let scripts = [
			{ type: "link", href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", rel: "stylesheet" },
			{ type: "script", src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", async: false },
			{ type: "link", href: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css", rel: "stylesheet" },
			{ type: "link", href: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css", rel: "stylesheet" },
			{ type: "script", src: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js", async: false },
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
