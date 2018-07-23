app.controller("FilmCtrl", [
  "$scope",
  "$http",
  "DataService",
  function($scope, $http, DataService) {
    DataService.getData().then(function(response) {
      $scope.films = response;

      // create a new map and point it to map_canvas in index.html
      var map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 12,
        //center on SF's lat long
        center: new google.maps.LatLng(37.7749, -122.4194),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }]
          },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ]
      });

      var infowindow = new google.maps.InfoWindow();
      var geocoder = new google.maps.Geocoder();

      //create an empty array to store map markers - makes removal easier
      var markers = [];

      $scope.updateMap = function(selectedFilm) {
        //remove any previous markers from map
        deleteMarkers();
        console.log("inside updateMap()");
        console.log(selectedFilm);
        for (i = 0; i < $scope.films.length; i++) {
          if ($scope.films[i].title === selectedFilm) {
            geocodeAddress($scope.films[i]);
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
