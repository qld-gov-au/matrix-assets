/*
This function generates the map title image. Pass the image element like below
<img src="" data-lat="-24.863789" data-long="152.354064 data-zoom="11" data-height="375">
*/
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
        "apiKey": "AIzaSyCW8pPbJjEDq6EBFLcWNCG9_xzSgaq6gLk"
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
        "apiKey": "AIzaSyBdVnaKWo7EEqvI0oeYJMRfc4jbwbs_lvc"
    },{
        "name": "recreation",
        "apiKey": "AIzaSyDJmfdqYI3eyV8-ivwPWVIIHxBzqo5_v2I"
    },{
        "name": "seniors",
        "apiKey": "AIzaSyA3PDnd30Twv3Zr3JKqiAUYNO1983ZDBe0"
    },{
        "name": "transport",
        "apiKey": "AIzaSyBp2aS7o_YXch1fe1unrdSNnirkdvoVCuo"
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
function generateStaticMapImg(ele) {
    var lat = ele.attr('data-lat') || -27.4673,
        lon = ele.attr('data-long') || 153.0233,
        zoom = ele.attr('data-zoom') || 17,
        height = ele.attr('data-height') || 189,
        googleApiKey = window.qg.franchise && window.qg.franchise.apiKey ? window.qg.franchise.apiKey : window.qg.googleKey;

        return 'https://maps.googleapis.com/maps/api/staticmap?size=373x' + height + '&maptype=roadmap&markers=' + lat +'%2C'+ lon +'&key=' + googleApiKey + '&sensor=false&zoom=' + zoom;
}
