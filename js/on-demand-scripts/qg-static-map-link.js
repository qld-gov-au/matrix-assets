/*
This function generates the map title image. Pass the image element like below
<img src="" data-lat="-24.863789" data-long="152.354064">
*/
function generateStaticMapImg(ele) {
    var lat = ele.attr('data-lat'),
        lon = ele.attr('data-long'),
        googleApiKey = window.location.hostname==='www.qld.gov.au'? 'AIzaSyAqkq7IK18bsh-TUMmNR-x9v9PsptT3LMY' : 'AIzaSyCKuaFIFo7YYZXHZ5zaiEZdJx0UBoyfuAE';
        
        return 'https://maps.googleapis.com/maps/api/staticmap?size=373x189&maptype=roadmap&markers=' + lat +'%2C'+ lon +'&key=' + googleApiKey + '&sensor=false';
}