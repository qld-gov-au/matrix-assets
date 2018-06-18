/*
This script requires 
    - data in global variable mapsData = [{Title: '', Latitude: '', Longitude: ''},{Title: '', Latitude: '', Longitude: ''}]
    - map container with id = qg-search-results-map-container
In Matrix the data and container are generated in CKAN Querying REST asset.
*/

var info;

function initMap() {
    $.getScript('./?a=25653', function(){ //calling markerclusterer.js from Matrix plugins
        var mapEle = document.getElementById('qg-search-results-map-container'),
        center = mapEle.getAttribute('data-center').split(','),
        controlsPosition = mapEle.getAttribute('data-controlsPosition'),
        gridSize = mapEle.getAttribute('data-dataClusterGridSize'),
        markers = {};
        
        var map = new google.maps.Map(mapEle, {
          center: new google.maps.LatLng( parseFloat(center[0]),parseFloat(center[1]) ),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControlOptions: {
              position: google.maps.ControlPosition[controlsPosition]
          },
          streetViewControlOptions: {
              position: google.maps.ControlPosition[controlsPosition]
          },
          zoom: 5
        });
        
        var markerClusterer = new MarkerClusterer( map, null, {
                imagePath: '../../images/maps/m',
                imageSizes: [ 53, 56, 66, 78, 90 ],
                imageExtension: 'png',
                gridSize: gridSize
            });
        
        //marker html generator    
        var addMarkerLink = function( item ) {
                var template = '',wrapper = '';
                template = '<li><a href="'+ window.location.href +'/view/?title=' + encodeURI(item['Title']) + '">' + item['Title'] + '</a></li>';
                wrapper = $( '<ul class="map-popup"></ul>' );
                return wrapper.append(template);
            }    
            
        markerClusterer.clearMarkers(); //clearing existing markers
        
        //looping through data to mark
        $.each(mapsData, function (key, item){
            var latlong = item.Latitude + ',' + item.Longitude,
                marker;
            // put it on the map?
            if ( ! item.Latitude ) {
                return;
            }
            if ( markers[ latlong ] ) {
                // already have a marker at this position
                return;
            } else {
                // track it
                markers[ latlong ] = addMarkerLink( item );
            }
            
            marker = new google.maps.Marker({
                position: new google.maps.LatLng( item.Latitude, item.Longitude ),
                title: item.Title,
                visible: true,
                animation: google.maps.Animation.DROP,
                map: map
            });
            
            // marker click, show info box
            google.maps.event.addListener( marker, 'click', function() {
                // info box already visible?
                if ( info ) {
                    info.close();
                }

                info = new google.maps.InfoWindow({ content: markers[ latlong ].get( 0 ) });
                info.open( map, marker );
            });
            
            markerClusterer.addMarker( marker );
        });
    });
    
}
initMap();