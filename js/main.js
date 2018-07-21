angular
  .module("FilmApp", ["angular.filter", "ui.filters"])
  .controller("FilmCtrl", [
    "$scope",
    "$http",
    function($scope, $http) {
      $http
        .get("https://data.sfgov.org/resource/wwmu-gmzc.json")
        .then(function(response) {
          $scope.films = response.data;
          var data = response.data;

          // create a new map and point it to map_canvas in index.html
          var map = new google.maps.Map(document.getElementById("map_canvas"), {
            zoom: 12,
            //center on SF's lat long
            center: new google.maps.LatLng(37.7749, -122.4194),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          var infowindow = new google.maps.InfoWindow();
          var geocoder = new google.maps.Geocoder();

          //create an empty array to store map markers - makes removal easier
          var markers = [];

          $scope.updateMap = function(selectedFilm) {
            //remove any previous markers from map
            deleteMarkers();

            for (i = 0; i < data.length; i++) {
              if (data[i].title === selectedFilm) {
                geocodeAddress(data[i]);
              }
            }
          };

          function geocodeAddress(data) {
            geocoder.geocode({ address: data.locations }, function(
              results,
              status
            ) {
              //alert(status);
              if (status == google.maps.GeocoderStatus.OK) {
                //createMarker function accepts two params, latlng, and html
                createMarker(
                  results[0].geometry.location,
                  "<h1>" +
                    data.title +
                    "</h1><br><b>Location:</b> " +
                    data.locations +
                    "<br><b>Director:</b> " +
                    data.director
                );
              } else {
                console.log("An error occurred: " + status);
              }
            });
          }

          function createMarker(latlng, html) {
            var marker = new google.maps.Marker({
              position: latlng,
              map: map
            });
            markers.push(marker);

            // show popup on hover
            google.maps.event.addListener(marker, "mouseover", function() {
              infowindow.setContent(html);
              infowindow.open(map, marker);
            });

            // remove popup
            google.maps.event.addListener(marker, "mouseout", function() {
              infowindow.close();
            });
          }

          function deleteMarkers() {
            // loop through eacy marker in the array and setMap to null
            for (var i = 0; i < markers.length; i++) {
              markers[i].setMap(null);
            }
            markers = [];
          }
        });
    }
  ]);
