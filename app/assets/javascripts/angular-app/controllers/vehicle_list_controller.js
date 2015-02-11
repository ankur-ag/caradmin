angular.module('angularApp.controllers').controller('VehicleListCtrl', HomeCtrl);
HomeCtrl.$inject = ['$scope', 'VehicleService', '$state', '$location'];

function HomeCtrl($scope, VehicleService, $state, $location) {
  $scope.$parent.path = $location.path();
  $scope.vehicles = {};
  $scope.filterBy = "All";
  $scope.orderByField = 'name';

  VehicleService.getList().then(function(vehicles) {
    $scope.vehicles = vehicles;
  });

  $scope.filterFunction = function(vehicle) {
    if ($scope.filterBy == "All") {
      return true;
    } else if ($scope.filterBy == "UnReserved" && !vehicle.reservation) {
      return true;
    } else if ($scope.filterBy == "Reserved" && vehicle.reservation) {
      return true;
    } else if ($scope.filterBy == "PendingPickup" && vehicle.reservation && !vehicle.reservation.occupied_at) {
      return true;
    } else if ($scope.filterBy == "PendingReturn" && vehicle.reservation && vehicle.reservation.occupied_at && !vehicle.reservation.returned_at) {
      return true;
    } else {
      return false;
    }
  }

  $scope.selected = 0;

  $scope.select = function(index) {
    $scope.selected = index;
  };

}