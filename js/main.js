var app=angular.module("FilmApp",["angular.filter"]);app.controller("FilmCtrl",["$scope","$http",function(a,o){o.get("https://data.sfgov.org/resource/wwmu-gmzc.json").then(function(o){a.films=o.data;var e=o.data;console.log(e);var r=new google.maps.Map(document.getElementById("map_canvas"),{zoom:12,center:new google.maps.LatLng(37.7749,-122.4194),mapTypeId:google.maps.MapTypeId.ROADMAP}),s=new google.maps.InfoWindow,n=new google.maps.Geocoder,g=[];function t(l){n.geocode({address:l.locations},function(o,e){var n,t,a;e==google.maps.GeocoderStatus.OK?(n=o[0].geometry.location,t="<h1>"+l.title+"</h1><br><b>Location:</b> "+l.locations+"<br><b>Director:</b> "+l.director,a=new google.maps.Marker({position:n,map:r}),g.push(a),google.maps.event.addListener(a,"mouseover",function(){s.setContent(t),s.open(r,a)}),google.maps.event.addListener(a,"mouseout",function(){s.close()})):console.log("An error occurred: "+e)})}a.updateMap=function(o){for(function(){for(var o=0;o<g.length;o++)g[o].setMap(null);g=[]}(),console.log("inside updateMap()"),console.log(o),i=0;i<e.length;i++)e[i].title===o&&t(e[i])}})}]);