function init_map(newNode, offset) {
    var durham_location = {lat: 54.770764, lng: -1.572726};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: durham_location
    });
    var mapPlot = [];
    var latlong = [];
    for (var j = 0; j < collegeWP.length; j++) {
        if (routeNeeded) {
            latlong.push({location: new google.maps.LatLng(collegeWP[j].lat, collegeWP[j].long)});
        } else {
            mapPlot.push(new google.maps.Marker({
                position: {lat: collegeWP[j].lat, lng: collegeWP[j].long},
                map: map,
                title: collegeWP[j].name
            }));
        }
    }
    if (routeNeeded) {
        displayRoute(latlong[0], latlong[latlong.length - 1], map, latlong.slice(1, latlong.length - 1));
    }
};

function displayRoute(start, end, map, points) {
    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: points
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}