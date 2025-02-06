/*
This script requires
    - data in global variable mapsData = [{Title: '', Latitude: '', Longitude: ''},{Title: '', Latitude: '', Longitude: ''}]
    - map container with id = qg-search-results-map-container
In Matrix the data and container are generated in CKAN Querying REST asset.
*/
var info;

function initMap() {
    let l = document.createElement('link');
    l.type = 'text/css';
    l.rel = 'stylesheet';
    l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    l.crossorigin = '';
    document.getElementsByTagName('head')[0].appendChild(l.cloneNode());
    l.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css';
    document.getElementsByTagName('head')[0].appendChild(l.cloneNode());
    l.href = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css';
    document.getElementsByTagName('head')[0].appendChild(l);
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.crossorigin = '';
    document.getElementsByTagName('head')[0].appendChild(s.cloneNode());
    s.src = 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js';
    document.getElementsByTagName('head')[0].appendChild(s);

    $.getScript('./?a=13345', function(){ //calling markerclusterer.js from Matrix plugins
        let searchLat = window.location.search.match(/latitude=([\d.-]*?)(&|$)/);
        let searchLong = window.location.search.match(/longitude=([\d.-]*?)(&|$)/); //detect location search

        let mapEle = document.getElementById('qg-search-results-map-container');
        let controlsPosition = mapEle.getAttribute('data-controlsPosition');
        let markers = {};
        let center
        let zoom;

        if(searchLat && searchLat[1].length > 0) {
            center = [searchLat[1], searchLong[1]];
            zoom = 10;
        } else {
            center = mapEle.getAttribute('data-center') && mapEle.getAttribute('data-center').split(',') || '-23,143'.split(',');
            zoom = 5;
        }

        let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            });
        let map = L.map('qg-search-results-map-container', { center: center, zoom: zoom, layers: [tiles], zoomControl: false });
        L.control.zoom({ position: 'bottomright' }).addTo(map);
        L.control
            .scale({
                imperial: false,
                metric: true,
            })
            .addTo(map);

        let markerClusters = L.markerClusterGroup({
            showCoverageOnHover: false,
            animateAddingMarkers: true,
            maxClusterRadius: 40,
        });
        $.each(mapsData, function (key, item) {
            var latlong = item.Latitude + ',' + item.Longitude;
            // put it on the map?
            if (!item.Latitude) {
                return;
            }
            if (!markers[latlong]) {
                // add marker to map
                markers[latlong] = L.marker(new L.LatLng(item.Latitude, item.Longitude));
                markers[latlong].bindPopup(window.mapsMarker.replace(/item\[[\s\S]+?\]/g, function (r) {return eval(r);}) || '<a href="'+ (window.location.origin + window.location.pathname.replace(/(_nocache|_recache|_admin)/,'')).replace(/\/$/,'') + '/view/?title=' + encodeURI(item['Title']) + '&id=' + encodeURI(item['_id']) + '">' + item['Title'] + '</a>');
                markerClusters.addLayer(markers[latlong]);
            }
        });
        map.addLayer(markerClusters);
    });
}
initMap();
