function init_map() {
  var durham_location = {lat: 54.770764, lng: -1.572726};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: durham_location
  });

  var hild_bede = new google.maps.Marker({
    position: {lat: 54.777227, lng: -1.562065},
    map: map,
    title: 'St Hild & St Bede'
  });

  var brooks = new google.maps.Marker({
    position: {lat: 54.773143, lng: -1.564726},
    map: map,
    title: "St Cuthbert's (Brooks Bar)"
  });

  var grey = new google.maps.Marker({
    position: {lat: 54.765012, lng: -1.575641},
    map: map,
    title: "Grey"
  });

  var stephenson = new google.maps.Marker({
    position: {lat: 54.759616, lng: -1.581338},
    map: map,
    title: "Stephenson"
  });

  var butler = new google.maps.Marker({
    position: {lat: 54.759784, lng: -1.579781},
    map: map,
    title: "Josephine Butler"
  });

  var collingwood = new google.maps.Marker({
    position: {lat: 54.762885, lng: -1.576481},
    map: map,
    title: "Collingwood"
  });

  var trevelyan = new google.maps.Marker({
    position: {lat: 54.764297, lng: -1.579828},
    map: map,
    title: "Trevelyan"
  });

  var van_mildert = new google.maps.Marker({
    position: {lat: 54.769574, lng: -1.573450},
    map: map,
    title: "Van Mildert"
  });

  var aidans = new google.maps.Marker({
    position: {lat: 54.764972, lng: -1.583239},
    map: map,
    title: "St Aidan's"
  });

  var marys = new google.maps.Marker({
    position: {lat: 54.766522, lng: -1.577811},
    map: map,
    title: "St Mary's"
  });

  var cuths = new google.maps.Marker({
    position: {lat: 54.770862, lng: -1.577470},
    map: map,
    title: "St Cuthbert's (Bailey Bar)"
  });

  var johns = new google.maps.Marker({
    position: {lat: 54.771940, lng: -1.575746},
    map: map,
    title: "St John's"
  });

  var chads = new google.maps.Marker({
    position: {lat: 54.773268, lng: -1.574811},
    map: map,
    title: "St Chad's"
  });

  var hatfield = new google.maps.Marker({
    position: {lat: 54.774312, lng: -1.574534},
    map: map,
    title: "Hatfield"
  });

  var university = new google.maps.Marker({
    position: {lat: 54.775256, lng: -1.576400},
    map: map,
    title: "University"
  });
}
