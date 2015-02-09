angular.module('angularApp.services')
.factory('ReservationService', ['Restangular', '$q','$filter',
  function(Restangular, $q, $filter) {
    var service = Restangular.service('reservations');
    var reservations = {};

    return {
      getList: function() {
        var list = [];
        var deferred = $q.defer();
        service.getList().then(function(reservations) {
          reservations = reservations;
          deferred.resolve(reservations);
        });
        return deferred.promise;
      },
      getOne: function(id) {
        var deferred = $q.defer();
        if (reservations[id]) {
          deferred.resolve(reservations[id]);
        } else {
          service.one(id).get().then(function(reservation) {
            reservations[reservation.id] = reservation;
            deferred.resolve(reservation);
          }, function(response) {
            deferred.reject(response);
          })
        }
        return deferred.promise;
      },
      save: function(reservation) {
        if (reservation.id) {
          return reservation.put().then(function() {
            reservations[reservation.id] = reservation;
            return reservation;
          });
        } else {
          return service.post(reservation).then(function(new_user) {
            reservations[new_user.id] = new_user;
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