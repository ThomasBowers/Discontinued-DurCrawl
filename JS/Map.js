function init_map() {
  var durham_location = {lat: 54.7753, lng: -1.5849};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: durham_location
  });
}
