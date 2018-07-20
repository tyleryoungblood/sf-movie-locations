$.getJSON("https://data.sfgov.org/resource/wwmu-gmzc.json", function(data) {
  //data is the JSON string

  //console.log(JSON.stringify(data.length));

  // create a new map and point it to map_canvas in index.html
  var map = new google.maps.Map(document.getElementById("map_canvas"), {
    zoom: 12,
    //center on SF's lat long
    center: new google.maps.LatLng(37.7749, -122.4194),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();
  var geocoder = new google.maps.Geocoder();

  var marker, i;

  for (i = 0; i < 2; i++) {
    geocodeAddress(data[i]);
  }

  function geocodeAddress(data) {
    console.log(data.locations);
    geocoder.geocode({ address: data.locations }, function(results, status) {
      //alert(status);
      if (status == google.maps.GeocoderStatus.OK) {
        createMarker(
          results[0].geometry.location,
          "<b>" + data.title + "</b><br>" + data.locations
          // location[0] + "test<br>" + location[1]
        );
      } else {
        console.log("some problem in geocode" + status);
      }
    });
  }

  function createMarker(latlng, html) {
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });

    google.maps.event.addListener(marker, "mouseover", function() {
      infowindow.setContent(html);
      infowindow.open(map, marker);
    });

    google.maps.event.addListener(marker, "mouseout", function() {
      infowindow.close();
    });
  }
});
