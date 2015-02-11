angular.module('angularApp.controllers').controller('VehicleListCtrl', HomeCtrl);
HomeCtrl.$inject = ['$scope', 'VehicleService', 'ReservationService', 'ToastService', '$state', '$location', 'vehicles'];

function HomeCtrl($scope, VehicleService, ReservationService, ToastService, $state, $location, vehicles) {
  $scope.$parent.path = $location.path();
  $scope.vehicles = vehicles;
  $scope.filterBy = "All";
  $scope.orderByField = 'name';

  $scope.occupy = function(vehicle_id, reservation_id) {
    ReservationService.occupy(reservation_id).then(function() {
      VehicleService.getOne(vehicle_id);
      ToastService.show("Occupied!");
    })
  }

  $scope.vacate = function(vehicle_id, reservation_id) {
    ReservationService.vacate(reservation_id).then(function() {
      VehicleService.getOne(vehicle_id);
      ToastService.show("Vacated!");
    });
  }

  $scope.filterFunction = function(vehicle) {
    if ($scope.filterBy == "All") {
      return true;
    } else if ($scope.filterBy == "UnReserved" && !vehicle.reservation) {
      return true;
    } else if ($scope.filterBy == "Reserved" && vehicle.reservation) {
      return true;
    } else if ($scope.filterBy == "PendingPickup" && vehicle.reservation && !vehicle.reservation.occupied_at) {
      return true;
    } else if ($scope.filterBy == "PendingReturn" && vehicle.reservation && vehicle.reservation.scheduled_to_return_at) {
      var return_date = new Date(vehicle.reservation.scheduled_to_return_at);
      var today = new Date();
      return today > return_date;
    } else {
      return false;
    }
  }

  $scope.selected = 0;

  $scope.select = function(index) {
    $scope.selected = index;
  };

}