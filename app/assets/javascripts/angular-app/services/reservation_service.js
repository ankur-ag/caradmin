angular.module('angularApp.services')
  .factory('ReservationService', ['Restangular', '$q', '$filter',
    function(Restangular, $q, $filter) {
      var service = Restangular.service('reservations');
      var reservations = [];

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

          service.one(id).get().then(function(reservation) {
            deferred.resolve(reservation);
          }, function(response) {
            deferred.reject(response);
          })
          return deferred.promise;
        },
        save: function(reservation) {
          if (reservation.id) {
            Restangular.restangularizeElement('', reservation, 'reservations')
            return reservation.put().then(function() {
              return reservation;
            });
          } else {
            return service.post(reservation).then(function(reservation) {
              return reservation;
            })
          }
        }
      };
    }
  ])