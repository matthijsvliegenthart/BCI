/**
 * Created by matthijs_015 on 22-04-14.
 */
var users = [];

$( document ).ready(function() {
    function initialize() {
        var mapOptions = {
            center: new google.maps.LatLng(51.885320, 4.470088),
            zoom: 14
        };
       window.map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);


});

function setCoordinates(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(setLocation);
    }
    else
    {
        alert("Geolocation is not supported by this browser.");
    }
}

function setRealtimeCoordinates(){
    window.setInterval(function(){
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(setLocation);
        }
    }, 5000);
}

function setLocation(pos){
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;

    window.curLat = lat;
    window.curLong = long;

    window.map.setCenter(new google.maps.LatLng(lat, long));
    window.createRouteMap.setCenter(new google.maps.LatLng(lat, long));
    socketio.emit("setLocation", {lat: lat, long: long});
}

socketio.on("setMap", function(data){

    for (var i = 0; i < users.length; i++ ) {
        users[i].setMap(null);
    }
    users.length = 0;

    for(var user in data['clients']){

        lat =  data['clients'][user].lat;
        long =  data['clients'][user].long;
        latlng = new google.maps.LatLng(lat,long);

        user = new google.maps.Marker({
            position: latlng,
            map: window.map,
            title: data['clients'][user].name
        });
        users.push(user);
    }
});