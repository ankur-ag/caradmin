angular.module('angularApp.controllers').controller('PastReservationsCtrl', PastReservationsCtrl);
PastReservationsCtrl.$inject = ['$scope', 'ReservationService', '$state', '$location'];

function PastReservationsCtrl($scope, ReservationService, $state, $location) {
  $scope.$parent.path = $location.path();
  $scope.reservations = {};
  $scope.filterBy = "All";
  $scope.orderByField = 'name';

  ReservationService.history().then(function(reservations) {
    $scope.reservations = reservations;
  });

  $scope.filterFunction = function(vehicle) {
    return true;
  }

  $scope.selected = 0;

  $scope.select = function(index) {
    $scope.selected = index;
  };

}