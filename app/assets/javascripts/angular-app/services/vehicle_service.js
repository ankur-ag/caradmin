angular.module('angularApp.services')
  .factory('VehicleService', ['Restangular', '$q', '$filter',
    function(Restangular, $q, $filter) {
      var service = Restangular.service('vehicles');
      var vehicles = [];

      return {
        getList: function() {
          var deferred = $q.defer();
          service.getList().then(function(all_vehicles) {
            vehicles = all_vehicles;
            deferred.resolve(vehicles);
          });
          return deferred.promise;
        },
        getOne: function(id) {
          var deferred = $q.defer();
          service.one(id).get().then(function(vehicle) {
            angular.forEach(vehicles, function(v, index) {
              if (v.id === vehicle.id) {
                vehicles[index] = vehicle;
              }
            });
            deferred.resolve(vehicle);
          }, function(response) {
            deferred.reject(response);
          });
          return deferred.promise;
        }
      };
    }
  ])