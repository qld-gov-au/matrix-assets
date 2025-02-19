/*
This script requires
    - data in global variable mapsData = [{Title: '', Latitude: '', Longitude: ''},{Title: '', Latitude: '', Longitude: ''}]
    - map container with id = qg-search-results-map-container
In Matrix the data and container are generated in CKAN Querying REST asset.
*/
var info;

function initMap() {
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

    let baseLayers = {
        'QLD Globe Pastel': L.tileLayer('https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Basemaps/QldBase_Pastel/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18,
            attribution: 'Tiles courtesy of the <a href="https://qldglobe.information.qld.gov.au/">State of Queensland (Department of Resources)'
        }),
        'QLD Globe Colour': L.tileLayer('https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Basemaps/QldBase_Colour/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18,
            attribution: 'Tiles courtesy of the <a href="https://qldglobe.information.qld.gov.au/">State of Queensland (Department of Resources)'
        }),
    };
    let map = L.map('qg-search-results-map-container', { center: center, zoom: zoom, layers: [baseLayers['QLD Globe Pastel']], zoomControl: false });
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.control
        .scale({
            imperial: false,
            metric: true,
        })
        .addTo(map);
    L.control.layers(baseLayers).addTo(map);
    L.Marker.prototype.options.icon.imagePath = "/?a=95448:js/vendor/leaflet/images/marker-icon.png";

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
}
initMap();
