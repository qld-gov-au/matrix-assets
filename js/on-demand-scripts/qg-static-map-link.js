/*
This function generates the map title image. Pass the image element like below
<img src="" data-lat="-24.863789" data-long="152.354064 data-zoom="11" data-height="375">
*/
function generateStaticMapImg(ele) {
    var lat = ele.attr('data-lat') || -27.4673,
        lon = ele.attr('data-long') || 153.0233,
        zoom = ele.attr('data-zoom') || 17,
        height = ele.attr('data-height') || 189,
        googleApiKey = window.location.hostname==='www.qld.gov.au'? 'AIzaSyAqkq7IK18bsh-TUMmNR-x9v9PsptT3LMY' : 'AIzaSyCKuaFIFo7YYZXHZ5zaiEZdJx0UBoyfuAE';
        
        return 'https://maps.googleapis.com/maps/api/staticmap?size=373x' + height + '&maptype=roadmap&markers=' + lat +'%2C'+ lon +'&key=' + googleApiKey + '&sensor=false&zoom=' + zoom;
}