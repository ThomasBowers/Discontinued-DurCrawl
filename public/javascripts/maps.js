function init_map(newNode, offset) {
    var durham_location = {lat: 54.770764, lng: -1.572726};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: durham_location,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
    });
    var latlong = [];
    var mapPlot = [];
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('got-pos');
            latlong.push({location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)});
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
            latlong.push({location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)});
            if (routeNeeded) {
                console.log('routing');
                displayRoute(latlong[0], latlong[latlong.length - 1], map, latlong.slice(1, latlong.length - 1));
            }
        }, function () {
        });
    } else {
        // Browser doesn't support Geolocation
        console.log('not-got-pos');
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
            console.log('routing');
            displayRoute(latlong[0], latlong[latlong.length - 1], map, latlong.slice(1, latlong.length - 1));
        }

    }

};

function displayRoute(start, end, map, points) {
    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: points,
        optimizeWaypoints: false
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

