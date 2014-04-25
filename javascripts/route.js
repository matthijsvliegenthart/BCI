/**
 * Created by matthijs_015 on 23-04-14.
 */
window.currentMarker = 1;
window.curLat = 0;
window.curLong = 0;
window.routeLength = 0;


function startRoute(){
    window.clickableMap = false;
    socketio.emit("startRoute");
}

socketio.on("setRouteFunction", function(data){

    setCompass(data['route'][currentMarker]);
    window.routeLength = Object.size(data['route']);


    $(".route-status").html('De route is gestart');



});

function setCompass(marker){

    var curLatLong = new google.maps.LatLng(window.curLat, window.curLong);
    var markerLatLong = new google.maps.LatLng(marker.lat, marker.long);
    window.distance = google.maps.geometry.spherical.computeDistanceBetween (curLatLong, markerLatLong);

    $(".route-output").empty();
    $(".route-output").append('<p>Je moet naar ' + marker.type + ' ' + marker.id + '</p>');
    $(".route-output").append('<p>Ga in richting ' + Math.round(getHeading(marker.lat, marker.long, window.curLat, window.curLong)) + '&deg;, over ' + Math.round(window.distance) + 'm</p>');
}

window.setInterval(function(){
    if(window.distance != null){
        if(Math.round(window.distance) < 10){
            $(".route-output button").remove();
            $(".route-output").append('<button onclick="nextMarker()">Volgende locatie</button>');
        }
    }
}, 5000);


function nextMarker(){
    window.currentMarker++;


    if(window.currentMarker == window.routeLength + 1){
        $(".route-output").empty();
        $(".route-output").append('<p>Je bent klaar met de Route</p>')
    }
    else {
        socketio.emit("startRoute");
    }

}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function getHeading(lat1, lon1, lat2, lon2) {
    var lat1 = lat1 * Math.PI / 180;
    var lat2 = lat2 * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;

    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    var brng = Math.atan2(y, x);

    return (((brng * 180 / Math.PI) + 360) % 360);
}