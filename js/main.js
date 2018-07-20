angular.module("FilmApp", []).controller("FilmCtrl", [
  "$scope",
  "$http",
  function($scope, $http) {
    $http
      .get("https://data.sfgov.org/resource/wwmu-gmzc.json")
      .then(function(response) {
        console.log(response.data);
        $scope.films = response.data;
      });
  }
]);
