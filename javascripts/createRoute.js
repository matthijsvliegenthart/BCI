/**
 * Created by matthijs_015 on 22-04-14.
 */
window.markerCount = 1;
var markers = [];

$( document ).ready(function() {

    function initializeCreateRoute() {
        var createRouteMapOptions = {
            center: new google.maps.LatLng(51.885320, 4.470088),
            zoom: 14
        };
        window.createRouteMap = new google.maps.Map(document.getElementById("create-route-canvas"),
            createRouteMapOptions);

        google.maps.event.addListener(window.createRouteMap, 'mouseup', function(event){
            var lat = event.latLng.lat();
            var lang = event.latLng.lng();
            window.myLatlng = new google.maps.LatLng(lat,lang);
        });


    }
    google.maps.event.addDomListener(window, 'load', initializeCreateRoute);

    if(window.clickableMap == true){
        $("#create-route-canvas").click(function(e){
            var offset = $(this).offset();
            var mouseX = e.clientX - offset.left;
            var mouseY = e.clientY - offset.top;

            $('.create-route-options').show();
            $('.create-route-options').css('margin-left', mouseX);
            $('.create-route-options').css('margin-top', mouseY);
        });
    }

    $(".create-route-option[rel = 'punt']").click(function(){
        addPunt(window.myLatlng);
    });
    $(".create-route-option[rel = 'post']").click(function(){
        addPost(window.myLatlng);
    });
});

function addPunt(location){
    socketio.emit("addMarker", {id: window.markerCount, long: location.lng(), lat : location.lat(), type: 'punt'});
    $('.create-route-options').hide();
}

function addPost(location){
    socketio.emit("addMarker", {id: window.markerCount, long: location.lng(), lat : location.lat(), type: 'post'});
    $('.create-route-options').hide();
}

socketio.on("setRoute", function(data){
    for (var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }
    markers.length = 0;

    for(var marker in data['route']){

        lat =  data['route'][marker].lat;
        long =  data['route'][marker].long;
        latlng = new google.maps.LatLng(lat,long);

        user = new google.maps.Marker({
            position: latlng,
            map: window.createRouteMap,
            title: data['route'][marker].type + ' nummer ' + data['route'][marker].id
        });
        window.markerCount++;
        markers.push(user);
    }
    console.log(markers);
});

function clearRoute(){
    socketio.emit("clearRoute");
    window.clickableMap = true;
    window.markerCount = 1;
}