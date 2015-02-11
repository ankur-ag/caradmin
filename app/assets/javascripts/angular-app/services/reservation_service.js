angular.module('angularApp.services')
  .factory('ReservationService', ['Restangular', '$q', '$filter',
    function(Restangular, $q, $filter) {
      var service = Restangular.service('reservations');
      var reservations = [];

      return {
        occupy: function(id) {
          return Restangular.one("reservations", id).customPUT({
            reservation: {
              occupied_at: new Date()
            }
          });
        },
        vacate: function(id) {
          return Restangular.one("reservations", id).customPUT({
            returned_at: new Date()
          });
        },
        history: function() {
          var deferred = $q.defer();
          Restangular.all("reservations").customGET("history").then(function(reservations) {
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