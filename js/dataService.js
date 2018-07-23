// $q used for promise

app.service("DataService", [
  "$http",
  "$q",
  function($http, $q) {
    this.getData = function() {
      var deferred = $q.defer();
      var url = "https://data.sfgov.org/resource/wwmu-gmzc.json";
      $http.get(url).then(
        function(response) {
          return deferred.resolve(response.data);
        },
        function(errResponse) {
          console.error("Error while fetching users");
          return $q.reject(errResponse);
        }
      );

      return deferred.promise;
    };
  }
]);
