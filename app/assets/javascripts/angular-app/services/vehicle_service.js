angular.module('angularApp.services')
.factory('VehicleService', ['Restangular', '$q','$filter',
  function(Restangular, $q, $filter) {
    var service = Restangular.service('vehicles');
    var vehicles = {};

    return {
      getList: function() {
        var list = [];
        var deferred = $q.defer();
        service.getList().then(function(all_vehicles) {
          angular.forEach(all_vehicles, function(value, key) {
            vehicles[value.id] = value;
          });
          deferred.resolve(vehicles);
        });
        return deferred.promise;
      },
      getOne: function(id) {
        var deferred = $q.defer();
        service.one(id).get().then(function(vehicle) {
          vehicles[vehicle.id] = vehicle;
          deferred.resolve(vehicle);
        });
        return deferred.promise;
      },
      save: function(vehicle) {
        if (vehicle.id) {
          return vehicle.put().then(function(vehicle) {
            vehicles[vehicle.id] = vehicle;
            return vehicle;
          });
        } else {
          return service.post(vehicle).then(function(new_user) {
            vehicles[new_user.id] = new_user;
            return new_user;
          })
        }
      },
      delete: function(id) {
        return service.remove(id);
      }
    };
  }
])