angular.module('angularApp.controllers').controller('PastReservationsCtrl', PastReservationsCtrl);
PastReservationsCtrl.$inject = ['$scope', '$state', '$location', 'reservations'];

function PastReservationsCtrl($scope, $state, $location, reservations) {
  $scope.$parent.path = $location.path();
  $scope.reservations = reservations;
  $scope.filterBy = "All";
  $scope.orderByField = 'name';

  $scope.filterFunction = function(vehicle) {
    return true;
  }

  $scope.selected = 0;

  $scope.select = function(index) {
    $scope.selected = index;
  };

}